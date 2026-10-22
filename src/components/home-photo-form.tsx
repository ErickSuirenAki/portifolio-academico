'use client';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { UploadField } from '@/components/upload-field';
import { saveHomePhoto } from '@/app/admin/foto/actions';
import type { ActionState } from '@/lib/models';

export function HomePhotoForm({ initial }: { initial: string | null }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveHomePhoto, {});
  const [uploading, setUploading] = useState(false);
  return <form action={action} onSubmit={event => { if (uploading) event.preventDefault(); }} className="glass rounded-2xl p-6 md:p-8 space-y-6">
    <fieldset disabled={pending} className="min-w-0"><UploadField field={{ name: 'photo_url', label: 'Foto da apresentação', type: 'image' }} initial={initial || ''} onBusy={setUploading} portrait /></fieldset>
    <p className="text-sm text-slate-400">A prévia mostra o recorte circular usado no início. Prefira uma foto com o rosto centralizado, boa iluminação e fundo simples. JPEG, PNG ou WebP, até 5 MB.</p>
    <button type="submit" className="button-primary" disabled={pending || uploading}>{pending ? 'Salvando…' : uploading ? 'Aguarde o envio…' : 'Salvar foto do início'}</button>
    {state.error && <p role="alert" className="text-amber-300">{state.error}</p>}
    {state.success && <div role="status" className="notice"><p>{state.success}</p><Link href="/" className="inline-block underline mt-3">Ver página inicial →</Link></div>}
  </form>;
}
