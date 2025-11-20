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
  // SpongeBob Extended Family
  grandpa_squarepants: {
    key: 'grandpa_squarepants',
    name: 'Grandpa SquarePants',
    weights: { wise: 3, storyteller: 3, patient: 2, nostalgic: 2, loving: 2 },
  },
  stanley_squarepants: {
    key: 'stanley_squarepants',
    name: 'Stanley S. SquarePants',
    weights: { clumsy: 3, destructive: 2, well_meaning: 2, unlucky: 3, innocent: 2 },
  },
  blackjack: {
    key: 'blackjack',
    name: 'Cousin Blackjack',
    weights: { tough: 2, reformed: 2, smaller: 2, misunderstood: 2, family: 2 },
  },
  todd_squarepants: {
    key: 'todd_squarepants',
    name: 'Todd SquarePants',
    weights: { distant: 2, mysterious: 2, relative: 2, polite: 2, formal: 1 },
  },
  primitive_sponge: {
    key: 'primitive_sponge',
    name: 'Primitive Sponge',
    weights: { prehistoric: 3, simple: 3, instinctive: 2, survival: 2, ancient: 2 },
  },
  spongegar: {
    key: 'spongegar',
    name: 'SpongeGar',
    weights: { caveman: 3, primitive: 3, fire_making: 2, hungry: 2, grunting: 2 },
  },
  spongebuck: {
    key: 'spongebuck',
    name: 'SpongeBuck SquarePants',
    weights: { cowboy: 3, western: 3, brave: 2, lawful: 2, heroic: 2 },
  },
  doodlebob: {
    key: 'doodlebob',
    name: 'DoodleBob',
    weights: { chaotic: 3, sketchy: 3, aggressive: 2, creative: 2, artistic: 2 },
  },
  robobob: {
    key: 'robobob',
    name: 'RoboBob',
    weights: { robotic: 3, mechanical: 2, precise: 2, cold: 2, efficient: 2 },
  },
  quickster: {
    key: 'quickster',
    name: 'The Quickster',
    weights: { super_speed: 3, heroic: 3, energetic: 3, impulsive: 2, brave: 2 },
  },
  goofy_goober: {
    key: 'goofy_goober',
    name: 'Goofy Goober SpongeBob',
    weights: { rockstar: 3, confident: 3, performative: 2, cool: 2, musical: 3 },
  },
  // Patrick Extended Family
  herb_star: {
    key: 'herb_star',
    name: 'Herb Star',
    weights: { parental: 2, caring: 2, protective: 2, responsible: 2, loving: 2 },
  },
  margie_star: {
    key: 'margie_star',
    name: 'Margie Star',
    weights: { motherly: 3, sweet: 2, caring: 3, supportive: 2, gentle: 2 },
  },
  sam_star: {
    key: 'sam_star',
    name: 'Sam Star',
    weights: { tough: 3, aggressive: 2, protective: 2, strong: 3, sisterly: 2 },
  },
  patricks_grandfather: {
    key: 'patricks_grandfather',
    name: "Patrick's Grandfather",
    weights: { elderly: 3, wise: 2, storytelling: 2, patient: 2, kind: 2 },
  },
  patricks_granny: {
    key: 'patricks_granny',
    name: "Patrick's Granny",
    weights: { grandmotherly: 3, cookie_baking: 2, sweet: 3, caring: 2, loving: 3 },
  },
  patar: {
    key: 'patar',
    name: 'Patar',
    weights: { prehistoric: 3, simple: 3, loyal: 2, primitive: 3, caveman: 2 },
  },
  bunny_star: {
    key: 'bunny_star',
    name: 'Bunny Star',
    weights: { energetic: 3, optimistic: 2, motherly: 2, enthusiastic: 3, creative: 2 },
  },
  cecil_star: {
    key: 'cecil_star',
    name: 'Cecil Star',
    weights: { fatherly: 2, supportive: 2, calm: 2, responsible: 2, caring: 2 },
  },
  grandpat_star: {
    key: 'grandpat_star',
    name: 'GrandPat Star',
    weights: { elderly: 3, grumpy: 2, nostalgic: 3, stubborn: 2, experienced: 2 },
  },
  squidina_star: {
    key: 'squidina_star',
    name: 'Squidina Star',
    weights: { creative: 3, dramatic: 2, sisterly: 2, artistic: 3, expressive: 2 },
  },
  // Squidward Extended
  mrs_tentacles: {
    key: 'mrs_tentacles',
    name: 'Mrs. Tentacles',
    weights: { motherly: 3, supportive: 2, refined: 2, cultured: 2, caring: 2 },
  },
  cousin_eddie: {
    key: 'cousin_eddie',
    name: 'Cousin Eddie',
    weights: { annoying: 2, cheerful: 2, oblivious: 2, friendly: 2, simple: 2 },
  },
  squog: {
    key: 'squog',
    name: 'Squog',
    weights: { prehistoric: 3, grumpy: 2, primitive: 3, artistic: 2, caveman: 2 },
  },
  squidwards_dad: {
    key: 'squidwards_dad',
    name: "Squidward's Dad",
    weights: { fatherly: 2, stern: 2, disappointed: 2, traditional: 2, serious: 2 },
  },
  // Mr. Krabs Extended
  betsy_krabs: {
    key: 'betsy_krabs',
    name: 'Betsy Krabs',
    weights: { motherly: 3, tough: 2, protective: 2, strong_willed: 2, caring: 2 },
  },
  victor_krabs: {
    key: 'victor_krabs',
    name: 'Victor Krabs',
    weights: { fatherly: 2, strict: 2, military: 2, disciplined: 2, tough: 2 },
  },
  redbeard_krabs: {
    key: 'redbeard_krabs',
    name: 'Redbeard Krabs',
    weights: { pirate: 3, adventurous: 3, greedy: 2, bold: 2, legendary: 2 },
  },
  teenage_pearl: {
    key: 'teenage_pearl',
    name: 'Teenage Pearl',
    weights: { rebellious: 2, dramatic: 3, social: 3, emotional: 2, teenage: 3 },
  },
  baby_pearl: {
    key: 'baby_pearl',
    name: 'Baby Pearl',
    weights: { innocent: 3, cute: 3, playful: 2, young: 3, sweet: 2 },
  },
  // Sandy Extended
  pa_cheeks: {
    key: 'pa_cheeks',
    name: 'Pa Cheeks',
    weights: { fatherly: 3, inventor: 2, smart: 2, supportive: 2, texan: 3 },
  },
  ma_cheeks: {
    key: 'ma_cheeks',
    name: 'Ma Cheeks',
    weights: { motherly: 3, tough: 2, protective: 2, texan: 3, strong: 2 },
  },
  randy_cheeks: {
    key: 'randy_cheeks',
    name: 'Randy Cheeks',
    weights: { brotherly: 2, adventurous: 2, brave: 2, competitive: 2, loyal: 2 },
  },
  rosy_cheeks: {
    key: 'rosy_cheeks',
    name: 'Rosy Cheeks',
    weights: { sisterly: 2, sweet: 2, caring: 2, supportive: 2, kind: 2 },
  },
  // Plankton Extended
  karen_2: {
    key: 'karen_2',
    name: 'Karen 2.0',
    weights: { upgraded: 2, logical: 3, advanced: 2, sarcastic: 2, efficient: 3 },
  },
  spot: {
    key: 'spot',
    name: 'Spot',
    weights: { loyal: 3, pet: 3, small: 2, cute: 2, obedient: 2 },
  },
  gordon_plankton: {
    key: 'gordon_plankton',
    name: 'Gordon Plankton',
    weights: { relative: 2, similar: 2, scheming: 2, tiny: 2, family: 2 },
  },
  clem_plankton: {
    key: 'clem_plankton',
    name: 'Clem Plankton',
    weights: { country: 3, simple: 2, friendly: 2, rural: 3, cousin: 2 },
  },
  // Mrs. Puff
  mr_puff: {
    key: 'mr_puff',
    name: 'Mr. Puff',
    weights: { deceased: 3, lamp: 3, tragic: 2, remembered: 2, husband: 2 },
  },
  // Krusty Krab Staff & Regulars
  jim: {
    key: 'jim',
    name: 'Jim',
    weights: { legendary: 3, skilled: 3, mysterious: 2, cook: 3, respected: 2 },
  },
  fred: {
    key: 'fred',
    name: 'Fred',
    weights: { unlucky: 3, loud: 2, injured: 3, complaining: 2, recurring: 2 },
  },
  scooter: {
    key: 'scooter',
    name: 'Scooter',
    weights: { surfer: 3, laid_back: 2, casual: 2, beachy: 3, cool: 2 },
  },
  old_man_walker: {
    key: 'old_man_walker',
    name: 'Old Man Walker',
    weights: { elderly: 3, grumpy: 2, traditional: 2, cantankerous: 2, old: 3 },
  },
  old_man_jenkins: {
    key: 'old_man_jenkins',
    name: 'Old Man Jenkins',
    weights: { elderly: 3, confused: 2, forgetful: 2, cranky: 2, multiple_versions: 2 },
  },
  don_whale: {
    key: 'don_whale',
    name: 'Don the Whale',
    weights: { large: 3, customer: 2, friendly: 2, big_eater: 2, gentle: 2 },
  },
  nat_peterson: {
    key: 'nat_peterson',
    name: 'Nat Peterson',
    weights: { regular: 2, friendly: 2, customer: 2, average: 2, reliable: 2 },
  },
  perch_perkins: {
    key: 'perch_perkins',
    name: 'Perch Perkins',
    weights: { journalist: 3, professional: 2, reporter: 3, news: 3, serious: 2 },
  },
  // Villains (additional)
  the_strangler: {
    key: 'the_strangler',
    name: 'The Strangler',
    weights: { dangerous: 3, criminal: 3, frustrated: 2, intimidating: 2, violent: 2 },
  },
  tattletale_strangler: {
    key: 'tattletale_strangler',
    name: 'Tattletale Strangler',
    weights: { wanted: 3, aggressive: 2, annoyed: 2, criminal: 3, dangerous: 2 },
  },
  prawn: {
    key: 'prawn',
    name: 'Prawn',
    weights: { villain: 2, scheming: 2, small: 2, antagonistic: 2, devious: 2 },
  },
  the_fisherman: {
    key: 'the_fisherman',
    name: 'The Fisherman',
    weights: { threatening: 3, mysterious: 2, dangerous: 3, hunter: 2, terrifying: 2 },
  },
  kevin_cucumber: {
    key: 'kevin_cucumber',
    name: 'Kevin C. Cucumber',
    weights: { jealous: 3, mean: 2, club_leader: 2, insecure: 2, fake: 2 },
  },
  // Superheroes (additional)
  captain_magma: {
    key: 'captain_magma',
    name: 'Captain Magma',
    weights: { volcanic: 3, hot_headed: 2, powerful: 2, heroic: 2, explosive: 3 },
  },
  elastic_waistband: {
    key: 'elastic_waistband',
    name: 'Elastic Waistband',
    weights: { stretchy: 3, flexible: 3, heroic: 2, adaptable: 2, supportive: 2 },
  },
  miss_appear: {
    key: 'miss_appear',
    name: 'Miss Appear',
    weights: { invisible: 3, mysterious: 2, heroic: 2, elusive: 2, shy: 2 },
  },
  // Ghosts
  ghost_spongebob: {
    key: 'ghost_spongebob',
    name: 'Ghost SpongeBob',
    weights: { spectral: 3, playful: 2, ethereal: 2, spooky: 2, transparent: 2 },
  },
  lord_poltergeist: {
    key: 'lord_poltergeist',
    name: 'Lord Poltergeist',
    weights: { ghostly: 3, powerful: 2, dramatic: 2, supernatural: 3, threatening: 2 },
  },
  // Movie Characters (additional)
  mindy: {
    key: 'mindy',
    name: 'Mindy',
    weights: { princess: 3, kind: 3, supportive: 2, helpful: 2, sweet: 2 },
  },
  cyclops: {
    key: 'cyclops',
    name: 'Cyclops',
    weights: { terrifying: 3, giant: 3, collector: 2, dangerous: 3, shell: 2 },
  },
  bubbles: {
    key: 'bubbles',
    name: 'Bubbles',
    weights: { cosmic: 3, powerful: 3, wise: 2, dolphin: 3, space: 3 },
  },
  burger_beard: {
    key: 'burger_beard',
    name: 'Burger Beard',
    weights: { pirate: 3, scheming: 2, theatrical: 2, villain: 2, greedy: 2 },
  },
  // Additional Characters
  wormy: {
    key: 'wormy',
    name: 'Wormy',
    weights: { cute: 3, pet: 2, butterfly: 2, innocent: 3, misunderstood: 2 },
  },
  mystery: {
    key: 'mystery',
    name: 'Mystery',
    weights: { seahorse: 3, wild: 2, beautiful: 2, free_spirited: 2, majestic: 2 },
  },
  clamu: {
    key: 'clamu',
    name: 'Clamu',
    weights: { giant: 3, mother: 2, protective: 3, oyster: 3, fierce: 2 },
  },
  alaskan_bull_worm: {
    key: 'alaskan_bull_worm',
    name: 'Alaskan Bull Worm',
    weights: { gigantic: 3, terrifying: 3, destructive: 3, monster: 3, legendary: 2 },
  },
  medieval_spongebob: {
    key: 'medieval_spongebob',
    name: 'Medieval SpongeBob',
    weights: { knight: 3, chivalrous: 2, brave: 2, medieval: 3, honorable: 2 },
  },
  evil_bob: {
    key: 'evil_bob',
    name: 'Evil Bob',
    weights: { evil: 3, opposite: 3, mean: 2, dark: 2, villainous: 3 },
  },
};
