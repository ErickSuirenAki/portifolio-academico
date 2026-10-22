import 'server-only';
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { lattesProfile, lattesProjects, lattesPublications } from '@/lib/lattes-content';
import { isSupabaseConfigured } from '@/lib/supabase';
import { defaultHomeSettings, type HomeSettings } from '@/lib/homepage';
import type { Project, Publication, News, Profile } from '@/lib/models';

export const defaultProfile: Profile = lattesProfile;

// Public reads deliberately use an anonymous client, independent of the admin session.
function publicClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });
}
function check(error: { message: string } | null) {
  if (error) {
    console.error('Falha na leitura pública do Supabase:', error.message);
    throw new Error('Não foi possível carregar o conteúdo. Tente novamente em instantes.');
  }
}
export const getProjects = cache(async (): Promise<Project[]> => {
  if (!isSupabaseConfigured()) return lattesProjects.map(project => ({
    ...project, id: project.slug, published: true, created_at: '',
  }));
  const { data, error } = await publicClient().from('projects').select('*').eq('published', true).order('created_at', { ascending: false });
  check(error); return (data || []) as Project[];
});
export const getProject = cache(async (slug: string): Promise<Project | null> => {
  if (!isSupabaseConfigured()) return (await getProjects()).find(p => p.slug === slug) || null;
  const { data, error } = await publicClient().from('projects').select('*').eq('published', true).eq('slug', slug).maybeSingle();
  check(error); return data as Project | null;
});
export const getNews = cache(async (): Promise<News[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await publicClient().from('news').select('*').eq('published', true).order('published_at', { ascending: false });
  check(error); return (data || []) as News[];
});
export const getNewsItem = cache(async (slug: string): Promise<News | null> => {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await publicClient().from('news').select('*').eq('published', true).eq('slug', slug).maybeSingle();
  check(error); return data as News | null;
});
export const getPublications = cache(async (): Promise<Publication[]> => {
  if (!isSupabaseConfigured()) return lattesPublications.map(item => ({ ...item, published: true, created_at: '' }));
  const { data, error } = await publicClient().from('publications').select('*').eq('published', true).order('published_year', { ascending: false, nullsFirst: false });
  check(error); return (data || []) as Publication[];
});
export const getProfile = cache(async (): Promise<Profile> => {
  if (!isSupabaseConfigured()) return defaultProfile;
  const { data, error } = await publicClient().from('profile').select('*').eq('id', 1).maybeSingle();
  check(error); return (data as Profile | null) || defaultProfile;
});

export const getHomeSettings = cache(async (): Promise<HomeSettings> => {
  if (!isSupabaseConfigured()) return defaultHomeSettings;
  const { data, error } = await publicClient().from('homepage').select('*').eq('id', 1).maybeSingle();
  // Keep the existing homepage available while the optional settings migration is pending.
  if (error && ['PGRST205', '42P01'].includes(error.code)) return defaultHomeSettings;
  check(error);
  return (data as HomeSettings | null) || defaultHomeSettings;
});
