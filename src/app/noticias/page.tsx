import Link from 'next/link';
import { getNews } from '@/lib/data';
import { Cover, EmptyState, formatDate } from '@/components/content';
export const metadata = { title: 'Notícias', description: 'Atualizações de projetos, eventos e trajetória acadêmica.', alternates: { canonical: '/noticias' } };
export default async function NewsPage() {
  const news = await getNews();
  return <main className="page-shell"><h1 className="page-title">Notícias e atualizações</h1><p className="mt-4 text-slate-400">Projetos, eventos e trajetória acadêmica.</p><div className="grid md:grid-cols-2 gap-5 mt-10">{news.map(item => <article className="glass rounded-2xl p-6" key={item.id}><Cover url={item.cover_url} title={item.title} /><p className="text-sm text-slate-400 mt-5">{formatDate(item.published_at)}</p><h2 className="text-2xl font-bold mt-3"><Link href={`/noticias/${item.slug}`}>{item.title}</Link></h2><p className="mt-4 text-slate-300">{item.summary}</p><Link className="inline-block mt-6 text-blue-300" href={`/noticias/${item.slug}`}>Ler notícia →</Link></article>)}</div>{!news.length && <EmptyState>As próximas novidades serão publicadas aqui.</EmptyState>}</main>;
}
