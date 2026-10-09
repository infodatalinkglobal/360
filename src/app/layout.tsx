import type {Metadata,Viewport} from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import WhatsAppFAB from '@/components/whatsapp/WhatsAppFAB';
import InstallPrompt from '@/components/ui/InstallPrompt';
export const metadata:Metadata={title:{default:'360 Yield Radio Ghana — Your city. Your sound.',template:'%s | 360 Yield Radio Ghana'},description:'Big tunes. Real conversations. Pure Ghanaian energy. Listen to 360 Yield Radio Ghana, your online entertainment radio station.',manifest:'/manifest.json',appleWebApp:{capable:true,statusBarStyle:'black-translucent',title:'360 Yield Radio'},icons:{icon:'/favicon.ico',apple:'/icons/apple-touch-icon.png'}};
export const viewport:Viewport={themeColor:'#ff0000',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){const ga=process.env.NEXT_PUBLIC_GA_ID;const validGa=ga&&/^G-[A-Z0-9]+$/.test(ga)&&!ga.includes('XXXX');return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a><Navbar/><main id="main">{children}</main><Footer/><WhatsAppFAB/><BottomNav/><InstallPrompt/>{validGa&&<><Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive"/><Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}</Script></>}</body></html>}
