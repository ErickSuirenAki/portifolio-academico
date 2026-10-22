import { requireAdmin } from '@/lib/admin';
import { AdminNav } from '@/components/admin-nav';
import { AdminDatabaseError } from '@/components/admin-database-error';
import { HomePhotoForm } from '@/components/home-photo-form';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Foto do início', robots: { index: false, follow: false } };

export default async function HomePhotoPage() {
  const { sb } = await requireAdmin();
  const { data, error } = await sb.from('profile').select('photo_url').eq('id', 1).maybeSingle();
  if (error) return <AdminDatabaseError error={error} />;
  return <main className="page-shell max-w-4xl"><AdminNav /><p className="eyebrow">Sua apresentação</p><h1 className="page-title mt-3">Foto do início</h1><p className="text-slate-300 mt-5 mb-8 leading-relaxed">Envie uma foto sua para a apresentação da página inicial. Ela também será usada na página Sobre e aparecerá tanto no computador quanto no celular.</p><HomePhotoForm initial={data?.photo_url || null} /></main>;
}
