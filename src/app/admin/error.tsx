'use client';
import Link from 'next/link';
export default function AdminError({ reset }: { reset: () => void }) {
  return <main className="page-shell"><h1 className="page-title">Não foi possível acessar este conteúdo</h1><p className="mt-5 text-slate-300">Confirme sua autorização administrativa e a configuração do Supabase. Nenhuma alteração foi confirmada nesta tela.</p><div className="flex flex-wrap gap-4 mt-7"><button className="button-primary" onClick={reset}>Tentar novamente</button><Link className="button-secondary" href="/admin">Voltar ao painel</Link><Link className="button-secondary" href="/admin/login">Entrar novamente</Link></div></main>;
}
