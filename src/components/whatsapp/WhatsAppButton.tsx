import Link from 'next/link';
import {messages,whatsappReady,whatsappUrl} from '@/lib/whatsapp';
import Icon from '@/components/ui/Icon';
export default function WhatsAppButton({type='chat',children,className='btn btn-outline'}:{type?:keyof typeof messages;children:React.ReactNode;className?:string}){return <Link className={className} href={whatsappReady?whatsappUrl(messages[type]):'/contact#whatsapp'} target={whatsappReady?'_blank':undefined} rel={whatsappReady?'noopener noreferrer':undefined}><Icon name="chat"/>{children}</Link>}
