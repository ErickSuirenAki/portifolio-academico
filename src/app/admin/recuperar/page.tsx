import { AuthForm } from '@/components/auth-form';
export const metadata = { title: 'Recuperar senha', robots: { index: false, follow: false } };
export default async function Recover({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  return <main className="max-w-md mx-auto px-6 py-20"><h1 className="text-3xl font-bold">Recuperar senha</h1><p className="mt-4 text-slate-400">Receba um link por e-mail para criar uma nova senha.</p>{erro && <p role="alert" className="mt-5 text-amber-300">Link inválido ou expirado. Solicite um novo link e abra neste navegador.</p>}<AuthForm mode="recover" /></main>;
}
