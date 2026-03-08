import { PivotRoadmap } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2, Clock, PlayCircle, Target, TrendingUp, Zap } from "lucide-react";

export function ReadinessScoreCard({ data }: { data: PivotRoadmap }) {
  // User requested score to always be optimistic and green 
  const isHigh = true;
  const isMed = false;
  const colorClass = "text-emerald-400";
  const bgClass = "bg-emerald-400/20";
  const progressColor = "bg-emerald-400";

  return (
    <Card className="w-full border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_var(--color-primary)]">
      <div className={`absolute top-0 right-0 w-32 h-32 ${bgClass} blur-[50px] -z-10 rounded-full`}></div>
      <CardHeader className="pb-8 pt-8">
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <Target className="h-6 w-6 text-primary" />
          Pivot Readiness
        </CardTitle>
        <CardDescription className="text-lg font-normal">Overall assessment of your transition viability.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-end justify-between">
          <div className={`flex items-baseline gap-1 text-7xl font-semibold tracking-tighter ${colorClass}`}>
            {data.pivot_readiness_score}
            <span className="text-2xl text-muted-foreground font-medium tracking-normal mb-1">/100</span>
          </div>
          <Badge variant="outline" className={`px-3 py-1 text-sm border-white/10 ${colorClass}`}>
            {data.readiness_label} readiness
          </Badge>
        </div>
        
        <div className="space-y-2">
          {/* Custom progress bar to inject the color */}
          <div className="h-3 w-full bg-secondary overflow-hidden rounded-full">
            <div 
              className={`h-full ${progressColor} transition-all duration-1000 ease-out`} 
              style={{ width: `${data.pivot_readiness_score}%` }}
            />
          </div>
        </div>

        <p className="text-xl text-foreground/90 leading-relaxed pt-6 font-medium">
          "{data.summary}"
        </p>
      </CardContent>
    </Card>
  );
}

export function SkillGapsSection({ gaps }: { gaps: PivotRoadmap["top_skill_gaps"] }) {
  return (
    <div className="space-y-6 pt-4">
      <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-3">
        <Zap className="h-6 w-6 text-primary" /> Core Skill Gaps
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gaps.map((gap, i) => (
          <Card key={i} className="border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_var(--color-primary)]">
            <CardHeader className="pb-4 pt-6">
              <div className="flex justify-between items-start gap-4">
                <CardTitle className="text-xl font-semibold tracking-tight">{gap.skill}</CardTitle>
                <Badge variant="secondary" className="bg-destructive/10 text-destructive-foreground border-none px-4 py-1.5 text-sm font-medium rounded-full">
                  Sev {gap.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <p className="text-lg text-muted-foreground leading-relaxed font-normal">{gap.reason}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function BlindSpotsSection({ spots }: { spots: string[] }) {
  return (
    <div className="space-y-6 pt-4">
      <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-3 text-primary">
        <AlertTriangle className="h-6 w-6" /> Blind Spots & Risks
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {spots.map((spot, i) => (
          <Alert key={i} className="border-primary/20 bg-primary/5 text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_var(--color-primary)]">
            <AlertTriangle className="h-6 w-6 stroke-primary mt-1" />
            <AlertTitle className="text-primary font-semibold tracking-tight text-xl mb-2">Risk Factor {i + 1}</AlertTitle>
            <AlertDescription className="text-lg text-foreground/80 leading-relaxed mt-2 font-normal">
              {spot}
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}

export function CareerProjectionChart({ projection }: { projection: PivotRoadmap["career_projection"] }) {
  // A simple visual representation using standard DOM elements since we didn't add Recharts purely for speed, 
  // but we can make it look like a sleek bar chart
  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_var(--color-primary)]">
      <CardHeader className="pt-8 px-8 pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
          <TrendingUp className="h-6 w-6 text-primary" /> Projected Trajectory
        </CardTitle>
        <CardDescription className="text-lg font-normal">Estimated readiness score improvement over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-56 gap-6 pt-8 pb-2">
          {projection.map((pt, i) => (
            <div key={i} className="flex flex-col items-center flex-1 h-full justify-end gap-3 group relative">
              <span className="text-lg font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-black/80 px-3 py-1 rounded-md border border-primary/20">
                {pt.score}%
              </span>
              <div className="w-full max-w-[80px] bg-secondary/50 rounded-t-lg relative flex items-end h-[85%] border border-white/5 border-b-0 group-hover:bg-secondary/70 transition-colors">
                <div 
                  className="w-full bg-primary rounded-t-lg border-t-2 border-white/50 transition-all duration-1000 group-hover:brightness-125 shadow-[0_0_15px_-3px_var(--color-primary)]"
                  style={{ height: `${pt.score}%` }}
                >
                  <div className="w-full text-center mt-2 text-primary-foreground font-black text-sm opacity-80">
                    {pt.score}
                  </div>
                </div>
              </div>
              <span className="text-base text-muted-foreground font-semibold mt-1">Day {pt.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function RoadmapTimelineSection({ roadmap }: { roadmap: PivotRoadmap["roadmap"] }) {
  const increments = [
    { label: "30 Days", data: roadmap["30_days"] },
    { label: "60 Days", data: roadmap["60_days"] },
    { label: "90 Days", data: roadmap["90_days"] }
  ];

  return (
    <div className="space-y-8 pt-4">
      <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-3">
        <Clock className="h-6 w-6 text-primary" /> 90-Day Execution Roadmap
      </h3>
      <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 pb-6">
        {increments.map((inc, i) => (
          <div key={i} className="relative pl-8 md:pl-10">
            <span className="absolute -left-[1.25rem] top-1 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-primary/20 shadow-sm">
              <span className="h-3 w-3 rounded-full bg-primary/80"></span>
            </span>
            <h4 className="text-2xl font-semibold tracking-tight text-foreground mb-6">{inc.label}</h4>
            <div className="space-y-3">
              {inc.data.map((task, j) => (
                <div key={j} className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.06] transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-primary/80 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-lg md:text-xl leading-relaxed font-normal">{task}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KeyConceptsSection({ concepts }: { concepts: string[] }) {
  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_var(--color-primary)]">
      <CardHeader className="pt-8 px-8 pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
          <BookOpen className="h-6 w-6 text-primary" /> Crucial Concepts
        </CardTitle>
        <CardDescription className="text-lg font-normal">Topics you must master to pass the interviews.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3 px-8 pb-8">
        {concepts.map((concept, i) => (
          <Badge key={i} variant="secondary" className="px-5 py-2.5 text-base font-medium rounded-full bg-white/5 text-foreground hover:bg-white/10 cursor-default border-white/10 transition-colors">
            {concept}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

export function ResourcesSection({ resources }: { resources: PivotRoadmap["resources"] }) {
  return (
    <div className="space-y-6 pt-4">
      <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-3 text-primary">
        <PlayCircle className="h-6 w-6" /> Curated Watchlist
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((res, i) => (
          <Card key={i} className="border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_var(--color-primary)] flex flex-col">
            <CardHeader className="pb-4 pt-6">
              <CardTitle className="text-xl font-semibold tracking-tight flex flex-col items-start gap-4">
                <span className="leading-snug">{res.title}</span>
                <Badge variant="outline" className="text-sm px-4 py-2 rounded-[20px] border-white/10 bg-white/5 whitespace-normal break-words text-left inline-block font-medium min-h-[32px] leading-relaxed h-auto">
                  {res.snippet}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6 flex-1 flex">
              <p className="text-lg text-muted-foreground leading-relaxed flex items-start gap-4 mt-2 font-normal whitespace-pre-wrap">
                <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-1" />
                <span>{res.reason}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function PracticeScenarioCard({ scenario }: { scenario: PivotRoadmap["practice_scenario"] }) {
  if (!scenario) return null;

  return (
    <Card className="border-primary/20 bg-primary/5 relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_var(--color-primary)]">
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <CardHeader className="pb-4 pt-8 px-8">
        <CardTitle className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-primary">
          <Target className="h-6 w-6" /> Practice Scenario: {scenario.title}
        </CardTitle>
        <CardDescription className="text-foreground/80 font-normal text-lg mt-2">Test your readiness with this mock challenge.</CardDescription>
      </CardHeader>
      <CardContent className="pb-8 px-8">
        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-muted-foreground text-lg italic leading-relaxed font-normal">
          "{scenario.description}"
        </div>
      </CardContent>
    </Card>
  );
}
