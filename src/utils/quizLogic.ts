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
  answers: Answer[]
): HybridCharacter {
  const matchResult = computeMatch(traitScores);
  
  // Get top 3 characters to combine
  const topCharacters = matchResult.sorted.slice(0, 3);
  
  // Generate hybrid name
  const nameParts = topCharacters.map(c => {
    const names = c.name.split(' ');
    return names[Math.floor(Math.random() * names.length)];
  });
  const hybridName = nameParts.join('');
  
  // Create personality description
  const traits = Object.entries(traitScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([trait]) => trait);
  
  const description = `A unique hybrid combining the ${traits.slice(0, 3).join(', ')} nature of ${topCharacters.map(c => c.name).join(', ')}. This rare Bikini Bottom creature embodies ${traits[3]} and ${traits[4]} tendencies.`;
  
  return {
    id: Date.now().toString(),
    name: hybridName,
    components: topCharacters.map(c => c.key),
    traits: traitScores,
    description,
    createdAt: Date.now(),
    position: {
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
    },
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
