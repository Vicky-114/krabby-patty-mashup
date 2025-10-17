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
};
