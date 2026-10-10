import Image from 'next/image';
import Link from 'next/link';
export default function Logo({size=72}:{size?:number}){return <Link href="/" className="logo" aria-label="360 Yield Radio Ghana home"><Image src="/brand/logo-360-yield-radio.jpg" alt="360 Yield Radio Ghana logo" width={size} height={size} priority className="rounded-xl"/></Link>}
