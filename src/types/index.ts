export type SymptomType = 
  | 'acidez' 
  | 'dolor' 
  | 'estres' 
  | 'nauseas' 
  | 'reflujo' 
  | 'energia' 
  | 'sueno' 
  | 'ansiedad'
  | 'vomitos';

export interface SymptomRating {
  acidez: number;   // 0 - 10
  dolor: number;    // 0 - 10
  estres: number;   // 0 - 10
  nauseas: number;  // 0 - 10
  reflujo: number;  // 0 - 10
  energia: number;  // 0 - 10 (10 = máxima energía)
  sueno: number;    // 0 - 10 (10 = descanso perfecto)
  ansiedad: number; // 0 - 10
  notes?: string;
  foodTriggers?: string[];
}

export interface CheckInLog {
  id: string;
  timestamp: number; // ms
  ratings: SymptomRating;
  timeOfDay: 'mañana' | 'tarde' | 'noche' | 'post_comida';
}

export interface BreathingPattern {
  inhale: number;  // segundos
  holdIn: number;  // segundos
  exhale: number;  // segundos
  holdOut: number; // segundos
}

export type EvidenceLevel = 'solida' | 'moderada' | 'preliminar';

export interface BreathingProtocol {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  scientificBenefits: string[];
  evidenceLevel: EvidenceLevel;
  pattern: BreathingPattern;
  targetRpm: number;
  recommendedDurationMinutes: number;
  tags: string[];
}

export interface HummingProtocol {
  id: string;
  vowelSound: 'Mmmmm' | 'Ooooo' | 'Uuuuu';
  frequencyHz: number;
  description: string;
  vagalMechanism: string;
  durationMinutes: number;
  inhaleSeconds: number;
  hummingSeconds: number;
}

export type SoundCategory = 
  | 'piano' 
  | 'lluvia' 
  | 'bosque' 
  | 'mar' 
  | 'ruido_rosa' 
  | 'ruido_marron' 
  | 'drones' 
  | 'paisajes';

export interface SoundTrack {
  id: string;
  title: string;
  category: SoundCategory;
  description: string;
  synthType: 'sine' | 'pink' | 'brown' | 'ocean' | 'rain' | 'drone' | 'harmonic_piano';
  baseFreq?: number;
}

export interface ToneFrequency {
  hz: number;
  name: string;
  category: 'Ondas Cerebrales' | 'Frecuencias Armónicas' | 'Solfeggio';
  suggestedUse: string;
  scientificNotes: string;
  evidenceDisclaimer: string;
}

export interface GuidedProtocol {
  id: string;
  title: string;
  category: 'Después de comer' | 'Antes de dormir' | 'Estrés elevado' | 'Acidez y Reflujo' | 'Náuseas y Malestar';
  description: string;
  durationMinutes: number;
  breathingProtocolId: string;
  recommendedSoundCategory: SoundCategory;
  hummingIncluded: boolean;
  hapticPattern: 'respiracion' | 'coherencia' | 'relajacion' | 'tarareo';
  instructions: string[];
  evidenceLevel: EvidenceLevel;
}

export interface DailyHabit {
  id: string;
  title: string;
  description: string;
  category: 'digestivo' | 'postura' | 'sueño' | 'estilodevida';
  impact: 'alto' | 'medio';
  completed: boolean;
  scientificTip: string;
}

export interface EduArticle {
  id: string;
  title: string;
  category: 'Nervio Vago' | 'Eje Intestino-Cerebro' | 'Fisiología Respiratoria' | 'Hábitos Saludables' | 'FAQ';
  summary: string;
  contentMarkdown: string;
  evidenceLevel: EvidenceLevel;
  readTimeMinutes: number;
  keyTakeaways: string[];
}

export interface RoutineItem {
  id: string;
  timeSlot: 'mañana' | 'comidas' | 'tarde' | 'noche';
  title: string;
  actionType: 'breathing' | 'humming' | 'habit' | 'checkin' | 'sound';
  targetId?: string;
  durationMinutes: number;
  completed: boolean;
  reason: string;
}

export interface UserProfile {
  name: string;
  highContrast: boolean;
  largeText: boolean;
  darkTheme: boolean;
  soundVolume: number;
  hapticsEnabled: boolean;
  voiceGuideEnabled: boolean;
  voicePitch: number;
  animationStyle: 'circulos' | 'ondas' | 'particulas' | 'gradientes' | 'luz';
  streakDays: number;
  totalRelaxationMinutes: number;
  totalSessionsCompleted: number;
  totalBreathsTaken: number;
  notificationsEnabled: boolean;
  dailyGoalMinutes: number;
}

export interface SessionRecord {
  id: string;
  timestamp: number;
  type: 'breathing' | 'humming' | 'guided' | 'soundscape' | 'pure_tone';
  protocolName: string;
  durationSeconds: number;
  perceivedStressBefore?: number;
  perceivedStressAfter?: number;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
  suggestedAction?: {
    label: string;
    targetModule: string;
    protocolId?: string;
  };
}
