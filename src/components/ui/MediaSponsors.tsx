import Image from 'next/image';
const sponsors=[
  {name:'Royal Roots Studio',src:'/sponsors/royal-roots-studio.jpg',fit:'object-cover'},
  {name:'Royal Roots S.E. Asia Entertainment',src:'/sponsors/royal-roots-se-asia.jpg',fit:'object-cover'},
  {name:'REG Events',src:'/sponsors/reg-events.jpg',fit:'object-contain'}
];
export default function MediaSponsors(){return <section className="container section-block" aria-labelledby="sponsors-heading"><div className="section-heading"><div><p className="eyebrow">WITH THANKS TO</p><h2 id="sponsors-heading">Our media sponsors.</h2></div></div><ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">{sponsors.map(s=><li key={s.name} className="flex flex-col items-center gap-4 text-center"><div className="relative aspect-square w-40 overflow-hidden rounded-full bg-white sm:w-full sm:max-w-[200px]"><Image src={s.src} alt={`${s.name} logo`} fill sizes="(min-width:640px) 200px, 160px" className={s.fit}/></div><p className="text-sm font-semibold">{s.name}</p></li>)}</ul></section>}
