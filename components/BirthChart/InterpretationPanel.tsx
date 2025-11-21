'use client';

import { useState } from 'react';
import { BirthChartInterpretations } from '@/types/astrology';
import { Button } from '@/components/ui/button';
import { getAllZodiacSignDescriptions, ZodiacSignDescription } from '@/lib/astrology/interpretations/zodiacSigns';

interface InterpretationPanelProps {
  interpretations: BirthChartInterpretations;
}

type TabType = 'overview' | 'planets' | 'aspects' | 'patterns' | 'zodiacSigns';

export function InterpretationPanel({ interpretations }: InterpretationPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedPlanets, setExpandedPlanets] = useState<Set<string>>(new Set());
  const [expandedAspects, setExpandedAspects] = useState<Set<number>>(new Set());
  const [expandedZodiacSigns, setExpandedZodiacSigns] = useState<Set<string>>(new Set());

  const togglePlanet = (planet: string) => {
    const newExpanded = new Set(expandedPlanets);
    if (newExpanded.has(planet)) {
      newExpanded.delete(planet);
    } else {
      newExpanded.add(planet);
    }
    setExpandedPlanets(newExpanded);
  };

  const toggleAspect = (index: number) => {
    const newExpanded = new Set(expandedAspects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedAspects(newExpanded);
  };

  const toggleZodiacSign = (sign: string) => {
    const newExpanded = new Set(expandedZodiacSigns);
    if (newExpanded.has(sign)) {
      newExpanded.delete(sign);
    } else {
      newExpanded.add(sign);
    }
    setExpandedZodiacSigns(newExpanded);
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'planets', label: 'Planets', icon: '🪐' },
    { id: 'zodiacSigns', label: 'Zodiac Signs', icon: '♈' },
    { id: 'aspects', label: 'Aspects', icon: '✨' },
    { id: 'patterns', label: 'Patterns', icon: '🔮' }
  ];

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Birth Chart Interpretation</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-slate-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2 py-1.5 text-sm font-medium transition ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <span className="mr-1 text-base">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Main Overview */}
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                {interpretations.overview}
              </div>
            </div>

            {/* Sun-Moon-Rising */}
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Your Core Essence</h3>
              <p className="text-gray-300">{interpretations.sunMoonRising}</p>
            </div>

            {/* Element Balance */}
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Element Balance</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">🔥 Fire</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{
                          width: `${(interpretations.elementBalance.fire / 10) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8">
                      {interpretations.elementBalance.fire}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">🌍 Earth</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(interpretations.elementBalance.earth / 10) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8">
                      {interpretations.elementBalance.earth}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">💨 Air</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full"
                        style={{
                          width: `${(interpretations.elementBalance.air / 10) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8">
                      {interpretations.elementBalance.air}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">💧 Water</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{
                          width: `${(interpretations.elementBalance.water / 10) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8">
                      {interpretations.elementBalance.water}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                {interpretations.elementBalance.summary}
              </p>
            </div>

            {/* Modality Balance */}
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Modality Balance</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Cardinal</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${(interpretations.modalityBalance.cardinal / 10) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8">
                      {interpretations.modalityBalance.cardinal}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Fixed</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width: `${(interpretations.modalityBalance.fixed / 10) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8">
                      {interpretations.modalityBalance.fixed}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Mutable</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{
                          width: `${(interpretations.modalityBalance.mutable / 10) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-8">
                      {interpretations.modalityBalance.mutable}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                {interpretations.modalityBalance.summary}
              </p>
            </div>

            {/* House Emphasis */}
            <div className="bg-slate-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">House Emphasis</h3>
              <p className="text-gray-300">{interpretations.houseEmphasis}</p>
            </div>
          </div>
        )}

        {/* Planets Tab */}
        {activeTab === 'planets' && (
          <div className="space-y-3">
            {interpretations.planetInterpretations.map(interp => (
              <div key={interp.planet} className="bg-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => togglePlanet(interp.planet)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-600 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getPlanetSymbol(interp.planet)}</span>
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {interp.planet} in {interp.sign}
                      </div>
                      <div className="text-sm text-gray-400">
                        House {interp.house}
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedPlanets.has(interp.planet) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {expandedPlanets.has(interp.planet) && (
                  <div className="p-4 border-t border-slate-600 space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-2">In {interp.sign}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {interp.signInterpretation}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-400 mb-2">In House {interp.house}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {interp.houseInterpretation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Aspects Tab */}
        {activeTab === 'aspects' && (
          <div className="space-y-3">
            {interpretations.aspectInterpretations.map((aspect, index) => (
              <div key={index} className="bg-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAspect(index)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-600 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{aspect.aspectSymbol}</span>
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {aspect.planet1} {aspect.aspectSymbol} {aspect.planet2}
                      </div>
                      <div className="text-sm text-gray-400">
                        {aspect.aspectType} (orb: {aspect.orb.toFixed(2)}°)
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedAspects.has(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {expandedAspects.has(index) && (
                  <div className="p-4 border-t border-slate-600">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {aspect.interpretation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {interpretations.aspectInterpretations.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No major aspects detected in your chart.
              </div>
            )}
          </div>
        )}

        {/* Patterns Tab */}
        {activeTab === 'patterns' && (
          <div className="space-y-4">
            {interpretations.patterns.length > 0 ? (
              interpretations.patterns.map((pattern, index) => (
                <div key={index} className="bg-slate-700 p-4 rounded-lg">
                  <p className="text-gray-200">{pattern}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No major chart patterns detected. Your chart shows an individualized configuration.
              </div>
            )}
          </div>
        )}

        {/* Zodiac Signs Tab */}
        {activeTab === 'zodiacSigns' && (
          <div className="space-y-3">
            {/* Your Signs Section */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">Your Zodiac Signs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {interpretations.planetInterpretations.map((planet) => {
                  const zodiacDesc = getAllZodiacSignDescriptions().find(z => z.sign === planet.sign);
                  return (
                    <div key={planet.planet} className="bg-slate-700/50 rounded px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl flex-shrink-0">{zodiacDesc?.glyph}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium text-sm">{planet.sign}</div>
                          <div className="text-gray-400 text-xs">{planet.planet}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg mb-4">
              <p className="text-gray-300 text-sm">
                Discover how you interact with each zodiac sign. This shows your compatibility and dynamics
                with people of different signs based on your Sun, Moon, and Rising signs.
              </p>
            </div>

            {getAllZodiacSignDescriptions().map((zodiacDesc) => {
              // Find planets in this sign
              const planetsInSign = interpretations.planetInterpretations
                .filter(p => p.sign === zodiacDesc.sign)
                .map(p => p.planet);

              // Get user's Sun and Moon signs for compatibility
              const userSun = interpretations.planetInterpretations.find(p => p.planet === 'Sun');
              const userMoon = interpretations.planetInterpretations.find(p => p.planet === 'Moon');

              // Determine if this is a user's sign
              const isYourSign = planetsInSign.length > 0;

              // Get element compatibility
              const getElementCompatibility = (sign1: string, sign2: string) => {
                const desc1 = getAllZodiacSignDescriptions().find(z => z.sign === sign1);
                const desc2 = getAllZodiacSignDescriptions().find(z => z.sign === sign2);
                if (!desc1 || !desc2) return { level: 'neutral', text: '' };

                if (desc1.element === desc2.element) return { level: 'high', text: 'Same element - Natural understanding' };

                // Compatible elements
                const compatible: Record<string, string[]> = {
                  'Fire': ['Air'],
                  'Air': ['Fire'],
                  'Earth': ['Water'],
                  'Water': ['Earth']
                };

                if (compatible[desc1.element]?.includes(desc2.element)) {
                  return { level: 'good', text: 'Compatible elements - Harmonious' };
                }

                return { level: 'challenging', text: 'Different approach - Growth opportunity' };
              };

              const sunCompatibility = userSun ? getElementCompatibility(userSun.sign, zodiacDesc.sign) : null;

              return (
                <div key={zodiacDesc.sign} className="bg-slate-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleZodiacSign(zodiacDesc.sign)}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-600 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{zodiacDesc.glyph}</span>
                      <div className="text-left">
                        <div className="font-semibold text-white flex items-center gap-2">
                          {zodiacDesc.sign}
                          {isYourSign && (
                            <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">
                              YOUR SIGN
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 flex gap-2">
                          <span>{zodiacDesc.element}</span>
                          <span>•</span>
                          <span>{zodiacDesc.modality}</span>
                        </div>
                        {isYourSign && planetsInSign.length > 0 && (
                          <div className="text-xs text-blue-300 mt-1">
                            Your {planetsInSign.join(', ')}
                          </div>
                        )}
                        {!isYourSign && sunCompatibility && (
                          <div className="text-xs mt-1">
                            {sunCompatibility.level === 'high' && (
                              <span className="text-green-400">💚 {sunCompatibility.text}</span>
                            )}
                            {sunCompatibility.level === 'good' && (
                              <span className="text-yellow-400">✨ {sunCompatibility.text}</span>
                            )}
                            {sunCompatibility.level === 'challenging' && (
                              <span className="text-orange-400">🔥 {sunCompatibility.text}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedZodiacSigns.has(zodiacDesc.sign) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {expandedZodiacSigns.has(zodiacDesc.sign) && (
                    <div className="p-4 border-t border-slate-600 space-y-4 text-sm">
                      {/* Personalized Section for non-user signs */}
                      {!isYourSign && userSun && (
                        <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 p-3 rounded-lg border border-indigo-700/30 mb-4">
                          <h4 className="font-semibold text-indigo-300 mb-2">
                            How You ({userSun.sign}) Relate to {zodiacDesc.sign}
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {generateCompatibilityText(userSun.sign, zodiacDesc.sign, getAllZodiacSignDescriptions())}
                          </p>
                        </div>
                      )}

                      {isYourSign && (
                        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-3 rounded-lg border border-blue-700/30 mb-4">
                          <h4 className="font-semibold text-blue-300 mb-2">
                            🌟 This is Your Sign!
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            You have {planetsInSign.join(', ')} in {zodiacDesc.sign}. This means {zodiacDesc.sign} energy
                            is a significant part of your personality and how you express yourself.
                          </p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-blue-400 mb-2">About {zodiacDesc.sign}</h4>
                        <p className="text-gray-300 leading-relaxed">
                          {zodiacDesc.overview}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <h4 className="font-semibold text-pink-400 mb-2">In Relationships</h4>
                          <p className="text-gray-300 leading-relaxed text-xs">
                            {zodiacDesc.inRelationships}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-green-400 mb-2">Key Traits</h4>
                          <p className="text-gray-300 leading-relaxed text-xs">
                            <strong>Strengths:</strong> {zodiacDesc.strengths.split('.')[0]}.
                          </p>
                          <p className="text-gray-300 leading-relaxed text-xs mt-2">
                            <strong>Challenges:</strong> {zodiacDesc.challenges.split('.')[0]}.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Get planet symbol
 */
function getPlanetSymbol(planet: string): string {
  const symbols: Record<string, string> = {
    Sun: '☉',
    Moon: '☽',
    Mercury: '☿',
    Venus: '♀',
    Mars: '♂',
    Jupiter: '♃',
    Saturn: '♄',
    Uranus: '♅',
    Neptune: '♆',
    Pluto: '♇'
  };
  return symbols[planet] || '●';
}

/**
 * Generate personalized compatibility text
 */
function generateCompatibilityText(userSign: string, otherSign: string, allSigns: ZodiacSignDescription[]): string {
  const userDesc = allSigns.find(z => z.sign === userSign);
  const otherDesc = allSigns.find(z => z.sign === otherSign);

  if (!userDesc || !otherDesc) return '';

  // Same element - natural understanding
  if (userDesc.element === otherDesc.element) {
    return `As a ${userSign}, you share the ${userDesc.element} element with ${otherSign}, creating natural understanding and similar approaches to life. You both value similar things and communicate on the same wavelength. This can create comfortable, supportive relationships where you "get" each other intuitively. However, too much similarity might lack the spark of difference that promotes growth.`;
  }

  // Compatible elements (Fire-Air, Earth-Water)
  const compatible: Record<string, string[]> = {
    'Fire': ['Air'],
    'Air': ['Fire'],
    'Earth': ['Water'],
    'Water': ['Earth']
  };

  if (compatible[userDesc.element]?.includes(otherDesc.element)) {
    if (userDesc.element === 'Fire' && otherDesc.element === 'Air') {
      return `Your ${userSign} Fire energy is fanned by ${otherSign}'s Air nature. They stimulate your ideas and provide intellectual support, while you inspire them with passion and action. This dynamic creates excitement and growth. ${otherSign} helps you think things through, while you encourage them to take action. This combination can achieve great things together.`;
    }
    if (userDesc.element === 'Air' && otherDesc.element === 'Fire') {
      return `Your ${userSign} Air nature fans the flames of ${otherSign}'s Fire energy. You stimulate their passion with ideas while they inspire you to take action. This is an energizing, dynamic combination where intellectual connection meets passionate expression. You help them strategize while they give you courage to act on your thoughts.`;
    }
    if (userDesc.element === 'Earth' && otherDesc.element === 'Water') {
      return `Your ${userSign} Earth energy provides grounding for ${otherSign}'s Water emotions. You offer stability and practical support while they add emotional depth and intuition to your life. This nurturing combination creates security - you give form to their feelings while they soften your practicality with empathy and understanding.`;
    }
    if (userDesc.element === 'Water' && otherDesc.element === 'Earth') {
      return `Your ${userSign} Water nature is contained and supported by ${otherSign}'s Earth energy. They provide the stability and structure that helps your emotions feel safe, while you add depth and feeling to their practical world. This is a nurturing, growth-oriented combination where emotional needs meet practical care.`;
    }
  }

  // Challenging combinations - opposite elements
  if ((userDesc.element === 'Fire' && otherDesc.element === 'Water') ||
      (userDesc.element === 'Water' && otherDesc.element === 'Fire')) {
    return `Your ${userSign} ${userDesc.element} nature contrasts with ${otherSign}'s ${otherDesc.element} energy, creating both friction and fascination. ${userDesc.element === 'Fire' ? 'Your passion may feel dampened by their emotional caution' : 'Your emotional depth may feel overwhelmed by their intensity'}. This requires understanding - you can steam up or put each other out. With awareness, you teach each other balance between ${userDesc.element === 'Fire' ? 'action and feeling' : 'feeling and action'}.`;
  }

  if ((userDesc.element === 'Earth' && otherDesc.element === 'Air') ||
      (userDesc.element === 'Air' && otherDesc.element === 'Earth')) {
    return `Your ${userSign} ${userDesc.element} nature differs from ${otherSign}'s ${otherDesc.element} approach, creating opportunities for growth. ${userDesc.element === 'Earth' ? 'Your practical, grounded nature may find their ideas too abstract' : 'Your mental agility may clash with their need for tangible results'}. This combination challenges both - ${userDesc.element === 'Earth' ? 'they bring ideas to your world while you teach them manifestation' : 'you inspire new thinking while they teach you follow-through'}.`;
  }

  return `Your ${userSign} energy interacts with ${otherSign} in unique ways. Understanding both signs' strengths and challenges helps navigate the relationship dynamics.`;
}
