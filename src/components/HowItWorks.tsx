import { useState, useEffect, useCallback, useRef } from "react";
import { MessageSquareText, DollarSign, Store, Eye, Sparkles, Star, MapPin, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── Step 1: Chat typing animation ── */
const chatMessages = [
  { text: "My screen is cracked", isUser: true },
  { text: "Can you describe the damage?", isUser: false },
  { text: "Spider web cracks, still works", isUser: true },
];

const ChatAnimation = ({ active, done }: { active: boolean; done: boolean }) => {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [typing, setTyping] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (done) { setVisibleMessages(chatMessages.length); setTypedText(""); setTyping(false); return; }
    if (!active) return;
    setVisibleMessages(0);
    setTypedText("");
    setTyping(false);

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    const cleanup = () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
    cleanupRef.current = cleanup;

    let msgIndex = 0;
    const showNext = () => {
      if (cancelled || msgIndex >= chatMessages.length) return;
      setTyping(true);
      setTypedText("");
      const msg = chatMessages[msgIndex];
      let charIndex = 0;
      const iv = setInterval(() => {
        if (cancelled) { clearInterval(iv); return; }
        charIndex++;
        if (charIndex <= msg.text.length) {
          setTypedText(msg.text.slice(0, charIndex));
        } else {
          clearInterval(iv);
          setTyping(false);
          setVisibleMessages((v) => v + 1);
          setTypedText("");
          msgIndex++;
          const t = setTimeout(showNext, 300);
          timers.push(t);
        }
      }, 25);
      intervals.push(iv);
    };
    const t = setTimeout(showNext, 300);
    timers.push(t);

    return cleanup;
  }, [active, done]);

  return (
    <div className="mt-2 md:mt-3 flex flex-col gap-1 md:gap-1.5 w-full min-h-[3.5rem] md:min-h-[5.5rem]">
      {chatMessages.slice(0, visibleMessages).map((m, i) => (
        <div key={i} className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}>
          <div className={`rounded-xl px-2.5 py-1 text-xs max-w-[85%] ${m.isUser ? "bg-primary/20 text-foreground rounded-br-sm" : "bg-muted text-muted-foreground rounded-bl-sm"}`}>
            {m.text}
          </div>
        </div>
      ))}
      {typing && visibleMessages < chatMessages.length && (
        <div className={`flex ${chatMessages[visibleMessages].isUser ? "justify-end" : "justify-start"}`}>
          <div className={`rounded-xl px-2.5 py-1 text-xs max-w-[85%] ${chatMessages[visibleMessages].isUser ? "bg-primary/20 text-foreground rounded-br-sm" : "bg-muted text-muted-foreground rounded-bl-sm"}`}>
            {typedText}<span className="typing-cursor">|</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Step 2: Scrolling price ranges ── */
const priceItems = [
  { label: "Screen Repair", low: 79, high: 129 },
  { label: "Battery Repair", low: 49, high: 89 },
  { label: "Charge Port", low: 59, high: 99 },
];

const ScrollingNumber = ({ target, duration = 1200, active, done }: { target: number; duration?: number; active: boolean; done: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (done) { setValue(target); return; }
    if (!active) { setValue(0); return; }
    setValue(0);
    const steps = 20;
    const stepDuration = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setValue(Math.round((step / steps) * target));
      if (step >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, [target, duration, active, done]);

  return <span>${value}</span>;
};

const PriceAnimation = ({ active, done }: { active: boolean; done: boolean }) => (
  <div className="mt-2 md:mt-3 flex flex-col gap-1 md:gap-2 w-full min-h-[3.5rem] md:min-h-[5.5rem]">
    {priceItems.map((item, i) => (
      <div key={item.label} className="flex items-center justify-between rounded-lg bg-muted/50 border border-border/30 px-2.5 py-1.5">
        <span className="text-xs text-muted-foreground">{item.label}</span>
        <span className="text-xs font-bold text-primary font-display">
          <ScrollingNumber target={item.low} duration={800 + i * 200} active={active} done={done} /> – <ScrollingNumber target={item.high} duration={1000 + i * 200} active={active} done={done} />
        </span>
      </div>
    ))}
  </div>
);

/* ── Step 3: Shop cards animation ── */
const shops = [
  { name: "QuickFix Mobile", rating: 4.9, distance: "0.3 mi", time: "30 min" },
  { name: "TechDoc Repairs", rating: 4.7, distance: "1.2 mi", time: "1 hr" },
  { name: "iRepair Hub", rating: 4.8, distance: "2.1 mi", time: "45 min" },
];

const ShopAnimation = ({ active, done }: { active: boolean; done: boolean }) => {
  const [visibleShops, setVisibleShops] = useState(0);

  useEffect(() => {
    if (done) { setVisibleShops(shops.length); return; }
    if (!active) { setVisibleShops(0); return; }
    setVisibleShops(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setVisibleShops(i);
      if (i >= shops.length) clearInterval(iv);
    }, 400);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <div className="mt-2 md:mt-3 flex flex-col gap-1 md:gap-1.5 w-full min-h-[3.5rem] md:min-h-[5.5rem]">
      {shops.map((shop, i) => (
        <div
          key={shop.name}
          className={`flex items-center gap-2 rounded-lg bg-muted/50 border border-border/30 px-2 py-1.5 transition-all duration-500 ${
            i < visibleShops ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center shrink-0">
            <Store className="w-3 h-3 text-success" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-medium text-foreground truncate">{shop.name}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-bear-gold fill-bear-gold" />{shop.rating}</span>
              <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{shop.distance}</span>
              <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{shop.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Step 4: Tracker animation ── */
const trackerStages = ["Dropped Off", "Diagnosing", "Repairing", "Testing", "Ready for Pickup"];

const TrackerAnimation = ({ active, done }: { active: boolean; done: boolean }) => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (done) { setActiveStage(trackerStages.length - 1); return; }
    if (!active) { setActiveStage(0); return; }
    setActiveStage(0);
    let stage = 0;
    const iv = setInterval(() => {
      stage++;
      if (stage >= trackerStages.length) { clearInterval(iv); return; }
      setActiveStage(stage);
    }, 600);
    return () => clearInterval(iv);
  }, [active, done]);

  return (
    <div className="mt-2 md:mt-3 w-full flex flex-col items-center gap-0 min-h-[3.5rem] md:min-h-[5.5rem] justify-center">
      <div className="relative w-full flex items-center justify-between px-1">
        <div className="absolute top-1/2 left-1 right-1 h-0.5 -translate-y-1/2 bg-border/50 rounded-full" />
        <div
          className="absolute top-1/2 left-1 h-0.5 -translate-y-1/2 bg-primary rounded-full transition-all duration-700"
          style={{ width: `${(activeStage / (trackerStages.length - 1)) * 96}%` }}
        />
        {trackerStages.map((_, i) => (
          <div key={i} className="relative z-10">
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                i < activeStage
                  ? "bg-primary border-primary"
                  : i === activeStage
                  ? "bg-primary border-primary shadow-[0_0_8px_2px_hsl(var(--primary)/0.5)]"
                  : "bg-card border-border/50"
              }`}
            >
              {i === activeStage && (
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs font-medium text-primary font-display transition-all duration-300 text-center min-h-[1.25rem]">
        {trackerStages[activeStage]}
      </div>
    </div>
  );
};

/* ── Animation durations (ms) per step for auto-scroll ── */
const STEP_DURATIONS = [
  2500, // chat
  1200, // prices scroll
  1800, // shops
  3000, // tracker
];

/* ── Main component ── */
const steps = [
  {
    icon: MessageSquareText,
    step: "1",
    title: "Describe your issue",
    description: "Tell us what's wrong — cracked screen, battery issues, water damage, anything.",
    gradient: "from-primary/10 to-primary/5",
    animation: "chat" as const,
  },
  {
    icon: DollarSign,
    step: "2",
    title: "Get an instant price range",
    description: "Ballpark prices instantly so you know what to expect.",
    gradient: "from-bear-gold/10 to-bear-gold/5",
    animation: "price" as const,
  },
  {
    icon: Store,
    step: "3",
    title: "Choose a repair provider",
    description: "Up to 5 trusted local providers respond. Pick the one that works for you.",
    gradient: "from-success/10 to-success/5",
    animation: "shop" as const,
  },
  {
    icon: Eye,
    step: "4",
    title: "Track everything",
    description: "Follow your repair from drop-off to pickup.",
    gradient: "from-accent/10 to-accent/5",
    animation: "tracker" as const,
  },
];

const HowItWorks = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeCard, setActiveCard] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [allDone, setAllDone] = useState(false);

  // Auto-scroll through cards sequentially
  useEffect(() => {
    if (!cardsVisible) return;
    setActiveCard(0);
    setAllDone(false);
    setCycleKey((k) => k + 1);
  }, [cardsVisible]);

  useEffect(() => {
    if (!cardsVisible) return;
    if (activeCard >= steps.length - 1) {
      // Wait for last card animation to finish, then mark all done
      const t = setTimeout(() => setAllDone(true), STEP_DURATIONS[activeCard]);
      return () => clearTimeout(t);
    }
    const timer = setTimeout(() => {
      setActiveCard((c) => c + 1);
    }, STEP_DURATIONS[activeCard]);
    return () => clearTimeout(timer);
  }, [activeCard, cycleKey, cardsVisible]);

  return (
    <section id="how-it-works" className="py-8 md:py-16 relative">
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="container mx-auto px-4 relative">
        <div
          ref={headerRef}
          className={`text-center mb-8 md:mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-md mx-auto">
            From broken device to fixed — in four simple steps.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
          {steps.map((s, i) => {
            const isActive = activeCard === i;
            const isDone = i < activeCard || (i === activeCard && allDone);
            const isRevealed = cardsVisible && i <= activeCard;
            return (
              <div
                key={s.step}
                className={`relative group transition-all duration-700 ${
                  isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-gradient-to-r from-primary/20 to-transparent" />
                )}

                <div className={`bg-gradient-to-b ${s.gradient} glass-card rounded-xl md:rounded-2xl p-3 md:p-6 text-center transition-all duration-500 h-full flex flex-col min-h-[200px] md:min-h-[320px] ${
                  isActive && !allDone ? "shadow-xl shadow-primary/10 ring-1 ring-primary/20 -translate-y-1" : "hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                }`}>
                  <div className={`absolute -top-2.5 md:-top-4 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-display font-bold text-[10px] md:text-sm transition-all duration-500 ${
                    isDone
                      ? "bg-success text-white shadow-lg shadow-success/30"
                      : isActive
                      ? "bg-bear-gold text-white shadow-lg shadow-bear-gold/40 animate-pulse"
                      : "bg-muted text-muted-foreground shadow-lg shadow-muted/20"
                  }`}>
                    {s.step}
                  </div>
                  <div className="w-9 h-9 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-card border border-border/50 flex items-center justify-center mx-auto mt-2 md:mt-4 mb-2 md:mb-4 group-hover:rotate-3 group-hover:scale-105 transition-all duration-300 shadow-sm">
                    <s.icon className="w-4 h-4 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xs md:text-lg text-foreground mb-1 md:mb-2">{s.title}</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed hidden md:block">{s.description}</p>

                  <div className="flex-1 flex flex-col justify-end">
                    <div className="hidden md:block">
                      {s.animation === "chat" && <ChatAnimation active={isActive} done={isDone} key={`chat-${cycleKey}`} />}
                      {s.animation === "price" && <PriceAnimation active={isActive} done={isDone} key={`price-${cycleKey}`} />}
                      {s.animation === "shop" && <ShopAnimation active={isActive} done={isDone} key={`shop-${cycleKey}`} />}
                      {s.animation === "tracker" && <TrackerAnimation active={isActive} done={isDone} key={`tracker-${cycleKey}`} />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
