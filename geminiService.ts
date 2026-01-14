
import { GoogleGenAI, Type } from "@google/genai";
import { EmotionAnalysis, CoachResponse, UIConfig, AnalysisResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeJournalEntry = async (text: string): Promise<AnalysisResult> => {
  // 1. Emotion Analysis
  const analysisResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following student journal entry and return a JSON response.
    
    Journal Entry: "${text}"

    Rules:
    - Be empathetic, not clinical
    - Do not mention therapy or diagnosis
    - Keep outputs concise and usable by software
    - Output only valid JSON`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dominant_emotion: { type: Type.STRING },
          stress_level: { type: Type.NUMBER },
          motivation_level: { type: Type.NUMBER },
          cognitive_load: { type: Type.STRING },
          short_reasoning: { type: Type.STRING },
          suggested_action: { type: Type.STRING },
        },
        required: ["dominant_emotion", "stress_level", "motivation_level", "cognitive_load", "short_reasoning", "suggested_action"]
      }
    }
  });

  const analysis: EmotionAnalysis = JSON.parse(analysisResponse.text || '{}');

  // 2. Adaptive Coach Response
  const coachResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a calm, emotionally intelligent student coach.
    
    User State:
    Emotion: ${analysis.dominant_emotion}
    Stress Level: ${analysis.stress_level}
    Motivation Level: ${analysis.motivation_level}
    Cognitive Load: ${analysis.cognitive_load}

    Generate:
    1. One emotionally validating sentence
    2. One practical suggestion (very small step)
    3. One optional encouragement line

    Rules:
    - No generic motivational quotes
    - Sound human, not robotic
    - Keep total response under 80 words`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          validation: { type: Type.STRING },
          practical_suggestion: { type: Type.STRING },
          encouragement: { type: Type.STRING },
        },
        required: ["validation", "practical_suggestion", "encouragement"]
      }
    }
  });

  const coach: CoachResponse = JSON.parse(coachResponse.text || '{}');

  // 3. UI Adaptation
  const uiResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a UX adaptation engine.
    Based on this user mental state:
    - Emotion: ${analysis.dominant_emotion}
    - Stress: ${analysis.stress_level}
    - Cognitive Load: ${analysis.cognitive_load}

    Suggest:
    - UI color tone (warm / neutral / cool)
    - Notification intensity (low / medium / high)
    - Task density (minimal / normal / reduced)

    Return output in JSON only.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          color_tone: { type: Type.STRING },
          notification_intensity: { type: Type.STRING },
          task_density: { type: Type.STRING },
        },
        required: ["color_tone", "notification_intensity", "task_density"]
      }
    }
  });

  const ui: UIConfig = JSON.parse(uiResponse.text || '{}');

  return {
    analysis,
    coach,
    ui,
    timestamp: Date.now()
  };
};
