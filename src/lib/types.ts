export interface SkillGap {
  skill: string;
  severity: number;
  reason: string;
}

export interface ProjectionPoint {
  day: number;
  score: number;
}

export interface RoadmapTimeline {
  "30_days": string[];
  "60_days": string[];
  "90_days": string[];
}

export interface Resource {
  title: string;
  snippet: string;
  reason: string;
}

export interface PracticeScenario {
  title: string;
  description: string;
}

export interface PivotRoadmap {
  pivot_readiness_score: number;
  readiness_label: string;
  summary: string;
  top_skill_gaps: SkillGap[];
  blind_spots: string[];
  career_projection: ProjectionPoint[];
  roadmap: RoadmapTimeline;
  key_concepts: string[];
  resources: Resource[];
  practice_scenario?: PracticeScenario;
}
