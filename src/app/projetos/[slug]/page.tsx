import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/data';
import { safeUrl } from '@/lib/validation';
import { Cover, TextContent } from '@/components/content';
import { ProjectGallery } from '@/components/project-gallery';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return { title: 'Projeto não encontrado' };
  return { title: project.title, description: project.summary || undefined, alternates: { canonical: `/projetos/${project.slug}` }, openGraph: { title: project.title, description: project.summary || undefined, type: 'article', images: safeUrl(project.cover_url) ? [project.cover_url!] : [] } };
}
export default async function ProjectDetail({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  const url = safeUrl(project.project_url);
  return <main className="page-shell max-w-4xl"><Link className="text-blue-300" href="/projetos">← Todos os projetos</Link><article className="mt-8"><p className="eyebrow">{project.category}</p><h1 className="page-title mt-3">{project.title}</h1><p className="text-xl text-slate-400 mt-5">{project.summary}</p><div className="flex flex-wrap gap-2 my-6">{project.tags?.map(tag => <span key={tag} className="rounded bg-slate-800 px-3 py-1 text-sm">{tag}</span>)}</div>{project.cover_url && <Cover url={project.cover_url} title={project.title} />}<div className="mt-8"><TextContent text={project.body} /></div>{url && <a className="button-primary inline-block mt-8" href={url} target="_blank" rel="noopener noreferrer">Acessar projeto ↗</a>}<ProjectGallery images={project.gallery} title={project.title} /></article></main>;
}
