import Link from 'next/link';
import { supabaseServer, isSupabaseConfigured } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { sections } from '@/lib/models';
import { AdminNav } from '@/components/admin-nav';
import { logout } from './auth-actions';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Administração', robots: { index: false, follow: false } };

export default async function Admin() {
  if (!isSupabaseConfigured()) return <main className="page-shell"><h1 className="page-title">Configuração necessária</h1><p className="mt-5 text-slate-300">Configure as variáveis do Supabase e aplique o SQL conforme o README para ativar o painel.</p></main>;
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data: admin, error } = await sb.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle();
  if (!admin || error) return <main className="page-shell"><h1 className="page-title">Acesso indisponível</h1><p className="mt-5">{error ? 'Não foi possível verificar sua autorização. Confira a configuração do banco.' : 'Sua conta não tem autorização administrativa.'}</p><form action={logout} className="mt-6"><button className="button-secondary">Sair e usar outra conta</button></form></main>;
  const counts = await Promise.all(['projects', 'publications', 'news'].map(async table => {
    const { count, error } = await sb.from(table).select('id', { count: 'exact', head: true });
    return error ? 'Indisponível' : count || 0;
  }));
  return <main className="page-shell"><AdminNav /><p className="eyebrow">Área reservada</p><h1 className="page-title">Painel administrativo</h1><p className="mt-4 text-slate-400">Gerencie seu portfólio. Rascunhos ficam disponíveis apenas aqui.</p><Link href="/admin/inicio" className="button-primary inline-block mt-5 mr-3">Editar destaques e fotos do início →</Link><Link href="/admin/foto" className="button-secondary inline-block mt-5">Inserir ou trocar minha foto do início →</Link><aside className="glass rounded-2xl p-6 mt-8"><h2 className="text-xl font-bold">Seu currículo Lattes está pronto para importar</h2><p className="mt-3 text-slate-300">Confira os projetos, publicações e dados acadêmicos extraídos do PDF e adicione ao seu portfólio.</p><Link href="/admin/importar-lattes" className="button-primary inline-block mt-5">Revisar e importar currículo →</Link></aside><div className="grid sm:grid-cols-2 gap-5 mt-8">{Object.entries(sections).map(([key, section], index) => <Link key={key} href={`/admin/${key}`} className="glass rounded-2xl p-7 hover:border-blue-500"><h2 className="text-xl font-bold">{section.label}</h2><p className="text-slate-400 mt-3">{index < 3 ? `${counts[index]} registros · gerenciar conteúdo →` : 'Editar biografia e trajetória →'}</p></Link>)}</div></main>;
}
