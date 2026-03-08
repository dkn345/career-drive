import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShipWheel } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors">
            <ShipWheel className="h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tight">Career Drive</span>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-6 text-center relative z-10 mt-[-80px]">
        {/* Abstract background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-base md:text-lg text-muted-foreground mb-8">
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
          AI-Powered Career Intelligence
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 mb-10 leading-[1.1]">
          Navigate your career pivot with precision.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-16 leading-relaxed font-normal tracking-tight">
          Stop guessing what you need to learn. Connect your current background with your target role to generate a realistic, structured, step-by-step roadmap to get hired.
        </p>
        
        <Link href="/intake">
          <Button size="lg" className="rounded-full px-10 h-16 text-xl font-medium bg-foreground text-background hover:bg-white/90 shadow-[0_0_50px_-15px_rgba(255,255,255,0.3)] transition-all">
            Start Your Pivot Analysis <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
