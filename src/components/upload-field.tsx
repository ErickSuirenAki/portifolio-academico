'use client';
import { useState } from 'react';
import { uploadFile } from '@/app/admin/actions';
import type { Field } from '@/lib/models';
import { safeUrl } from '@/lib/validation';

export function UploadField({ field, initial, onBusy, portrait = false }: { field: Field; initial: string; onBusy: (busy: boolean) => void; portrait?: boolean }) {
  const [value, setValue] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true); onBusy(true); setMessage('');
    try {
      const form = new FormData(); form.set('file', file);
      form.set('kind', field.type === 'pdf' ? 'pdf' : 'image');
      const result = await uploadFile(form);
      if (result.url) setValue(result.url);
      setMessage(result.error || result.success || '');
    } catch { setMessage('Falha no envio. Verifique sua sessão e tente novamente.'); }
    finally { setBusy(false); onBusy(false); }
  }
  return <div className="space-y-2">
    <label className="field-label">{field.label}<input className="field" name={field.name} type="url" value={value} maxLength={2000} onChange={event => setValue(event.target.value)} placeholder="https://…" /></label>
    <label className="block text-sm text-slate-300">Ou enviar {field.type === 'pdf' ? 'PDF' : 'imagem'} (até 5 MB)
      <input type="file" className="field" disabled={busy} accept={field.type === 'pdf' ? 'application/pdf' : 'image/jpeg,image/png,image/webp'} onChange={event => { void upload(event.target.files?.[0]); event.target.value = ''; }} />
    </label>
    {field.type === 'image' && safeUrl(value) && <img src={value} alt={`Prévia: ${field.label}`} className={portrait ? 'size-48 rounded-full object-cover border border-blue-400/40 bg-slate-950' : 'w-full max-h-56 object-contain rounded-xl bg-slate-950'} referrerPolicy="no-referrer" />}
    {value && <button type="button" className="text-sm text-rose-300 underline" disabled={busy} onClick={() => setValue('')}>Remover {field.type === 'pdf' ? 'PDF' : 'imagem'} deste campo</button>}
    <p className="text-xs text-slate-400">Arquivos enviados são públicos, mesmo quando associados a um rascunho. Envie apenas material que possa ser compartilhado.</p>
    {busy && <p role="status">Enviando arquivo…</p>}
    {message && <p role="status" className="text-sm text-blue-200">{message}</p>}
  </div>;
}

