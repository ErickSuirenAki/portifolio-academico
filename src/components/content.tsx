import Link from 'next/link';
import { Layers3 } from 'lucide-react';
import { safeUrl } from '@/lib/validation';
import type { Project } from '@/lib/models';

export function Cover({ url, title }: { url: string | null; title: string }) {
  const src = safeUrl(url);
  return src ? <img src={src} alt={title} className="w-full aspect-video rounded-xl object-cover bg-slate-900" loading="lazy" referrerPolicy="no-referrer" />
    : <div aria-hidden="true" className="aspect-video rounded-xl bg-gradient-to-br from-blue-900/70 to-slate-950 flex items-center justify-center"><Layers3 size={46} className="text-blue-300" /></div>;
}
export function ProjectCard({ project }: { project: Project }) {
  return <article className="glass rounded-2xl p-6 flex flex-col hover:border-blue-500/60 transition">
    <Cover url={project.cover_url} title={project.title} /><p className="eyebrow mt-6">{project.category || 'Pesquisa e desenvolvimento'}</p>
    <h2 className="text-xl font-bold mt-2"><Link href={`/projetos/${project.slug}`}>{project.title}</Link></h2>
    <p className="text-slate-400 text-sm mt-3 leading-relaxed">{project.summary}</p>
    <div className="flex flex-wrap gap-2 mt-5">{project.tags?.map(tag => <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">{tag}</span>)}</div>
    <Link href={`/projetos/${project.slug}`} className="text-blue-300 mt-auto pt-6 text-sm">Conhecer projeto ↗<span className="sr-only">: {project.title}</span></Link>
  </article>;
}
export function TextContent({ text }: { text: string | null }) {
  return <div className="whitespace-pre-wrap break-words leading-relaxed text-slate-300">{text}</div>;
}
export function EmptyState({ children }: { children: React.ReactNode }) { return <p className="empty-state">{children}</p>; }
export function formatDate(value: string | null) {
  if (!value) return '';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'America/Porto_Velho' }).format(new Date(value));
}
