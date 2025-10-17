import { TraitScores, CharacterMatch, Answer, HybridCharacter } from '@/types/quiz';
import { CHARACTERS } from '@/data/characters';

export function computeMatch(traitScores: TraitScores): { topMatch: CharacterMatch; sorted: CharacterMatch[] } {
  const scores: Record<string, number> = {};
  
  for (const charKey in CHARACTERS) {
    let score = 0;
    const charWeights = CHARACTERS[charKey].weights;
    for (const trait in traitScores) {
      if (charWeights[trait]) {
        score += traitScores[trait] * charWeights[trait];
      }
    }
    scores[charKey] = score;
  }

  const scoreValues = Object.values(scores);
  const maxScore = Math.max(...scoreValues);
  const expScores = scoreValues.map(s => Math.exp(s - maxScore));
  const sumExpScores = expScores.reduce((a, b) => a + b, 0);
  const probabilities = expScores.map(s => s / sumExpScores);

  const sortedCharacters = Object.keys(scores).map((key, i) => ({
    key,
    name: CHARACTERS[key].name,
    score: scores[key],
    confidence: probabilities[i],
  })).sort((a, b) => b.confidence - a.confidence);

  return { topMatch: sortedCharacters[0], sorted: sortedCharacters };
}

export function createHybridCharacter(
  traitScores: TraitScores,
  answers: Answer[],
  userName: string
): HybridCharacter {
  const matchResult = computeMatch(traitScores);
  
  // Get all characters with significant contribution (>10% confidence)
  const significantCharacters = matchResult.sorted.filter(c => c.confidence > 0.1);
  
  // Calculate component percentages
  const components = significantCharacters.map(c => ({
    key: c.key,
    name: c.name,
    percentage: Math.round(c.confidence * 100),
  }));
  
  // Generate hybrid name using user's name
  const hybridName = `${userName}`;
  
  // Create detailed personality description with percentages
  const componentDescriptions = components.map(c => {
    // Find the dominant traits from this character
    const charWeights = CHARACTERS[c.key].weights;
    const topTraits = Object.entries(charWeights)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([trait]) => trait);
    
    return `${c.name}'s ${topTraits[0]} nature (${c.percentage}%)`;
  }).join(' and ');
  
  const description = `This is a unique hybrid composed of ${componentDescriptions}. Combining traits from ${components.map(c => c.name).join(', ')}, forming a Bikini Bottom personality exclusive to ${userName}.`;
  
  return {
    id: Date.now().toString(),
    name: hybridName,
    components: components.map(c => c.key),
    traits: traitScores,
    description,
    createdAt: Date.now(),
    position: {
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
    },
    componentBreakdown: components, // Add detailed breakdown
  };
}

export function saveHybrid(hybrid: HybridCharacter) {
  const stored = localStorage.getItem('bikiniBottomHybrids');
  const hybrids = stored ? JSON.parse(stored) : [];
  hybrids.push(hybrid);
  localStorage.setItem('bikiniBottomHybrids', JSON.stringify(hybrids));
}

export function loadHybrids(): HybridCharacter[] {
  const stored = localStorage.getItem('bikiniBottomHybrids');
  return stored ? JSON.parse(stored) : [];
}
