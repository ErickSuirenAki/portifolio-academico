const { test } = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');
const path = require('node:path');

let scenario;
let mutations;
const user = { id: '10000000-0000-4000-8000-000000000001' };
const sb = {
  auth: { getUser: async () => ({ data: { user: scenario.user }, error: scenario.authError || null }) },
  from(table) {
    if (table === 'profile' && scenario.photoStore) {
      const store = scenario.photoStore;
      function write(values, insert) {
        mutations++;
        store.payload = values;
        const result = { select: () => ({ single: async () => {
          store.profile = insert ? { ...values } : { ...store.profile, ...values };
          return { data: { id: 1 }, error: null };
        } }) };
        return insert ? result : { eq: () => result };
      }
      return {
        select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: store.profile ? { id: 1 } : null, error: null }) }) }),
        update: values => write(values, false), insert: values => write(values, true),
      };
    }
    if (table !== 'admin_users') { mutations++; throw new Error('Unexpected content access'); }
    return { select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: scenario.admin, error: scenario.membershipError || null }) }) }) };
  },
  storage: { from() { mutations++; throw new Error('Unexpected storage access'); } },
};
const redirect = url => { throw new Error(`REDIRECT:${url}`); };
const load = Module._load;
let requireAdmin;
let actions;
let lattesActions;
let photoActions;
let homeActions;
try {
  Module._load = function (request, parent, isMain) {
    if (request === 'server-only') return {};
    if (request === 'next/navigation') return { redirect };
    if (request === 'next/cache') return { revalidatePath() {} };
    if (request === '@/lib/supabase') return {
      isSupabaseConfigured: () => scenario.configured,
      supabaseServer: async () => sb,
    };
    if (request === '@/lib/admin') return { requireAdmin };
    if (request === '@/lib/data') return { defaultProfile: require('../src/lib/lattes-content.ts').lattesProfile };
    if (request.startsWith('@/lib/')) return load.call(this, path.resolve(__dirname, '../src/lib', request.slice(6) + '.ts'), parent, isMain);
    return load.call(this, request, parent, isMain);
  };
  ({ requireAdmin } = require('../src/lib/admin.ts'));
  actions = require('../src/app/admin/actions.ts');
  lattesActions = require('../src/app/admin/importar-lattes/actions.ts');
  photoActions = require('../src/app/admin/foto/actions.ts');
  homeActions = require('../src/app/admin/inicio/actions.ts');
} finally { Module._load = load; }

test('administration refuses missing configuration, signed-out users and non-admin accounts', async () => {
  scenario = { configured: false };
  await assert.rejects(requireAdmin, /Configure o Supabase/);
  scenario = { configured: true, user: null };
  await assert.rejects(requireAdmin, /REDIRECT:\/admin\/login/);
  scenario = { configured: true, user, admin: null };
  await assert.rejects(requireAdmin, /sem autorização/);
  scenario = { configured: true, user, membershipError: { message: 'database unavailable' } };
  await assert.rejects(requireAdmin, /verificar a autorização/);
});
test('administration accepts a verified account with an admin membership', async () => {
  scenario = { configured: true, user, admin: { user_id: user.id } };
  assert.deepEqual(await requireAdmin(), { sb, user });
});
test('save, deletion and upload recheck permissions before any mutation', async () => {
  for (const currentUser of [null, user]) {
    scenario = { configured: true, user: currentUser, admin: null }; mutations = 0;
    await assert.rejects(() => actions.saveContent('projects', 'novo', {}, new FormData()));
    await assert.rejects(() => actions.deleteContent('projects', user.id));
    await assert.rejects(() => actions.uploadFile(new FormData()));
    await assert.rejects(() => lattesActions.importLattes({}, new FormData()));
    await assert.rejects(() => photoActions.saveHomePhoto({}, new FormData()));
    await assert.rejects(() => homeActions.saveHomeSettings({}, new FormData()));
    assert.equal(mutations, 0);
  }
});

test('image upload fields reject PDF content and PDF fields reject images before storage', async () => {
  scenario = { configured: true, user, admin: { user_id: user.id } }; mutations = 0;
  const imageField = new FormData();
  imageField.set('kind', 'image');
  imageField.set('file', new File(['%PDF-1.7'], 'document.pdf', { type: 'application/pdf' }));
  assert.match((await actions.uploadFile(imageField)).error, /somente imagens/);
  const pdfField = new FormData();
  pdfField.set('kind', 'pdf');
  pdfField.set('file', new File([new Uint8Array([137,80,78,71,13,10,26,10])], 'image.png', { type: 'image/png' }));
  assert.match((await actions.uploadFile(pdfField)).error, /somente arquivos PDF/);
  assert.equal(mutations, 0);
});

test('home photo saves and removes only the photo of an existing profile', async () => {
  const store = { profile: { id: 1, display_name: 'Nome personalizado', biography: 'Texto personalizado', photo_url: null } };
  scenario = { configured: true, user, admin: { user_id: user.id }, photoStore: store }; mutations = 0;
  const form = new FormData(); form.set('photo_url', 'https://example.org/foto.jpg');
  assert.ok((await photoActions.saveHomePhoto({}, form)).success);
  assert.deepEqual(store.payload, { photo_url: 'https://example.org/foto.jpg' });
  assert.equal(store.profile.biography, 'Texto personalizado');
  assert.equal(store.profile.display_name, 'Nome personalizado');
  form.set('photo_url', '');
  assert.ok((await photoActions.saveHomePhoto({}, form)).success);
  assert.equal(store.profile.photo_url, null);
});
test('home photo refuses active URLs and creates a complete profile when none exists', async () => {
  const store = { profile: null };
  scenario = { configured: true, user, admin: { user_id: user.id }, photoStore: store }; mutations = 0;
  const form = new FormData(); form.set('photo_url', 'javascript:alert(1)');
  assert.ok((await photoActions.saveHomePhoto({}, form)).error);
  assert.equal(mutations, 0);
  form.set('photo_url', 'https://example.org/foto.jpg');
  assert.ok((await photoActions.saveHomePhoto({}, form)).success);
  assert.equal(store.profile.photo_url, 'https://example.org/foto.jpg');
  assert.equal(store.profile.display_name, 'Erick Batista dos Santos');
});
