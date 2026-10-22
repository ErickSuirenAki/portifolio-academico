import { AuthForm } from '@/components/auth-form';
export const metadata = { title: 'Acesso administrativo', robots: { index: false, follow: false } };
export default async function Login({ searchParams }: { searchParams: Promise<{ senha?: string }> }) {
  const { senha } = await searchParams;
  return <main className="max-w-md mx-auto px-6 py-20"><h1 className="text-3xl font-bold">Acesso administrativo</h1><p className="text-slate-400 mt-3">Área reservada ao responsável pelo portfólio.</p>{senha === 'alterada' && <p className="notice mt-6" role="status">Senha atualizada. Entre com sua nova senha.</p>}<AuthForm mode="login" /></main>;
}
