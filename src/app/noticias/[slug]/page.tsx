import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsItem } from '@/lib/data';
import { safeUrl } from '@/lib/validation';
import { Cover, TextContent, formatDate } from '@/components/content';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getNewsItem((await params).slug);
  if (!item) return { title: 'Notícia não encontrada' };
  return { title: item.title, description: item.summary || undefined, alternates: { canonical: `/noticias/${item.slug}` }, openGraph: { title: item.title, description: item.summary || undefined, type: 'article', publishedTime: item.published_at || undefined, images: safeUrl(item.cover_url) ? [item.cover_url!] : [] } };
}
export default async function NewsDetail({ params }: Props) {
  const item = await getNewsItem((await params).slug);
  if (!item) notFound();
  return <main className="page-shell max-w-4xl"><Link href="/noticias" className="text-blue-300">← Todas as notícias</Link><article className="mt-8"><p className="text-slate-400">{formatDate(item.published_at)}</p><h1 className="page-title mt-3">{item.title}</h1><p className="text-xl text-slate-400 mt-5 mb-8">{item.summary}</p>{item.cover_url && <Cover url={item.cover_url} title={item.title} />}<div className="mt-8"><TextContent text={item.body} /></div></article></main>;
}
