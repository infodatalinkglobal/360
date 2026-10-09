'use client';
import {useEffect,useState} from 'react';
import {fetchNowPlaying,isMock,mockNowPlaying} from '@/lib/azuracast';
export function useNowPlaying(){const [info,setInfo]=useState(mockNowPlaying);const [stale,setStale]=useState(false);
 useEffect(()=>{const controller=new AbortController();let busy=false;

 // A fresh abort controller is created for each polling cycle, so one timeout cannot poison future requests.
 let active:AbortController|undefined;
 async function poll(){if(document.hidden||busy)return;busy=true;active=new AbortController();const timer=setTimeout(()=>active?.abort(),12000);try{const data=await fetchNowPlaying(active.signal);if(!controller.signal.aborted){setInfo(data);setStale(false)}}catch{if(!controller.signal.aborted)setStale(true)}finally{busy=false;clearTimeout(timer)}}
 void poll();const interval=setInterval(poll,15000);document.addEventListener('visibilitychange',poll);return()=>{controller.abort();active?.abort();clearInterval(interval);document.removeEventListener('visibilitychange',poll)}},[]);
 return {...info,isDemo:isMock,stale};}
