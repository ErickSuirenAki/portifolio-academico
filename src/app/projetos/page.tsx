import { getProjects } from '@/lib/data';
import { ProjectCard, EmptyState } from '@/components/content';
export const metadata = { title: 'Projetos', description: 'Projetos de pesquisa, desenvolvimento e experimentação.', alternates: { canonical: '/projetos' } };
export default async function Projects() {
  const projects = await getProjects();
  return <main className="page-shell"><p className="eyebrow">Portfólio</p><h1 className="page-title mt-3">Projetos</h1><p className="text-slate-400 mt-4">Pesquisa, desenvolvimento e experimentação.</p><div className="grid md:grid-cols-2 gap-5 mt-10">{projects.map(project => <ProjectCard key={project.id} project={project} />)}</div>{!projects.length && <EmptyState>Novos projetos serão publicados em breve.</EmptyState>}</main>;
}
