'use client';
import {usePlayer} from '@/components/player/PlayerProvider';
export default function LiveBadge(){const {now}=usePlayer();return <span className="live-badge"><span className="live-dot"/>{now.isDemo?'DEMO':now.isLive?'LIVE':'ON AIR'}</span>}
