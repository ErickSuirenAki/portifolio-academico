import type { ReactNode, SVGProps } from 'react';
import { BookOpen, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { contact } from '@/lib/contact';

function OrcidIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
    <circle cx="12" cy="12" r="9.25" />
    <circle cx="7.7" cy="7.5" r=".9" fill="currentColor" stroke="none" />
    <path d="M7.7 10v6.5M11 7.5h2.1a4.5 4.5 0 0 1 0 9H11z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function SocialLink({ href, label, children, external = true }: { href: string; label: string; children: ReactNode; external?: boolean }) {
  return <a href={href} aria-label={label} title={label} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="inline-flex size-11 items-center justify-center rounded-full text-slate-400 hover:text-blue-300 hover:bg-blue-500/10 focus-visible:text-blue-300 transition">
    {children}
  </a>;
}

export function SocialLinks({ github, lattes }: { github?: string; lattes?: string }) {
  return <nav aria-label="Redes sociais e contato" className="flex flex-wrap gap-3 mt-8 -ml-2.5">
    {github && <SocialLink href={github} label="GitHub"><Github size={24} aria-hidden="true" /></SocialLink>}
    {lattes && <SocialLink href={lattes} label="Currículo Lattes"><BookOpen size={24} aria-hidden="true" /></SocialLink>}
    <SocialLink href={contact.instagram} label="Instagram: @ericksuirenaki"><Instagram size={24} aria-hidden="true" /></SocialLink>
    <SocialLink href={contact.orcid} label="ORCID"><OrcidIcon width={24} height={24} aria-hidden="true" /></SocialLink>
    <SocialLink href={contact.linkedin} label="LinkedIn"><Linkedin size={24} aria-hidden="true" /></SocialLink>
    {contact.email && <SocialLink href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contact.email)}`} label={`Enviar e-mail pelo Gmail: ${contact.email}`}><Mail size={24} aria-hidden="true" /></SocialLink>}
  </nav>;
}
