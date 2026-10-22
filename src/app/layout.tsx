import type { Metadata } from 'next';
import Link from 'next/link';
import { siteUrl } from '@/lib/site';
import './globals.css';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: 'Erick | Pesquisa e Tecnologia', template: '%s | Erick' },
  description: 'Projetos, pesquisas e descobertas de Erick em robótica, Internet das Coisas e desenvolvimento de software.',
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Erick', title: 'Erick | Pesquisa e Tecnologia', description: 'Projetos, pesquisas e descobertas em robótica, Internet das Coisas e desenvolvimento de software.' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><div className="min-h-screen glow"><header className="mx-auto max-w-6xl px-6 py-6 flex flex-wrap gap-5 items-center justify-between"><Link href="/" className="font-bold tracking-tight text-lg">erick<span className="text-blue-400">.dev</span></Link><nav aria-label="Menu principal" className="flex flex-wrap gap-4 text-sm text-slate-300"><Link href="/projetos">Projetos</Link><Link href="/publicacoes">Publicações</Link><Link href="/noticias">Notícias</Link><Link href="/trajetoria">Trajetória</Link><Link href="/sobre">Sobre</Link></nav></header><div id="conteudo" tabIndex={-1}>{children}</div><footer className="max-w-6xl mx-auto px-6 py-10 mt-20 border-t border-slate-800 text-sm text-slate-400 flex flex-wrap justify-between gap-4"><p>© {new Date().getFullYear()} Erick · Pesquisa, tecnologia e inovação.</p><Link href="/admin">Administração</Link></footer></div></body></html>;
}
