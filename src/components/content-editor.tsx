'use client';
import { useActionState, useState } from 'react';
import { saveContent } from '@/app/admin/actions';
import { sections, type Section, type ActionState } from '@/lib/models';
import { UploadField } from '@/components/upload-field';
import { ProjectGalleryEditor } from '@/components/project-gallery-editor';


export function ContentEditor({ section, id, initial = {} }: { section: Section; id: string; initial?: Record<string, unknown> }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveContent.bind(null, section, id), {});
  const [uploads, setUploads] = useState(0);
  function uploadBusy(busy: boolean) { setUploads(count => Math.max(0, count + (busy ? 1 : -1))); }
  return <form action={action} onSubmit={event => { if (uploads > 0) event.preventDefault(); }} className="glass rounded-2xl p-6 md:p-8 space-y-6">
    <fieldset disabled={pending} className="space-y-6 min-w-0">
      {sections[section].fields.map(field => {
        const raw = initial[field.name];
        if (field.type === 'gallery') return <ProjectGalleryEditor key={field.name} initial={raw} onBusy={uploadBusy} />;
        const value = Array.isArray(raw) ? raw.join(', ') : String(raw ?? '');
        if (field.type === 'image' || field.type === 'pdf') return <UploadField key={field.name} field={field} initial={value} onBusy={uploadBusy} portrait={field.name === 'photo_url'} />;
        return <label key={field.name} className="field-label">{field.label}{field.required ? ' *' : ''}
          {field.type === 'textarea'
            ? <textarea className="field" name={field.name} defaultValue={value} required={field.required} rows={field.name === 'body' ? 12 : 4} maxLength={field.maxLength || 30000} />
            : <input className="field" name={field.name} defaultValue={value} type={field.type || 'text'} required={field.required} maxLength={2000} min={field.type === 'number' ? 1800 : undefined} max={field.type === 'number' ? new Date().getFullYear() + 5 : undefined} pattern={field.name === 'slug' ? '[a-z0-9]+(-[a-z0-9]+)*' : undefined} />}
          {field.name === 'slug' && <span className="text-xs text-slate-400">Ex.: meu-projeto. Alterar o endereço invalida o link anterior.</span>}
        </label>;
      })}
      {section !== 'profile' && <label className="flex gap-3 items-start text-sm"><input name="published" type="checkbox" defaultChecked={Boolean(initial.published)} className="mt-1" /><span>Publicado no site<span className="block text-slate-400">Desmarcado: salvar como rascunho, visível apenas no painel.</span></span></label>}
    </fieldset>
    <p className="text-xs text-slate-400">Os campos de conteúdo usam texto simples e preservam quebras de linha.</p>
    {state.error && <p role="alert" className="text-amber-300">{state.error}</p>}
    <button className="button-primary" disabled={pending || uploads > 0} type="submit">{pending ? 'Salvando…' : uploads > 0 ? 'Aguarde o envio…' : 'Salvar alterações'}</button>
  </form>;
}
