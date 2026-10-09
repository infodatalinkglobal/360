'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Icon from '@/components/ui/Icon';
// Caster.fm owns playback inside a cross-origin frame. These links take the
// listener to its real controls instead of pretending to remotely press Play.
export function PlayButton({large=false,label=false}:{large?:boolean;label?:boolean}) {
  const path=usePathname();
  const href=path==='/'||path==='/live'?'#radio-player':'/live#radio-player';
  return <Link href={href} className={label?'btn btn-red':`play-button ${large?'play-large':''}`} aria-label="Listen live — go to radio player"><Icon name="play" className={large?'h-7 w-7':'h-5 w-5'}/>{label&&'Listen live'}</Link>;
}
