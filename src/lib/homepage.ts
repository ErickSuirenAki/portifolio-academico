import type { Project, ProjectImage } from './models';
import { parseProjectGallery } from './validation';

export type HomeSettings = {
  id: number;
  featured_project_ids: string[];
  conference_photos: ProjectImage[];
  exchange_photos: ProjectImage[];
};
export const MAX_HOME_PHOTOS = 6;
export const defaultHomeSettings: HomeSettings = {
  id: 1, featured_project_ids: [], conference_photos: [], exchange_photos: [],
};

export function parseHomeSettings(form: FormData): HomeSettings {
  const raw = form.get('featured_project_ids');
  if (typeof raw !== 'string' || raw.length > 1000) throw new Error('A seleção de projetos está inválida.');
  let ids: unknown;
  try { ids = JSON.parse(raw); } catch { throw new Error('A seleção de projetos está inválida.'); }
  if (!Array.isArray(ids) || ids.length > 3 || ids.some(id => typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) || new Set(ids.map(id => typeof id === 'string' ? id.toLowerCase() : id)).size !== ids.length) {
    throw new Error('Escolha até três projetos diferentes para destacar.');
  }
  function gallery(name: string) {
    const value = form.get(name);
    if (typeof value !== 'string') throw new Error('As fotos da página inicial estão inválidas.');
    const images = parseProjectGallery(value);
    if (images.length > MAX_HOME_PHOTOS) throw new Error(`Use até ${MAX_HOME_PHOTOS} fotos por seção da página inicial.`);
    return images;
  }
  return { id: 1, featured_project_ids: ids.map(id => id.toLowerCase()), conference_photos: gallery('conference_photos'), exchange_photos: gallery('exchange_photos') };
}

export function selectFeaturedProjects(projects: Project[], ids: string[]): Project[] {
  const published = projects.filter(project => project.published);
  if (!ids.length) return published.slice(0, 3);
  return ids.slice(0, 3).map(id => published.find(project => project.id === id)).filter((project): project is Project => Boolean(project));
}
