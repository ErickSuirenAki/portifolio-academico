import type { MetadataRoute } from 'next';
import { getProjects, getNews } from '@/lib/data';
import { siteUrl } from '@/lib/site';
export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, news] = await Promise.all([getProjects(), getNews()]);
  const paths = ['/', '/sobre', '/trajetoria', '/projetos', '/publicacoes', '/noticias', ...projects.map(p => `/projetos/${p.slug}`), ...news.map(n => `/noticias/${n.slug}`)];
  return paths.map(path => ({ url: new URL(path, siteUrl()).href }));
}
