import 'server-only';
import { redirect } from 'next/navigation';
import { isSupabaseConfigured, supabaseServer } from '@/lib/supabase';

export async function requireAdmin() {
  if (!isSupabaseConfigured()) throw new Error('Configure o Supabase antes de usar o painel.');
  const sb = await supabaseServer();
  const { data: { user }, error } = await sb.auth.getUser();
  if (error || !user) redirect('/admin/login');
  const { data: admin, error: membershipError } = await sb.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle();
  if (membershipError) throw new Error('Não foi possível verificar a autorização. Confira a configuração do banco.');
  if (!admin) throw new Error('Conta autenticada, mas sem autorização administrativa.');
  return { sb, user };
}
