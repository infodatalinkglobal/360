'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import Logo from './Logo';
import Icon from '@/components/ui/Icon';
import {PlayButton} from '@/components/player/PlayerControls';
const links=[['/','Home'],['/live','Listen Live'],['/schedule','Schedule'],['/shows','Shows'],['/about','About'],['/contact','Contact']];
export default function Navbar(){const path=usePathname();const [open,setOpen]=useState(false);return <header className="site-header"><div className="container flex h-[88px] items-center justify-between gap-8"><Logo/><nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">{links.map(([href,text])=><Link key={href} href={href} aria-current={path===href?'page':undefined} className={`nav-link ${path===href?'active':''}`}>{text}</Link>)}</nav><div className="hidden lg:block"><PlayButton label/></div><button onClick={()=>setOpen(!open)} className="icon-button lg:hidden" aria-label="Toggle menu" aria-expanded={open}><Icon name={open?'close':'menu'}/></button></div>{open&&<nav className="mobile-menu lg:hidden" aria-label="Mobile menu">{links.map(([href,text])=><Link onClick={()=>setOpen(false)} key={href} href={href} className={path===href?'text-brand':''}>{text}</Link>)}</nav>}</header>}
