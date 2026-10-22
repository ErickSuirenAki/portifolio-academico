'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { login, recoverPassword, resetPassword } from '@/app/admin/auth-actions';
import type { ActionState } from '@/lib/models';

export function AuthForm({ mode }: { mode: 'login' | 'recover' | 'reset' }) {
  const action = mode === 'login' ? login : mode === 'recover' ? recoverPassword : resetPassword;
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {});
  return <form action={formAction} className="mt-8 space-y-5">
    {mode !== 'reset' && <label className="field-label">E-mail<input className="field" type="email" name="email" autoComplete="email" required maxLength={320} /></label>}
    {mode !== 'recover' && <label className="field-label">{mode === 'reset' ? 'Nova senha' : 'Senha'}<input className="field" type="password" name="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={mode === 'reset' ? 8 : undefined} maxLength={128} required /></label>}
    {mode === 'reset' && <label className="field-label">Confirme a senha<input className="field" type="password" name="confirmation" autoComplete="new-password" minLength={8} maxLength={128} required /></label>}
    <button className="button-primary w-full" type="submit" disabled={pending}>{pending ? 'Aguarde…' : mode === 'login' ? 'Entrar' : mode === 'recover' ? 'Enviar link de recuperação' : 'Salvar nova senha'}</button>
    {state.error && <p role="alert" className="text-amber-300">{state.error}</p>}
    {state.success && <p role="status" className="text-emerald-300">{state.success}</p>}
    <Link className="block text-sm text-blue-300" href={mode === 'login' ? '/admin/recuperar' : '/admin/login'}>{mode === 'login' ? 'Esqueci minha senha' : 'Voltar ao login'}</Link>
  </form>;
}
