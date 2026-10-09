'use client';
import {usePathname} from 'next/navigation';
import WhatsAppButton from './WhatsAppButton';
export default function WhatsAppFAB(){const path=usePathname();if(path==='/live')return null;return <WhatsAppButton className="whatsapp-fab"><span className="sr-only">Chat with us on WhatsApp</span></WhatsAppButton>}
