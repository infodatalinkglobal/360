'use client';
import {usePlayer} from './PlayerProvider';
export default function NowPlaying(){const {now}=usePlayer();return <div className="min-w-0"><p className="truncate text-sm font-bold">{now.songTitle}</p><p className="mt-1 truncate text-xs text-muted">{now.artistName}{now.stale?' · Last updated info':` · ${now.showName}`}</p></div>}
