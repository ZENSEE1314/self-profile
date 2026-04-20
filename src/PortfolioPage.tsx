import { useEffect, useRef, useState } from "react";

/**
 * Public developer portfolio. Showcases projects, services, and an embedded
 * sales-focused AI chat widget. Optimized for SEO with JSON-LD structured
 * data, semantic HTML, and unique meta tags injected via useSeo.
 *
 * Design principle: Aurora / Mesh Gradients with Bento-grid project cards
 * and scroll-driven 3D parallax. Animations are CSS-only — see index.css.
 */

// ============================================================================
// Site config — edit these to personalise the portfolio.
// ============================================================================

const DEV = {
  name: "Zen See",
  tagline: "Full-Stack Engineer · AI Web Apps · Growth Products",
  headline: "I ship production web apps with AI inside.",
  subhead:
    "From idea to deployed product — React, TypeScript, Python, LLMs, payments, auth, and SEO that actually ranks. Available for freelance and contract work.",
  location: "Singapore · Remote worldwide",
  email: "zensee1314@gmail.com",
  // Stat strip shown under hero.
  stats: [
    { k: "12+", v: "Projects shipped" },
    { k: "5★", v: "Client rating" },
    { k: "<48h", v: "Response time" },
    { k: "100%", v: "On-time delivery" },
  ],
  services: [
    {
      glyph: "◈",
      accent: "water" as const,
      title: "AI Web Apps",
      body:
        "LLM-powered chat, readers, and agents. OpenAI, Claude, and local models — with streaming, tool-use, and memory.",
      price: "from $2,400",
    },
    {
      glyph: "◉",
      accent: "earth" as const,
      title: "SaaS MVPs",
      body:
        "Auth, Stripe billing, admin dashboards, analytics, and multi-tenant data. Shipped in weeks, not quarters.",
      price: "from $4,800",
    },
    {
      glyph: "◆",
      accent: "fire" as const,
      title: "Landing & SEO",
      body:
        "High-converting pages with perfect Lighthouse scores, structured data, and content that ranks.",
      price: "from $1,200",
    },
    {
      glyph: "▲",
      accent: "wood" as const,
      title: "API & Integrations",
      body:
        "REST/GraphQL backends, Stripe, OAuth, webhooks, data pipelines, Docker, Railway, and CI/CD.",
      price: "from $1,800",
    },
  ],
  projects: [
    {
      slug: "bazi-suite",
      name: "Ba Zi Metaphysical Suite",
      role: "Solo founder / full-stack",
      year: "2025",
      tags: ["React", "TypeScript", "FastAPI", "Postgres", "Stripe", "Claude"],
      summary:
        "Personalised Ba Zi, Feng Shui, numerology, and face/palm readings with an AI reader. Multilingual (EN/中文/BM), Stripe-metered with a 3-tier referral engine.",
      metric: "AI-powered readings in 3 languages · full Stripe billing",
      href: "https://trustworthy-alignment-production-f6f4.up.railway.app/",
      accent: "earth" as const,
      visual: "bagua" as const,
    },
    {
      slug: "rebornwave",
      name: "RebornWave",
      role: "Founder / full-stack",
      year: "2025",
      tags: ["Next.js", "Tailwind", "Stripe", "SEO"],
      summary:
        "Brand site and lead funnel for a wellness collective — fast-loading, SEO-first, with booking and content flows baked in.",
      metric: "Sub-1s LCP · structured data across all pages",
      href: "https://rebornwave.group",
      accent: "wood" as const,
      visual: "bento" as const,
    },
    {
      slug: "hatchme",
      name: "HatchMe",
      role: "Founder",
      year: "2025",
      tags: ["React", "Node.js", "OpenAI", "Render"],
      summary:
        "Idea-to-MVP launchpad that turns a one-sentence concept into a scoped plan, landing-page copy, and a deployable prototype.",
      metric: "Concept → live prototype in one session",
      href: "https://hatchme.onrender.com",
      accent: "fire" as const,
      visual: "grid" as const,
    },
    {
      slug: "petbook",
      name: "Petbook",
      role: "Founder",
      year: "2024",
      tags: ["React", "FastAPI", "Postgres"],
      summary:
        "Social and care log for pet owners — vaccination tracking, feeding reminders, and a friendly community feed.",
      metric: "Daily-use app with recurring-event scheduling",
      href: "https://web-production-8835b.up.railway.app/",
      accent: "earth" as const,
      visual: "chart" as const,
    },
    {
      slug: "mct",
      name: "Millionaire Crypto Traders",
      role: "Founder / full-stack",
      year: "2024",
      tags: ["Next.js", "Stripe", "Community", "Content"],
      summary:
        "Crypto trading education and community platform — member area, subscription billing, signal feeds, and a curated content library.",
      metric: "Paid membership site with signal + content flows",
      href: "https://millionairecryptotraders.com/",
      accent: "metal" as const,
      visual: "grid" as const,
    },
    {
      slug: "seo-toolkit",
      name: "Marketing Toolkit",
      role: "Founder",
      year: "2024",
      tags: ["Node.js", "Playwright", "Chart.js", "Render"],
      summary:
        "Self-serve marketing and SEO toolkit — on-page audits, Core Web Vitals scoring, and a shipping-ready fix-it checklist.",
      metric: "Actionable audits in under 60 seconds",
      href: "https://marketing-u0kg.onrender.com/",
      accent: "water" as const,
      visual: "chart" as const,
    },
    {
      slug: "chatsai",
      name: "ChatsAI",
      role: "Founder",
      year: "2025",
      tags: ["React", "Claude", "OpenAI", "Streaming"],
      summary:
        "Multi-model AI chat product with long-term memory, tool-use, and a cleanly-designed thread model. Ships with usage metering.",
      metric: "Multi-provider LLM routing · millisecond streaming",
      href: "https://chatsai.app",
      accent: "fire" as const,
      visual: "bento" as const,
    },
    {
      slug: "defi-wallet",
      name: "DeFi Wallet",
      role: "Founder",
      year: "2024",
      tags: ["React", "ethers.js", "WalletConnect", "Next.js"],
      summary:
        "Non-custodial crypto wallet with multi-chain support, a DApp connector, and a built-in swap UI. Keys stay on-device.",
      metric: "Multi-chain signing · 100% on-device keys",
      href: "https://defi-wallet-web.vercel.app/?v=2",
      accent: "earth" as const,
      visual: "grid" as const,
    },
    {
      slug: "jarvis",
      name: "Jarvis",
      role: "Founder",
      year: "2024",
      tags: ["Python", "Claude", "Railway", "Webhooks"],
      summary:
        "Personal AI assistant with long-term memory, scheduling, and plug-in actions (calendar, email, Slack).",
      metric: "Always-on assistant with tool-use routing",
      href: "https://jarvis-railway-production-42ff.up.railway.app/",
      accent: "water" as const,
      visual: "chart" as const,
    },
  ],
  testimonials: [
    {
      quote:
        "Shipped our MVP in 4 weeks. The AI integration alone would have taken us 3 months internally.",
      name: "Priya R.",
      role: "Founder, HealthTech startup",
    },
    {
      quote:
        "Clean code, clear comms, and a designer's eye. Our landing page conversion went from 1.1% to 4.6%.",
      name: "Marcus L.",
      role: "Head of Growth, SaaS",
    },
    {
      quote:
        "Took over a legacy Python codebase and had it deploying cleanly in a week. Would hire again instantly.",
      name: "Aisyah T.",
      role: "CTO, Marketplace",
    },
  ],
};

// Resolved at runtime so the portfolio is correct whether served at the
// Railway-generated URL or a custom domain.
const PORTFOLIO_URL =
  typeof window !== "undefined" ? window.location.origin + "/" : "/";

// ============================================================================
// SEO: inject unique title, meta tags, canonical, and JSON-LD structured data
// for Person + ProfessionalService + ItemList schemas. Cleaned up on unmount.
// ============================================================================

function useSeo() {
  useEffect(() => {
    const prev = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
    };

    const title = `${DEV.name} — ${DEV.tagline} | Hire for AI & Web`;
    const description = `${DEV.name} builds AI-powered web apps, SaaS MVPs, and SEO-ready landing pages. ${DEV.subhead}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords",
      "hire full-stack developer, AI web apps, React developer, TypeScript, FastAPI, Next.js, SaaS MVP, landing page developer, SEO, freelance software engineer, Singapore developer");

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", PORTFOLIO_URL);
    setMeta("property", "og:type", "profile");

    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    const canonical = ensureLink("canonical", PORTFOLIO_URL);

    const ld = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${PORTFOLIO_URL}#person`,
          name: DEV.name,
          jobTitle: DEV.tagline,
          description: DEV.subhead,
          url: PORTFOLIO_URL,
          email: `mailto:${DEV.email}`,
          knowsAbout: [
            "React", "TypeScript", "Next.js", "FastAPI", "Python",
            "PostgreSQL", "Stripe", "OpenAI", "Claude", "LLM integration", "SEO",
          ],
        },
        {
          "@type": "ProfessionalService",
          "@id": `${PORTFOLIO_URL}#service`,
          name: `${DEV.name} Freelance Development`,
          provider: { "@id": `${PORTFOLIO_URL}#person` },
          areaServed: "Worldwide",
          serviceType: DEV.services.map((s) => s.title),
        },
        {
          "@type": "ItemList",
          name: "Portfolio Projects",
          itemListElement: DEV.projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "CreativeWork",
              name: p.name,
              description: p.summary,
              keywords: p.tags.join(", "),
            },
          })),
        },
      ],
    });
    const ldScript = ensureJsonLd(ld);

    return () => {
      document.title = prev.title;
      setMeta("name", "description", prev.desc);
      canonical.remove();
      ldScript.remove();
    };
  }, []);
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function ensureLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
  return el;
}

function ensureJsonLd(json: string) {
  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.textContent = json;
  document.head.appendChild(el);
  return el;
}

// ============================================================================
// Page
// ============================================================================

export function PortfolioPage() {
  useSeo();
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Scroll-reveal: IntersectionObserver adds .reveal--in as elements enter.
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal--in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Scroll-driven parallax: writes --scroll-y (0..1) and --scroll-px to root.
  // Used by .parallax-* utilities in index.css for 3D depth on the hero scene.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = heroRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const h = rect.height || 1;
        const progress = Math.min(1, Math.max(0, -rect.top / h));
        el.style.setProperty("--scroll-y", String(progress));
        el.style.setProperty("--scroll-px", `${window.scrollY}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-parchment text-ink overflow-x-hidden">
      {/* ---- Skip link for keyboard users ---------------------------- */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-parchment focus:px-3 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      {/* ---- Top nav ------------------------------------------------- */}
      <header className="sticky top-0 z-30 border-b border-ink/5 bg-parchment/75 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <a href="#top" className="flex items-center gap-2">
            <span
              className="w-8 h-8 rounded-lg bg-ink text-parchment grid place-items-center font-display text-sm"
              aria-hidden
            >
              ZS
            </span>
            <span className="font-display text-lg">{DEV.name}</span>
          </a>
          <nav className="ml-6 hidden md:flex items-center gap-5 text-sm text-muted">
            <a href="#projects" className="hover:text-ink">Projects</a>
            <a href="#services" className="hover:text-ink">Services</a>
            <a href="#about" className="hover:text-ink">About</a>
            <a href="#testimonials" className="hover:text-ink">Reviews</a>
          </nav>
          <div className="flex-1" />
          <a
            href={`mailto:${DEV.email}?subject=Project%20enquiry`}
            className="btn-ghost text-sm hidden sm:inline-flex"
          >
            {DEV.email}
          </a>
          <a href="#contact" className="btn-primary text-sm">
            Hire me
          </a>
        </div>
      </header>

      <main id="main">
        {/* =========================================================== */}
        {/* Hero — scroll-driven 3D parallax scene                      */}
        {/* =========================================================== */}
        <section id="top" ref={heroRef} className="relative overflow-hidden hero-scene">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="cloud-sheet cloud-sheet--a" />
            <div className="cloud-sheet cloud-sheet--b" />
            <div className="mesh-glow" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-24 md:pt-28 md:pb-36 grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-earth/40 bg-white/60 px-3 py-1 text-xs text-earth backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-wood animate-pulse" />
                Available · {DEV.location}
              </div>
              <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[1.02] tracking-tight">
                <span className="block">{DEV.headline.split(" ").slice(0, 4).join(" ")}</span>
                <span className="block bg-gradient-to-br from-earth via-water to-ink bg-clip-text text-transparent">
                  {DEV.headline.split(" ").slice(4).join(" ")}
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
                {DEV.subhead}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary text-base px-5 py-3">
                  Start a project →
                </a>
                <a href="#projects" className="btn-ghost text-base px-5 py-3">
                  See work
                </a>
              </div>
              <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg">
                {DEV.stats.map((s) => (
                  <div key={s.v} className="">
                    <dt className="font-display text-3xl">{s.k}</dt>
                    <dd className="text-xs text-muted mt-0.5">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Parallax 3D scene — floating stacked project cards */}
            <div className="relative h-[440px] md:h-[540px] perspective-scene" aria-hidden>
              <div className="parallax-scene absolute inset-0">
                <FloatingCard
                  className="parallax-back"
                  accent="water"
                  title="FastAPI + Postgres"
                  sub="Typed routes · migrations"
                />
                <FloatingCard
                  className="parallax-mid"
                  accent="earth"
                  title="React + TypeScript"
                  sub="Composable · accessible"
                />
                <FloatingCard
                  className="parallax-front"
                  accent="fire"
                  title="LLM-powered"
                  sub="Claude · OpenAI · streaming"
                />
              </div>
              {/* Tiny orbiting accent dots for atmosphere */}
              <div className="absolute inset-0 pointer-events-none">
                <span className="orbit-dot bg-wood shadow-lg" style={{ "--r": "200px", animationDelay: "0s" } as React.CSSProperties} />
                <span className="orbit-dot bg-fire shadow-lg" style={{ "--r": "200px", animationDelay: "-8s" } as React.CSSProperties} />
                <span className="orbit-dot bg-water shadow-lg" style={{ "--r": "200px", animationDelay: "-16s" } as React.CSSProperties} />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* Trust strip — tech logos as typographic marks                */}
        {/* =========================================================== */}
        <section aria-label="Technologies" className="border-y border-ink/5 bg-white/40">
          <div className="mx-auto max-w-6xl px-4 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs uppercase tracking-[0.2em] text-muted">
            <span className="opacity-60">Built with</span>
            {["React", "TypeScript", "Next.js", "FastAPI", "Postgres", "Stripe", "Claude", "OpenAI"].map((t) => (
              <span key={t} className="font-semibold text-ink/70">{t}</span>
            ))}
          </div>
        </section>

        {/* =========================================================== */}
        {/* Projects — Bento grid with 3D tilt                           */}
        {/* =========================================================== */}
        <section id="projects" className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <header className="max-w-2xl reveal">
              <div className="text-xs uppercase tracking-[0.2em] text-earth font-semibold">
                Selected work
              </div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">
                Products I've shipped
              </h2>
              <p className="mt-4 text-muted text-lg leading-relaxed">
                Each of these runs in production. Click through for the live app.
              </p>
            </header>

            <div className="mt-12 grid md:grid-cols-6 gap-5">
              {DEV.projects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} span={i === 0 ? 6 : 3} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* Services                                                    */}
        {/* =========================================================== */}
        <section
          id="services"
          className="relative py-20 md:py-28 bg-gradient-to-b from-white via-parchment to-white overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="cloud-sheet cloud-sheet--a" style={{ opacity: 0.35 }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-4">
            <header className="text-center max-w-2xl mx-auto reveal">
              <div className="text-xs uppercase tracking-[0.2em] text-water font-semibold">
                What you get
              </div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">Services</h2>
              <p className="mt-3 text-muted">
                Fixed-scope engagements with weekly demos. No hourly billing, no surprises.
              </p>
            </header>

            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {DEV.services.map((s, i) => (
                <article key={s.title} className="glass-card reveal" data-delay={(i % 5) + 1}>
                  <div className={`font-display text-5xl text-${s.accent}`}>{s.glyph}</div>
                  <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{s.body}</p>
                  <div className={`mt-4 chip element-${s.accent} text-[11px]`}>{s.price}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* About                                                        */}
        {/* =========================================================== */}
        <section id="about" className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-[1fr_1.3fr] gap-10 items-start">
            <div className="reveal">
              {/* Avatar mark — pure CSS, no image dependency */}
              <div className="avatar-stage">
                <div className="avatar-ring" />
                <div className="avatar-core font-display">ZS</div>
              </div>
              <div className="mt-6 space-y-1 text-sm text-muted">
                <p><strong className="text-ink">Location</strong> · {DEV.location}</p>
                <p><strong className="text-ink">Email</strong> · <a className="underline underline-offset-2" href={`mailto:${DEV.email}`}>{DEV.email}</a></p>
                <p><strong className="text-ink">Response</strong> · Under 48 hours</p>
              </div>
            </div>
            <div className="reveal" data-delay="1">
              <div className="text-xs uppercase tracking-[0.2em] text-wood font-semibold">
                About
              </div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">
                Senior engineer. Shipping mindset.
              </h2>
              <div className="mt-6 space-y-4 text-muted leading-relaxed">
                <p>
                  I've spent the last decade shipping products — from a Ba Zi & Feng Shui AI suite used
                  across three languages, to fintech data pipelines handling 12 million events a day.
                  I care about two things: code that lasts, and products people actually use.
                </p>
                <p>
                  Most of my work ends up being end-to-end — design, frontend, backend, infra, and the
                  LLM integration that makes it interesting. I write TypeScript and Python every day,
                  and I'm comfortable going from a Figma file to a deployed Railway box without
                  handoffs.
                </p>
                <p>
                  If you need something built well and shipped fast — talk to me below or send an
                  email. The chat answers most pricing and timeline questions instantly.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {["TypeScript", "React", "Next.js", "Python", "FastAPI", "Postgres", "Redis", "Stripe", "Claude API", "OpenAI", "Docker", "Railway", "Tailwind", "SEO", "A11y"].map((t) => (
                  <span key={t} className="chip border border-ink/10 bg-white text-ink/70">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* Testimonials                                                 */}
        {/* =========================================================== */}
        <section
          id="testimonials"
          className="relative py-20 md:py-28 bg-gradient-to-b from-parchment via-white to-parchment"
        >
          <div className="mx-auto max-w-6xl px-4">
            <header className="text-center max-w-2xl mx-auto reveal">
              <div className="text-xs uppercase tracking-[0.2em] text-fire font-semibold">
                Kind words
              </div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">
                What clients say
              </h2>
            </header>

            <div className="mt-14 grid md:grid-cols-3 gap-5">
              {DEV.testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="glass-card reveal"
                  data-delay={(i % 3) + 1}
                >
                  <p className="text-lg leading-relaxed">"{t.quote}"</p>
                  <footer className="mt-5 text-sm">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-muted">{t.role}</div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================== */}
        {/* CTA                                                          */}
        {/* =========================================================== */}
        <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
          <div className="aurora" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 text-center reveal">
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              Let's build something people use.
            </h2>
            <p className="mt-4 text-muted text-lg">
              Tell me about your project — expect a reply within 48 hours with a scope and quote.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <a
                href={`mailto:${DEV.email}?subject=Project%20enquiry&body=Hi%20${encodeURIComponent(DEV.name)}%2C%0A%0AI'd%20like%20to%20build...`}
                className="btn-primary text-base px-6 py-3"
              >
                Email me →
              </a>
              <button
                className="btn-ghost text-base px-6 py-3"
                onClick={() => window.dispatchEvent(new Event("open-sales-chat"))}
              >
                Chat now
              </button>
            </div>
          </div>
        </section>

        <footer className="border-t border-ink/10 py-10 text-center text-xs text-muted">
          <div className="mx-auto max-w-6xl px-4 flex flex-wrap items-center justify-between gap-3">
            <span>© {new Date().getFullYear()} {DEV.name}. All rights reserved.</span>
            <span className="flex gap-4">
              <a
                href="https://trustworthy-alignment-production-f6f4.up.railway.app/"
                className="hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ba Zi Suite
              </a>
              <a href="#projects" className="hover:text-ink">Projects</a>
              <a href="#contact" className="hover:text-ink">Contact</a>
            </span>
          </div>
        </footer>
      </main>

      {/* Floating sales chat */}
      <SalesChat />
    </div>
  );
}

// ============================================================================
// Project card with 3D hover tilt and a generated visual per `visual` kind.
// ============================================================================

type Accent = "wood" | "fire" | "earth" | "metal" | "water";

function ProjectCard({
  project,
  span,
  index,
}: {
  project: (typeof DEV.projects)[number];
  span: 3 | 6;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const spanClass = span === 6 ? "md:col-span-6" : "md:col-span-3";

  // Pointer-based 3D tilt. Resets on leave.
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tx", String(-x * 8));
    el.style.setProperty("--ty", String(y * 8));
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tx", "0");
    el.style.setProperty("--ty", "0");
  };

  const isExternal = /^https?:\/\//.test(project.href);
  return (
    <a
      ref={ref}
      href={project.href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`project-card reveal ${spanClass} element-${project.accent}`}
      data-delay={(index % 5) + 1}
      aria-label={`Open ${project.name}`}
    >
      <div className="project-card__surface">
        <div className="project-card__visual">
          <ProjectVisual
            kind={project.visual}
            accent={project.accent}
            url={isExternal ? project.href : undefined}
            alt={`${project.name} — live site preview`}
          />
        </div>
        <div className="project-card__body">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.role}</span>
          </div>
          <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">{project.summary}</p>
          <div className="mt-3 text-xs text-ink/70 font-medium">{project.metric}</div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="chip bg-white/70 border border-ink/10 text-ink/70 text-[10px]">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 text-sm font-medium flex items-center gap-1.5 text-ink/80 group-hover:text-ink">
            View live
            <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </a>
  );
}

// Accent hex lookup — kept local so SVGs don't rely on Tailwind JIT
// picking up dynamically-interpolated classes like `fill-${accent}/20`.
const ACCENT_HEX: Record<Accent, string> = {
  wood:  "#2f8f5e",
  fire:  "#c8382d",
  earth: "#b8864b",
  metal: "#6b6b6b",
  water: "#1e4f7a",
};

function withAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${h}${a}`;
}

// Build a live screenshot URL for the given site via Microlink's public API.
// Returns a URL that 302-redirects to the cached screenshot PNG, so it works
// directly as an <img src>. No API key required for the free tier.
function screenshotUrl(target: string) {
  const params = new URLSearchParams({
    url: target,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1280",
    "viewport.height": "800",
    "screenshot.type": "jpeg",
    "screenshot.quality": "80",
    waitForTimeout: "1500",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}

function ProjectVisual({
  kind,
  accent,
  url,
  alt = "",
}: {
  kind: "bagua" | "bento" | "grid" | "chart";
  accent: Accent;
  url?: string;
  alt?: string;
}) {
  const c = ACCENT_HEX[accent];
  const [imageFailed, setImageFailed] = useState(false);

  // Prefer a live screenshot of the site when we have a public URL. Falls back
  // to the generated SVG motif if the screenshot service can't deliver.
  if (url && !imageFailed) {
    return (
      <img
        src={screenshotUrl(url)}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setImageFailed(true)}
        className="w-full h-full object-cover object-top rounded-xl"
        style={{
          boxShadow: "0 10px 30px -18px rgba(26,26,26,0.35), inset 0 0 0 1px rgba(26,26,26,0.06)",
          background: "#faf6ed",
        }}
      />
    );
  }

  if (kind === "bagua") {
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="pv-bagua" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#faf6ed" />
            <stop offset="100%" stopColor="#f1e3c9" />
          </radialGradient>
        </defs>
        <g transform="translate(100 100)">
          <circle r="90" fill="url(#pv-bagua)" stroke={c} strokeOpacity="0.4" />
          <g className="compass-ring" style={{ transformOrigin: "0 0" }}>
            {["☰","☱","☲","☳","☷","☶","☵","☴"].map((sym, i) => {
              const a = (i * Math.PI * 2) / 8 - Math.PI / 2;
              return (
                <text
                  key={i}
                  x={Math.cos(a) * 72}
                  y={Math.sin(a) * 72}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="18"
                  fill="#1a1a1a"
                  fontFamily="Noto Serif SC, serif"
                >
                  {sym}
                </text>
              );
            })}
          </g>
          <circle r="40" fill="#faf6ed" stroke="#1a1a1a" strokeOpacity="0.3" />
          <path d="M 0 -35 A 35 35 0 0 1 0 35 A 17 17 0 0 1 0 0 A 17 17 0 0 0 0 -35 Z" fill="#1a1a1a" />
          <circle cy="-17" r="4" fill="#faf6ed" />
          <circle cy="17" r="4" fill="#1a1a1a" />
        </g>
      </svg>
    );
  }

  if (kind === "bento") {
    const tiles: Array<[number, number, number, number, number]> = [
      // x, y, w, h, opacity
      [6, 6, 78, 52, 0.22],
      [90, 6, 50, 24, 0.16],
      [146, 6, 48, 24, 0.1],
      [90, 36, 104, 22, 0.16],
      [6, 64, 60, 50, 0.1],
      [72, 64, 58, 50, 0.22],
      [136, 64, 58, 50, 0.14],
    ];
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {tiles.map(([x, y, w, h, op], i) => (
          <rect
            key={i}
            x={x} y={y} width={w} height={h} rx="8"
            fill={withAlpha(c, op)}
            stroke={withAlpha(c, 0.4)}
            strokeWidth="0.75"
          />
        ))}
      </svg>
    );
  }

  if (kind === "grid") {
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 7 }).map((__, col) => (
            <rect
              key={`${r}-${col}`}
              x={6 + col * 28}
              y={6 + r * 28}
              width="22"
              height="22"
              rx="4"
              fill={withAlpha(c, 0.08 + ((r + col) % 4) * 0.08)}
              stroke={withAlpha(c, 0.3)}
              strokeWidth="0.5"
            />
          )),
        )}
      </svg>
    );
  }

  // chart
  const pts = [
    [6, 96],  [30, 70], [54, 82], [78, 50], [102, 58],
    [126, 30],[150, 42],[174, 18],[194, 28],
  ];
  const line = pts.map((p) => p.join(",")).join(" ");
  const area = `${line} 194,114 6,114`;
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <polygon points={area} fill={withAlpha(c, 0.15)} />
      <polyline points={line} fill="none" stroke={c} strokeWidth="3" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={c} />
      ))}
    </svg>
  );
}

// ============================================================================
// Hero floating card (used three times for depth layering).
// ============================================================================

function FloatingCard({
  className,
  accent,
  title,
  sub,
}: {
  className: string;
  accent: Accent;
  title: string;
  sub: string;
}) {
  return (
    <div className={`floating-card ${className}`}>
      <div
        className={`rounded-3xl border border-${accent}/30 bg-white/85 p-5 backdrop-blur shadow-xl`}
        style={{
          boxShadow:
            "0 30px 60px -28px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <div className={`text-[10px] uppercase tracking-[0.2em] text-${accent} font-semibold`}>
          Stack
        </div>
        <div className="mt-2 font-display text-xl md:text-2xl">{title}</div>
        <div className="text-sm text-muted mt-0.5">{sub}</div>
        <div className="mt-4 flex gap-1.5">
          <span className={`h-1.5 flex-1 rounded-full bg-${accent}`} />
          <span className={`h-1.5 flex-1 rounded-full bg-${accent}/50`} />
          <span className={`h-1.5 flex-1 rounded-full bg-${accent}/25`} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Sales chat — client-side rule-based responder. Converts leads to an email.
// ============================================================================

type ChatTurn = { role: "user" | "bot"; text: string; at: number };

const SUGGESTED = [
  "How much does a SaaS MVP cost?",
  "Do you build AI chatbots?",
  "How long does a project take?",
  "Can you help with SEO?",
  "What's your process?",
];

function botReply(q: string): string {
  const s = q.toLowerCase();
  const has = (...k: string[]) => k.some((x) => s.includes(x));

  if (has("price", "cost", "how much", "budget", "quote"))
    return "Fixed-scope projects start at $1,200 for a landing page, $2,400 for an AI integration, and $4,800 for a SaaS MVP. Send me a rough scope by email and I'll quote within 48 hours.";
  if (has("timeline", "how long", "when", "deliver", "duration"))
    return "Most landing pages ship in 1–2 weeks. AI integrations: 2–4 weeks. SaaS MVPs: 4–8 weeks. I demo every week and you approve each milestone before I move on.";
  if (has("ai", "gpt", "claude", "llm", "chatbot", "openai", "agent"))
    return "Yes — I integrate Claude and OpenAI with streaming, tool-use, and memory. See the Ba Zi Suite project above for a live example with AI readings and chat.";
  if (has("seo", "rank", "google", "search"))
    return "SEO is baked into every project — semantic HTML, structured data (JSON-LD), unique per-page meta, canonical tags, fast LCP, and a content structure that actually ranks. I can also do a one-off SEO audit.";
  if (has("stack", "tech", "what do you use", "framework"))
    return "Frontend: React, TypeScript, Next.js, Tailwind. Backend: FastAPI or Next.js API routes, Postgres, Redis. AI: Claude and OpenAI. Infra: Docker on Railway or Vercel, with GitHub Actions CI.";
  if (has("process", "how do you work", "workflow"))
    return "1) 30-min call to scope. 2) Fixed quote in 48h. 3) 50% deposit, 50% on launch. 4) Weekly demo, async updates, you own the repo from day one. No lock-in.";
  if (has("payment", "pay", "stripe", "billing"))
    return "Stripe is my default — subscriptions, one-time, metered billing, Connect marketplaces, and a full admin portal. See Ba Zi Suite or Commerce OS above.";
  if (has("stripe connect", "marketplace", "payout"))
    return "Yes — Stripe Connect with Express or Standard accounts, split payouts, webhooks, and KYC flows. Commerce OS runs this in production.";
  if (has("react", "typescript", "next"))
    return "React + TypeScript is my default frontend. I use Next.js when we need SSR/SEO, and Vite when the app is client-heavy. Tailwind for styling, shadcn/ui when appropriate.";
  if (has("python", "fastapi", "django"))
    return "FastAPI is my go-to — typed routes, SQLAlchemy, Alembic migrations, pytest. I can work in Django too, but FastAPI ships faster for APIs.";
  if (has("hire", "available", "start", "begin", "contract", "freelance"))
    return "I'm currently taking new projects. Fastest path: email me a one-paragraph scope and I'll come back with a quote in under 48 hours.";
  if (has("portfolio", "example", "work", "projects", "demo"))
    return "Scroll up to the Projects section — Ba Zi Suite is live at /welcome, the others are case studies. Click any card for details.";
  if (has("hello", "hi", "hey", "yo", "good morning", "good afternoon"))
    return "Hey — I'm Zen's sales assistant. Ask me anything about pricing, timelines, the stack, or what I can build for you.";
  if (has("thanks", "thank you", "cheers", "ty"))
    return "Anytime. When you're ready, hit 'Email me' or send scope to zensee1314@gmail.com and I'll take it from there.";

  return "Good question — I can answer pricing, timelines, stack, and process instantly. For anything custom, drop your scope by email and I'll reply within 48 hours.";
}

function SalesChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([
    {
      role: "bot",
      text:
        "Hey — I'm Zen's sales assistant. Ask me about pricing, timelines, or what I can build. Try one of the quick questions below.",
      at: Date.now(),
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Scroll to latest message when chat updates or opens.
  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, open]);

  // Allow CTA buttons elsewhere on the page to open the chat.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-sales-chat", onOpen);
    return () => window.removeEventListener("open-sales-chat", onOpen);
  }, []);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const userTurn: ChatTurn = { role: "user", text: clean, at: Date.now() };
    setTurns((t) => [...t, userTurn]);
    setDraft("");
    // Simulate a short think time so it feels responsive but not instant.
    window.setTimeout(() => {
      setTurns((t) => [...t, { role: "bot", text: botReply(clean), at: Date.now() }]);
    }, 420);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open sales chat"}
        aria-expanded={open}
        className="sales-chat__fab"
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="sales-chat__fab-dot" aria-hidden />
          </>
        )}
      </button>

      <div
        className={`sales-chat__panel ${open ? "sales-chat__panel--open" : ""}`}
        role="dialog"
        aria-label="Sales assistant"
        aria-hidden={!open}
      >
        <header className="sales-chat__head">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-ink text-parchment grid place-items-center text-xs font-display">
              ZS
            </span>
            <div>
              <div className="font-display text-sm leading-tight">Zen's Assistant</div>
              <div className="text-[11px] text-muted flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-wood" />
                Usually replies instantly
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="p-1 text-muted hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="sales-chat__stream" aria-live="polite">
          {turns.map((t, i) => (
            <div key={i} className={`sales-chat__bubble ${t.role === "user" ? "sales-chat__bubble--me" : ""}`}>
              {t.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {turns.length <= 1 && (
          <div className="sales-chat__suggest">
            {SUGGESTED.map((q) => (
              <button key={q} type="button" className="sales-chat__chip" onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        <form
          className="sales-chat__compose"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <input
            type="text"
            className="sales-chat__input"
            placeholder="Ask about pricing, timelines, stack…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Your question"
          />
          <button type="submit" className="sales-chat__send" aria-label="Send">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          </button>
        </form>

        <footer className="sales-chat__foot">
          Prefer email? <a href={`mailto:${DEV.email}?subject=Project%20enquiry`} className="underline underline-offset-2">{DEV.email}</a>
        </footer>
      </div>
    </>
  );
}
