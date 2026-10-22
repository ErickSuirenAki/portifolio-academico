import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Cpu, Globe2, GraduationCap, HeartHandshake, Trophy } from 'lucide-react';
import { trajectoryAwards, trajectoryChapters, trajectoryEvents } from '@/lib/trajectory-content';
import { lattesSource } from '@/lib/lattes-content';

const description = 'Minha jornada do IFRO à Ciência da Computação na UNIR, passando pelo intercâmbio STEAM na Argentina, pesquisa, eventos e robótica.';
export const metadata: Metadata = {
  title: 'Trajetória acadêmica', description,
  alternates: { canonical: '/trajetoria' },
  openGraph: { title: 'Minha trajetória acadêmica | Erick', description, url: '/trajetoria', type: 'website' },
};

export default function TrajectoryPage() {
  const icons = [Cpu, Globe2, GraduationCap];
  const years = [...new Set(trajectoryEvents.map(event => event.year))].sort((a, b) => b - a);
  return <main className="max-w-6xl mx-auto px-6 pb-12">
    <header className="pt-14 md:pt-20 pb-12 md:pb-16">
      <p className="eyebrow">Minha trajetória acadêmica</p>
      <h1 className="max-w-4xl mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">Entre códigos, robôs e <span className="text-blue-400">novas perspectivas.</span></h1>
      <p className="max-w-2xl mt-7 text-lg md:text-xl leading-relaxed text-slate-300">Do IFRO à UNIR, passando por um intercâmbio na Argentina. Uma jornada de aprender na prática, participar de pesquisa e levar essas experiências para além da sala de aula.</p>
      <div className="grid sm:grid-cols-3 gap-0 mt-10 border-y border-slate-700/80">
        {[{ year: '2022–2025', label: 'A base no IFRO', place: 'Porto Velho · Formação técnica' }, { year: '2024', label: 'Um novo contexto', place: 'Argentina · Mobilidade STEAM' }, { year: 'Desde 2025', label: 'O próximo capítulo', place: 'UNIR · Ciência da Computação' }].map((item, index) => {
          const Icon = icons[index];
          return <div key={item.label} className="py-7 sm:px-6 first:pl-0 border-b sm:border-b-0 last:border-b-0 sm:border-r last:border-r-0 border-slate-700/80"><Icon size={23} className="text-blue-400 mb-4" aria-hidden="true" /><p className="text-xs text-slate-400 tracking-wider uppercase">{item.year}</p><p className="text-lg font-semibold mt-2">{item.label}</p><p className="text-sm text-slate-400 mt-2">{item.place}</p></div>;
        })}
      </div>
    </header>

    <nav aria-label="Seções da trajetória" className="sticky top-0 z-10 flex flex-wrap gap-2 py-4 mb-10 bg-[#080e1b]/95 backdrop-blur-xl border-b border-slate-800">
      {[['ifro', 'IFRO'], ['intercambio', 'Intercâmbio'], ['unir', 'UNIR'], ['eventos', 'Eventos'], ['conquistas', 'Reconhecimentos']].map(([id, label]) => <a href={`#${id}`} key={id} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white hover:border-blue-400 transition">{label}</a>)}
    </nav>

    <ol aria-label="Etapas da minha trajetória" className="space-y-14 md:space-y-20">
      {trajectoryChapters.map((chapter, index) => {
        const Icon = icons[index];
        return <li key={chapter.id}>
          <section id={chapter.id} aria-labelledby={`${chapter.id}-title`} className="scroll-mt-40 md:scroll-mt-28 grid lg:grid-cols-[.7fr_1.8fr] gap-7 lg:gap-14">
            <div className="lg:pt-2"><p aria-hidden="true" className="text-6xl font-bold text-blue-400/30">{chapter.number}</p><p className="mt-4 text-blue-300 text-sm font-semibold">{chapter.period}</p><p className="mt-2 text-sm text-slate-400 leading-relaxed">{chapter.institution}</p></div>
            <div className="min-w-0"><Icon className="text-blue-400 mb-5" size={28} aria-hidden="true" /><h2 id={`${chapter.id}-title`} className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">{chapter.title}</h2><p className="mt-6 text-lg text-slate-200 leading-relaxed">{chapter.introduction}</p><div className="mt-5 space-y-4">{chapter.paragraphs.map(paragraph => <p key={paragraph} className="text-slate-400 leading-relaxed">{paragraph}</p>)}</div>
              <ol className="border-l border-blue-500/40 mt-8 ml-1 space-y-6">{chapter.milestones.map((milestone, position) => <li key={`${milestone.year}-${position}`} className="relative pl-6"><span aria-hidden="true" className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-400 ring-4 ring-[#080e1b]" /><p className="text-blue-300 text-xs font-semibold tracking-wider">{milestone.year}</p><p className="text-sm text-slate-300 mt-2 leading-relaxed">{milestone.text}</p></li>)}</ol>
              <div className="flex flex-wrap gap-2 mt-7">{chapter.tags.map(tag => <span key={tag} className="rounded-full bg-slate-800/70 border border-slate-700 px-3 py-1 text-xs text-slate-300">{tag}</span>)}</div>
              {chapter.id === 'intercambio' && <Link href="/publicacoes" className="inline-flex gap-2 items-center text-blue-300 text-sm mt-7">Conheça as publicações <ArrowUpRight size={16} aria-hidden="true" /></Link>}
              {chapter.id === 'unir' && <Link href="/projetos" className="inline-flex gap-2 items-center text-blue-300 text-sm mt-7">Explore os projetos <ArrowUpRight size={16} aria-hidden="true" /></Link>}
            </div>
          </section>
        </li>;
      })}
    </ol>

    <section aria-labelledby="afs-title" className="glass rounded-2xl p-7 md:p-10 my-16 md:my-24 grid sm:grid-cols-[auto_1fr] gap-6">
      <HeartHandshake size={34} className="text-blue-400" aria-hidden="true" /><div><p className="eyebrow">Além da formação técnica</p><h2 id="afs-title" className="text-2xl md:text-3xl font-bold mt-3">Conhecimento também se compartilha.</h2><p className="text-slate-300 leading-relaxed mt-5 max-w-3xl">A pesquisa e o intercâmbio se encontram na vontade de participar. Na AFS Intercultura Brasil, atuo como voluntário em atividades de apoio a intercambistas e de promoção da educação intercultural. É uma continuidade da experiência na Argentina, agora contribuindo para a jornada de outras pessoas.</p></div>
    </section>

    <section id="eventos" aria-labelledby="eventos-title" className="scroll-mt-40 md:scroll-mt-28">
      <div className="md:flex md:items-end md:justify-between gap-8"><div><p className="eyebrow">Encontros e trocas</p><h2 id="eventos-title" className="text-3xl md:text-4xl font-bold mt-3">Para além dos projetos.</h2></div><p className="text-slate-400 mt-5 md:mt-0 max-w-md leading-relaxed">Congressos, olimpíadas, feiras e atividades culturais. Às vezes apresentando um trabalho; em outras, participando da organização ou conhecendo novas ideias.</p></div>
      <div className="mt-9 space-y-4">{years.map(year => {
        const events = trajectoryEvents.filter(event => event.year === year);
        return <details key={year} className="group glass rounded-2xl overflow-hidden" open={year >= 2024}><summary className="cursor-pointer p-6 text-xl font-bold marker:text-blue-400"><span className="ml-2">{year}</span><span className="ml-4 text-sm font-normal text-slate-400">{events.length} {events.length === 1 ? 'evento' : 'eventos'}</span></summary><ul className="px-6 pb-6 grid md:grid-cols-2 gap-x-8">{events.map(event => <li key={event.title} className="py-5 border-t border-slate-700/70"><p className="eyebrow">{event.role}</p><h3 className="text-lg font-semibold mt-2">{event.title}</h3><p className="text-sm text-slate-400 leading-relaxed mt-2">{event.description}</p></li>)}</ul></details>;
      })}</div>
    </section>

    <section id="conquistas" aria-labelledby="conquistas-title" className="scroll-mt-40 md:scroll-mt-28 mt-16 md:mt-24"><p className="eyebrow">Reconhecimentos</p><h2 id="conquistas-title" className="text-3xl md:text-4xl font-bold mt-3">Marcos dessa caminhada.</h2><div className="grid md:grid-cols-3 gap-5 mt-8">{trajectoryAwards.map(award => <article key={`${award.year}-${award.title}`} className="glass rounded-2xl p-6"><Trophy size={25} className="text-amber-300 mb-6" aria-hidden="true" /><p className="text-sm text-blue-300">{award.year}</p><h3 className="text-xl font-bold mt-2">{award.title}</h3><p className="text-sm text-slate-300 mt-4 leading-relaxed">{award.description}</p><p className="text-xs text-slate-500 mt-5">{award.institution}</p></article>)}</div></section>

    <section className="border-t border-slate-700 mt-16 md:mt-24 pt-10 flex flex-col md:flex-row gap-7 md:items-center md:justify-between"><div><BookOpen className="text-blue-400 mb-4" aria-hidden="true" /><h2 className="text-2xl font-bold">Os próximos capítulos estão em construção.</h2><p className="text-slate-400 mt-3 max-w-xl leading-relaxed">Acompanhe os projetos e as atualizações para conhecer o que estou desenvolvendo e aprendendo agora.</p></div><div className="flex flex-wrap gap-3 shrink-0"><Link href="/projetos" className="button-primary">Ver projetos</Link><Link href="/noticias" className="button-secondary inline-flex items-center">Acompanhar novidades</Link></div></section>
    <p className="text-xs text-slate-500 leading-relaxed mt-10">Trajetória organizada a partir do currículo atualizado em 11/10/2026. <a href={lattesSource.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 underline hover:text-blue-300">Consultar currículo Lattes ↗</a></p>
  </main>;
}
