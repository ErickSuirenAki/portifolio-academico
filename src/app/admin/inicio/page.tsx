import Link from 'next/link';
import { requireAdmin } from '@/lib/admin';
import { defaultHomeSettings, type HomeSettings } from '@/lib/homepage';
import { AdminNav } from '@/components/admin-nav';
import { AdminDatabaseError } from '@/components/admin-database-error';
import { HomeSettingsForm } from '@/components/home-settings-form';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Página inicial', robots: { index: false, follow: false } };

export default async function ManageHome() {
  const { sb } = await requireAdmin();
  const settings = await sb.from('homepage').select('*').eq('id', 1).maybeSingle();
  if (settings.error && ['PGRST205', '42P01'].includes(settings.error.code)) return <main className="page-shell"><AdminNav /><h1 className="page-title">Ativar a edição da página inicial</h1><p className="mt-6 text-slate-300">Execute o arquivo <code>supabase/migrations/20261021_homepage.sql</code> no SQL Editor do Supabase. Depois, recarregue esta página para escolher os projetos e enviar as fotos.</p></main>;
  if (settings.error) return <AdminDatabaseError error={settings.error} />;
  const projects: { id: string; title: string; published: boolean }[] = [];
  for (let offset = 0; ; offset += 500) {
    const page = await sb.from('projects').select('id,title,published').order('created_at', { ascending: false }).order('id').range(offset, offset + 499);
    if (page.error) return <AdminDatabaseError error={page.error} />;
    projects.push(...page.data);
    if (page.data.length < 500) break;
  }
  return <main className="page-shell max-w-5xl"><AdminNav /><p className="eyebrow">Seu portfólio em primeiro plano</p><h1 className="page-title mt-3">Página inicial</h1><p className="text-slate-300 mt-5 mb-5">Escolha os projetos que melhor representam seu trabalho e compartilhe fotos dos congressos e do intercâmbio. As fotos salvas aqui ficam visíveis na página inicial.</p><Link className="inline-block text-blue-300 mb-8" href="/admin/foto">Alterar a foto da apresentação →</Link><HomeSettingsForm initial={(settings.data as HomeSettings | null) || defaultHomeSettings} projects={projects} /></main>;
}
