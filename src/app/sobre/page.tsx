import Link from 'next/link';
import { getProfile } from '@/lib/data';
import { TextContent } from '@/components/content';
import { safeUrl } from '@/lib/validation';
export const metadata = { title: 'Sobre', description: 'Formação, experiências e trajetória acadêmica.', alternates: { canonical: '/sobre' } };
export default async function About() {
  const profile = await getProfile();
  const photo = safeUrl(profile.photo_url);
  return <main className="page-shell max-w-4xl"><p className="eyebrow">Trajetória acadêmica</p><h1 className="page-title mt-3">{profile.display_name}</h1><div className="mt-8 flex flex-col sm:flex-row gap-8">{photo && <img className="w-40 h-40 rounded-2xl object-cover" src={photo} alt={`Foto de ${profile.display_name}`} referrerPolicy="no-referrer" />}<TextContent text={profile.biography} /></div><div className="flex flex-wrap gap-4 mt-7"><Link className="button-primary" href="/trajetoria">Conheça minha trajetória →</Link>{safeUrl(profile.lattes_url) && <a className="button-secondary" href={safeUrl(profile.lattes_url)} target="_blank" rel="noopener noreferrer">Currículo Lattes ↗</a>}{safeUrl(profile.github_url) && <a className="button-secondary" href={safeUrl(profile.github_url)} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}</div>{[{ title: 'Formação e idiomas', text: profile.formation }, { title: 'Experiências', text: profile.experience }, { title: 'Eventos e apresentações', text: profile.events }, { title: 'Premiações', text: profile.awards }].filter(section => section.text).map(section => <section className="glass p-7 rounded-2xl mt-8" key={section.title}><h2 className="text-2xl font-bold mb-5">{section.title}</h2><TextContent text={section.text} /></section>)}</main>;
}
