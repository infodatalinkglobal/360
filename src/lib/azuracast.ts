import {AzuraCastNowPlaying,NowPlaying} from '@/types';
import {currentShow} from '@/data/schedule';
export const apiUrl=process.env.NEXT_PUBLIC_AZURACAST_API_URL;
export const isMock=!apiUrl||apiUrl.includes('your-azuracast');
export function mockNowPlaying():NowPlaying{return {songTitle:'Good Vibes',artistName:'360 Yield Radio',showName:currentShow().name,listenerCount:0,isLive:false,isDemo:true}}
export async function fetchNowPlaying(signal:AbortSignal):Promise<NowPlaying>{
 if(isMock)return mockNowPlaying();
 const res=await fetch(apiUrl!,{signal,cache:'no-store'});if(!res.ok)throw new Error('Now playing unavailable');
 const data:AzuraCastNowPlaying=await res.json();
 return {songTitle:data.now_playing?.song?.title||'360 Yield Radio',artistName:data.now_playing?.song?.artist||'Music for the community',showName:data.live?.is_live?(data.live.streamer_name||'Live on 360'):'Nonstop 360 · AutoDJ',listenerCount:data.listeners?.current||0,isLive:data.live?.is_live||false,isDemo:false};
}
