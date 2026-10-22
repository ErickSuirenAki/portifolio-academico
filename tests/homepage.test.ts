import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHomeSettings, selectFeaturedProjects } from '../src/lib/homepage.ts';
import type { Project } from '../src/lib/models.ts';

const first = '10000000-0000-4000-8000-000000000001';
const second = '10000000-0000-4000-8000-000000000002';
const third = '10000000-0000-4000-8000-000000000003';
function form() {
  const value = new FormData();
  value.set('featured_project_ids', '[]'); value.set('conference_photos', '[]'); value.set('exchange_photos', '[]');
  return value;
}
function project(id: string, published = true) { return { id, published } as Project; }

test('homepage only shows published projects in the manually selected order', () => {
  const projects = [project(first), project(second, false), project(third)];
  assert.deepEqual(selectFeaturedProjects(projects, [third, second, first]).map(item => item.id), [third, first]);
  assert.deepEqual(selectFeaturedProjects(projects, []).map(item => item.id), [first, third]);
  assert.deepEqual(selectFeaturedProjects(projects, ['removed-project']), []);
});
test('homepage rejects duplicate or malformed IDs and more than three featured projects', () => {
  const value = form();
  for (const ids of [[first, first], [first, second, third, '10000000-0000-4000-8000-000000000004'], ['invalid-id'], [null]]) {
    value.set('featured_project_ids', JSON.stringify(ids));
    assert.throws(() => parseHomeSettings(value));
  }
  value.set('featured_project_ids', JSON.stringify([third, first]));
  assert.deepEqual(parseHomeSettings(value).featured_project_ids, [third, first]);
});
test('homepage supports empty photo albums and rejects unsafe or oversized albums', () => {
  const value = form();
  assert.deepEqual(parseHomeSettings(value), { id: 1, featured_project_ids: [], conference_photos: [], exchange_photos: [] });
  const photo = { url: 'https://example.org/photo.jpg', alt: 'Apresentação no congresso', caption: 'CONNEPI, 2024' };
  value.set('conference_photos', JSON.stringify(Array(6).fill(photo)));
  assert.equal(parseHomeSettings(value).conference_photos.length, 6);
  value.set('exchange_photos', JSON.stringify(Array(7).fill(photo)));
  assert.throws(() => parseHomeSettings(value), /seis|6/);
  value.set('exchange_photos', JSON.stringify([{ ...photo, url: 'javascript:alert(1)' }]));
  assert.throws(() => parseHomeSettings(value), /URL/);
});
