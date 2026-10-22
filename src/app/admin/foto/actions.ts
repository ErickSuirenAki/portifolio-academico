'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin';
import { defaultProfile } from '@/lib/data';
import { databaseErrorMessage } from '@/lib/database-error';
import { safeUrl } from '@/lib/validation';
import type { ActionState } from '@/lib/models';

export async function saveHomePhoto(_state: ActionState, form: FormData): Promise<ActionState> {
  const { sb } = await requireAdmin();
  const raw = form.get('photo_url');
  if (typeof raw !== 'string') return { error: 'Selecione uma foto ou informe uma URL válida.' };
  const url = raw.trim();
  if (url.length > 2000 || (url && !safeUrl(url))) return { error: 'Informe uma URL de imagem http ou https válida, com até 2000 caracteres.' };
  const { data: profile, error: readError } = await sb.from('profile').select('id').eq('id', 1).maybeSingle();
  if (readError) return { error: databaseErrorMessage(readError, 'carregar o perfil') };
  const values = { photo_url: url || null };
  // An existing profile must retain every field except its photo.
  const query = profile ? sb.from('profile').update(values).eq('id', 1)
    : sb.from('profile').insert({ ...defaultProfile, ...values });
  const { data, error } = await query.select('id').single();
  if (error || !data) return { error: error?.code === '23505' ? 'O perfil foi criado em outra aba. Recarregue esta página e salve a foto novamente.' : databaseErrorMessage(error, 'salvar a foto') };
  revalidatePath('/');
  revalidatePath('/sobre');
  revalidatePath('/admin/profile');
  revalidatePath('/admin/foto');
  return { success: url ? 'Foto salva! Ela já aparece na página inicial e na página Sobre.' : 'Foto removida da apresentação.' };
}
