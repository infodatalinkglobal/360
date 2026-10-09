'use client';
import {useEffect,useState} from 'react';
import Icon from './Icon';
type InstallEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export default function InstallPrompt(){const [event,setEvent]=useState<InstallEvent|null>(null);const [ready,setReady]=useState(false);
useEffect(()=>{const handle=(e:Event)=>{e.preventDefault();setEvent(e as InstallEvent)};window.addEventListener('beforeinstallprompt',handle);const timeout=setTimeout(()=>{try{if(!sessionStorage.getItem('install-dismissed'))setReady(true)}catch{setReady(true)}},30000);return()=>{clearTimeout(timeout);window.removeEventListener('beforeinstallprompt',handle)}},[]);
if(!event||!ready)return null;return <div className="install-prompt"><div><strong>Take 360 with you.</strong><p className="mt-1 text-xs text-muted">Install the app. No app store needed.</p></div><button className="btn btn-red" onClick={async()=>{await event.prompt();await event.userChoice;setEvent(null)}}><Icon name="download"/>Install</button><button aria-label="Dismiss install prompt" className="icon-button" onClick={()=>{setReady(false);try{sessionStorage.setItem('install-dismissed','1')}catch{}}}><Icon name="close"/></button></div>}
