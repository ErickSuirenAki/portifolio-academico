'use client';
import { useEffect, useId, useRef, useState } from 'react';
import type { ProjectImage } from '@/lib/models';
import { parseProjectGallery } from '@/lib/validation';

export function ProjectGallery({ images, title, heading = 'Fotos do projeto', home = false }: { images?: ProjectImage[]; title: string; heading?: string; home?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const label = useId();
  let photos: ProjectImage[];
  try { photos = parseProjectGallery(JSON.stringify(images ?? [])); }
  catch { photos = []; }
  useEffect(() => {
    if (selected !== null) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  if (!photos.length) return null;
  const Heading = home ? 'h3' : 'h2';
  const current = selected === null ? null : photos[selected];
  function navigate(direction: number) { setSelected(index => index === null ? null : (index + direction + photos.length) % photos.length); }
  return <section className={home ? '' : 'mt-12'} aria-labelledby={`${label}-heading`}>
    <Heading className="text-2xl font-bold" id={`${label}-heading`}>{heading}</Heading>
    <p className="text-sm text-slate-400 mt-3">Clique em uma foto para ampliar.</p>
    <div className={home ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6' : 'grid sm:grid-cols-2 gap-5 mt-6'}>{photos.map((photo, index) => <figure key={`${photo.url}-${index}`}>
      <button type="button" className="block w-full rounded-xl overflow-hidden border border-slate-700 hover:border-blue-400" onClick={() => setSelected(index)} aria-label={`Ampliar foto ${index + 1}: ${photo.alt}`}>
        <img src={photo.url} alt={photo.alt} loading="lazy" referrerPolicy="no-referrer" className="w-full aspect-video object-cover bg-slate-950" />
      </button>{photo.caption && <figcaption className="text-sm text-slate-400 mt-3 whitespace-pre-wrap break-words">{photo.caption}</figcaption>}
    </figure>)}</div>
    <dialog ref={dialog} aria-labelledby={`${label}-dialog`} className="m-auto w-[calc(100%-2rem)] max-w-5xl max-h-[90dvh] overflow-y-auto rounded-2xl border border-slate-600 bg-slate-950 p-4 text-slate-100 backdrop:bg-black/85" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1); }
    }}>
      <div className="flex items-center justify-between gap-4 mb-4"><h3 id={`${label}-dialog`} className="text-sm">{title} · Foto {(selected ?? 0) + 1} de {photos.length}</h3><button type="button" className="button-secondary" onClick={() => dialog.current?.close()} autoFocus>Fechar</button></div>
      {current && <figure><img className="w-full max-h-[65dvh] object-contain" src={current.url} alt={current.alt} referrerPolicy="no-referrer" />{current.caption && <figcaption className="text-sm text-slate-300 mt-4 whitespace-pre-wrap break-words">{current.caption}</figcaption>}</figure>}
      {photos.length > 1 && <div className="flex justify-between mt-5"><button type="button" className="button-secondary" onClick={() => navigate(-1)}>← Anterior</button><button type="button" className="button-secondary" onClick={() => navigate(1)}>Próxima →</button></div>}
    </dialog>
  </section>;
}
