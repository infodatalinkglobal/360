import type { Config } from 'tailwindcss';
export default { content:['./src/**/*.{ts,tsx}'], safelist:['art-gold','art-purple','art-red','art-green'], theme:{extend:{colors:{ink:'#0b0b0d',panel:'#141416',brand:'#fa333a',muted:'#969699'},fontFamily:{sans:['Inter','Arial','Helvetica','sans-serif']}}},plugins:[] } satisfies Config;
