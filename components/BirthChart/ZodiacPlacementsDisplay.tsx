'use client';

import { BirthChartData } from '@/types/astrology';
import { getZodiacSignDescription } from '@/lib/astrology/interpretations/zodiacSigns';

interface ZodiacPlacementsDisplayProps {
  birthChart: BirthChartData;
}

export function ZodiacPlacementsDisplay({ birthChart }: ZodiacPlacementsDisplayProps) {
  // Group planets by element
  const elementGroups = {
    Fire: [] as { planet: string; sign: string; glyph: string; house: number }[],
    Earth: [] as { planet: string; sign: string; glyph: string; house: number }[],
    Air: [] as { planet: string; sign: string; glyph: string; house: number }[],
    Water: [] as { planet: string; sign: string; glyph: string; house: number }[]
  };

  // Planet symbols
  const planetSymbols: Record<string, string> = {
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

  // Categorize planets by element
  birthChart.planets.forEach(planet => {
    const signDesc = getZodiacSignDescription(planet.zodiacPosition.sign);
    const planetInfo = {
      planet: planet.name,
      sign: planet.zodiacPosition.sign,
      glyph: signDesc.glyph,
      house: planet.houseNumber
    };

    elementGroups[signDesc.element].push(planetInfo);
  });

  // Element colors
  const elementColors = {
    Fire: 'from-orange-900/30 to-red-900/30',
    Earth: 'from-green-900/30 to-emerald-900/30',
    Air: 'from-blue-900/30 to-cyan-900/30',
    Water: 'from-indigo-900/30 to-purple-900/30'
  };

  const elementIcons = {
    Fire: '🔥',
    Earth: '🌍',
    Air: '💨',
    Water: '💧'
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Your Zodiac Placements</h2>

      <p className="text-sm text-gray-400 mb-6">
        This shows all your planetary placements organized by element, giving you a quick overview
        of where your cosmic energies are concentrated.
      </p>

      {/* All Planets in Order */}
      <div className="bg-slate-700 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Planetary Positions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {birthChart.planets.map(planet => {
            const signDesc = getZodiacSignDescription(planet.zodiacPosition.sign);
            return (
              <div
                key={planet.name}
                className="flex items-center justify-between text-sm bg-slate-600/50 rounded px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{planetSymbols[planet.name]}</span>
                  <span className="text-gray-300">{planet.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lg">{signDesc.glyph}</span>
                  <span className="text-white font-medium">{planet.zodiacPosition.sign}</span>
                  <span className="text-gray-500 text-xs ml-2">H{planet.houseNumber}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grouped by Element */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Grouped by Element</h3>

        {(Object.keys(elementGroups) as Array<keyof typeof elementGroups>).map(element => {
          const planets = elementGroups[element];
          if (planets.length === 0) return null;

          return (
            <div
              key={element}
              className={`bg-gradient-to-r ${elementColors[element]} rounded-lg p-4`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{elementIcons[element]}</span>
                <h4 className="font-semibold text-white">
                  {element} Signs
                </h4>
                <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                  {planets.length} planet{planets.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-2">
                {planets.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm bg-black/20 rounded px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{planetSymbols[p.planet]}</span>
                      <span className="text-gray-200">{p.planet}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">{p.glyph}</span>
                      <span className="text-white font-medium">{p.sign}</span>
                      <span className="text-gray-400 text-xs ml-2">House {p.house}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Element Distribution Summary */}
      <div className="bg-slate-700 rounded-lg p-4 mt-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Element Distribution</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {(Object.keys(elementGroups) as Array<keyof typeof elementGroups>).map(element => (
            <div key={element} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{elementIcons[element]}</span>
                <span className="text-gray-300">{element}</span>
              </div>
              <span className="text-white font-semibold">
                {elementGroups[element].length}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
