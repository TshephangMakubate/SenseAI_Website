import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const steps = [
  {
    number: '01',
    shortLabel: 'Define',
    title: 'Define What You Want to Test',
    description:
      "Tell us about your product and the users you're building for, and we match you with the right testers instantly.",
    meta: '15-min onboarding call',
    tags: ['Product brief intake', 'Tester profile match', 'Test plan in 24 hrs'],
    highlight: 'Matched testers ready within hours of your brief.',
  },
  {
    number: '02',
    shortLabel: 'Test',
    title: 'We Test It With Real People',
    description:
      '30-minute sessions combining traditional usability with AI-specific trust and behavior signals — full coverage in half the time.',
    meta: '30-min moderated sessions',
    tags: ['8–12 vetted testers', 'Trust + behavior signals', 'Live screen + voice recording'],
    highlight: 'Trust signals that go beyond basic usability.',
  },
  {
    number: '03',
    shortLabel: 'Results',
    title: 'Get Clear Answers, Fast',
    description:
      'You receive an executive summary, trust metrics, recordings, key quotes, and clear recommendations — including a validation verdict.',
    meta: 'Delivered in 5–7 days',
    tags: ['Executive summary', 'Trust scorecard', 'Clip reel + transcripts', 'Launch / fix verdict'],
    highlight: 'Ready to launch — or exactly what to fix first.',
  },
];

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePanel, setActivePanel] = useState(0);
  const panelContainerRef = useRef<HTMLDivElement>(null);

  /* ── vertical scroll → switch steps ── */
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      setScrollProgress(progress);
      if (progress < 0.33) setActiveStep(0);
      else if (progress < 0.66) setActiveStep(1);
      else setActiveStep(2);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── reset horizontal panel when step changes ── */
  useEffect(() => {
    setActivePanel(0);
    if (panelContainerRef.current) {
      panelContainerRef.current.scrollLeft = 0;
    }
  }, [activeStep]);

  const handlePanelScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActivePanel(idx);
  };

  const step = steps[activeStep];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative h-[240vh] md:h-[350vh] bg-white/30 backdrop-blur-[2px] border-y border-gray-200/50"
    >
      {/* ── Section header (scrolls away) ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 pt-12 md:pt-24 pb-4 md:pb-8">
        <div className="text-[#D22D23] font-bold uppercase tracking-wider text-xs md:text-sm mb-3">
          How It Works
        </div>
        <h2 className="text-3xl md:text-5xl mb-3 tracking-tight">
          Three steps to launch with confidence
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl">
          From defining what to test to getting clear, actionable answers — in days, not months.
        </p>
      </div>

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Nav clearance on mobile */}
        <div className="block md:hidden h-[52px] shrink-0" />

        {/* Inner layout */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-center max-w-7xl mx-auto px-5 md:px-6 w-full pb-4 md:pb-0 gap-4 md:gap-14 overflow-hidden">

          {/* ── Desktop vertical progress bar ── */}
          <div className="hidden md:flex flex-col items-center w-10 shrink-0 relative justify-between h-[420px]">
            <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-gray-200 z-0">
              <motion.div
                className="w-full bg-[#D22D23] origin-top"
                style={{ height: '100%', scaleY: scrollProgress }}
              />
            </div>
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 box-border rounded-full flex items-center justify-center transition-colors duration-300 z-10 relative border font-bold text-sm leading-none ${
                  activeStep >= i
                    ? 'bg-[#D22D23] text-white border-[#D22D23]'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* ── Mobile step tabs ── */}
          <div className="flex md:hidden gap-2 w-full shrink-0">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 px-2 rounded-xl border-2 transition-all duration-300 ${
                  activeStep === i
                    ? 'bg-[#D22D23] border-[#D22D23]'
                    : activeStep > i
                    ? 'bg-[#EEBBB9]/20 border-[#EEBBB9]'
                    : 'bg-white/80 border-gray-200'
                }`}
              >
                <span
                  className={`text-xl font-bold leading-tight ${
                    activeStep === i ? 'text-white' : activeStep > i ? 'text-[#D22D23]' : 'text-gray-300'
                  }`}
                  style={{ fontFamily: '"DM Serif Display", serif' }}
                >
                  {s.number}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider leading-none ${
                    activeStep === i ? 'text-white/80' : activeStep > i ? 'text-[#D22D23]/70' : 'text-gray-400'
                  }`}
                >
                  {s.shortLabel}
                </span>
              </div>
            ))}
          </div>

          {/* ── Card wrapper ── */}
          <div
            className="md:flex-1 relative w-full max-w-3xl flex flex-col"
            style={{
              height: 'calc(100vh - 230px)',
              maxHeight: 420,
              minHeight: 280,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col"
              >
                {/* Card shell */}
                <div className="bg-white border border-gray-200 rounded-2xl flex-1 relative overflow-hidden shadow-sm flex flex-col">

                  {/* ── Desktop card content ── */}
                  <div className="hidden md:flex flex-col h-full p-10">
                    <div
                      className="absolute top-6 right-8 text-7xl text-[#EEBBB9] leading-none"
                      aria-hidden
                    >
                      {step.number}
                    </div>
                    <h3 className="text-4xl text-[#1A1A1A] relative z-10 mb-4 leading-[1.15] tracking-tight">
                      {step.title}
                    </h3>
                    <p
                      className="text-base text-gray-600 leading-relaxed relative z-10 mb-6"
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {step.description}
                    </p>
                    <div className="mt-4" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-[#D22D23] uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D22D23]" />
                        {step.meta}
                      </div>
                    </div>
                  </div>

                  {/* ── Mobile horizontal-scroll panels ── */}
                  <div
                    ref={panelContainerRef}
                    className="flex md:hidden overflow-x-scroll snap-x snap-mandatory h-full no-scrollbar"
                    onScroll={handlePanelScroll}
                  >
                    {/* Panel 1 — Overview */}
                    <div className="w-full shrink-0 snap-start snap-always flex flex-col p-6">
                      {/* Step badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className="text-5xl text-[#EEBBB9] font-bold leading-none"
                          style={{ fontFamily: '"DM Serif Display", serif' }}
                          aria-hidden
                        >
                          {step.number}
                        </span>
                        <span className="h-px w-6 bg-gray-200" />
                        <span className="text-[10px] font-bold text-[#D22D23] uppercase tracking-widest">
                          Step {activeStep + 1} of 3
                        </span>
                      </div>

                      <h3 className="text-[22px] text-[#1A1A1A] mb-3 leading-tight tracking-tight">
                        {step.title}
                      </h3>

                      <p
                        className="text-[14px] text-gray-600 leading-relaxed flex-1"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                      >
                        {step.description}
                      </p>

                      {/* Meta */}
                      <div className="mt-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D22D23] shrink-0" />
                        <span className="text-[11px] font-bold text-[#D22D23] uppercase tracking-widest">
                          {step.meta}
                        </span>
                      </div>

                      {/* Swipe hint */}
                      <div className="mt-3 flex items-center gap-1.5 text-gray-300">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <span className="text-[11px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                          Swipe for details
                        </span>
                      </div>
                    </div>

                    {/* Panel 2 — Deliverables */}
                    <div className="w-full shrink-0 snap-start snap-always flex flex-col p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-bold text-[#D22D23] uppercase tracking-widest">
                          What's Included
                        </span>
                      </div>

                      <div className="flex flex-col gap-2.5 flex-1">
                        {step.tags.map((tag, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 bg-[#FEF2F2] rounded-xl px-4 py-3"
                          >
                            <span className="text-[#D22D23] text-sm font-bold shrink-0">✓</span>
                            <span
                              className="text-sm text-[#1A1A1A] font-medium"
                              style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Highlight box */}
                      <div className="mt-4 bg-[#1A1A1A] rounded-xl px-4 py-3">
                        <p
                          className="text-white text-sm font-medium leading-snug"
                          style={{ fontFamily: '"DM Sans", sans-serif' }}
                        >
                          {step.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Mobile panel indicators ── */}
                <div className="flex md:hidden items-center justify-center gap-1.5 mt-2.5 shrink-0">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        activePanel === i ? 'w-8 bg-[#D22D23]' : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
