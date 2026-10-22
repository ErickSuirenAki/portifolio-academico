import Link from 'next/link';
import { AdminNav } from '@/components/admin-nav';
import { databaseErrorMessage } from '@/lib/database-error';

export function AdminDatabaseError({ error }: { error: { code?: string } }) {
  return <main className="page-shell">
    <AdminNav />
    <h1 className="page-title">Não foi possível carregar o conteúdo</h1>
    <p role="alert" className="mt-6 rounded-xl border border-amber-700 p-5 text-amber-200">{databaseErrorMessage(error, 'carregar o conteúdo')}</p>
    <Link href="/admin" className="button-secondary inline-block mt-6">Voltar ao painel</Link>
  </main>;
}
