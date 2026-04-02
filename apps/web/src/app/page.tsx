"use client";
import { PLANS, BAG_CAPACITY, formatVND } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Lock, 
  WashingMachine, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Check, 
  ArrowRight
} from "lucide-react";

/* ─── NAVBAR ─── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-foreground flex items-center justify-center text-background text-xs font-black tracking-tighter">
            NW
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            NowWash
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">Architecture</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>

        <Link href="/dashboard">
          <Button variant="secondary" size="sm" className="h-8 rounded-md text-xs font-semibold">
            Dashboard
          </Button>
        </Link>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/20 text-xs font-medium text-muted-foreground mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          The First O2O Cluster Laundry in Vietnam
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6" style={{ letterSpacing: "-0.04em" }}>
          Clean. Without compromise.
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Mẻ giặt riêng biệt. Niêm phong bằng công nghệ. Không phân loại rườm rà. <br/>
          Trải nghiệm đẳng cấp từ <span className="text-foreground font-medium">79.000₫</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="h-12 px-6 rounded-md w-full sm:w-auto font-semibold flex gap-2 group transition-all">
              Start Building <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#pricing" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="h-12 px-6 rounded-md border-border/40 hover:bg-muted/50 text-foreground w-full sm:w-auto font-medium">
              View Pricing
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  const steps = [
    { icon: <Smartphone className="w-5 h-5 text-foreground" />, title: "Order via App", desc: "Choose S/M/L bag. Schedule your pickup in seconds." },
    { icon: <Lock className="w-5 h-5 text-foreground" />, title: "Seal at Door", desc: "One-time QR seal locked by our staff. Zero tampering." },
    { icon: <WashingMachine className="w-5 h-5 text-foreground" />, title: "Isolated Wash", desc: "1 client = 1 machine. Monitored strictly by Top-down QC." },
    { icon: <Sparkles className="w-5 h-5 text-foreground" />, title: "Crisp Delivery", desc: "Folded, fresh, and delivered right to your handle." },
  ];

  return (
    <section className="py-24 px-6 border-t border-border/40" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
            The Infrastructure of Clean
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Engineered to process garments with zero cross-contamination.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-colors flex flex-col items-start">
              <div className="w-10 h-10 rounded border border-border/50 bg-muted/20 flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ─── */
function Features() {
  const features = [
    { icon: <Lock className="w-5 h-5 text-foreground" />, title: "Cryptographic Seal", desc: "Single-use QR seal attached directly to the bag. Broken seal = automatic compensation protocol." },
    { icon: <WashingMachine className="w-5 h-5 text-foreground" />, title: "Zero Cross-mingling", desc: "Dedicated sorting tables. Dedicated machines. Your garments never touch another client's." },
    { icon: <Truck className="w-5 h-5 text-foreground" />, title: "Hyperlocal Clusters", desc: "Operating within micro-clusters for near-instant pickups. Faster routing, fresher results." },
    { icon: <ShieldCheck className="w-5 h-5 text-foreground" />, title: "Event-Sourced Warranty", desc: "Every step is tracked. Transparent logging means unquestionable guarantees for high-value items." },
  ];

  return (
    <section className="py-24 px-6 border-t border-border/40" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
            Designed for scale.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-xl border border-border/50 bg-card/50 flex gap-4 items-start hover:bg-card transition-colors">
              <div className="flex-shrink-0 w-10 h-10 rounded border border-border/50 bg-muted/20 flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─── */
function Pricing() {
  return (
    <section className="py-24 px-6 border-t border-border/40 bg-zinc-950/30" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
            Predictable Pricing
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Skip the scale. Simply fill the bag.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-6 rounded-xl flex flex-col border transition-all ${
                plan.popular
                  ? "border-foreground/30 bg-card"
                  : "border-border/50 bg-card/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6 bg-foreground text-background text-[10px] font-bold py-0.5 px-2 rounded-sm tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
              <p className="text-xs font-medium text-muted-foreground mb-6">{BAG_CAPACITY[plan.bagSize]}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{formatVND(plan.price)}</span>
                  <span className="text-muted-foreground text-xs font-medium">/mo</span>
                </div>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-foreground/70 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full rounded-md font-semibold"
                variant={plan.popular ? "default" : "secondary"}
              >
                Subscribe
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border/40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[3px] bg-foreground flex items-center justify-center text-[8px] font-black text-background tracking-tighter">NW</div>
          <span className="text-xs font-semibold text-foreground tracking-tight">NowWash</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 NowWash Architecture. Engineered for purity.
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-10">
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
