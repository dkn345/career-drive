import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the SDK.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      currentRole,
      targetSkill,
      yearsExperience,
      strongestSkills,
      weakestSkills,
      timeAvailable,
      confidence,
      pastExperience,
    } = body;
    
    // 90 days is roughly 13 weeks. Calculate the exact total hour budget the user can commit.
    const totalHours = timeAvailable * 13;

    const systemInstruction = `You are an elite career pivot strategist and diagnostic engine. 
Your goal is to provide a realistic, structured, and highly specific career transition roadmap.
Do not use generic motivational fluff. Be direct, analytical, and highly actionable.
The user is currently a ${currentRole} and wants to master the target skill: ${targetSkill}.
They have committed a TOTAL of ${totalHours} hours over the next 90 days (13 weeks) toward learning this. Your roadmap must strictly fit within this ${totalHours}-hour budget.

You must return a raw JSON object (without markdown code blocks) matching this EXACT schema:
{
  "pivot_readiness_score": <number between 0 and 100>,
  "readiness_label": "<Low, Moderate, or Strong>",
  "summary": "<2-3 sentence realistic assessment of their pivot feasibility>",
  "top_skill_gaps": [
    {
      "skill": "<Specific missing skill>",
      "severity": <number 1-100 indicating gap size>,
      "reason": "<Specific reason why it matters>"
    }
  ],
  "blind_spots": [
    "<A highly specific, non-obvious hidden challenge or risk they face>"
  ],
  "career_projection": [
    { "day": 30, "score": <number> },
    { "day": 60, "score": <number> },
    { "day": 90, "score": <number> }
  ],
  "roadmap": {
    "30_days": ["<Action 1>", "<Action 2>"],
    "60_days": ["<Action 1>", "<Action 2>"],
    "90_days": ["<Action 1>", "<Action 2>"]
  },
  "key_concepts": [
    "<Hard concept 1>", "<Hard concept 2>", "<Hard concept 3>"
  ],
  "resources": [
    {
      "title": "<Specific realistic YouTube Video Title or Course>",
      "snippet": "<Like '3:20-8:10'>",
      "reason": "<Why watch this specific snippet?>"
    }
  ],
  "practice_scenario": {
    "title": "<A mock challenge title>",
    "description": "<A 2-3 sentence mock scenario to test their readiness>"
  }
}`;

    const userPrompt = `
Here is the user's profile:
Current Role: ${currentRole}
Target Skill to Learn: ${targetSkill}
Years of Experience: ${yearsExperience}
Strongest Skills: ${strongestSkills}
Weakest Skills: ${weakestSkills}
Time Available per week: ${timeAvailable} hours (TOTAL BUDGET: ${totalHours} hours over next 90 days)
Confidence Level: ${confidence}/100
Past experience learning this: "${pastExperience}"

Generate the JSON assessment. Ensure it is valid JSON and nothing else.
`;

    // We use gemini-2.5-flash as it is fast and supports JSON out-of-the-box well.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemInstruction + "\n\n" + userPrompt }] }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const textResponse = response.text;
    
    if (!textResponse) {
      throw new Error("No response from Gemini");
    }

    // Attempt to parse to ensure it's valid JSON before sending to client
    const jsonResponse = JSON.parse(textResponse);

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
