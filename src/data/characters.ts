import { Character } from '@/types/quiz';
import spongebobImg from '@/assets/spongebob.png';
import patrickImg from '@/assets/patrick.png';
import mrKrabsImg from '@/assets/mr_krabs.png';
import squidwardImg from '@/assets/squidward.png';
import sandyImg from '@/assets/sandy.png';
import garyImg from '@/assets/gary.png';
import mrsPuffImg from '@/assets/mrs_puff.png';
import planktonImg from '@/assets/plankton.png';
import karenImg from '@/assets/karen.png';
import pearlImg from '@/assets/pearl.png';
import larryImg from '@/assets/larry.png';
import mermaidManImg from '@/assets/mermaid_man.png';

export const CHARACTERS: Record<string, Character> = {
  spongebob: {
    key: 'spongebob',
    name: 'SpongeBob',
    weights: { playful: 3, optimistic: 3, loyal: 2, industrious: 2, friendly: 2 },
    image: spongebobImg,
  },
  patrick: {
    key: 'patrick',
    name: 'Patrick',
    weights: { relaxed: 3, loyal: 2, playful: 2, simple: 3, friendly: 2 },
    image: patrickImg,
  },
  mr_krabs: {
    key: 'mr_krabs',
    name: 'Mr. Krabs',
    weights: { practical: 3, ambitious: 2, thrifty: 3, bossy: 2, responsible: 1 },
    image: mrKrabsImg,
  },
  squidward: {
    key: 'squidward',
    name: 'Squidward',
    weights: { introvert: 3, artistic: 3, serious: 2, cynical: 3, grumpy: 2 },
    image: squidwardImg,
  },
  sandy: {
    key: 'sandy',
    name: 'Sandy',
    weights: { brave: 3, logical: 2, disciplined: 2, industrious: 2, inventive: 3, competitive: 2 },
    image: sandyImg,
  },
  gary: {
    key: 'gary',
    name: 'Gary',
    weights: { observant: 2, calm: 3, loyal: 2, simple: 2, pet: 3 },
    image: garyImg,
  },
  mrs_puff: {
    key: 'mrs_puff',
    name: 'Mrs. Puff',
    weights: { cautious: 3, patient: 2, responsible: 2, anxious: 3, teacher: 2 },
    image: mrsPuffImg,
  },
  plankton: {
    key: 'plankton',
    name: 'Plankton',
    weights: { ambitious: 3, cunning: 3, inventive: 2, analytical: 2, tiny: 1 },
    image: planktonImg,
  },
  karen: {
    key: 'karen',
    name: 'Karen',
    weights: { logical: 3, analytical: 3, sarcastic: 2, witty: 2, robot: 1 },
    image: karenImg,
  },
  pearl: {
    key: 'pearl',
    name: 'Pearl',
    weights: { social: 3, expressive: 2, dramatic: 2, fashionable: 2, loud: 1 },
    image: pearlImg,
  },
  mermaid_man: {
    key: 'mermaid_man',
    name: 'Mermaid Man',
    weights: { nostalgic: 3, heroic: 2, loyal: 2, dramatic: 2, old: 1 },
    image: mermaidManImg,
  },
  larry: {
    key: 'larry',
    name: 'Larry',
    weights: { athletic: 3, confident: 2, social: 2, brave: 1, proud: 2 },
    image: larryImg,
  },
  barnacle_boy: {
    key: 'barnacle_boy',
    name: 'Barnacle Boy',
    weights: { grumpy: 3, loyal: 2, heroic: 2, nostalgic: 2, sidekick: 2 },
  },
  flying_dutchman: {
    key: 'flying_dutchman',
    name: 'Flying Dutchman',
    weights: { dramatic: 3, scary: 3, theatrical: 2, powerful: 2, lonely: 1 },
  },
  king_neptune: {
    key: 'king_neptune',
    name: 'King Neptune',
    weights: { royal: 3, powerful: 3, proud: 2, dramatic: 2, vain: 2 },
  },
  squilliam: {
    key: 'squilliam',
    name: 'Squilliam',
    weights: { rich: 3, arrogant: 3, sophisticated: 2, competitive: 2, show_off: 2 },
  },
  bubble_bass: {
    key: 'bubble_bass',
    name: 'Bubble Bass',
    weights: { picky: 3, cunning: 2, critical: 2, detailed: 2, antagonistic: 2 },
  },
  man_ray: {
    key: 'man_ray',
    name: 'Man Ray',
    weights: { evil: 3, strong: 2, frustrated: 2, reformed: 1, dramatic: 2 },
  },
  dirty_bubble: {
    key: 'dirty_bubble',
    name: 'Dirty Bubble',
    weights: { villainous: 3, powerful: 2, round: 1, mean: 2, pop_able: 1 },
  },
  flats: {
    key: 'flats',
    name: 'Flats the Flounder',
    weights: { tough: 3, aggressive: 2, intimidating: 2, misunderstood: 1, flat: 1 },
  },
  dennis: {
    key: 'dennis',
    name: 'Dennis',
    weights: { dangerous: 3, professional: 2, determined: 3, ruthless: 2, bounty_hunter: 2 },
  },
  patchy: {
    key: 'patchy',
    name: 'Patchy the Pirate',
    weights: { enthusiastic: 3, fan: 3, clumsy: 2, loyal: 2, human: 1 },
  },
  potty: {
    key: 'potty',
    name: 'Potty the Parrot',
    weights: { sarcastic: 3, annoying: 2, puppet: 1, critic: 2, sidekick: 1 },
  },
  harold: {
    key: 'harold',
    name: 'Harold SquarePants',
    weights: { parental: 3, supportive: 2, calm: 2, responsible: 2, square: 1 },
  },
  margaret: {
    key: 'margaret',
    name: 'Margaret SquarePants',
    weights: { motherly: 3, caring: 3, supportive: 2, sweet: 2, round: 1 },
  },
  grandma: {
    key: 'grandma',
    name: 'Grandma SquarePants',
    weights: { sweet: 3, nurturing: 3, cookie_maker: 2, loving: 3, grandma: 2 },
  },
  flatts: {
    key: 'flatts',
    name: 'Flatts',
    weights: { bully: 3, tough: 2, misunderstood: 2, angry: 2, flat: 1 },
  },
  kevin: {
    key: 'kevin',
    name: 'Kevin C. Cucumber',
    weights: { jealous: 3, mean: 2, club_leader: 2, insecure: 2, fake: 2 },
  },
  squilliam_returns: {
    key: 'squilliam_returns',
    name: 'Squilliam Fancyson',
    weights: { wealthy: 3, smug: 3, successful: 2, refined: 2, rival: 3 },
  },
};
