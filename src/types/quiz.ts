export interface TraitScores {
  [trait: string]: number;
}

export interface QuizOption {
  label: string;
  traits: TraitScores;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface Answer {
  questionId: string;
  questionText: string;
  answerLabel: string;
  traits: TraitScores;
}

export interface Character {
  key: string;
  name: string;
  weights: TraitScores;
  image?: string;
}

export interface CharacterMatch {
  key: string;
  name: string;
  score: number;
  confidence: number;
}

export interface HybridCharacter {
  id: string;
  name: string;
  components: string[]; // character keys that make up this hybrid
  traits: TraitScores;
  description: string;
  createdAt: number;
  position?: { x: number; y: number };
}
