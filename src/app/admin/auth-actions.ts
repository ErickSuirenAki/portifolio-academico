'use server';
import { redirect } from 'next/navigation';
import { isSupabaseConfigured, supabaseServer } from '@/lib/supabase';
import { siteUrl } from '@/lib/site';
import type { ActionState } from '@/lib/models';

export async function login(_state: ActionState, form: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured()) return { error: 'Configure as variáveis do Supabase em .env.local.' };
  const email = String(form.get('email') || '').trim();
  const password = String(form.get('password') || '');
  if (!email || !password) return { error: 'Preencha o e-mail e a senha.' };
  const sb = await supabaseServer();
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { error: 'Não foi possível entrar. Verifique as credenciais e tente novamente.' };
  redirect('/admin');
}
export async function logout() {
  if (isSupabaseConfigured()) {
    const sb = await supabaseServer();
    const { error } = await sb.auth.signOut();
    if (error) throw new Error('Não foi possível encerrar a sessão. Tente novamente.');
  }
  redirect('/admin/login');
}
export async function recoverPassword(_state: ActionState, form: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured()) return { error: 'Configure o Supabase para recuperar sua senha.' };
  const email = String(form.get('email') || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Informe um e-mail válido.' };
  const sb = await supabaseServer();
  const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: new URL('/auth/callback', siteUrl()).href });
  if (error) return { error: 'Não foi possível solicitar a recuperação. Tente novamente mais tarde.' };
  return { success: 'Se houver uma conta com esse e-mail, você receberá um link para redefinir a senha. Abra o link neste navegador.' };
}
export async function resetPassword(_state: ActionState, form: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured()) return { error: 'Supabase não configurado.' };
  const password = String(form.get('password') || '');
  if (password.length < 8 || password.length > 128) return { error: 'Use uma senha entre 8 e 128 caracteres.' };
  if (password !== form.get('confirmation')) return { error: 'As senhas não coincidem.' };
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { error: 'O link expirou. Solicite um novo link de recuperação.' };
  const { error } = await sb.auth.updateUser({ password });
  if (error) return { error: 'Não foi possível alterar a senha. Verifique os requisitos da conta ou solicite outro link.' };
  await sb.auth.signOut();
  redirect('/admin/login?senha=alterada');
}
