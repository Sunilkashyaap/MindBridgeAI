
export interface EmotionAnalysis {
  dominant_emotion: string;
  stress_level: number;
  motivation_level: number;
  cognitive_load: 'Low' | 'Medium' | 'High';
  short_reasoning: string;
  suggested_action: string;
}

export interface CoachResponse {
  validation: string;
  practical_suggestion: string;
  encouragement: string;
}

export interface UIConfig {
  color_tone: 'warm' | 'neutral' | 'cool';
  notification_intensity: 'low' | 'medium' | 'high';
  task_density: 'minimal' | 'normal' | 'reduced';
}

export interface AnalysisResult {
  analysis: EmotionAnalysis;
  coach: CoachResponse;
  ui: UIConfig;
  timestamp: number;
}
