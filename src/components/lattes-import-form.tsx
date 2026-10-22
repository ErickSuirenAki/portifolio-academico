'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { importLattes } from '@/app/admin/importar-lattes/actions';
import type { ActionState } from '@/lib/models';

export function LattesImportForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(importLattes, {});
  return <form action={action} className="glass rounded-2xl p-6 space-y-5">
    <h2 className="text-2xl font-bold">Adicionar ao Supabase</h2>
    <p className="text-slate-300">Projetos e publicações existentes serão preservados. No perfil, somente campos vazios ou o texto original de exemplo serão preenchidos. Você poderá editar tudo depois.</p>
    <label className="flex items-start gap-3"><input type="checkbox" name="published" defaultChecked disabled={pending} className="mt-1" /><span>Publicar os novos projetos e publicações no site<span className="block text-sm text-slate-400">Desmarque para importar como rascunhos. O perfil é público assim que salvo.</span></span></label>
    <button type="submit" className="button-primary" disabled={pending}>{pending ? 'Importando currículo…' : 'Importar dados do meu Lattes'}</button>
    {state.error && <p role="alert" className="text-amber-300 whitespace-pre-wrap">{state.error}</p>}
    {state.success && <div role="status" className="notice"><p>{state.success}</p><Link href="/sobre" className="underline inline-block mt-3">Ver perfil no site →</Link></div>}
  </form>;
}
