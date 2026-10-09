import {Day,Show} from '@/types';
export const days:Day[]=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const all=days;const weekdays=days.slice(0,5);
export const shows:Show[]=[
{id:'sunrise',name:'Accra Wake Up',host:'Kofi & Ama',description:'Good energy, fresh headlines and the tunes to get your day moving.',days:weekdays,startTime:'06:00',endTime:'10:00',timezone:'Africa/Accra',category:'MORNING SHOW',color:'gold'},
{id:'midday',name:'The Midday Mix',host:'DJ Kweku',description:'Your afternoon soundtrack. Afrobeats, highlife and all the songs you love.',days:all,startTime:'10:00',endTime:'14:00',timezone:'Africa/Accra',category:'MUSIC & VIBES',color:'purple'},
{id:'drive',name:'The 360 Drive',host:'Jay & Naa',description:'From the trotro to your front door. Big tunes, real talk and plenty of laughs.',days:weekdays,startTime:'14:00',endTime:'18:00',timezone:'Africa/Accra',category:'DRIVE TIME',color:'red'},
{id:'street',name:'Word on the Street',host:'Nana Yaw',description:'The conversations everyone is having. Culture, community and unfiltered opinions.',days:all,startTime:'18:00',endTime:'21:00',timezone:'Africa/Accra',category:'CULTURE & CONVERSATION',color:'green'},
{id:'after',name:'After Hours',host:'DJ Esi',description:'Slow it down with soulful favourites, smooth R&B and late-night connections.',days:all,startTime:'21:00',endTime:'00:00',timezone:'Africa/Accra',category:'LATE NIGHT',color:'purple'},
{id:'weekend',name:'Weekend Junction',host:'The 360 Crew',description:'Your weekend link-up. New artists, big stories and music without borders.',days:['Sat','Sun'],startTime:'06:00',endTime:'10:00',timezone:'Africa/Accra',category:'WEEKEND SPECIAL',color:'gold'},
{id:'weekend-mix',name:'Weekend Heat',host:'DJ Kweku',description:'Turn your weekend up with a nonstop mix of Ghana’s freshest sounds.',days:['Sat','Sun'],startTime:'14:00',endTime:'18:00',timezone:'Africa/Accra',category:'WEEKEND MIX',color:'red'},
{id:'autodj',name:'Nonstop 360',host:'AutoDJ',description:'The music never sleeps. Your favourite tracks, all through the night.',days:all,startTime:'00:00',endTime:'06:00',timezone:'Africa/Accra',category:'NONSTOP MUSIC',color:'green'}];
export function accraNow(){const d=new Date();return {day:new Intl.DateTimeFormat('en-GB',{weekday:'short',timeZone:'Africa/Accra'}).format(d) as Day,time:new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZone:'Africa/Accra'}).format(d)}}
export function currentShow(){const {day,time}=accraNow();return shows.find(s=>s.days.includes(day)&&time>=s.startTime&&time<(s.endTime==='00:00'?'24:00':s.endTime))||shows[7]}
export function nextShow(){const current=currentShow();const {day}=accraNow();return shows.find(s=>s.days.includes(day)&&s.startTime===current.endTime)||shows[7]}
export function timeLabel(time:string){const [h,m]=time.split(':').map(Number);return `${h%12||12}${m?':'+String(m).padStart(2,'0'):''} ${h>=12?'PM':'AM'}`}
