'use client';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { saveHomeSettings } from '@/app/admin/inicio/actions';
import { MAX_HOME_PHOTOS, type HomeSettings } from '@/lib/homepage';
import type { ActionState } from '@/lib/models';
import { ProjectGalleryEditor } from '@/components/project-gallery-editor';

type ProjectOption = { id: string; title: string; published: boolean };
export function HomeSettingsForm({ initial, projects }: { initial: HomeSettings; projects: ProjectOption[] }) {
  const [selected, setSelected] = useState(initial.featured_project_ids);
  const [state, action, pending] = useActionState<ActionState, FormData>(saveHomeSettings, {});
  const [uploads, setUploads] = useState(0);
  function onBusy(busy: boolean) { setUploads(count => Math.max(0, count + (busy ? 1 : -1))); }
  function toggle(id: string) {
    setSelected(current => current.includes(id) ? current.filter(value => value !== id) : current.length < 3 ? [...current, id] : current);
  }
  function move(index: number, offset: number) {
    setSelected(current => {
      const next = [...current];
      [next[index], next[index + offset]] = [next[index + offset], next[index]];
      return next;
    });
  }
  return <form action={action} onSubmit={event => { if (uploads > 0) event.preventDefault(); }} className="space-y-7">
    <fieldset disabled={pending} className="space-y-7 min-w-0">
      <section className="glass rounded-2xl p-6 space-y-5" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="text-2xl font-bold">Projetos em destaque</h2><p className="text-sm text-slate-400">Escolha até três projetos publicados e organize a ordem. Sem seleção, o início exibe os três publicados mais recentes.</p>
        <input type="hidden" name="featured_project_ids" value={JSON.stringify(selected)} />
        <div className="max-h-72 overflow-y-auto space-y-3 pr-2">{projects.length ? projects.map(project => <label key={project.id} className="flex items-start gap-3 rounded-xl border border-slate-700 p-4"><input className="mt-1" type="checkbox" checked={selected.includes(project.id)} disabled={!selected.includes(project.id) && (!project.published || selected.length >= 3)} onChange={() => toggle(project.id)} /><span className="text-sm">{project.title}{!project.published && <span className="block text-amber-300 mt-1">Rascunho — publique para destacar</span>}</span></label>) : <p className="text-slate-400">Cadastre e publique projetos para escolher os destaques.</p>}</div>
        {selected.length > 0 && <ol className="space-y-3 border-t border-slate-700 pt-5">{selected.map((id, index) => <li key={id} className="flex flex-wrap items-center justify-between gap-3"><span className="text-sm">{index + 1}. {projects.find(project => project.id === id)?.title || 'Projeto indisponível'}</span><div className="flex flex-wrap gap-2"><button type="button" className="button-secondary disabled:opacity-40" aria-label={`Mover destaque ${index + 1} para cima`} disabled={index === 0} onClick={() => move(index, -1)}>↑</button><button type="button" className="button-secondary disabled:opacity-40" aria-label={`Mover destaque ${index + 1} para baixo`} disabled={index === selected.length - 1} onClick={() => move(index, 1)}>↓</button><button type="button" className="button-secondary" onClick={() => toggle(id)} aria-label={`Remover destaque ${index + 1}`}>Remover</button></div></li>)}</ol>}
      </section>
      <div className="glass rounded-2xl p-6"><ProjectGalleryEditor name="conference_photos" title="Congressos e apresentações" initial={initial.conference_photos} onBusy={onBusy} maxImages={MAX_HOME_PHOTOS} saveLabel="a página inicial" description="Envie fotos suas apresentando trabalhos ou participando de eventos. Use a legenda para contar o evento, o local e o ano. Até seis fotos." /></div>
      <div className="glass rounded-2xl p-6"><ProjectGalleryEditor name="exchange_photos" title="Fotos do intercâmbio" initial={initial.exchange_photos} onBusy={onBusy} maxImages={MAX_HOME_PHOTOS} saveLabel="a página inicial" description="Escolha alguns registros da experiência na Argentina e conte o contexto nas legendas. Até seis fotos." /></div>
    </fieldset>
    {state.error && <p role="alert" className="text-amber-300">{state.error}</p>}
    {state.success && <div role="status" className="notice"><p>{state.success}</p><Link className="inline-block underline mt-3" href="/">Ver página inicial →</Link></div>}
    <button type="submit" className="button-primary" disabled={pending || uploads > 0}>{pending ? 'Salvando…' : uploads > 0 ? 'Aguarde o envio das fotos…' : 'Salvar página inicial'}</button>
  </form>;
}
