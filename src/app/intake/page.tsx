import Link from "next/link";
import { ArrowLeft, ShipWheel } from "lucide-react";
import { IntakeForm } from "@/components/intake-form";

export const metadata = {
  title: "Start Your Pivot Analysis | PivotPath AI",
  description: "Enter your career details to generate a custom pivot roadmap.",
};

export default function IntakePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background relative overflow-hidden">
      {/* Background glow for the form page */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative mb-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors">
            <ShipWheel className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Career Drive</span>
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl px-4 pb-20 relative z-10">
        <IntakeForm />
      </main>
    </div>
  );
}
