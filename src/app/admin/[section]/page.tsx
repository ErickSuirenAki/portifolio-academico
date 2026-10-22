import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin';
import { isSection, sections } from '@/lib/models';
import { ContentEditor } from '@/components/content-editor';
import { DeleteButton } from '@/components/delete-button';
import { AdminNav } from '@/components/admin-nav';
import { defaultProfile } from '@/lib/data';
import { AdminDatabaseError } from '@/components/admin-database-error';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Gerenciar conteúdo', robots: { index: false, follow: false } };

export default async function Manage({ params, searchParams }: { params: Promise<{ section: string }>; searchParams: Promise<{ salvo?: string }> }) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  const { sb } = await requireAdmin();
  const { salvo } = await searchParams;
  if (section === 'profile') {
    const { data, error } = await sb.from('profile').select('*').eq('id', 1).maybeSingle();
    if (error) return <AdminDatabaseError error={error} />;
    return <main className="page-shell"><AdminNav /><h1 className="page-title mb-8">Perfil acadêmico</h1>{salvo && <p role="status" className="notice mb-6">Perfil salvo.</p>}<ContentEditor section="profile" id="1" initial={data || defaultProfile} /></main>;
  }
  const { data, error } = await sb.from(section).select('id,title,published').order('created_at', { ascending: false });
  if (error) return <AdminDatabaseError error={error} />;
  return <main className="page-shell"><AdminNav /><div className="flex flex-wrap justify-between gap-4 items-center"><h1 className="page-title">{sections[section].label}</h1><Link className="button-primary" href={`/admin/${section}/novo`}>Adicionar conteúdo</Link></div>{salvo && <p role="status" className="notice mt-6">Conteúdo salvo.</p>}<div className="mt-8 space-y-4">{!data?.length && <p className="empty-state">Nenhum registro ainda. Adicione o primeiro conteúdo.</p>}{data?.map(row => <article className="glass rounded-xl p-6 flex flex-wrap gap-5 justify-between" key={row.id}><div><h2 className="font-bold text-xl">{row.title}</h2><p className={`text-sm mt-2 ${row.published ? 'text-emerald-300' : 'text-amber-300'}`}>{row.published ? 'Publicado' : 'Rascunho'}</p></div><div className="space-y-3"><Link className="text-blue-300 underline" href={`/admin/${section}/${row.id}`}>Editar</Link><DeleteButton section={section} id={row.id} title={row.title} /></div></article>)}</div></main>;
}
