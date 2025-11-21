'use client';

import { BirthChartData } from '@/types/astrology';

interface ChartSummaryProps {
  birthChart: BirthChartData;
}

export function ChartSummary({ birthChart }: ChartSummaryProps) {
  const sun = birthChart.planets.find(p => p.name === 'Sun');
  const moon = birthChart.planets.find(p => p.name === 'Moon');
  const mercury = birthChart.planets.find(p => p.name === 'Mercury');
  const venus = birthChart.planets.find(p => p.name === 'Venus');
  const mars = birthChart.planets.find(p => p.name === 'Mars');

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Birth Chart Summary</h2>

      {/* Big Three */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">The Big Three</h3>
        <div className="space-y-3">
          {sun && (
            <div className="flex items-center gap-3">
              <div className="text-3xl flex-shrink-0">☉</div>
              <div className="flex-1">
                <div className="text-white font-semibold text-base">{sun.zodiacPosition.sign}</div>
                <div className="text-xs text-gray-400">Sun Sign (Main)</div>
                <div className="text-xs text-gray-500">Your Core Self</div>
              </div>
            </div>
          )}
          {moon && (
            <div className="flex items-center gap-3">
              <div className="text-3xl flex-shrink-0">☽</div>
              <div className="flex-1">
                <div className="text-white font-semibold text-base">{moon.zodiacPosition.sign}</div>
                <div className="text-xs text-gray-400">Moon Sign</div>
                <div className="text-xs text-gray-500">Your Emotions</div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="text-3xl flex-shrink-0">{birthChart.angles.ascendant.glyph}</div>
            <div className="flex-1">
              <div className="text-white font-semibold text-base">{birthChart.angles.ascendant.sign}</div>
              <div className="text-xs text-gray-400">Rising Sign (ASC)</div>
              <div className="text-xs text-gray-500">Your Outer Self</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rising Sign Detailed Section */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-3 rounded-lg border border-indigo-700/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{birthChart.angles.ascendant.glyph}</span>
          <div>
            <h3 className="text-base font-semibold text-white">
              {birthChart.angles.ascendant.sign} Rising
            </h3>
            <p className="text-[10px] text-gray-400">
              Ascendant at {birthChart.angles.ascendant.degree}°{birthChart.angles.ascendant.minute}' {birthChart.angles.ascendant.sign}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          Your Rising Sign, also called the Ascendant, is the zodiac sign that was rising on the eastern horizon
          at the exact moment of your birth. It represents the "mask" you wear to the world, your first impression,
          and how you approach new situations. People often identify with their Rising Sign as much as their Sun Sign,
          as it colors your entire chart and personality expression.
        </p>
      </div>

      {/* Personal Planets */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Personal Planets</h3>
        <div className="space-y-2">
          {mercury && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span>☿</span>
                <span className="text-gray-400">Mercury</span>
              </div>
              <div className="text-white">
                {mercury.zodiacPosition.sign} • House {mercury.houseNumber}
              </div>
            </div>
          )}
          {venus && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span>♀</span>
                <span className="text-gray-400">Venus</span>
              </div>
              <div className="text-white">
                {venus.zodiacPosition.sign} • House {venus.houseNumber}
              </div>
            </div>
          )}
          {mars && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span>♂</span>
                <span className="text-gray-400">Mars</span>
              </div>
              <div className="text-white">
                {mars.zodiacPosition.sign} • House {mars.houseNumber}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart Angles */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Chart Angles</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-gray-400">Ascendant (ASC)</div>
            <div className="text-white font-medium">
              {birthChart.angles.ascendant.sign} {birthChart.angles.ascendant.degree}°
            </div>
          </div>
          <div>
            <div className="text-gray-400">Midheaven (MC)</div>
            <div className="text-white font-medium">
              {birthChart.angles.midheaven.sign} {birthChart.angles.midheaven.degree}°
            </div>
          </div>
          <div>
            <div className="text-gray-400">Descendant (DSC)</div>
            <div className="text-white font-medium">
              {birthChart.angles.descendant.sign} {birthChart.angles.descendant.degree}°
            </div>
          </div>
          <div>
            <div className="text-gray-400">Imum Coeli (IC)</div>
            <div className="text-white font-medium">
              {birthChart.angles.ic.sign} {birthChart.angles.ic.degree}°
            </div>
          </div>
        </div>
      </div>

      {/* Aspects Count */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Aspects</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Total Aspects</span>
          <span className="text-white font-semibold">{birthChart.aspects.length}</span>
        </div>
      </div>

      {/* House System */}
      <div className="pt-3 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">House System</span>
          <span className="text-white capitalize">{birthChart.houses.system}</span>
        </div>
      </div>
    </div>
  );
}
