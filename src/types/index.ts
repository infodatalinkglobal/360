export type Day='Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'|'Sun';
export type Show={id:string;name:string;host:string;description:string;days:Day[];startTime:string;endTime:string;timezone:'Africa/Accra';category:string;color:string};
export type NowPlaying={songTitle:string;artistName:string;showName:string;listenerCount:number;isLive:boolean;isDemo:boolean};
export type AzuraCastNowPlaying={now_playing:{song:{title:string;artist:string;art:string};played_at:number};live:{is_live:boolean;streamer_name:string};listeners:{current:number};station:{name:string;description:string}};
