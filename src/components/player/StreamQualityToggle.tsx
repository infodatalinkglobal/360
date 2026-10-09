'use client';
import {usePlayer} from './PlayerProvider';
import Icon from '@/components/ui/Icon';
export default function StreamQualityToggle(){const {quality,changeQuality}=usePlayer();return <div className="quality-toggle" aria-label="Stream quality">{(['low','high'] as const).map(q=><button key={q} onClick={()=>changeQuality(q)} aria-pressed={quality===q} className={quality===q?'selected':''}><Icon name={q==='low'?'signal':'music'} className="h-3.5 w-3.5"/>{q==='low'?'Data Saver':'High Quality'}</button>)}</div>}
