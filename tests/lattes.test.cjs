const { test } = require('node:test');
const assert = require('node:assert/strict');
const { lattesProfile, lattesProjects, lattesPublications } = require('../src/lib/lattes-content.ts');
const { normalizeTitle, profileImportPatch, importLattesContent } = require('../src/lib/lattes-import.ts');
const { parseContent } = require('../src/lib/validation.ts');

function database(initial = {}, failures = {}) {
  const tables = { projects: [], publications: [], profile: [], ...structuredClone(initial) };
  let writes = 0;
  const sb = {
    from(table) {
      let operation = 'read', payload, conflict, filters = [], start = 0, end = Infinity;
      const query = {
        select() { return query; }, order() { return query; },
        eq(key, value) { filters.push(row => row[key] === value); return query; },
        is(key, value) { return query.eq(key, value); },
        range(first, last) { start = first; end = last; return query; },
        upsert(values, options) { operation = 'insert'; payload = values; conflict = options.onConflict; return query; },
        update(values) { operation = 'update'; payload = values; return query; },
        async maybeSingle() { const result = await execute(); return { ...result, data: result.data?.[0] || null }; },
        then(resolve, reject) { return execute().then(resolve, reject); },
      };
      async function execute() {
        if (failures[`${table}:${operation}`]) return { data: null, error: { code: failures[`${table}:${operation}`] } };
        if (operation === 'read') return { data: structuredClone(tables[table].filter(row => filters.every(matches => matches(row))).slice(start, end + 1)), error: null };
        writes++;
        const changed = [];
        if (operation === 'insert') {
          for (const row of Array.isArray(payload) ? payload : [payload]) {
            if (tables[table].some(existing => existing[conflict] === row[conflict])) continue;
            const value = { id: `${table}-${tables[table].length}`, ...structuredClone(row) };
            tables[table].push(value); changed.push(value);
          }
        } else {
          for (const row of tables[table]) if (filters.every(matches => matches(row))) {
            Object.assign(row, structuredClone(payload)); changed.push(row);
          }
        }
        return { data: structuredClone(changed), error: null };
      }
      return query;
    },
  };
  return { sb, tables, writes: () => writes };
}

test('Lattes content validates against the existing editor model and distinguishes publication types', () => {
  assert.equal(lattesProjects.length, 15);
  assert.equal(lattesPublications.length, 4);
  assert.equal(new Set(lattesProjects.map(row => row.slug)).size, 15);
  for (const [section, rows] of [['projects', lattesProjects], ['publications', lattesPublications], ['profile', [lattesProfile]]]) {
    for (const row of rows) {
      const form = new FormData();
      for (const [key, value] of Object.entries(row)) if (value != null) form.set(key, Array.isArray(value) ? value.join(', ') : String(value));
      assert.doesNotThrow(() => parseContent(section, form));
    }
  }
  assert.equal(lattesPublications.filter(row => row.venue.startsWith('Capítulo')).length, 2);
  assert.equal(lattesPublications.filter(row => row.venue.startsWith('Resumo')).length, 2);
  assert.ok(lattesPublications.every(row => !row.doi && !row.pdf_url));
  assert.ok(!lattesPublications.some(row => row.title.includes('OpenGL')));
});

test('profile fills blanks and starter copy while preserving custom biography, photo and links', () => {
  const patch = profileImportPatch({ display_name: 'Erick Batista', biography: 'Minha biografia personalizada', formation: '   ', photo_url: 'https://example.org/photo.jpg', github_url: 'https://github.com/meu-perfil' });
  assert.equal(patch.display_name, lattesProfile.display_name);
  assert.equal(patch.formation, lattesProfile.formation);
  assert.equal(patch.biography, undefined);
  assert.equal(patch.photo_url, undefined);
  assert.equal(patch.github_url, undefined);
});

test('import can be repeated without duplicate rows or overwriting custom records', async () => {
  const original = { id: 'original', slug: 'personalizado', title: lattesProjects[0].title.toUpperCase(), body: 'Meu texto', published: false };
  const db = database({ projects: [original], publications: [{ ...lattesPublications[0], id: 'custom-publication', title: lattesPublications[0].title.toUpperCase() }], profile: [{ ...lattesProfile, biography: 'Biografia própria' }] });
  const first = await importLattesContent(db.sb, false);
  assert.equal(first.error, undefined);
  assert.equal(first.projects, 14); assert.equal(first.publications, 3);
  assert.equal(db.tables.profile[0].biography, 'Biografia própria');
  assert.deepEqual(db.tables.projects[0], original);
  assert.ok(db.tables.projects.every(row => row.published === false));
  const writes = db.writes();
  const second = await importLattesContent(db.sb, true);
  assert.deepEqual(second, { projects: 0, publications: 0, profileUpdated: false });
  assert.equal(db.writes(), writes);
  assert.ok(db.tables.projects.every(row => row.published === false));
});

test('preflight fails before writing when schema is incomplete', async () => {
  const db = database({}, { 'projects:read': 'PGRST204' });
  const result = await importLattesContent(db.sb, true);
  assert.match(result.error, /schema.sql/);
  assert.equal(db.writes(), 0);
});

test('partial import reports its progress and retry only inserts remaining records', async () => {
  const failures = { 'publications:insert': '42501' };
  const db = database({}, failures);
  const first = await importLattesContent(db.sb, true);
  assert.match(first.error, /permissão/);
  assert.equal(first.projects, 15);
  assert.equal(first.publications, 0);
  assert.equal(first.profileUpdated, true);
  delete failures['publications:insert'];
  const retry = await importLattesContent(db.sb, true);
  assert.deepEqual(retry, { projects: 0, publications: 4, profileUpdated: false });
  assert.equal(db.tables.projects.length, 15);
});

test('existing titles beyond the first page are respected', async () => {
  const projects = Array.from({ length: 500 }, (_, i) => ({ id: String(i), slug: `existing-${i}`, title: `Projeto ${i}` }));
  projects.push({ id: '501', slug: 'outro-slug', title: lattesProjects[0].title });
  const db = database({ projects });
  const result = await importLattesContent(db.sb, true);
  assert.equal(result.error, undefined);
  assert.equal(result.projects, 14);
});

test('title matching normalizes accents, punctuation and capitalization', () => {
  assert.equal(normalizeTitle('EDUCAÇÃO: ambiental!'), normalizeTitle('Educação ambiental'));
});
