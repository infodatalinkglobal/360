'use client';
import {useEffect,useRef,useState} from 'react';
const urls={low:process.env.NEXT_PUBLIC_STREAM_URL_LOW,high:process.env.NEXT_PUBLIC_STREAM_URL_HIGH};
export function useRadioPlayer(){
 const audioRef=useRef<HTMLAudioElement>(null);const [playing,setPlaying]=useState(false);const [loading,setLoading]=useState(false);const [error,setError]=useState('');const [quality,setQuality]=useState<'low'|'high'>('low');const [volume,setVolumeState]=useState(.8);
 useEffect(()=>{try{if(localStorage.getItem('360-quality')==='high')setQuality('high')}catch{}},[]);
 function valid(q:'low'|'high'){return !!urls[q]&&!urls[q]!.includes('your-stream-url')}
 async function start(q=quality){const audio=audioRef.current;if(!audio)return;setError('');if(!valid(q)){setError('We’re getting ready to go live. The demo is ready to explore; the station’s stream will be connected soon.');return}setLoading(true);try{if(audio.getAttribute('src')!==urls[q]){audio.src=urls[q]!;audio.load()}await audio.play()}catch(e){if((e as DOMException).name!=='AbortError'){setError('The stream is unavailable right now. Check your connection and try again.');setPlaying(false)}}finally{setLoading(false)}}
 function toggle(){const audio=audioRef.current;if(!audio)return;if(playing||loading){audio.pause();setLoading(false)}else void start()}
 function changeQuality(q:'low'|'high'){if(q===quality)return;const resume=playing||loading;audioRef.current?.pause();setQuality(q);try{localStorage.setItem('360-quality',q)}catch{}if(resume)void start(q)}
 function setVolume(value:number){setVolumeState(value);if(audioRef.current)audioRef.current.volume=value}
 useEffect(()=>{if(audioRef.current)audioRef.current.volume=.8},[]);
 const audioEvents={onPlaying:()=>{setPlaying(true);setLoading(false);setError('')},onPause:()=>setPlaying(false),onWaiting:()=>setLoading(true),onCanPlay:()=>setLoading(false),onEnded:()=>{setPlaying(false);setLoading(false)},onError:()=>{setError('The stream is offline or your connection was interrupted. Tap play to retry.');setPlaying(false);setLoading(false)}};
 return {audioRef,playing,loading,error,quality,volume,toggle,changeQuality,setVolume,audioEvents,clearError:()=>setError('')};
}
