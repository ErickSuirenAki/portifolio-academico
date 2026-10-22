import { getPublications } from '@/lib/data';
import { safeUrl } from '@/lib/validation';
import { EmptyState } from '@/components/content';
export const metadata = { title: 'Publicações', description: 'Artigos, trabalhos apresentados e produções acadêmicas.', alternates: { canonical: '/publicacoes' } };
export default async function Publications() {
  const publications = await getPublications();
  return <main className="page-shell"><h1 className="page-title">Publicações científicas</h1><p className="text-slate-400 mt-4">Artigos, trabalhos apresentados e produções acadêmicas.</p><div className="mt-10 space-y-5">{publications.map(item => <article className="glass rounded-2xl p-7" key={item.id}><p className="eyebrow">{item.published_year || 'Produção acadêmica'}</p><h2 className="text-2xl font-bold mt-3">{item.title}</h2><p className="text-slate-300 mt-3">{item.authors}</p><p className="text-slate-400 mt-2">{item.venue}</p><div className="flex flex-wrap gap-4 mt-6">{item.doi && /^10\.\d{4,9}\/\S+$/.test(item.doi) && <a className="text-blue-300" href={`https://doi.org/${encodeURI(item.doi).replaceAll('#', '%23').replaceAll('?', '%3F')}`} target="_blank" rel="noopener noreferrer">DOI ↗</a>}{safeUrl(item.pdf_url) && <a className="text-blue-300" href={safeUrl(item.pdf_url)} target="_blank" rel="noopener noreferrer">Abrir PDF ↗</a>}</div></article>)}</div>{!publications.length && <EmptyState>As publicações serão disponibilizadas aqui em breve.</EmptyState>}</main>;
}
