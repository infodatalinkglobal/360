'use client';
import {createContext,useContext,ReactNode} from 'react';
import {useRadioPlayer} from '@/hooks/useRadioPlayer';
import {useNowPlaying} from '@/hooks/useNowPlaying';
import Icon from '@/components/ui/Icon';
const Context=createContext<(ReturnType<typeof useRadioPlayer>&{now:ReturnType<typeof useNowPlaying>})|null>(null);
export const usePlayer=()=>{const ctx=useContext(Context);if(!ctx)throw new Error('Player provider missing');return ctx};
export default function PlayerProvider({children}:{children:ReactNode}){const player=useRadioPlayer();const now=useNowPlaying();return <Context.Provider value={{...player,now}}><audio ref={player.audioRef} {...player.audioEvents} preload="none"/>{children}{player.error&&<div role="alert" className="player-alert"><div className="flex gap-3"><Icon name="signal" className="h-6 w-6 shrink-0 text-brand"/><div><strong className="text-sm">A little quiet, for now.</strong><p className="mt-2 text-sm leading-relaxed text-muted">{player.error}</p></div><button aria-label="Dismiss message" className="icon-button shrink-0" onClick={player.clearError}><Icon name="close"/></button></div></div>}</Context.Provider>}
