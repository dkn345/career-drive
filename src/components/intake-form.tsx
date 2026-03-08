"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Loader2 } from "lucide-react";

export type IntakeFormData = {
  currentRole: string;
  targetSkill: string;
  yearsExperience: string;
  strongestSkills: string;
  weakestSkills: string;
  timeAvailable: number;
  confidence: number;
  pastExperience: string;
};

export function IntakeForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IntakeFormData>({
    currentRole: "",
    targetSkill: "",
    yearsExperience: "",
    strongestSkills: "",
    weakestSkills: "",
    timeAvailable: 10,
    confidence: 50,
    pastExperience: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSliderChange = (name: keyof IntakeFormData, value: readonly number[] | number) => {
    let newVal = typeof value === "number" ? value : value[0];
    if (typeof newVal === "number" && !isNaN(newVal)) {
      setFormData((prev) => ({ ...prev, [name]: newVal }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store in session storage for the results page to pick up
    sessionStorage.setItem("careerDriveFormData", JSON.stringify(formData));
    
    // Slight delay for animation/UX feel before routing
    setTimeout(() => {
      router.push("/results");
    }, 500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
      <CardHeader className="pb-10 pt-8 px-8">
        <CardTitle className="text-4xl font-semibold tracking-tight text-foreground">Your Pivot Profile</CardTitle>
        <CardDescription className="text-xl text-muted-foreground mt-4 leading-relaxed font-normal">
          Tell us about where you are and where you want to go. We'll generate a realistic roadmap.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label htmlFor="currentRole" className="text-lg font-medium text-foreground">Current Role</Label>
              <Input 
                id="currentRole" 
                name="currentRole" 
                placeholder="e.g. Data Analyst" 
                required 
                value={formData.currentRole}
                onChange={handleChange}
                className="h-14 bg-background/50 border-white/10 text-lg focus-visible:ring-primary focus-visible:ring-offset-0 px-5"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="targetSkill" className="text-lg font-medium text-foreground">Target Skill</Label>
              <Input
                id="targetSkill"
                name="targetSkill"
                value={formData.targetSkill}
                onChange={handleChange}
                placeholder="e.g. Machine Learning, Next.js, Financial Modeling..."
                className="h-14 bg-background/50 border-white/10 text-lg focus-visible:ring-primary focus-visible:ring-offset-0 px-5"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearsExperience" className="text-lg">Years of Professional Experience</Label>
            <Input 
              id="yearsExperience" 
              name="yearsExperience" 
              type="number" 
              placeholder="e.g. 4" 
              min="0"
              required 
              value={formData.yearsExperience}
              onChange={handleChange}
              className="bg-background/50 border-white/10 focus-visible:ring-primary text-lg h-12"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="strongestSkills" className="text-lg">Strongest Skills</Label>
              <Input 
                id="strongestSkills" 
                name="strongestSkills" 
                placeholder="e.g. SQL, communication, research" 
                required 
                value={formData.strongestSkills}
                onChange={handleChange}
                className="bg-background/50 border-white/10 focus-visible:ring-primary text-lg h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weakestSkills" className="text-lg">Weakest Skills / Missing Context</Label>
              <Input 
                id="weakestSkills" 
                name="weakestSkills" 
                placeholder="e.g. Design thinking, strategy" 
                required 
                value={formData.weakestSkills}
                onChange={handleChange}
                className="bg-background/50 border-white/10 focus-visible:ring-primary text-lg h-12"
              />
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg font-medium text-foreground">Time available per week for upskilling</Label>
              <span className="text-xl font-medium text-foreground bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-sm">
                {formData.timeAvailable} hours
              </span>
            </div>
            <Slider 
              name="timeAvailable"
              value={[formData.timeAvailable]} 
              min={1}
              max={40} 
              step={1}
              onValueChange={(val) => handleSliderChange("timeAvailable", val)}
              className="py-6 cursor-pointer"
            />
          </div>

          <div className="space-y-4 pt-8">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-lg font-medium text-foreground">Confidence level in making this transition</Label>
              <span className="text-xl font-medium text-foreground bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-sm">
                {formData.confidence}%
              </span>
            </div>
            <Slider 
              name="confidence"
              value={[formData.confidence]} 
              max={100} 
              step={5}
              onValueChange={(val) => handleSliderChange("confidence", val)}
              className="py-6 cursor-pointer"
            />
          </div>

          <div className="space-y-4 pb-4">
          <Label htmlFor="pastExperience" className="text-lg font-medium text-foreground">
            What past experience do you have in learning this skill (from past applications or websites)?
          </Label>
          <Textarea
            id="pastExperience"
            name="pastExperience"
            value={formData.pastExperience}
            onChange={handleChange}
            placeholder="e.g. I took a Coursera course once, or I built a small app..."
            className="min-h-[120px] bg-background/50 border-white/10 text-lg resize-none focus-visible:ring-primary focus-visible:ring-offset-0 p-5 rounded-xl leading-relaxed"
          />
          </div>
        </CardContent>
        <CardFooter className="pt-6 pb-10 px-8">
          <Button 
            type="submit" 
            className="w-full text-xl font-medium h-16 rounded-full bg-foreground text-background hover:bg-white/90 shadow-[0_0_40px_-15px_rgba(255,255,255,0.3)] transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Profile...
              </>
            ) : (
              <>
                Generate Pivot Roadmap <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
