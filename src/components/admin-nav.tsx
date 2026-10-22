import Link from 'next/link';
import { sections } from '@/lib/models';
import { logout } from '@/app/admin/auth-actions';

export function AdminNav() {
  return <nav aria-label="Painel administrativo" className="mb-10 flex flex-wrap items-center gap-3 border-b border-slate-700 pb-5">
    <Link className="button-secondary" href="/admin">Visão geral</Link>
    {Object.entries(sections).map(([key, section]) => <Link className="button-secondary" key={key} href={`/admin/${key}`}>{section.label}</Link>)}
    <Link className="button-secondary" href="/admin/inicio">Página inicial</Link>
    <Link className="button-secondary" href="/admin/foto">Foto do início</Link>
    <Link className="button-secondary" href="/admin/importar-lattes">Importar Lattes</Link>
    <form action={logout}><button className="button-secondary" type="submit">Sair da conta</button></form>
  </nav>;
}
