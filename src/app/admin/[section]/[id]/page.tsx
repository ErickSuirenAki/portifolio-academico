import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { requireAdmin } from '@/lib/admin';
import { isSection, sections } from '@/lib/models';
import { ContentEditor } from '@/components/content-editor';
import { AdminNav } from '@/components/admin-nav';
import { AdminDatabaseError } from '@/components/admin-database-error';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Editar conteúdo', robots: { index: false, follow: false } };

export default async function Edit({ params }: { params: Promise<{ section: string; id: string }> }) {
  const { section, id } = await params;
  if (!isSection(section)) notFound();
  const { sb } = await requireAdmin();
  if (section === 'profile') redirect('/admin/profile');
  let initial: Record<string, unknown> = {};
  if (id !== 'novo') {
    if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
    const { data, error } = await sb.from(section).select('*').eq('id', id).maybeSingle();
    if (error) return <AdminDatabaseError error={error} />;
    if (!data) notFound();
    initial = data;
  }
  return <main className="page-shell"><AdminNav /><Link className="text-blue-300" href={`/admin/${section}`}>← {sections[section].label}</Link><h1 className="page-title mt-5 mb-8">{id === 'novo' ? 'Adicionar conteúdo' : 'Editar conteúdo'}</h1><ContentEditor section={section} id={id} initial={initial} /></main>;
}
