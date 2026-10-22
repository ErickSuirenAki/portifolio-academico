import type { SupabaseClient } from '@supabase/supabase-js';
import type { Profile } from './models';
import { lattesProfile, lattesProjects, lattesPublications } from './lattes-content';
import { databaseErrorMessage } from './database-error';

export function normalizeTitle(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Only the original starter values and blank fields may be replaced automatically.
const starterProfile: Record<string, string> = {
  display_name: 'Erick Batista',
  biography: 'Estudante de Ciência da Computação na Universidade Federal de Rondônia. Desenvolvo projetos e exploro novas possibilidades em inteligência artificial, IoT e sistemas computacionais.',
  formation: 'Ciência da Computação — Universidade Federal de Rondônia',
  lattes_url: 'http://lattes.cnpq.br/1145013876792671',
};
export function profileImportPatch(existing: Partial<Profile> | null) {
  const patch: Record<string, string> = {};
  for (const [key, value] of Object.entries(lattesProfile)) {
    if (key === 'id' || typeof value !== 'string' || !value.trim()) continue;
    const previous = existing?.[key as keyof Profile];
    if (previous === null || previous === undefined || (typeof previous === 'string' && !previous.trim()) || previous === starterProfile[key]) {
      if (previous !== value) patch[key] = value;
    }
  }
  return patch;
}

type Result = { projects: number; publications: number; profileUpdated: boolean; error?: string };
export async function importLattesContent(sb: SupabaseClient, published: boolean): Promise<Result> {
  const result: Result = { projects: 0, publications: 0, profileUpdated: false };
  // Check all expected columns before writing and paginate to avoid overlooking existing titles.
  async function existingRecords(table: 'projects' | 'publications', columns: string) {
    const records: Record<string, unknown>[] = [];
    for (let offset = 0; ; offset += 500) {
      const { data, error } = await sb.from(table).select(columns).order('id').range(offset, offset + 499);
      if (error) throw new Error(databaseErrorMessage(error, 'ler os registros existentes'));
      const page = data as unknown as Record<string, unknown>[];
      records.push(...page);
      if (page.length < 500) return records;
    }
  }
  try {
    const [projects, publications, profileResponse] = await Promise.all([
      existingRecords('projects', 'id,slug,title,category,tags,project_url'),
      existingRecords('publications', 'id,title,authors,venue,published_year,doi,pdf_url'),
      sb.from('profile').select(Object.keys(lattesProfile).join(',')).eq('id', 1).maybeSingle(),
    ]);
    if (profileResponse.error) throw new Error(databaseErrorMessage(profileResponse.error, 'ler o perfil'));
    const profile = profileResponse.data as unknown as Profile | null;
    const patch = profileImportPatch(profile);
    if (Object.keys(patch).length) {
      if (!profile) {
        const { data, error } = await sb.from('profile').upsert({ id: 1, ...patch }, { onConflict: 'id', ignoreDuplicates: true }).select('id');
        if (error) throw new Error(databaseErrorMessage(error));
        result.profileUpdated = Boolean(data?.length);
      } else {
        let query = sb.from('profile').update(patch).eq('id', 1);
        // A simultaneous edit must never be silently overwritten.
        for (const key of Object.keys(patch)) {
          const value = profile[key as keyof Profile];
          query = value === null ? query.is(key, null) : query.eq(key, value);
        }
        const { data, error } = await query.select('id');
        if (error) throw new Error(databaseErrorMessage(error));
        if (!data?.length) throw new Error('O perfil foi alterado durante a importação. Tente novamente para preservar as edições mais recentes.');
        result.profileUpdated = true;
      }
    }
    const slugs = new Set(projects.map(item => item.slug));
    const projectTitles = new Set(projects.map(item => normalizeTitle(String(item.title))));
    const newProjects = lattesProjects.filter(item => !slugs.has(item.slug) && !projectTitles.has(normalizeTitle(item.title)));
    if (newProjects.length) {
      const { data, error } = await sb.from('projects').upsert(newProjects.map(item => ({ ...item, published })), { onConflict: 'slug', ignoreDuplicates: true }).select('id');
      if (error) throw new Error(databaseErrorMessage(error));
      result.projects = data?.length || 0;
    }
    const publicationKeys = new Set(publications.map(item => `${normalizeTitle(String(item.title))}:${item.published_year}`));
    const newPublications = lattesPublications.filter(item => !publicationKeys.has(`${normalizeTitle(item.title)}:${item.published_year}`));
    if (newPublications.length) {
      const { data, error } = await sb.from('publications').upsert(newPublications.map(item => ({ ...item, published })), { onConflict: 'id', ignoreDuplicates: true }).select('id');
      if (error) throw new Error(databaseErrorMessage(error));
      result.publications = data?.length || 0;
    }
  } catch (error) {
    result.error = error instanceof Error ? error.message : 'A importação não foi concluída. Tente novamente.';
  }
  return result;
}
