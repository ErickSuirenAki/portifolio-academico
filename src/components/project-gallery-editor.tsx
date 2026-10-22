'use client';
import { useId, useState } from 'react';
import type { ProjectImage } from '@/lib/models';
import { MAX_GALLERY_IMAGES, parseProjectGallery, safeUrl } from '@/lib/validation';
import { uploadFile } from '@/app/admin/actions';

export function ProjectGalleryEditor({ initial, onBusy, name = 'gallery', title = 'Fotos do projeto', description, maxImages = MAX_GALLERY_IMAGES, saveLabel = 'o projeto' }: {
  initial: unknown; onBusy: (busy: boolean) => void; name?: string; title?: string;
  description?: string; maxImages?: number; saveLabel?: string;
}) {
  const id = useId();
  const [images, setImages] = useState<ProjectImage[]>(() => {
    try { return parseProjectGallery(JSON.stringify(initial ?? [])); }
    catch { return []; }
  });
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  function update(index: number, patch: Partial<ProjectImage>) {
    setImages(current => current.map((image, position) => position === index ? { ...image, ...patch } : image));
  }
  function move(index: number, direction: number) {
    setImages(current => {
      const next = [...current];
      [next[index], next[index + direction]] = [next[index + direction], next[index]];
      return next;
    });
  }
  function addUrl() {
    if (!safeUrl(url.trim())) { setErrors(['Informe uma URL de imagem http ou https válida.']); return; }
    if (images.length >= maxImages) return;
    setImages(current => [...current, { url: url.trim(), alt: 'Foto do projeto', caption: '' }]);
    setUrl(''); setErrors([]); setMessage(`Imagem adicionada. Descreva a foto e salve ${saveLabel}.`);
  }
  async function upload(files: File[]) {
    if (!files.length) return;
    if (images.length + files.length > maxImages) { setErrors([`A galeria aceita até ${maxImages} fotos. Escolha menos arquivos.`]); return; }
    setBusy(true); onBusy(true); setErrors([]);
    const failures: string[] = [];
    let uploaded = 0;
    try {
      for (const [index, file] of files.entries()) {
        setMessage(`Enviando foto ${index + 1} de ${files.length}…`);
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
          failures.push(`${file.name}: use JPEG, PNG ou WebP de até 5 MB.`); continue;
        }
        try {
          const form = new FormData(); form.set('file', file); form.set('kind', 'image');
          const result = await uploadFile(form);
          if (result.url) {
            const image = { url: result.url, alt: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').slice(0, 200) || 'Foto do projeto', caption: '' };
            setImages(current => [...current, image]); uploaded++;
          } else failures.push(`${file.name}: ${result.error || 'Não foi possível enviar.'}`);
        } catch { failures.push(`${file.name}: falha no envio. Verifique sua conexão e sua sessão.`); }
      }
    } finally {
      setBusy(false); onBusy(false); setErrors(failures);
      setMessage(`${uploaded} foto(s) enviada(s). Salve ${saveLabel} para registrar a galeria.`);
    }
  }
  return <section className="border border-slate-700 rounded-xl p-4 space-y-4" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`} className="font-bold text-lg">{title}</h2>
    <p className="text-sm text-slate-400">{description || `Até ${maxImages} fotos, além da capa. Adicione descrições, legendas e organize a ordem de exibição.`}</p>
    <input type="hidden" name={initial !== undefined || images.length > 0 ? name : undefined} value={JSON.stringify(images)} />
    <fieldset disabled={busy} className="space-y-5 min-w-0">
      {images.map((image, index) => <article key={index} className="rounded-lg border border-slate-700 p-4 space-y-3">
        <p className="font-semibold">Foto {index + 1}</p>
        {safeUrl(image.url) && <img src={image.url} alt={image.alt || 'Prévia da foto'} className="w-full h-44 object-contain rounded-lg bg-slate-950" loading="lazy" referrerPolicy="no-referrer" />}
        <label className="field-label">Endereço da imagem<input type="url" className="field" value={image.url} maxLength={2000} required onChange={event => update(index, { url: event.target.value })} /></label>
        <label className="field-label">Descrição da foto (acessibilidade)<input className="field" value={image.alt} maxLength={200} required onChange={event => update(index, { alt: event.target.value })} /></label>
        <label className="field-label">Legenda (opcional)<textarea className="field" rows={2} value={image.caption} maxLength={500} onChange={event => update(index, { caption: event.target.value })} /></label>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="button-secondary disabled:opacity-40" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Mover foto ${index + 1} para cima`}>↑ Subir</button>
          <button type="button" className="button-secondary disabled:opacity-40" disabled={index === images.length - 1} onClick={() => move(index, 1)} aria-label={`Mover foto ${index + 1} para baixo`}>↓ Descer</button>
          <button type="button" className="button-secondary text-rose-300" onClick={() => setImages(current => current.filter((_, position) => position !== index))} aria-label={`Remover foto ${index + 1} da galeria`}>Remover da galeria</button>
        </div>
      </article>)}
      <label className="field-label">Enviar fotos ({images.length}/{maxImages})
        <input type="file" multiple accept="image/jpeg,image/png,image/webp" className="field" disabled={images.length >= maxImages} onChange={event => { void upload(Array.from(event.target.files || [])); event.target.value = ''; }} />
      </label>
      <p className="text-xs text-slate-400">JPEG, PNG ou WebP, até 5 MB por foto. Os arquivos enviados ficam públicos por URL, inclusive em rascunhos.</p>
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <label className="field-label flex-1 w-full">Ou adicionar por URL<input className="field" value={url} onChange={event => setUrl(event.target.value)} placeholder="https://…" maxLength={2000} /></label>
        <button type="button" className="button-secondary shrink-0" disabled={images.length >= maxImages} onClick={addUrl}>Adicionar imagem</button>
      </div>
    </fieldset>
    {message && <p role="status" className="text-sm text-blue-200">{message}</p>}
    {errors.length > 0 && <div role="alert" className="text-sm text-amber-300 space-y-2">{errors.map((error, index) => <p key={index}>{error}</p>)}</div>}
    <p className="text-xs text-slate-400">Remover uma foto da galeria não apaga o arquivo do Storage. As alterações só entram no site depois de salvar {saveLabel}.</p>
  </section>;
}
