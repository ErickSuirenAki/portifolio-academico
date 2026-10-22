'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin';
import { importLattesContent } from '@/lib/lattes-import';
import type { ActionState } from '@/lib/models';

export async function importLattes(_state: ActionState, form: FormData): Promise<ActionState> {
  const { sb } = await requireAdmin();
  const result = await importLattesContent(sb, form.get('published') === 'on');
  revalidatePath('/', 'layout');
  const summary = `${result.projects} projetos e ${result.publications} publicações adicionados. ${result.profileUpdated ? 'Perfil complementado.' : 'Perfil existente preservado.'}`;
  if (result.error) return { error: `${result.error} ${summary} Os dados já salvos foram mantidos; você pode tentar novamente sem duplicá-los.` };
  return { success: `${summary} Registros existentes foram preservados. Confira os dados nas seções do painel.` };
}
