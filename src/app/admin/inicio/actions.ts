'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin';
import { parseHomeSettings } from '@/lib/homepage';
import { databaseErrorMessage } from '@/lib/database-error';
import type { ActionState } from '@/lib/models';

export async function saveHomeSettings(_state: ActionState, form: FormData): Promise<ActionState> {
  const { sb } = await requireAdmin();
  let values;
  try { values = parseHomeSettings(form); }
  catch (error) { return { error: error instanceof Error ? error.message : 'Confira os dados da página inicial.' }; }
  if (values.featured_project_ids.length) {
    const { data, error } = await sb.from('projects').select('id').in('id', values.featured_project_ids).eq('published', true);
    if (error) return { error: databaseErrorMessage(error, 'verificar os projetos') };
    if (data?.length !== values.featured_project_ids.length) return { error: 'Um dos projetos escolhidos foi removido ou está como rascunho. Atualize a página e selecione somente projetos publicados.' };
  }
  const { data, error } = await sb.from('homepage').upsert(values).select('id').single();
  if (error || !data) return { error: databaseErrorMessage(error, 'salvar a página inicial') };
  revalidatePath('/'); revalidatePath('/admin/inicio');
  return { success: 'Página inicial atualizada! Confira os projetos e as fotos no site.' };
}
