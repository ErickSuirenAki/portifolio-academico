'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="page-shell"><h1 className="page-title">Conteúdo temporariamente indisponível</h1><p className="mt-5 text-slate-300">Não foi possível carregar esta página. Tente novamente em instantes.</p><button className="button-primary mt-7" onClick={reset}>Tentar novamente</button></main>;
}
