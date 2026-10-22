import { requireAdmin } from '@/lib/admin';
import { lattesSource, lattesProfile, lattesProjects, lattesPublications } from '@/lib/lattes-content';
import { AdminNav } from '@/components/admin-nav';
import { LattesImportForm } from '@/components/lattes-import-form';
import { TextContent } from '@/components/content';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Importar currículo Lattes', robots: { index: false, follow: false } };

export default async function ImportLattesPage() {
  await requireAdmin();
  return <main className="page-shell"><AdminNav /><p className="eyebrow">Currículo acadêmico</p><h1 className="page-title mt-3">Importar dados do Lattes</h1><p className="mt-4 text-slate-400">{lattesProfile.display_name} · Currículo atualizado em 11/10/2026, exportado em 21/10/2026.</p><p className="mt-3 text-sm text-slate-400">Conteúdo organizado a partir do PDF fornecido. As seções repetidas foram unificadas. O arquivo original, endereço e telefone não serão publicados. O link do GitHub foi mantido da configuração do projeto.</p><div className="grid sm:grid-cols-3 gap-4 my-8">{[`${lattesProjects.length} projetos e trabalhos`, `${lattesPublications.length} publicações`, 'Formação, eventos e premiações'].map(label => <p key={label} className="glass p-5 rounded-xl">{label}</p>)}</div><LattesImportForm />
    <section className="mt-12"><h2 className="text-2xl font-bold mb-5">Prévia do conteúdo</h2><details className="glass rounded-xl p-6 mb-4"><summary className="cursor-pointer font-bold">Biografia e trajetória</summary><div className="mt-5 space-y-6"><TextContent text={lattesProfile.biography} />{[{ title: 'Formação e idiomas', text: lattesProfile.formation }, { title: 'Experiências', text: lattesProfile.experience }, { title: 'Eventos e apresentações', text: lattesProfile.events }, { title: 'Premiações', text: lattesProfile.awards }].map(item => <section key={item.title}><h3 className="text-xl font-bold mb-3">{item.title}</h3><TextContent text={item.text} /></section>)}</div></details>
      <details className="glass rounded-xl p-6 mb-4"><summary className="cursor-pointer font-bold">Projetos e trabalhos ({lattesProjects.length})</summary><div className="mt-5 space-y-8">{lattesProjects.map(item => <article key={item.slug}><p className="eyebrow">{item.category}</p><h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3><TextContent text={item.body} /></article>)}</div></details>
      <details className="glass rounded-xl p-6"><summary className="cursor-pointer font-bold">Publicações ({lattesPublications.length})</summary><div className="mt-5 space-y-6">{lattesPublications.map(item => <article key={item.id}><h3 className="text-xl font-bold">{item.title}</h3><p className="mt-2 text-slate-300">{item.authors}</p><p className="mt-2 text-slate-400">{item.venue} {item.published_year}.</p></article>)}</div></details>
    </section><a className="inline-block text-blue-300 mt-8" href={lattesSource.url} target="_blank" rel="noopener noreferrer">Consultar currículo na Plataforma Lattes ↗</a>
  </main>;
}
