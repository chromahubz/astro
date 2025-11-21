/**
 * Chart Overview and Ascendant Interpretations
 * Rising sign descriptions and holistic chart analysis
 */

import { ZodiacSign } from '../zodiac';
import { BirthChartData, ElementBalance, ModalityBalance } from '@/types/astrology';

/**
 * Rising Sign (Ascendant) Interpretations
 */
export const RISING_SIGN_INTERPRETATIONS: Record<ZodiacSign, string> = {
  Aries: "With Aries rising, you approach life with courage, directness, and pioneering spirit. Your first instinct is to act, and you present yourself as confident and independent. Others see you as energetic, sometimes impulsive, and naturally assertive. You lead by example and prefer to forge your own path rather than follow others. Physical activity and new challenges keep you vital. Your life lesson involves balancing courage with patience, and learning that not everything requires immediate action. You're here to develop authentic self-assertion while considering others' needs.",

  Taurus: "Taurus rising gives you a calm, steady, and grounded presence. You appear reliable, patient, and somewhat reserved until comfortable. Others perceive you as stable and trustworthy, someone who takes their time but follows through. You appreciate beauty, comfort, and quality in all things. Your approach to life is practical and methodical - you build slowly but create lasting results. Your life lesson involves balancing security with necessary change, learning when persistence serves versus when flexibility is required. You're here to embody stability while remaining open to growth.",

  Gemini: "With Gemini rising, you present yourself as curious, communicative, and intellectually engaged. Others see you as quick-witted, versatile, and socially adaptable. Your first instinct is to gather information and make connections. You approach life through your mind, seeking to understand and communicate. Variety and mental stimulation are essential to your well-being. Your life lesson involves balancing breadth with depth, and learning to commit despite your natural restlessness. You're here to facilitate communication and connection while developing focus.",

  Cancer: "Cancer rising makes you appear sensitive, nurturing, and emotionally attuned. You present yourself cautiously, protecting your vulnerability until trust is established. Others sense your empathy and caring nature. You approach life through feelings and need emotional security to function well. Creating safe spaces for yourself and others comes naturally. Your life lesson involves balancing emotional sensitivity with healthy boundaries, learning to protect yourself without closing off. You're here to develop emotional intelligence while maintaining your center.",

  Leo: "With Leo rising, you have a warm, confident, and creative presence that naturally draws attention. You present yourself with dignity and self-assurance. Others see you as generous, dramatic, and charismatic. You approach life as a stage for self-expression and creative contribution. Recognition and appreciation feed your spirit. Your life lesson involves balancing authentic self-expression with humility, learning that true leadership serves others. You're here to shine your light while honoring others' brightness too.",

  Virgo: "Virgo rising gives you a modest, analytical, and helpful presence. You appear organized, discerning, and somewhat reserved. Others perceive you as intelligent, practical, and reliable. You approach life through observation and analysis, always noticing what could be improved. Service and usefulness matter deeply to you. Your life lesson involves balancing discrimination with acceptance, learning that perfection isn't required for worthiness. You're here to develop practical wisdom while honoring what already is.",

  Libra: "With Libra rising, you present yourself as charming, diplomatic, and aesthetically aware. Others see you as fair-minded, socially graceful, and relationship-oriented. You approach life seeking harmony, beauty, and partnership. Balance and justice matter to you, and you naturally consider multiple perspectives. Your life lesson involves balancing consideration for others with self-assertion, learning to make decisions without excessive deliberation. You're here to create harmony while maintaining your authentic truth.",

  Scorpio: "Scorpio rising creates an intense, private, and magnetic presence. You appear mysterious and powerful, even when quiet. Others sense depth and strength in you. You approach life with emotional intensity and penetrating perception. Superficiality doesn't satisfy you - you need truth and depth. Your life lesson involves balancing control with vulnerability, learning to trust without fear of betrayal. You're here to transform yourself and facilitate others' transformation through your depth.",

  Sagittarius: "With Sagittarius rising, you have an optimistic, adventurous, and philosophical presence. You appear enthusiastic, honest, and freedom-loving. Others see you as open-minded and inspiring. You approach life seeking meaning, expansion, and truth. Freedom and growth are essential to your well-being. Your life lesson involves balancing vision with practical details, learning that wisdom requires both philosophy and application. You're here to expand consciousness while staying grounded in reality.",

  Capricorn: "Capricorn rising gives you a serious, responsible, and dignified presence. You appear mature, capable, and somewhat reserved. Others perceive you as reliable and ambitious. You approach life with patience and long-term perspective, willing to work steadily toward goals. Achievement and respect matter to you. Your life lesson involves balancing ambition with enjoyment of the present, learning that worth isn't earned only through accomplishment. You're here to build lasting contributions while honoring the journey.",

  Aquarius: "With Aquarius rising, you present yourself as unique, independent, and intellectually progressive. Others see you as friendly but somewhat detached, original and humanitarian. You approach life seeking freedom, innovation, and contribution to collective good. Conformity feels stifling - you need to express your individuality. Your life lesson involves balancing detachment with emotional connection, learning that progress requires both vision and heart. You're here to innovate while staying connected to humanity.",

  Pisces: "Pisces rising creates a gentle, imaginative, and spiritually attuned presence. You appear compassionate, artistic, and somewhat ethereal. Others sense your empathy and creative sensitivity. You approach life through intuition and feeling, with porous boundaries between self and other. Beauty and transcendence feed your soul. Your life lesson involves balancing compassion with healthy boundaries, learning to serve without sacrificing yourself. You're here to channel spiritual and creative vision while maintaining grounding in physical reality."
};

/**
 * Generate chart overview based on complete birth chart data
 */
export function generateChartOverview(chart: BirthChartData): string {
  const sun = chart.planets.find(p => p.name === 'Sun');
  const moon = chart.planets.find(p => p.name === 'Moon');
  const ascendant = chart.angles.ascendant;

  if (!sun || !moon) {
    return "Chart overview requires Sun and Moon positions.";
  }

  const overview = `Your birth chart was calculated for ${chart.date.toLocaleDateString()} at ${chart.date.toLocaleTimeString()}, from ${chart.location.locationName || `${chart.location.latitude.toFixed(4)}°, ${chart.location.longitude.toFixed(4)}°`}.

Your essential self is defined by the interplay of your Sun in ${sun.zodiacPosition.sign}, Moon in ${moon.zodiacPosition.sign}, and ${ascendant.sign} rising (Sun ${sun.zodiacPosition.glyph} Moon ${moon.zodiacPosition.glyph} Rising ${ascendant.glyph}).

Your Sun in ${sun.zodiacPosition.sign} (House ${sun.houseNumber}) represents your core identity and life purpose, centered on ${getSunTheme(sun.zodiacPosition.sign)}. This is who you're becoming and what you're here to express.

Your Moon in ${moon.zodiacPosition.sign} (House ${moon.houseNumber}) shows your emotional nature and instinctive responses, which are ${getMoonTheme(moon.zodiacPosition.sign)}. This is your inner world and what makes you feel secure.

Your ${ascendant.sign} Rising means you approach life ${getAscendantTheme(ascendant.sign)}. This is how others first perceive you and your spontaneous response to new situations.

The combination of these three creates your unique personality. ${getSunMoonRisingCombination(sun.zodiacPosition.sign, moon.zodiacPosition.sign, ascendant.sign)}`;

  return overview.trim();
}

/**
 * Helper functions for thematic descriptions
 */
function getSunTheme(sign: ZodiacSign): string {
  const themes: Record<ZodiacSign, string> = {
    Aries: "courage, independence, and pioneering action",
    Taurus: "stability, sensual appreciation, and building lasting value",
    Gemini: "curiosity, communication, and intellectual versatility",
    Cancer: "emotional depth, nurturing care, and creating security",
    Leo: "creative self-expression, generous leadership, and radiating warmth",
    Virgo: "practical service, analytical precision, and self-improvement",
    Libra: "harmonious relationships, aesthetic beauty, and balanced perspective",
    Scorpio: "transformative depth, emotional intensity, and uncovering truth",
    Sagittarius: "expansive exploration, philosophical wisdom, and seeking meaning",
    Capricorn: "disciplined achievement, responsible leadership, and lasting contribution",
    Aquarius: "innovative progress, humanitarian ideals, and authentic individuality",
    Pisces: "spiritual transcendence, compassionate service, and imaginative creation"
  };
  return themes[sign];
}

function getMoonTheme(sign: ZodiacSign): string {
  const themes: Record<ZodiacSign, string> = {
    Aries: "immediate, independent, and action-oriented",
    Taurus: "steady, comfort-seeking, and attached to security",
    Gemini: "curious, mentally active, and needing variety",
    Cancer: "deeply sensitive, nurturing, and emotionally intuitive",
    Leo: "warm-hearted, need for appreciation, and emotionally dramatic",
    Virgo: "analytically processed, service-oriented, and detail-focused",
    Libra: "relationship-oriented, harmony-seeking, and aesthetically sensitive",
    Scorpio: "intensely deep, emotionally powerful, and transformation-seeking",
    Sagittarius: "optimistic, freedom-needing, and philosophically inclined",
    Capricorn: "reserved, responsibility-oriented, and emotionally controlled",
    Aquarius: "intellectually processed, friendship-focused, and independently felt",
    Pisces: "boundlessly empathetic, spiritually attuned, and imaginatively sensitive"
  };
  return themes[sign];
}

function getAscendantTheme(sign: ZodiacSign): string {
  const themes: Record<ZodiacSign, string> = {
    Aries: "with direct courage and pioneering initiative",
    Taurus: "with patient steadiness and practical groundedness",
    Gemini: "with curious intellect and communicative adaptability",
    Cancer: "with emotional sensitivity and protective caution",
    Leo: "with confident warmth and creative self-expression",
    Virgo: "with analytical precision and modest helpfulness",
    Libra: "with diplomatic grace and relationship focus",
    Scorpio: "with intense depth and penetrating perception",
    Sagittarius: "with optimistic enthusiasm and philosophical perspective",
    Capricorn: "with serious responsibility and patient ambition",
    Aquarius: "with independent originality and progressive vision",
    Pisces: "with compassionate sensitivity and imaginative openness"
  };
  return themes[sign];
}

function getSunMoonRisingCombination(sun: ZodiacSign, moon: ZodiacSign, rising: ZodiacSign): string {
  // If all three are in the same element
  const sunElement = getElement(sun);
  const moonElement = getElement(moon);
  const risingElement = getElement(rising);

  if (sunElement === moonElement && moonElement === risingElement) {
    return `With all three in ${sunElement} signs, you embody this element powerfully - your identity, emotions, and approach to life all express ${sunElement} qualities. This creates a unified, focused energy.`;
  }

  // If Sun and Moon are in harmony
  const sunMoonAspect = getElementRelationship(sunElement, moonElement);
  if (sunMoonAspect === 'harmonious') {
    return `Your Sun and Moon are in harmonious elements (${sunElement} and ${moonElement}), creating natural alignment between your will and your emotions. Your ${rising} rising adds ${risingElement} energy to how you express this inner harmony.`;
  }

  if (sunMoonAspect === 'challenging') {
    return `Your Sun and Moon are in challenging elements (${sunElement} and ${moonElement}), creating dynamic tension between your conscious will and emotional needs. Your ${rising} rising brings ${risingElement} qualities to how you navigate this creative friction.`;
  }

  return `Your ${sun} Sun, ${moon} Moon, and ${rising} Rising create a unique blend of ${sunElement}, ${moonElement}, and ${risingElement} energies, each contributing distinct qualities to your personality.`;
}

function getElement(sign: ZodiacSign): string {
  const elements: Record<ZodiacSign, string> = {
    Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
    Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
    Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
    Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water'
  };
  return elements[sign];
}

function getElementRelationship(element1: string, element2: string): 'harmonious' | 'challenging' | 'neutral' {
  const harmonious = [
    ['Fire', 'Air'], ['Air', 'Fire'],
    ['Earth', 'Water'], ['Water', 'Earth']
  ];

  const challenging = [
    ['Fire', 'Water'], ['Water', 'Fire'],
    ['Earth', 'Air'], ['Air', 'Earth']
  ];

  if (element1 === element2) return 'harmonious';

  const pair = [element1, element2];
  if (harmonious.some(h => h[0] === pair[0] && h[1] === pair[1])) return 'harmonious';
  if (challenging.some(c => c[0] === pair[0] && c[1] === pair[1])) return 'challenging';

  return 'neutral';
}

/**
 * Analyze element balance in chart
 */
export function analyzeElementBalance(planets: any[]): ElementBalance {
  const counts = { Fire: 0, Earth: 0, Air: 0, Water: 0 };

  planets.forEach(planet => {
    const element = planet.zodiacPosition.element;
    counts[element]++;
  });

  const total = planets.length;
  const dominant = (Object.keys(counts) as Array<keyof typeof counts>).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  const summary = `Your chart has ${counts.Fire} planets in Fire, ${counts.Earth} in Earth, ${counts.Air} in Air, and ${counts.Water} in Water. ${
    counts[dominant] >= total * 0.4
      ? `Strong ${dominant} emphasis suggests ${getElementQuality(dominant)}.`
      : counts[dominant] === counts.Fire && counts[dominant] === counts.Earth
        ? "Balanced elements indicate versatility."
        : `${dominant} dominance with ${getElementQuality(dominant)}.`
  }`;

  return {
    fire: counts.Fire,
    earth: counts.Earth,
    air: counts.Air,
    water: counts.Water,
    dominantElement: dominant,
    summary
  };
}

/**
 * Analyze modality balance in chart
 */
export function analyzeModalityBalance(planets: any[]): ModalityBalance {
  const counts = { Cardinal: 0, Fixed: 0, Mutable: 0 };

  planets.forEach(planet => {
    const modality = planet.zodiacPosition.modality;
    counts[modality]++;
  });

  const total = planets.length;
  const dominant = (Object.keys(counts) as Array<keyof typeof counts>).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  const summary = `Your chart has ${counts.Cardinal} planets in Cardinal signs, ${counts.Fixed} in Fixed, and ${counts.Mutable} in Mutable. ${
    counts[dominant] >= total * 0.4
      ? `Strong ${dominant} emphasis indicates ${getModalityQuality(dominant)}.`
      : "Balanced modalities suggest adaptability to different life phases."
  }`;

  return {
    cardinal: counts.Cardinal,
    fixed: counts.Fixed,
    mutable: counts.Mutable,
    dominantModality: dominant,
    summary
  };
}

function getElementQuality(element: string): string {
  const qualities: Record<string, string> = {
    Fire: "enthusiasm, inspiration, and action-oriented approach",
    Earth: "practicality, groundedness, and focus on tangible results",
    Air: "intellectual focus, communication, and mental activity",
    Water: "emotional depth, intuition, and feeling-based responses"
  };
  return qualities[element] || "";
}

function getModalityQuality(modality: string): string {
  const qualities: Record<string, string> = {
    Cardinal: "initiative, leadership, and starting new projects",
    Fixed: "stability, persistence, and seeing things through",
    Mutable: "adaptability, flexibility, and facilitating transitions"
  };
  return qualities[modality] || "";
}
