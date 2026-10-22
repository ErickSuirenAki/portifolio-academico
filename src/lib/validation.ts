import { sections, type Section, type ProjectImage } from './models.ts';

export const MAX_GALLERY_IMAGES = 20;

export function parseProjectGallery(raw: string): ProjectImage[] {
  if (raw.length > 60000) throw new Error('A galeria ultrapassou o tamanho permitido.');
  let items: unknown;
  try { items = JSON.parse(raw); }
  catch { throw new Error('A galeria está inválida. Recarregue o formulário e tente novamente.'); }
  if (!Array.isArray(items) || items.length > MAX_GALLERY_IMAGES) throw new Error(`Use no máximo ${MAX_GALLERY_IMAGES} fotos na galeria.`);
  return items.map(item => {
    if (!item || typeof item !== 'object' || typeof item.url !== 'string' || item.url.length > 2000 || !safeUrl(item.url.trim())) {
      throw new Error('Cada foto da galeria deve ter uma URL http ou https válida.');
    }
    if (typeof item.alt !== 'string' || !item.alt.trim() || item.alt.trim().length > 200) {
      throw new Error('Descreva cada foto da galeria em até 200 caracteres.');
    }
    if (typeof item.caption !== 'string' || item.caption.trim().length > 500) throw new Error('Cada legenda pode ter até 500 caracteres.');
    return { url: item.url.trim(), alt: item.alt.trim(), caption: item.caption.trim() };
  });
}

export function safeUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

export function parseContent(section: Section, form: FormData): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const field of sections[section].fields) {
    const raw = form.get(field.name);
    if (field.type === 'gallery') {
      // Older open forms must not clear images when they submit without this field.
      if (raw === null) continue;
      if (typeof raw !== 'string') throw new Error('A galeria está inválida.');
      values[field.name] = parseProjectGallery(raw);
      continue;
    }
    if (raw !== null && typeof raw !== 'string') throw new Error(`Valor inválido: ${field.label}.`);
    const value = (raw as string | null)?.trim() || '';
    if (field.required && !value) throw new Error(`Preencha: ${field.label}.`);
    const max = field.maxLength ?? (field.type === 'textarea' ? 30000 : 2000);
    if (value.length > max) throw new Error(`${field.label}: limite de ${max} caracteres.`);
    if (['url', 'image', 'pdf'].includes(field.type || '') && value && !safeUrl(value)) {
      throw new Error(`${field.label}: informe uma URL http ou https válida.`);
    }
    values[field.name] = value || null;
  }
  if ('slug' in values && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(values.slug))) {
    throw new Error('Use somente letras minúsculas, números e hífens no endereço.');
  }
  if (section === 'projects') {
    values.tags = String(values.tags || '').split(',').map(tag => tag.trim()).filter(Boolean);
    if ((values.tags as string[]).length > 30) throw new Error('Use no máximo 30 tecnologias.');
  }
  if (section === 'publications') {
    if (values.published_year !== null) {
      const year = Number(values.published_year);
      if (!Number.isInteger(year) || year < 1800 || year > new Date().getFullYear() + 5) throw new Error('Informe um ano válido.');
      values.published_year = year;
    }
    if (values.doi && !/^10\.\d{4,9}\/\S+$/.test(String(values.doi))) throw new Error('Informe apenas o identificador DOI, começando por 10.');
  }
  if (section !== 'profile') values.published = form.get('published') === 'on';
  return values;
}

export function fileExtension(bytes: Uint8Array, mime: string): string | undefined {
  if (mime === 'image/jpeg' && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'jpg';
  if (mime === 'image/png' && [137,80,78,71,13,10,26,10].every((n,i) => bytes[i] === n)) return 'png';
  if (mime === 'image/webp' && new TextDecoder().decode(bytes.slice(0,4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8,12)) === 'WEBP') return 'webp';
  if (mime === 'application/pdf' && new TextDecoder().decode(bytes.slice(0,5)) === '%PDF-') return 'pdf';
  return undefined;
}
