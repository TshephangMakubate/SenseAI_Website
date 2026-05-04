import { useState, useEffect } from 'react';
import { SlideInButton } from './components/SlideInButton';
import { DiagonalScrollFade } from './components/DiagonalScrollFade';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Background } from './components/Background';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import faviconUrl from '/src/imports/image-9.png';

export default function App() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
    document.title = 'Sense AI | Measure Consumer Trust in Your AI';

    // ── helper: upsert a <meta> tag ──
    const setMeta = (attrs: Record<string, string>) => {
      const selector = Object.entries(attrs)
        .filter(([k]) => k !== 'content')
        .map(([k, v]) => `[${k}="${v}"]`)
        .join('');
      let el = document.querySelector(`meta${selector}`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => {
          if (k !== 'content') el!.setAttribute(k, v);
        });
        document.head.appendChild(el);
      }
      el.setAttribute('content', attrs.content);
    };

    // ── helper: upsert a <link> tag ──
    const setLink = (attrs: Record<string, string>) => {
      const selector = `link[rel="${attrs.rel}"]`;
      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    };

    // ── Primary SEO ──
    setMeta({ name: 'description', content: 'Sense AI is the AI-specific user research platform that measures consumer trust, behavioral signals, and adoption readiness before you launch. Get clear answers in 5–7 days.' });
    setMeta({ name: 'keywords', content: 'Sense AI, AI user research, consumer trust, AI adoption, trust metrics, behavioral signals, AI product testing, moderated user sessions, AI UX research, trust scorecard, AI usability testing, user research platform, AI product validation, AI product-market fit, AI launch confidence, trust and adoption research, AI behavioral data' });
    setMeta({ name: 'author', content: 'Sense AI — Val Whitten & Manuela Berrio' });
    setMeta({ name: 'robots', content: 'index, follow' });
    setMeta({ name: 'theme-color', content: '#D22D23' });

    // ── Open Graph ──
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:site_name', content: 'Sense AI' });
    setMeta({ property: 'og:title', content: 'Sense AI | Measure Consumer Trust in Your AI' });
    setMeta({ property: 'og:description', content: 'Will users delegate to your AI? Sense AI measures the trust signals that predict adoption — through moderated sessions, behavioral analysis, and a trust scorecard delivered in days, not months.' });
    setMeta({ property: 'og:url', content: 'https://senseai.co' });

    // ── Twitter / X Card ──
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:site', content: '@senseai' });
    setMeta({ name: 'twitter:title', content: 'Sense AI | Measure Consumer Trust in Your AI' });
    setMeta({ name: 'twitter:description', content: 'AI trust research platform. Behavioral signals, trust scorecards, and launch-readiness verdicts — in 5–7 days. Built by researchers, trusted by AI teams.' });

    // ── Canonical & charset ──
    setLink({ rel: 'canonical', href: 'https://senseai.co' });
  }, []);

  return (
    <div className="relative min-h-screen text-[#1A1A1A]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
      <ScrollProgressBar />
      <Background />
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolling ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3">
          <Logo />
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#how-it-works" className="text-sm text-[#1A1A1A] hover:text-[#D22D23] transition">How It Works</a>
            <a href="#who-we-work-with" className="text-sm text-[#1A1A1A] hover:text-[#D22D23] transition">Who We Work With</a>
            <a href="#pricing" className="text-sm text-[#1A1A1A] hover:text-[#D22D23] transition">Pricing</a>
            <a href="#about" className="text-sm text-[#1A1A1A] hover:text-[#D22D23] transition">About</a>
          </div>
          <SlideInButton variant="primary" className="text-xs md:text-sm whitespace-nowrap shrink-0">
            <span className="hidden sm:inline">Start Your Sense Check</span>
            <span className="sm:hidden">Start</span>
          </SlideInButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column */}
            <DiagonalScrollFade direction="left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F5E9] rounded-full mb-5 md:mb-6 border border-[#4CAF50]/20">
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full shrink-0"></div>
                <span className="text-[10px] md:text-xs font-semibold tracking-wide uppercase text-[#1A1A1A]">AI-specific trust research platform</span>
              </div>

              <ul className="space-y-2 mb-5 md:mb-6">
                {['Fast, reliable insights', 'Expert-guided methodology', 'Actionable recommendations', 'Built by researchers', 'Trusted by top teams'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="text-[#D22D23]">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 md:mb-6 tracking-tight" style={{ lineHeight: 1.1 }}>
                Measure Consumer Trust in{' '}
                <span className="text-[#D22D23]">Your AI</span>{' '}
                Before It's Too Late
              </h1>

              <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                Will users delegate to your AI? Keep using it after errors? We measure the trust signals that predict success.
              </p>
            </div>
            </DiagonalScrollFade>

            {/* Right Column - Inline Form */}
            <DiagonalScrollFade direction="right" delay={200}>
              <InlineSenseForm />
            </DiagonalScrollFade>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="h-px bg-gray-200/50 w-full max-w-7xl mx-auto" />
      <section className="py-16 md:py-24 px-5 md:px-6 bg-white/30 backdrop-blur-[2px] relative z-10 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <DiagonalScrollFade direction="up">
          <div className="mb-3 md:mb-4 text-[#D22D23] font-bold uppercase tracking-wider text-xs md:text-sm">
            The Problem
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 tracking-tight">
            AI adoption is failing because of trust gaps
          </h2>
          </DiagonalScrollFade>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <DiagonalScrollFade direction="left" delay={100} className="h-full">
            <StatCard
              number="42%"
              color="#D22D23"
              description="of companies abandoned most AI initiatives in 2025, up from 17% in 2024"
              source="S&P Global Market Intelligence"
            />
            </DiagonalScrollFade>
            <DiagonalScrollFade direction="up" delay={200} className="h-full">
            <StatCard
              number="70–85%"
              color="#E69E3C"
              description="of AI projects fail"
              source="Multiple industry reports, 2025"
            />
            </DiagonalScrollFade>
            <DiagonalScrollFade direction="right" delay={300} className="h-full">
            <StatCard
              number="$100"
              color="#6DB6EE"
              description="return for every $1 invested in UX research"
              source="Forrester Research"
            />
            </DiagonalScrollFade>
          </div>

          <DiagonalScrollFade direction="up" delay={100}>
          <div className="bg-[#1A1A1A] rounded-2xl p-6 md:p-12 flex items-center justify-between shadow-xl">
            <p className="text-white text-lg md:text-3xl font-medium leading-relaxed flex-1">
              Users don't give second chances to AI products that break their trust. The company that proves trustworthiness first captures the market.
            </p>
          </div>
          </DiagonalScrollFade>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection />

      {/* Founders Section */}
      <section id="about" className="py-14 md:py-20 px-5 md:px-6 bg-white/30 backdrop-blur-[2px] overflow-hidden relative z-10 border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto">
          <DiagonalScrollFade direction="up">
            <div className="mb-8 md:mb-10 max-w-3xl">
              <div className="text-[#D22D23] font-bold uppercase tracking-wider text-xs md:text-sm mb-3">
                About Us
              </div>
              <h2 className="text-3xl md:text-5xl tracking-tight mb-3 md:mb-4">
                Built by researchers who've seen the problem firsthand
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                "Traditional user testing tells you IF your product works. We tell you if users will trust it enough to actually adopt it."
              </p>
            </div>
          </DiagonalScrollFade>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <DiagonalScrollFade direction="left" delay={100}>
              <FounderCardCompact
                name="Val Whitten"
                role="Co-Founder & CEO"
                color="#D22D23"
                image="/src/imports/Val_Whitten.jpg"
              />
            </DiagonalScrollFade>
            <DiagonalScrollFade direction="right" delay={200}>
              <FounderCardCompact
                name="Manuela Berrio"
                role="Co-Founder & COO"
                color="#E69E3C"
                image="/src/imports/Manuela_Berrio.jpg"
              />
            </DiagonalScrollFade>
          </div>

          <DiagonalScrollFade direction="up" delay={300}>
            <div className="bg-white border border-gray-200 rounded-2xl divide-y md:divide-y-0 md:divide-x divide-gray-200 grid md:grid-cols-3">
              <CredentialRow color="#D22D23" stat="2x" label="Published in peer-reviewed journals" />
              <CredentialRow color="#E69E3C" stat="1000s" label="Users of AI systems built" />
              <CredentialRow color="#6DB6EE" stat="50+" label="Founders advised on PMF" />
            </div>
          </DiagonalScrollFade>

          <DiagonalScrollFade direction="up" delay={400}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-[#D22D23] font-bold uppercase tracking-wider text-xs mr-2">We Work With</span>
              {['Pre-Product', 'Pre-Revenue', 'Seed', 'Series A', 'Series B–C'].map((stage) => (
                <span key={stage} className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs text-gray-700">
                  {stage}
                </span>
              ))}
            </div>
          </DiagonalScrollFade>
        </div>
      </section>

      {/* Logo Marquee 2 */}
      <LogoMarquee />

      {/* Who We Work With */}
      <section id="who-we-work-with" className="py-16 md:py-24 px-5 md:px-6 bg-white/40 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <DiagonalScrollFade direction="up">
            <div className="mb-3 md:mb-4 text-[#D22D23] uppercase tracking-wider text-xs md:text-sm font-bold">Who We Work With</div>
            <h2 className="text-3xl md:text-5xl mb-3 md:mb-4 font-bold tracking-tight">Perfect for any team building with AI</h2>
            <p className="text-base md:text-lg text-gray-500 mb-10 md:mb-14 max-w-2xl">Whether you're AI-first or adding AI to existing products, we help you understand whether users will actually trust and adopt what you build.</p>
          </DiagonalScrollFade>

          <div className="grid md:grid-cols-2 gap-5 md:gap-8">
            <DiagonalScrollFade direction="left" delay={100}>
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white flex flex-col h-full hover:shadow-md transition-shadow">
                {/* Top accent */}
                <div className="h-[3px] bg-[#D22D23]" />
                <div className="px-6 md:px-8 pt-6 md:pt-7 pb-7 md:pb-8 flex flex-col flex-1">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-5 md:mb-6 gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#D22D23] mb-2">Category 01</p>
                      <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-tight">AI-Native Products</h3>
                      <p className="text-sm text-gray-400 mt-1">Consumer apps built on AI as the core experience</p>
                    </div>
                    {/* Logo tile motif */}
                    <div className="grid grid-cols-2 gap-[3px] w-[22px] shrink-0 mt-1 opacity-20">
                      <div className="h-[9px] bg-[#F39B2D] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#ED1C18] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#6DB6EE] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#F39B2D] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#6DB6EE] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#6DB6EE] rounded-[2px]"></div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8">Whether you're creating chatbots, agents, or entirely new AI experiences, understanding user trust is critical to adoption. We specialize in the behavioral signals that predict whether users will delegate to your AI—and keep using it.</p>

                  <div className="mt-auto">
                    <div className="h-px bg-gray-100 mb-5" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Common Use Cases</p>
                    <div className="flex flex-wrap gap-2">
                      {['Personal Finance', 'Education & Tutoring', 'Health & Fitness', 'Dating & Relationships', 'Productivity Tools', 'Content Creation', 'Mental Health', 'Career Coaching'].map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#F8F7F5] border border-gray-200 rounded-full text-xs text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DiagonalScrollFade>

            <DiagonalScrollFade direction="right" delay={200}>
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white flex flex-col h-full hover:shadow-md transition-shadow">
                {/* Top accent */}
                <div className="h-[3px] bg-[#1A1A1A]" />
                <div className="px-6 md:px-8 pt-6 md:pt-7 pb-7 md:pb-8 flex flex-col flex-1">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-5 md:mb-6 gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] mb-2">Category 02</p>
                      <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-tight">AI-Enhanced Operations</h3>
                      <p className="text-sm text-gray-400 mt-1">Organizations deploying AI in customer-facing workflows</p>
                    </div>
                    {/* Logo tile motif */}
                    <div className="grid grid-cols-2 gap-[3px] w-[22px] shrink-0 mt-1 opacity-20">
                      <div className="h-[9px] bg-[#F39B2D] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#ED1C18] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#6DB6EE] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#F39B2D] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#6DB6EE] rounded-[2px]"></div>
                      <div className="h-[9px] bg-[#6DB6EE] rounded-[2px]"></div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8">Get insights on how users perceive AI features, what concerns they have, and how to position AI capabilities for maximum adoption. We turn skepticism into confidence—before you go live.</p>

                  <div className="mt-auto">
                    <div className="h-px bg-gray-100 mb-5" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Common Use Cases</p>
                    <div className="flex flex-wrap gap-2">
                      {['AI Customer Service', 'AI Sales Assistants', 'Smart Recommendations', 'Automated Onboarding', 'Predictive Analytics', 'Personalization Engines', 'Virtual Agents', 'Decision Support'].map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#F8F7F5] border border-gray-200 rounded-full text-xs text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DiagonalScrollFade>
          </div>

          {/* Stage badges */}
          <DiagonalScrollFade direction="up" delay={300}>
            <div className="mt-8 md:mt-10 bg-white border border-gray-200 rounded-2xl px-5 md:px-8 py-5 md:py-6 flex flex-wrap items-center gap-3 md:gap-4">
              <span className="text-[#D22D23] font-bold uppercase tracking-wider text-xs shrink-0 w-full md:w-auto">We work with companies at every stage →</span>
              {['Pre-Product', 'Pre-Revenue', 'Seed', 'Series A', 'Series B–C'].map((stage) => (
                <span key={stage} className="px-3 md:px-4 py-1.5 md:py-2 bg-[#F8F7F5] border border-gray-200 rounded-full text-xs md:text-sm text-gray-700 font-medium">
                  {stage}
                </span>
              ))}
            </div>
          </DiagonalScrollFade>
        </div>
      </section>

      {/* Interview Count / Pricing */}
      <section id="pricing" className="py-16 md:py-24 px-5 md:px-6 bg-[#F8F7F5] relative z-10 border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto">
          <DiagonalScrollFade direction="up">
            <div className="mb-3 md:mb-4 text-[#D22D23] uppercase tracking-wider text-xs md:text-sm font-bold">Pricing</div>
            <h2 className="text-3xl md:text-5xl mb-3 md:mb-4 font-bold tracking-tight">Transparent, research-backed pricing</h2>
            <p className="text-base md:text-lg text-gray-500 mb-10 md:mb-16 max-w-2xl">We don't win unless you win—so we recommend only what moves the needle.</p>
          </DiagonalScrollFade>

          {/* Key stat banner */}
          <DiagonalScrollFade direction="up" delay={50}>
            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-12">
              {[
                { stat: '10–20', label: 'Focused sessions', sub: 'Research-backed sweet spot' },
                { stat: '85–95%', label: 'Issues surfaced', sub: 'In qualitative studies' },
                { stat: '⅒', label: 'Of firm costs', sub: 'Without sacrificing quality' },
              ].map(({ stat, label, sub }, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-6 text-center shadow-sm">
                  <div className="text-2xl md:text-4xl font-bold text-[#D22D23] mb-1 tracking-tight">{stat}</div>
                  <div className="text-xs md:text-base font-semibold text-[#1A1A1A] mb-0.5 md:mb-1">{label}</div>
                  <div className="hidden md:block text-sm text-gray-500">{sub}</div>
                </div>
              ))}
            </div>
          </DiagonalScrollFade>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
            {/* Left - Why This Works */}
            <DiagonalScrollFade direction="left" delay={100}>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight">Why 10–20 sessions is all you need</h3>
                <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6 leading-relaxed">
                  A 2022 systematic review found that 9–17 interviews were typically sufficient to reach saturation in homogeneous qualitative studies. More interviews after that give you diminishing returns—not more clarity.
                </p>

                <div className="space-y-3">
                  {[
                    { color: '#D22D23', title: '10–20 users reveal 85–95% of critical issues', desc: 'The sweet spot for behavioral trust testing' },
                    { color: '#E69E3C', title: 'Faster iteration cycles', desc: 'Fix problems and retest quickly, rather than waiting months for one massive study' },
                    { color: '#6DB6EE', title: 'Clear signal, not noise', desc: 'More users = more conflicting feedback that paralyzes decision-making' },
                  ].map(({ color, title, desc }, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                      <div className="w-3 h-3 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }}></div>
                      <div>
                        <p className="font-semibold text-[#1A1A1A] mb-0.5">{title}</p>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DiagonalScrollFade>

            {/* Right - What You Get */}
            <DiagonalScrollFade direction="right" delay={200}>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Card header */}
                <div className="bg-[#1A1A1A] px-6 md:px-8 py-5 md:py-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">The Sense Check Package</p>
                  <p className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-1">10–20 Sessions</p>
                  <p className="text-gray-400 text-xs md:text-sm">A fraction of what traditional firms charge for the same insight</p>
                </div>

                {/* Comparison strip */}
                <div className="border-b border-gray-100 px-6 md:px-8 py-4 bg-[#FEF2F2] flex items-start gap-3">
                  <span className="text-[#D22D23] text-lg mt-0.5">↓</span>
                  <p className="text-sm text-[#D22D23] font-medium">Traditional research firms charge <strong>$15K–$30K</strong> for the same output. Our job is to give you the truth, not the biggest invoice.</p>
                </div>

                {/* What's included */}
                <div className="px-6 md:px-8 py-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">What's Included</p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Custom trust & adoption research protocol',
                      'Screened & recruited testers matching your ICP',
                      'Moderated or unmoderated behavioral sessions',
                      'Synthesis report with prioritized findings',
                      'Actionable fix recommendations',
                      '30-min debrief call with founders',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-[#D22D23] mt-0.5 shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <SlideInButton variant="primary" className="w-full">
                    Get Started
                  </SlideInButton>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Need more users? We scale. But 10–20 is right for 90% of early-stage AI products.
                  </p>
                </div>
              </div>
            </DiagonalScrollFade>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-28 px-5 md:px-6 bg-[#1A1A1A] relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #D22D23 0%, transparent 50%), radial-gradient(circle at 80% 50%, #E69E3C 0%, transparent 50%)'
        }}></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <DiagonalScrollFade direction="up">
            <div className="text-center mb-10 md:mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#D22D23]/40 text-[#D22D23] text-xs font-bold uppercase tracking-wider">
                Ready to Launch?
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl mb-3 md:mb-4 text-white font-bold tracking-tight" style={{ lineHeight: 1.1 }}>
                Win the{' '}<span className="text-[#E69E3C] italic">trust of your users</span><br />before day one.
              </h2>
              <p className="text-base md:text-xl text-gray-400 italic">Which makes more Sense?</p>
            </div>
          </DiagonalScrollFade>

          <DiagonalScrollFade direction="up" delay={200}>
            <div className="grid md:grid-cols-2 gap-4 mb-10 md:mb-14">
              {/* Option A - bad */}
              <div className="rounded-2xl border border-gray-700 bg-[#111] p-6 md:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm font-bold shrink-0">✕</div>
                  <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">The Risky Path</p>
                </div>
                <p className="text-gray-300 text-lg md:text-xl font-medium leading-snug">Launch and hope users trust your AI</p>
                <ul className="mt-auto space-y-2">
                  {['No insight into user trust signals', 'Reactive fixes after poor reviews', 'Months of lost traction', 'Guessing what\'s broken'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="text-gray-600">—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Option B - good */}
              <div className="rounded-2xl border border-[#D22D23]/50 bg-gradient-to-br from-[#D22D23]/10 to-[#E69E3C]/10 p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D22D23]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#D22D23] flex items-center justify-center text-white text-sm font-bold shrink-0">✓</div>
                  <p className="text-[#E69E3C] text-sm font-semibold uppercase tracking-wider">The Smart Path</p>
                </div>
                <p className="text-white text-lg md:text-xl font-medium leading-snug">Measure trust before launch and know exactly what to fix</p>
                <ul className="mt-auto space-y-2">
                  {['Behavioral data before you go live', 'Targeted fixes that move the needle', 'Launch with user confidence', 'Know what\'s working—and why'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="text-[#D22D23]">→</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DiagonalScrollFade>

          <DiagonalScrollFade direction="up" delay={400}>
            <div className="flex flex-col items-center gap-4">
              <SlideInButton variant="orange" className="text-base md:text-xl md:px-16 md:py-5">
                Start Your Sense Check
              </SlideInButton>
              <p className="text-gray-500 text-sm">No credit card required · Free 15-min consultation</p>
            </div>
          </DiagonalScrollFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 md:px-6 bg-white/80 backdrop-blur-md border-t border-gray-200 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
          <Logo />
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 md:gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-[#D22D23] transition">Dashboard</a>
            <a href="#pricing" className="hover:text-[#D22D23] transition">Pricing</a>
            <a href="#about" className="hover:text-[#D22D23] transition">About Us</a>
            <a href="#how-it-works" className="hover:text-[#D22D23] transition">How It Works</a>
            <a href="#" className="hover:text-[#D22D23] transition">Contact</a>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 Sense AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid grid-cols-2 grid-rows-3 gap-1 w-[28px] h-[42px]">
        <div className="bg-[#F39B2D] rounded-[3px]"></div>
        <div className="bg-[#ED1C18] rounded-[3px]"></div>
        <div className="bg-[#6DB6EE] rounded-[3px]"></div>
        <div className="bg-[#F39B2D] rounded-[3px]"></div>
        <div className="bg-[#6DB6EE] rounded-[3px]"></div>
        <div className="bg-[#6DB6EE] rounded-[3px]"></div>
      </div>
      <span className="text-xl tracking-tight font-bold" style={{ fontFamily: '"DM Sans", sans-serif' }}>
        Sense AI
      </span>
    </div>
  );
}

function LogoMarquee() {
  const institutions = ['USC MARSHALL', 'USC VITERBI', 'NYU ECONOMICS', 'Y COMBINATOR', 'JANE STREET'];
  // Repeat 3× for seamless loop
  const items = [...institutions, ...institutions, ...institutions];

  return (
    <div className="py-10 bg-[#F8F7F5] border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <div className="text-[#D22D23] font-bold uppercase tracking-wider text-xs mb-2">
          Trained &amp; Backed By
        </div>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Our founders bring research, engineering, and operating experience from the institutions and firms below.
        </p>
      </div>
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {items.map((inst, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-gray-500 text-sm tracking-widest px-8">{inst}</span>
            <span className="text-[#D22D23] text-xs select-none">●</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

function InlineSenseForm() {
  const [product, setProduct] = useState('');
  const [toTest, setToTest] = useState('');
  const [testerProfile, setTesterProfile] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fieldClass =
    'w-full bg-transparent border-0 border-b border-gray-300 rounded-none px-0 py-3 placeholder:text-gray-400 focus:outline-none focus:border-[#D22D23] transition-colors';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim() || !toTest.trim() || !testerProfile.trim()) return;

    const to = 'vwhitten@usc.edu,berrio@usc.edu';
    const subject = encodeURIComponent('New Sense Check Request');
    const body = encodeURIComponent(
      `Hi Val & Manuela,\n\nA new Sense Check request has been submitted:\n\n` +
      `── PRODUCT DESCRIPTION ──\n${product}\n\n` +
      `── WHAT TO TEST ──\n${toTest}\n\n` +
      `── IDEAL TESTER PROFILE ──\n${testerProfile}\n\n` +
      `──────────────────────────\nSent via the Sense AI website.`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#D22D23]/10 flex items-center justify-center text-2xl">✓</div>
        <h3 className="text-xl font-bold text-[#1A1A1A]">Your email client is opening…</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Your default mail app should open with the details pre-filled. Just hit <strong>Send</strong> and we'll be in touch within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-xs text-[#D22D23] underline underline-offset-2"
        >
          Fill out again
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
          Product Description *
        </label>
        <textarea
          rows={3}
          required
          value={product}
          onChange={e => setProduct(e.target.value)}
          className={`${fieldClass} resize-none`}
          placeholder="e.g., A mobile app that helps college students manage their finances"
        />
        <p className="text-xs text-gray-500 mt-1">1-2 sentences is enough</p>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
          What You Want to Test *
        </label>
        <textarea
          rows={3}
          required
          value={toTest}
          onChange={e => setToTest(e.target.value)}
          className={`${fieldClass} resize-none`}
          placeholder="e.g., Onboarding flow, AI recommendations accuracy, trust after errors"
        />
        <p className="text-xs text-gray-500 mt-1">List 2-3 key concerns</p>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
          Ideal Tester Profile *
        </label>
        <textarea
          rows={3}
          required
          value={testerProfile}
          onChange={e => setTesterProfile(e.target.value)}
          className={`${fieldClass} resize-none`}
          placeholder="e.g., College students ages 18-24 who use financial apps regularly"
        />
        <p className="text-xs text-gray-500 mt-1">Give us the info and we'll find them</p>
      </div>

      <button
        type="submit"
        className="w-full bg-[#1A1A1A] text-white rounded-full py-4 font-semibold hover:bg-[#D22D23] transition-colors flex items-center justify-center gap-2"
      >
        Start Your Sense Check <span aria-hidden>→</span>
      </button>

      <p className="text-xs text-gray-500 text-center">
        No credit card required • Free 15 min consultation • We're the first to measure what actually predicts AI product success
      </p>
    </form>
  );
}

function StatCard({ number, color, description, source }: { number: string; color: string; description: string; source: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 h-full flex flex-col">
      <div className="text-7xl mb-4 font-bold tracking-tight" style={{ color }}>
        {number}
      </div>
      <p className="text-gray-700 mb-4 leading-relaxed flex-1">{description}</p>
      <p className="text-sm text-gray-500 italic">
        Source: {source}
      </p>
    </div>
  );
}

function ProcessCard({ number, title, description, tag }: { number: string; title: string; description: string; tag: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <div className="text-8xl text-gray-100 mb-6 font-bold">
        {number}
      </div>
      <h3 className="text-2xl mb-4 font-bold">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <span className="inline-block px-3 py-1.5 bg-[#F8F7F5] rounded-full text-sm text-gray-700">
        {tag}
      </span>
    </div>
  );
}

function QuoteCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-[#F8F7F5] border-l-4 border-[#D22D23] rounded-lg p-6">
      <p className="text-lg italic mb-3">
        "{quote}"
      </p>
      <p className="text-sm text-gray-600">— {author}</p>
    </div>
  );
}

function FounderCardCompact({ name, role, color, image }: { name: string; role: string; color: string; image: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="relative shrink-0">
        <div
          className="absolute -inset-1 rounded-full blur-md opacity-25"
          style={{ backgroundColor: color }}
        ></div>
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="min-w-0">
        <h4 className="text-lg mb-0.5 font-bold leading-tight">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
}

function CredentialRow({ color, stat, label }: { color: string; stat: string; label: string }) {
  return (
    <div className="p-6 flex items-baseline gap-4">
      <div className="text-4xl font-bold tracking-tight shrink-0" style={{ color }}>
        {stat}
      </div>
      <p className="text-sm text-gray-700 leading-snug">{label}</p>
    </div>
  );
}

function CredentialCard({ icon, color, stat, label }: { icon: string; color: string; stat: string; label: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl mb-1 font-bold" style={{ color }}>
        {stat}
      </div>
      <p className="text-xs text-gray-600 leading-tight">{label}</p>
    </div>
  );
}

function TeamStat({ icon, color, title, description }: { icon: string; color: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: color + '20' }}>
        {icon}
      </div>
      <div className="flex-1">
        <h5 className="mb-1 font-bold">
          {title}
        </h5>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function ClientCard({ icon, color, title, description, tags }: { icon: string; color: string; title: string; description: string; tags: string[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: color + '20' }}>
        {icon}
      </div>
      <h3 className="text-2xl mb-4 font-bold">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="px-3 py-1.5 bg-[#F8F7F5] border border-gray-200 rounded-full text-sm text-gray-700">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function InsightRow({ color, title, description }: { color: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
      <div className="w-3 h-3 rounded-full mt-1.5" style={{ backgroundColor: color }}></div>
      <div className="flex-1">
        <h5 className="mb-1 font-bold">
          {title}
        </h5>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}