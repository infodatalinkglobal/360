'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Icon from '@/components/ui/Icon';
export default function BottomNav(){const p=usePathname();return <nav className="bottom-nav lg:hidden" aria-label="Quick navigation">{[['/','Home','home'],['/live','Live','headphones'],['/schedule','Schedule','calendar'],['/contact','Contact','chat']].map(([href,label,icon])=><Link key={href} href={href} aria-current={p===href?'page':undefined} className={p===href?'text-brand':'text-muted'}><Icon name={icon}/><span>{label}</span></Link>)}</nav>}
