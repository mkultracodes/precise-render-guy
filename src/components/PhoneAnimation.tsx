import { useState, useEffect, useCallback } from "react";
import bearMascot from "@/assets/repair-bear-mascot.jpg";

type Phase = 'intro' | 'broken' | 'fade1' | 'bear' | 'fade2' | 'typing1' | 'reply1' | 'typing2' | 'reply2' | 'fade3';

const TIMINGS: Record<Phase, number> = {
  intro: 400,
  broken: 2000,
  fade1: 500,
  bear: 2500,
  fade2: 600,
  typing1: 2000,
  reply1: 2200,
  typing2: 1800,
  reply2: 3000,
  fade3: 1200,
};

const PHASE_ORDER: Phase[] = ['intro', 'broken', 'fade1', 'bear', 'fade2', 'typing1', 'reply1', 'typing2', 'reply2', 'fade3'];

// Hybrid B+C — Geometric shards with jagged crack lines
const SHARDS: { clip: string; tx: string; ty: string; rot: string; delay: string }[] = [
  { clip: 'polygon(0% 0%, 48% 0%, 50% 35%, 25% 38%)', tx: '-2px', ty: '-1px', rot: '-0.5deg', delay: '0.05s' },
  { clip: 'polygon(48% 0%, 100% 0%, 100% 20%, 52% 33%)', tx: '2px', ty: '-2px', rot: '0.8deg', delay: '0.08s' },
  { clip: 'polygon(100% 20%, 100% 50%, 55% 45%, 52% 33%)', tx: '3px', ty: '1px', rot: '0.4deg', delay: '0.12s' },
  { clip: 'polygon(50% 35%, 55% 45%, 60% 70%, 30% 65%)', tx: '1px', ty: '2px', rot: '-0.3deg', delay: '0.1s' },
  { clip: 'polygon(0% 0%, 25% 38%, 20% 60%, 0% 55%)', tx: '-3px', ty: '1px', rot: '-0.6deg', delay: '0.07s' },
  { clip: 'polygon(0% 55%, 20% 60%, 30% 65%, 25% 100%, 0% 100%)', tx: '-2px', ty: '2px', rot: '0.5deg', delay: '0.14s' },
  { clip: 'polygon(25% 100%, 30% 65%, 60% 70%, 65% 100%)', tx: '0px', ty: '3px', rot: '-0.2deg', delay: '0.16s' },
  { clip: 'polygon(65% 100%, 60% 70%, 55% 45%, 100% 50%, 100% 100%)', tx: '2px', ty: '2px', rot: '0.6deg', delay: '0.13s' },
  { clip: 'polygon(20% 60%, 25% 38%, 50% 35%, 30% 65%)', tx: '-1px', ty: '1px', rot: '0.3deg', delay: '0.09s' },
  { clip: 'polygon(100% 50%, 55% 45%, 60% 70%, 100% 75%)', tx: '3px', ty: '-1px', rot: '-0.4deg', delay: '0.11s' },
  { clip: 'polygon(100% 75%, 60% 70%, 65% 100%, 100% 100%)', tx: '1px', ty: '3px', rot: '0.7deg', delay: '0.15s' },
];

const CRACK_PATHS = [
  // Scattered cracks from multiple impact points across the screen
  "M30,50 L25,35 L32,18 L28,0",
  "M30,50 L48,42 L62,28 L70,0",
  "M30,50 L15,65 L8,82 L0,95",
  "M30,50 L45,62 L55,80",
  "M150,100 L165,82 L178,60 L190,35 L200,15",
  "M150,100 L168,112 L188,125 L200,135",
  "M150,100 L138,78 L125,55 L118,30 L112,0",
  "M150,100 L140,120 L130,148",
  "M80,280 L65,260 L52,238 L40,210 L30,185",
  "M80,280 L95,258 L108,232 L118,205",
  "M80,280 L70,305 L58,335 L48,365 L40,400",
  "M80,280 L98,300 L115,328 L130,360 L142,400",
  "M160,320 L175,298 L188,272 L200,250",
  "M160,320 L148,345 L138,372 L130,400",
  "M160,320 L178,340 L192,365 L200,385",
  // Cross connections between impact zones
  "M55,80 L75,95 L100,108 L130,148",
  "M30,185 L55,195 L80,210 L118,205",
  "M150,100 L142,135 L130,170 L115,210 L100,245 L80,280",
];

const ShatteredScreen = () => (
  <div className="absolute inset-0 pointer-events-none z-20">
    {/* Layer 1: Geometric shards */}
    {SHARDS.map((s, i) => (
      <div key={i} className="absolute inset-0 shard-shift" style={{
        clipPath: s.clip,
        background: `rgba(255,255,255,${0.03 + (i % 3) * 0.02})`,
        boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.25), inset 0 0 12px rgba(255,255,255,0.04)',
        '--shard-tx': s.tx,
        '--shard-ty': s.ty,
        '--shard-rot': s.rot,
        animationDelay: s.delay,
      } as React.CSSProperties} />
    ))}
    {/* Layer 2: Jagged crack lines */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 400" preserveAspectRatio="none">
      {CRACK_PATHS.map((d, i) => (
        <path key={i} d={d} fill="none"
          stroke={i < 9 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)"}
          strokeWidth={i < 9 ? "0.9" : "0.5"}
          strokeLinecap="round"
          className="crack-line-draw"
          style={{ animationDelay: `${0.03 * i}s` }} />
      ))}
    </svg>
    {/* Layer 3: Multiple impact glows */}
    <div className="absolute" style={{
      top: '10%', left: '8%', width: '18%', height: '10%',
      background: 'radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%)',
      filter: 'blur(2px)',
    }} />
    <div className="absolute" style={{
      top: '22%', left: '65%', width: '20%', height: '10%',
      background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)',
      filter: 'blur(2px)',
    }} />
    <div className="absolute" style={{
      top: '65%', left: '30%', width: '18%', height: '10%',
      background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)',
      filter: 'blur(2px)',
    }} />
    <div className="absolute" style={{
      top: '75%', left: '70%', width: '16%', height: '10%',
      background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)',
      filter: 'blur(2px)',
    }} />
  </div>
);

const CHAT_PHASES: Phase[] = ['typing1', 'reply1', 'typing2', 'reply2', 'fade3'];

const PhoneAnimation = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [typedText, setTypedText] = useState("");

  const msg1 = "My iPhone screen is cracked";
  const msg2 = "Find a repair provider near me asap";

  // Preload bear image to prevent glitching
  useEffect(() => {
    const img = new Image();
    img.src = bearMascot;
  }, []);

  const startSequence = useCallback(() => {
    setPhase('intro');
    setTypedText("");
  }, []);

  useEffect(() => {
    const currentIndex = PHASE_ORDER.indexOf(phase);
    const duration = TIMINGS[phase];
    const timer = setTimeout(() => {
      if (phase === 'fade3') {
        startSequence();
      } else {
        setPhase(PHASE_ORDER[currentIndex + 1]);
      }
    }, duration);
    return () => clearTimeout(timer);
  }, [phase, startSequence]);

  useEffect(() => {
    if (phase !== 'typing1' && phase !== 'typing2') return;
    const text = phase === 'typing1' ? msg1 : msg2;
    setTypedText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [phase]);

  const isChat = CHAT_PHASES.includes(phase);
  const isBearOrFade2 = phase === 'bear' || phase === 'fade2';

  return (
    <div className="relative flex justify-center lg:justify-start">
      <div className="absolute inset-0 bg-primary/8 rounded-full blur-3xl scale-75 animate-glow-pulse" />

      <div
        className="phone-drop-in relative w-56 sm:w-64 md:w-72 lg:w-80 aspect-[9/17] rounded-[2.5rem] border-[3px] border-border/30 shadow-2xl overflow-hidden"
        style={{ background: 'hsl(20 28% 7%)' }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-2xl z-20" style={{ background: 'hsl(20 22% 5%)' }} />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full z-30 flex items-center justify-center" style={{ background: 'hsl(20 22% 4%)' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(20 16% 12%)' }} />
        </div>

        {/* Persistent hidden bear image — always in DOM, never remounted */}
        <img
          src={bearMascot}
          alt=""
          className="absolute w-0 h-0 opacity-0 pointer-events-none"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center p-6">

          {/* Phase: intro — empty dark screen after drop */}
          {phase === 'intro' && <div className="absolute inset-0" />}

          {/* Phase: broken — shatter + text appear together */}
          {phase === 'broken' && (
            <>
              <div className="text-center animate-fade-in z-10 relative">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider leading-tight"
                  style={{ fontFamily: 'var(--font-display)', color: 'hsl(35 20% 90%)' }}>
                  BROKEN<br />PHONE?
                </p>
              </div>
              <ShatteredScreen />
            </>
          )}

          {/* Phase: fade1 — both crack + text fade out */}
          {phase === 'fade1' && (
            <div className="animate-fade-out absolute inset-0 flex items-center justify-center">
              <div className="text-center z-10 relative">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider leading-tight"
                  style={{ fontFamily: 'var(--font-display)', color: 'hsl(35 20% 90%)' }}>
                  BROKEN<br />PHONE?
                </p>
              </div>
              <ShatteredScreen />
            </div>
          )}

          {/* Bear intro + fade */}
          {isBearOrFade2 && (
            <div className={`flex flex-col items-center gap-3 ${phase === 'bear' ? 'animate-fade-in' : 'animate-fade-out'}`}>
              <div className="relative">
                <img src={bearMascot} alt="Repair Bear" className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 shadow-lg" />
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2" style={{ borderColor: 'hsl(20 28% 7%)' }}>
                  <div className="w-4 h-4 rounded-full bg-success absolute inset-0" />
                  <div className="w-4 h-4 rounded-full bg-success absolute inset-0 animate-green-glow" />
                </div>
              </div>
              <p className="text-xl font-bold tracking-wide" style={{ color: 'hsl(35 20% 75%)', fontFamily: 'var(--font-display)' }}>Repair Bear</p>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <div className="w-2 h-2 rounded-full bg-success absolute inset-0 animate-green-glow" />
                </div>
                <span className="text-xs" style={{ color: 'hsl(var(--success))' }}>Online now</span>
              </div>
            </div>
          )}

          {/* Chat phases — single persistent container, content changes inside */}
          {isChat && (
            <div className={`w-full px-2 flex flex-col h-full pt-14 pb-8 ${phase === 'fade3' ? 'animate-fade-out' : (phase === 'typing1' ? 'animate-fade-in' : '')}`}>
              {phase !== 'fade3' && (
                <>
                  {/* Persistent chat header — never remounts across chat phases */}
                  <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: '1px solid hsl(20 16% 16%)' }}>
                    <img src={bearMascot} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs font-medium" style={{ color: 'hsl(35 20% 75%)', fontFamily: 'var(--font-display)' }}>Repair Bear</span>
                    <div className="relative ml-auto">
                      <div className="w-1.5 h-1.5 rounded-full bg-success" />
                      <div className="w-1.5 h-1.5 rounded-full bg-success absolute inset-0 animate-green-glow" />
                    </div>
                  </div>

                  <div className="flex-1" />

                  {/* Message 1 — user typing */}
                  {phase === 'typing1' && (
                    <div className="flex justify-end">
                      <div className="rounded-2xl rounded-br-md px-3 py-2 max-w-[85%]" style={{ background: 'hsl(var(--primary) / 0.2)' }}>
                         <p className="text-sm" style={{ color: 'hsl(35 20% 90%)' }}>{typedText}<span className="typing-cursor">|</span></p>
                       </div>
                     </div>
                   )}

                   {/* User message 1 — sent */}
                   {(phase === 'reply1' || phase === 'typing2' || phase === 'reply2') && (
                     <div className="flex justify-end mb-3">
                       <div className="rounded-2xl rounded-br-md px-3 py-2.5 max-w-[85%]" style={{ background: 'hsl(var(--primary) / 0.2)' }}>
                         <p className="text-sm" style={{ color: 'hsl(35 20% 90%)' }}>{msg1}</p>
                       </div>
                     </div>
                   )}

                   {/* Persistent assistant estimate row — avatar stays mounted */}
                   {(phase === 'reply1' || phase === 'typing2' || phase === 'reply2') && (
                     <div className="flex items-start gap-2 mb-3">
                       <img src={bearMascot} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                       <div className="rounded-2xl rounded-bl-md px-3 py-2.5 min-w-0" style={{ background: 'hsl(20 16% 14%)' }}>
                         <p className="text-sm" style={{ color: 'hsl(35 20% 75%)' }}>Screen repair estimate:</p>
                         <p className="text-base font-bold text-primary mt-0.5" style={{ fontFamily: 'var(--font-display)' }}>$79 – $129</p>
                         {phase === 'reply1' && (
                           <p className="text-xs mt-1 animate-fade-in" style={{ color: 'hsl(30 10% 45%)' }}>3 shops near you</p>
                         )}
                       </div>
                     </div>
                   )}

                   {/* Message 2 — typing */}
                   {phase === 'typing2' && (
                     <div className="flex justify-end">
                       <div className="rounded-2xl rounded-br-md px-3 py-2.5 max-w-[85%]" style={{ background: 'hsl(var(--primary) / 0.2)' }}>
                         <p className="text-sm" style={{ color: 'hsl(35 20% 90%)' }}>{typedText}<span className="typing-cursor">|</span></p>
                       </div>
                     </div>
                   )}

                   {/* Reply 2 — correct conversational order */}
                   {phase === 'reply2' && (
                     <>
                       <div className="flex justify-end mb-2">
                         <div className="rounded-2xl rounded-br-md px-3 py-2.5 max-w-[85%]" style={{ background: 'hsl(var(--primary) / 0.2)' }}>
                           <p className="text-sm" style={{ color: 'hsl(35 20% 90%)' }}>{msg2}</p>
                         </div>
                       </div>
                        <div className="flex items-start gap-2 animate-fade-in">
                          <img src={bearMascot} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                          <div className="rounded-2xl rounded-bl-md px-3 py-2.5 space-y-1.5" style={{ background: 'hsl(20 16% 14%)' }}>
                            <p className="text-xs" style={{ color: 'hsl(35 20% 75%)' }}>3 providers near you:</p>
                            {[
                              { name: "FixIt Pro", dist: "0.3 mi", rating: "4.9" },
                              { name: "PhoneMedic", dist: "1.1 mi", rating: "4.8" },
                              { name: "iRepair Hub", dist: "2.4 mi", rating: "4.7" },
                            ].map((s, i) => (
                              <div key={i} className="rounded-lg px-2 py-1.5 flex items-center justify-between" style={{ background: 'hsl(20 16% 18%)' }}>
                                <div>
                                  <p className="text-xs font-semibold" style={{ color: 'hsl(35 20% 90%)' }}>{s.name}</p>
                                  <p className="text-[10px]" style={{ color: 'hsl(30 10% 45%)' }}>{s.dist} away</p>
                                </div>
                                <span className="text-[10px] font-medium text-primary">★ {s.rating}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                     </>
                   )}
                </>
              )}

              {phase === 'fade3' && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-primary/30 animate-pulse" />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full z-20" style={{ background: 'hsl(35 20% 25%)' }} />
      </div>
    </div>
  );
};

export default PhoneAnimation;
