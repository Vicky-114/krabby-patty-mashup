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
  
  // Use lower temperature for softmax to create more distributed probabilities
  const temperature = 1.5; // Higher temperature = more even distribution
  const expScores = scoreValues.map(s => Math.exp((s - maxScore) / temperature));
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
  
  // Get all characters with significant contribution (>5% confidence for more diversity)
  const significantCharacters = matchResult.sorted.filter(c => c.confidence > 0.05);
  
  // Calculate component percentages
  const components = significantCharacters.map(c => ({
    key: c.key,
    name: c.name,
    percentage: Math.round(c.confidence * 100),
  }));
  
  // Generate hybrid name using user's name
  const hybridName = `${userName}`;
  
  // Create detailed personality description showing which traits from each character
  const componentDescriptions = components.map(c => {
    // Find which traits the user scored highest in that align with this character
    const charWeights = CHARACTERS[c.key].weights;
    
    // Get the user's top traits that match this character's strengths
    const matchingTraits = Object.entries(charWeights)
      .filter(([trait]) => traitScores[trait] > 0) // Only traits the user has
      .sort(([traitA, weightA], [traitB, weightB]) => {
        // Sort by combination of user's trait score and character's weight for that trait
        const scoreA = traitScores[traitA] * weightA;
        const scoreB = traitScores[traitB] * weightB;
        return scoreB - scoreA;
      })
      .slice(0, 2)
      .map(([trait]) => trait);
    
    if (matchingTraits.length > 0) {
      return `${c.name}'s ${matchingTraits.join(' and ')} (${c.percentage}%)`;
    }
    return `${c.name} (${c.percentage}%)`;
  }).join(', ');
  
  const description = `You are a unique hybrid character! Your personality is composed of: ${componentDescriptions}. This creates a one-of-a-kind Bikini Bottom personality that is exclusively ${userName}.`;
  
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
