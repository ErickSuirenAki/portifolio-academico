'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin';
import { isSection, type ActionState } from '@/lib/models';
import { parseContent, fileExtension } from '@/lib/validation';
import { databaseErrorMessage } from '@/lib/database-error';

export async function saveContent(section: string, id: string, _state: ActionState, form: FormData): Promise<ActionState> {
  if (!isSection(section)) return { error: 'Módulo inválido.' };
  const { sb } = await requireAdmin();
  let values: Record<string, unknown>;
  try { values = parseContent(section, form); }
  catch (error) { return { error: error instanceof Error ? error.message : 'Dados inválidos.' }; }
  if (section === 'news') {
    let previousDate: string | null = null;
    if (id !== 'novo') {
      const { data, error } = await sb.from('news').select('published_at').eq('id', id).single();
      if (error) return { error: databaseErrorMessage(error, 'carregar a notícia') };
      previousDate = data.published_at;
    }
    values.published_at = values.published ? previousDate || new Date().toISOString() : null;
  }
  const query = section === 'profile'
    ? sb.from(section).upsert({ ...values, id: 1 })
    : id === 'novo' ? sb.from(section).insert(values) : sb.from(section).update(values).eq('id', id);
  const { data, error } = await query.select('id').single();
  if (error || !data) return { error: databaseErrorMessage(error) };
  revalidatePath('/', 'layout');
  redirect(`/admin/${section}?salvo=1`);
}

export async function deleteContent(section: string, id: string): Promise<ActionState> {
  if (!isSection(section) || section === 'profile') return { error: 'Módulo inválido.' };
  const { sb } = await requireAdmin();
  const { data, error } = await sb.from(section).delete().eq('id', id).select('id').single();
  if (error || !data) return { error: databaseErrorMessage(error, 'excluir o registro') };
  revalidatePath('/', 'layout');
  return { success: 'Registro excluído.' };
}

export async function uploadFile(form: FormData): Promise<ActionState & { url?: string }> {
  const { sb, user } = await requireAdmin();
  const file = form.get('file');
  if (!(file instanceof File) || !file.size) return { error: 'Selecione um arquivo.' };
  if (file.size > 5 * 1024 * 1024) return { error: 'O limite por arquivo é 5 MB.' };
  const bytes = new Uint8Array(await file.arrayBuffer());
  const extension = fileExtension(bytes, file.type);
  if (!extension) return { error: 'Use uma imagem JPEG, PNG, WebP ou um PDF válido.' };
  const kind = form.get('kind');
  if (kind === 'image' && extension === 'pdf') return { error: 'Este campo aceita somente imagens JPEG, PNG ou WebP.' };
  if (kind === 'pdf' && extension !== 'pdf') return { error: 'Este campo aceita somente arquivos PDF.' };
  const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
  const { error } = await sb.storage.from('portfolio').upload(path, bytes, { contentType: file.type, upsert: false });
  if (error) return { error: 'Não foi possível enviar o arquivo. Confira o bucket e as políticas de Storage.' };
  const { data } = sb.storage.from('portfolio').getPublicUrl(path);
  return { url: data.publicUrl, success: 'Arquivo enviado. Salve o formulário para associá-lo ao conteúdo.' };
}
