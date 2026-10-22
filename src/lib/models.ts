export type Section = 'projects' | 'publications' | 'news' | 'profile';
export type ProjectImage = { url: string; alt: string; caption: string };
export type Project = {
  id: string; slug: string; title: string; summary: string | null; body: string | null;
  cover_url: string | null; category: string | null; tags: string[]; project_url: string | null;
  published: boolean; created_at: string;
  gallery?: ProjectImage[];
};
export type Publication = {
  id: string; title: string; authors: string | null; venue: string | null;
  published_year: number | null; doi: string | null; pdf_url: string | null;
  published: boolean; created_at: string;
};
export type News = {
  id: string; slug: string; title: string; summary: string | null; body: string | null;
  cover_url: string | null; published: boolean; published_at: string | null; created_at: string;
};
export type Profile = {
  id: number; display_name: string; biography: string | null; photo_url: string | null;
  lattes_url: string | null; github_url: string | null; formation: string | null;
  experience: string | null; events: string | null; awards: string | null;
};
export type ActionState = { error?: string; success?: string };
export type Field = { name: string; label: string; type?: 'text' | 'textarea' | 'url' | 'number' | 'image' | 'pdf' | 'gallery'; required?: boolean; maxLength?: number };
export const sections: Record<Section, { label: string; fields: Field[] }> = {
  projects: { label: 'Projetos', fields: [
    { name: 'title', label: 'Título', required: true },
    { name: 'slug', label: 'Endereço (slug)', required: true },
    { name: 'summary', label: 'Resumo', type: 'textarea', maxLength: 1000 },
    { name: 'body', label: 'Conteúdo completo', type: 'textarea' },
    { name: 'category', label: 'Categoria' }, { name: 'tags', label: 'Tecnologias, separadas por vírgula' },
    { name: 'cover_url', label: 'Imagem de capa', type: 'image' },
    { name: 'gallery', label: 'Fotos do projeto', type: 'gallery' },
    { name: 'project_url', label: 'Link do projeto ou repositório', type: 'url' },
  ] },
  publications: { label: 'Publicações', fields: [
    { name: 'title', label: 'Título', required: true }, { name: 'authors', label: 'Autores' },
    { name: 'venue', label: 'Revista, congresso ou instituição' },
    { name: 'published_year', label: 'Ano', type: 'number' },
    { name: 'doi', label: 'DOI (ex.: 10.1234/artigo)' },
    { name: 'pdf_url', label: 'PDF da publicação', type: 'pdf' },
  ] },
  news: { label: 'Notícias', fields: [
    { name: 'title', label: 'Título', required: true }, { name: 'slug', label: 'Endereço (slug)', required: true },
    { name: 'summary', label: 'Resumo', type: 'textarea', maxLength: 1000 },
    { name: 'body', label: 'Conteúdo completo', type: 'textarea' },
    { name: 'cover_url', label: 'Imagem de capa', type: 'image' },
  ] },
  profile: { label: 'Perfil acadêmico', fields: [
    { name: 'display_name', label: 'Nome', required: true },
    { name: 'biography', label: 'Biografia', type: 'textarea' },
    { name: 'photo_url', label: 'Foto da apresentação (início e Sobre)', type: 'image' },
    { name: 'lattes_url', label: 'Currículo Lattes', type: 'url' },
    { name: 'github_url', label: 'GitHub', type: 'url' },
    { name: 'formation', label: 'Formação acadêmica', type: 'textarea' },
    { name: 'experience', label: 'Experiências', type: 'textarea' },
    { name: 'events', label: 'Eventos e apresentações', type: 'textarea' },
    { name: 'awards', label: 'Premiações', type: 'textarea' },
  ] },
};
export function isSection(value: string): value is Section {
  return Object.hasOwn(sections, value);
}
