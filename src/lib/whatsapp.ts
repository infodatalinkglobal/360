export const whatsappNumber=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'';
export const whatsappReady=/^\d{10,15}$/.test(whatsappNumber);
export const messages={chat:'Hi 360 Yield Radio! 🎙️',request:'🎵 Song Request: [Song Name] - [Artist Name]',shoutout:'📢 Shoutout: [Your message here]'};
export function whatsappUrl(message:string){return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
