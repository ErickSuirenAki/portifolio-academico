import Link from 'next/link';
export default function NotFound() {
  return <main className="page-shell"><p className="eyebrow">404</p><h1 className="page-title mt-3">Página não encontrada</h1><p className="text-slate-400 mt-5">O conteúdo pode ter sido removido ou ainda não estar publicado.</p><Link className="button-primary inline-block mt-7" href="/">Voltar ao início</Link></main>;
}
