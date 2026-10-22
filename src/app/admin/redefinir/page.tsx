import { redirect } from 'next/navigation';
import { AuthForm } from '@/components/auth-form';
import { isSupabaseConfigured, supabaseServer } from '@/lib/supabase';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Nova senha', robots: { index: false, follow: false } };
export default async function Reset() {
  if (!isSupabaseConfigured()) redirect('/admin/recuperar');
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect('/admin/recuperar?erro=link');
  return <main className="max-w-md mx-auto px-6 py-20"><h1 className="text-3xl font-bold">Definir nova senha</h1><p className="mt-4 text-slate-400">Use pelo menos oito caracteres.</p><AuthForm mode="reset" /></main>;
}
