"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PivotRoadmap } from "@/lib/types";
import {
  ReadinessScoreCard,
  SkillGapsSection,
  BlindSpotsSection,
  CareerProjectionChart,
  RoadmapTimelineSection,
  KeyConceptsSection,
  ResourcesSection,
  PracticeScenarioCard,
} from "@/components/results-components";

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<PivotRoadmap | null>(null);

  useEffect(() => {
    async function generateRoadmap() {
      try {
        const storedData = sessionStorage.getItem("careerDriveFormData");
        
        if (!storedData) {
          router.push("/intake");
          return;
        }

        const formData = JSON.parse(storedData);

        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to generate roadmap.");
        }

        const data: PivotRoadmap = await res.json();
        setRoadmap(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    generateRoadmap();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-bold mb-2 text-foreground">Analyzing Your Pivot</h2>
        <p className="text-muted-foreground max-w-sm text-center">
          Our AI is formulating your personalized transition strategy, skill gaps, and 90-day roadmap...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl max-w-lg">
          <h2 className="text-xl font-bold text-destructive mb-3">Generation Failed</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="border-white/10 hover:bg-white/5">
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!roadmap) return null;

  return (
    <div className="min-h-screen bg-background relative pb-20">
      {/* Premium background effects */}
      <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10 pointer-events-none"></div>
      <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <header className="w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between z-10 relative">
        <Link 
          href="/intake" 
          className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Edit Profile
        </Link>
      </header>

      <main className="w-full max-w-6xl mx-auto px-6 space-y-10 relative z-10">
        
        {/* Top Row: Score & Projection */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReadinessScoreCard data={roadmap} />
          <CareerProjectionChart projection={roadmap.career_projection} />
        </section>

        {/* Second Row: Gaps and Risks */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-8">
            <SkillGapsSection gaps={roadmap.top_skill_gaps} />
          </div>
          <div className="lg:col-span-4">
            <BlindSpotsSection spots={roadmap.blind_spots} />
          </div>
        </section>

        <div className="border-t border-white/5 w-full my-8"></div>

        {/* Third Row: Roadmap & Learning */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 border-r-0 lg:border-r border-white/5 pr-0 lg:pr-8">
            <RoadmapTimelineSection roadmap={roadmap.roadmap} />
          </div>
          
          <div className="lg:col-span-7 space-y-8">
            <KeyConceptsSection concepts={roadmap.key_concepts} />
            <ResourcesSection resources={roadmap.resources} />
            <PracticeScenarioCard scenario={roadmap.practice_scenario} />
          </div>
        </section>

      </main>
    </div>
  );
}
