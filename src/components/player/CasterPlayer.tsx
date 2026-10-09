'use client';

import {useEffect, useRef, useState} from 'react';
import Icon from '@/components/ui/Icon';

export default function CasterPlayer() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(400);
  const [attempt, setAttempt] = useState(0);
  const [slow, setSlow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setSlow(true), 15000);
    function receive(event: MessageEvent) {
      // Only accept resize reports from our own wrapper, never arbitrary frames.
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== '360-caster-size') return;
      if (Number.isFinite(event.data.height)) setHeight(Math.max(160, Math.min(1600, Math.ceil(event.data.height))));
      if (event.data.ready) {
        setReady(true);
        setSlow(false);
        window.clearTimeout(timeout);
      }
    }
    window.addEventListener('message', receive);
    return () => { window.clearTimeout(timeout); window.removeEventListener('message', receive); };
  }, [attempt]);

  function retry() { setReady(false); setSlow(false); setHeight(400); setAttempt(value => value + 1); }

  return <section id="radio-player" aria-label="360 Yield Radio live player" className="scroll-mt-6 overflow-hidden rounded-xl border border-white/10 bg-panel">
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5">
      <div><p className="eyebrow !mb-2 text-brand">LISTEN TO 360 YIELD RADIO</p><h2 className="text-xl font-bold">Your station. One tap away.</h2></div>
      <span className="flex items-center gap-2 text-xs text-muted"><Icon name="headphones"/>Powered by Caster.fm</span>
    </div>
    <div className="mx-3 overflow-hidden rounded-lg bg-white sm:mx-5">
      <iframe key={attempt} ref={frame} src="/caster-player.html" title="360 Yield Radio Ghana live stream player" allow="autoplay" height={height} className="block w-full border-0"/>
    </div>
    <div className="px-5 py-4">
      <p className="text-xs leading-6 text-muted">Press play in the widget to listen. Playback and station status are provided by Caster.fm.</p>
      {slow && !ready && <p role="status" className="mt-2 text-xs leading-6 text-amber-300">The player is taking longer to load. Check your connection or content blocker, then try again.</p>}
      <div className="mt-2 flex flex-wrap items-center gap-x-5">
        <a href="/caster-player.html" target="_blank" rel="noopener noreferrer" className="text-link">Open player in a new tab<Icon name="up"/></a>
        <button type="button" onClick={retry} className="text-link">Reload player</button>
      </div>
      <p className="text-[10px] leading-5 text-muted">Keep the player tab open to listen while browsing. Switching pages here reloads the widget.</p>
    </div>
  </section>;
}
