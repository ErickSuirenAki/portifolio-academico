import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseContent, safeUrl, fileExtension, parseProjectGallery } from '../src/lib/validation.ts';
import { isSection } from '../src/lib/models.ts';
import { databaseErrorMessage } from '../src/lib/database-error.ts';

function project() {
  const form = new FormData();
  form.set('title', 'Projeto de pesquisa'); form.set('slug', 'pesquisa-1');
  return form;
}
test('rejects active URL schemes and credential-bearing URLs', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,test', '//evil.test', 'https://name:secret@example.com']) assert.equal(safeUrl(value), undefined);
  assert.equal(safeUrl('https://example.com/artigo'), 'https://example.com/artigo');
});
test('a new project is a draft; unchecked content cannot be implicitly published', () => {
  const form = project(); form.set('tags', 'IoT, ESP32, ');
  const result = parseContent('projects', form);
  assert.equal(result.published, false); assert.deepEqual(result.tags, ['IoT', 'ESP32']);
  form.set('published', 'on'); assert.equal(parseContent('projects', form).published, true);
});
test('rejects missing required values, malformed slugs and oversized summaries', () => {
  assert.throws(() => parseContent('projects', new FormData()), /Preencha/);
  const form = project(); form.set('slug', '../admin'); assert.throws(() => parseContent('projects', form), /hífens/);
  form.set('slug', 'valido'); form.set('summary', 'a'.repeat(1001)); assert.throws(() => parseContent('projects', form), /limite/);
});
test('validates every external content URL on the server', () => {
  const form = project(); form.set('cover_url', 'javascript:alert(1)');
  assert.throws(() => parseContent('projects', form), /URL/);
});
test('validates publication years and DOI identifiers', () => {
  const form = new FormData(); form.set('title', 'Artigo'); form.set('published_year', '2025.5');
  assert.throws(() => parseContent('publications', form), /ano/);
  form.set('published_year', '2025'); form.set('doi', 'https://doi.org/10.1234/a');
  assert.throws(() => parseContent('publications', form), /DOI/);
  form.set('doi', '10.1234/artigo'); assert.equal(parseContent('publications', form).published_year, 2025);
});
test('validates MIME type against file bytes and excludes SVG and HTML', () => {
  const bytes = new TextEncoder().encode('%PDF-1.7 example');
  assert.equal(fileExtension(bytes, 'application/pdf'), 'pdf');
  assert.equal(fileExtension(bytes, 'image/png'), undefined);
  assert.equal(fileExtension(new TextEncoder().encode('<svg/>'), 'image/svg+xml'), undefined);
  assert.equal(fileExtension(new TextEncoder().encode('<html>'), 'application/pdf'), undefined);
  assert.equal(fileExtension(new Uint8Array([137,80,78,71,13,10,26,10]), 'image/png'), 'png');
});
test('only actual content sections can be addressed', () => {
  assert.equal(isSection('projects'), true);
  for (const value of ['admin_users', '__proto__', 'constructor', 'toString']) assert.equal(isSection(value), false);
});

test('database diagnostics distinguish missing schema from insufficient privileges', () => {
  for (const code of ['PGRST204', 'PGRST205', '42703', '42P01']) {
    assert.match(databaseErrorMessage({ code }), /schema.sql/);
    assert.ok(databaseErrorMessage({ code }).includes(code));
  }
  assert.match(databaseErrorMessage({ code: '42501' }), /permissão/);
  assert.match(databaseErrorMessage({ code: '23505' }), /slug/);
  assert.match(databaseErrorMessage({ code: 'PGRST301' }), /sessão/);
  assert.match(databaseErrorMessage({ code: 'PGRST116' }), /não foi encontrado/);
  assert.ok(!databaseErrorMessage({ code: '<secret>' }).includes('<secret>'));
});

test('gallery validates links, descriptions, captions and image count', () => {
  const photo = { url: 'https://example.org/photo.jpg', alt: ' Protótipo montado ', caption: ' Primeiro teste ' };
  assert.deepEqual(parseProjectGallery(JSON.stringify([photo])), [{ ...photo, alt: 'Protótipo montado', caption: 'Primeiro teste' }]);
  for (const input of ['invalid JSON', '{}', JSON.stringify(Array(21).fill(photo)), JSON.stringify([{ ...photo, url: 'javascript:alert(1)' }]), JSON.stringify([{ ...photo, alt: '' }]), JSON.stringify([{ ...photo, caption: 'a'.repeat(501) }]), JSON.stringify([{ ...photo, alt: 'a'.repeat(201) }])]) {
    assert.throws(() => parseProjectGallery(input));
  }
  assert.deepEqual(parseProjectGallery('[]'), []);
  assert.deepEqual(parseProjectGallery(JSON.stringify([{ ...photo, published: true }]))[0], { ...photo, alt: 'Protótipo montado', caption: 'Primeiro teste' });
});

test('older forms do not clear galleries; an explicit empty gallery removes all photos', () => {
  const form = project();
  assert.ok(!Object.hasOwn(parseContent('projects', form), 'gallery'));
  form.set('gallery', '[]');
  assert.deepEqual(parseContent('projects', form).gallery, []);
  form.set('gallery', JSON.stringify([{ url: 'https://example.org/prototipo.jpg', alt: 'Protótipo', caption: '' }]));
  assert.equal((parseContent('projects', form).gallery as { alt: string }[])[0].alt, 'Protótipo');
});
