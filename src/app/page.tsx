import Link from 'next/link';
import { Cpu, BrainCircuit, Layers3, Globe2, GraduationCap, ArrowUpRight } from 'lucide-react';
import { getProfile, getProjects, getNews, getHomeSettings } from '@/lib/data';
import { selectFeaturedProjects } from '@/lib/homepage';
import { safeUrl } from '@/lib/validation';
import { ProjectCard, EmptyState, formatDate } from '@/components/content';
import { SocialLinks } from '@/components/social-links';
import { ProjectGallery } from '@/components/project-gallery';

export default async function Home() {
  const [profile, projects, news, settings] = await Promise.all([getProfile(), getProjects(), getNews(), getHomeSettings()]);
  const lattes = safeUrl(profile.lattes_url);
  const github = safeUrl(profile.github_url);
  const photo = safeUrl(profile.photo_url);
  const featured = selectFeaturedProjects(projects, settings.featured_project_ids);
  const hasMoments = settings.conference_photos.length > 0 || settings.exchange_photos.length > 0;
  return <main>
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-[1.35fr_.65fr] items-center gap-12">
      <div>
        <p className="inline-flex px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs tracking-widest uppercase">Ciência da Computação · Pesquisa · Inovação</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-7 leading-tight">Olá, eu sou <span className="text-blue-400">Erick.</span></h1>
        <p className="text-xl text-slate-300 mt-7 leading-relaxed max-w-2xl whitespace-pre-wrap">Sou estudante de Ciência da Computação na UNIR, com uma trajetória que começou na robótica e na Internet das Coisas e hoje também passa pelo desenvolvimento de software e pela computação gráfica. Gosto de aprender construindo: transformar uma ideia em protótipo, testar possibilidades e entender o que pode melhorar. Aqui compartilho meus projetos, pesquisas e descobertas pelo caminho.</p>
        <SocialLinks github={github} lattes={lattes} />
      </div>
      <div className={photo ? 'flex justify-center order-first lg:order-none' : 'hidden lg:flex justify-center'}>
        {photo ? <img src={photo} alt="Foto de Erick" width={288} height={288} className="size-48 sm:size-64 lg:size-72 object-cover rounded-full border border-blue-400/40 shadow-[0_0_60px_#2563eb20]" referrerPolicy="no-referrer" />
          : <div aria-hidden="true" className="w-72 h-72 rounded-full border border-blue-400/40 bg-gradient-to-br from-blue-500/30 via-slate-900 to-slate-950 shadow-[0_0_90px_#2563eb30] flex items-center justify-center"><Cpu size={90} strokeWidth={1} className="text-blue-300" /></div>}
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-6 py-12" aria-labelledby="featured-title">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Portfólio</p><h2 id="featured-title" className="text-3xl font-bold mt-2">Projetos em destaque</h2><p className="text-slate-400 mt-4 max-w-xl">Um pouco do que venho pesquisando, construindo e colocando em prática.</p></div><Link href="/projetos" className="text-blue-300 text-sm">Ver todos →</Link></div>
      <div className="grid md:grid-cols-3 gap-5 mt-8">{featured.map(project => <ProjectCard key={project.id} project={project} />)}</div>
      {!featured.length && <EmptyState>Os próximos projetos serão publicados aqui.</EmptyState>}
    </section>

    <section className="max-w-6xl mx-auto px-6 py-16" aria-labelledby="journey-title">
      <div className="border-y border-slate-700/80 py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">De onde venho</p><h2 id="journey-title" className="text-3xl md:text-4xl font-bold mt-3">Uma jornada que vai além do código.</h2></div><Link href="/trajetoria" className="inline-flex items-center gap-2 text-sm text-blue-300">Conhecer minha trajetória <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        <p className="text-slate-400 leading-relaxed max-w-2xl mt-5">A formação no IFRO, a experiência de estudar em outro país e os novos desafios da universidade fazem parte do caminho que me trouxe até aqui.</p>
        <ol className="grid md:grid-cols-3 gap-8 mt-10">
          {[{ icon: Cpu, year: '2022–2025', title: 'As primeiras construções', place: 'IFRO · Porto Velho Calama', text: 'Formação técnica em Informática, pesquisa no GP Mecatrônica e os primeiros projetos com robôs, sensores e Internet das Coisas.' },
            { icon: Globe2, year: '2024', title: 'Outras perspectivas', place: 'Argentina · AFS', text: 'Intercâmbio pelo Programa de Mobilidade STEAM Internacional, aproximando a formação em tecnologia da educação intercultural.' },
            { icon: GraduationCap, year: 'Desde 2025', title: 'Novas perguntas', place: 'UNIR · Ciência da Computação', text: 'Graduação, pesquisa e extensão com qualidade do ar, desenvolvimento de software e computação gráfica.' }].map(moment => <li key={moment.place} className="relative border-l border-blue-500/40 pl-6"><span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-400" aria-hidden="true" /><p className="eyebrow">{moment.year}</p><moment.icon className="text-blue-300 mt-5" size={27} aria-hidden="true" /><h3 className="text-xl font-bold mt-4">{moment.title}</h3><p className="text-sm text-blue-300 mt-2">{moment.place}</p><p className="text-sm text-slate-400 leading-relaxed mt-4">{moment.text}</p></li>)}
        </ol>
      </div>
    </section>

    {hasMoments && <section className="max-w-6xl mx-auto px-6 py-12" aria-labelledby="moments-title">
      <p className="eyebrow">Entre apresentações e descobertas</p><h2 id="moments-title" className="text-3xl md:text-4xl font-bold mt-3">Histórias em imagens.</h2><p className="text-slate-400 leading-relaxed mt-5 max-w-2xl">Registros dos encontros, das trocas e das experiências que também fazem parte da minha formação.</p>
      <div className="space-y-12 mt-10">
        <ProjectGallery images={settings.conference_photos} title="Congressos e apresentações" heading="Compartilhando o que construo" home />
        <ProjectGallery images={settings.exchange_photos} title="Intercâmbio na Argentina" heading="Vivendo outras perspectivas" home />
      </div>
    </section>}

    <section className="max-w-6xl mx-auto px-6 py-16"><div className="glass rounded-2xl p-8 md:p-12"><p className="eyebrow">Áreas de interesse</p><h2 className="text-3xl font-bold mt-3">Tecnologia aplicada à pesquisa</h2><div className="grid md:grid-cols-3 gap-6 mt-8 text-slate-300">{[{ icon: BrainCircuit, title: 'Inteligência Artificial', text: 'Interesse em aplicações de inteligência artificial e desenvolvimento de sistemas.' }, { icon: Cpu, title: 'Internet das Coisas', text: 'Sensoriamento, dispositivos embarcados e análise de dados.' }, { icon: Layers3, title: 'Sistemas Computacionais', text: 'Desenvolvimento de software e computação gráfica.' }].map(area => <div key={area.title}><area.icon aria-hidden="true" className="text-blue-400 mb-3" /><h3 className="font-bold">{area.title}</h3><p className="text-sm text-slate-400 mt-2">{area.text}</p></div>)}</div></div></section>
    {news.length > 0 && <section className="max-w-6xl mx-auto px-6 py-8"><h2 className="text-3xl font-bold">Últimas notícias</h2><div className="grid md:grid-cols-3 gap-5 mt-8">{news.slice(0, 3).map(item => <article className="glass rounded-xl p-6" key={item.id}><p className="text-sm text-slate-400">{formatDate(item.published_at)}</p><h3 className="text-xl font-bold mt-3"><Link href={`/noticias/${item.slug}`}>{item.title}</Link></h3><p className="text-slate-400 mt-3">{item.summary}</p></article>)}</div></section>}
  </main>;
}
