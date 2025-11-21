'use client';

import { useStarMapStore } from '@/stores/starMapStore';

export function MoonInfoPanel() {
  const { moon, observationInfo } = useStarMapStore();

  if (!moon || !observationInfo) return null;

  return (
    <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-16 h-16">
          <MoonPhaseIcon phase={moon.phase} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">{moon.phaseName}</h3>
          <p className="text-sm text-gray-400">Lunar Phase Information</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Phase Details */}
        <div className="col-span-2 p-4 bg-slate-700/50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Phase Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Illumination:</span>
              <span className="text-white font-medium">{moon.phase.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Age in Cycle:</span>
              <span className="text-white font-medium">{moon.age.toFixed(1)} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Cycle Length:</span>
              <span className="text-white font-medium">29.53 days</span>
            </div>
          </div>
        </div>

        {/* Position */}
        <div className="col-span-2 p-4 bg-slate-700/50 rounded-lg">
          <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Position in Sky
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Altitude:</span>
              <span className="text-white font-medium">{moon.horizontal.altitude.toFixed(2)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Azimuth:</span>
              <span className="text-white font-medium">{moon.horizontal.azimuth.toFixed(2)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Visibility:</span>
              <span className={`font-medium ${moon.visible ? 'text-green-400' : 'text-red-400'}`}>
                {moon.visible ? 'Above Horizon' : 'Below Horizon'}
              </span>
            </div>
          </div>
        </div>

        {/* Astronomical Data */}
        <div className="col-span-2 p-4 bg-slate-700/50 rounded-lg">
          <h4 className="text-sm font-semibold text-yellow-300 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Astronomical Data
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Right Ascension:</span>
              <span className="text-white font-medium">{moon.equatorial.rightAscension.toFixed(4)}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Declination:</span>
              <span className="text-white font-medium">{moon.equatorial.declination.toFixed(4)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Magnitude:</span>
              <span className="text-white font-medium">{moon.magnitude.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Distance:</span>
              <span className="text-white font-medium">{moon.distance.toFixed(4)} LD</span>
            </div>
          </div>
        </div>

        {/* Phase Description */}
        <div className="col-span-2 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-300 mb-2">About This Phase</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            {getMoonPhaseDescription(moon.phaseName, moon.phase)}
          </p>
        </div>
      </div>
    </div>
  );
}

function getMoonPhaseDescription(phaseName: string, phase: number): string {
  const descriptions: Record<string, string> = {
    'New Moon': 'The Moon is between Earth and the Sun, with its illuminated side facing away from us. This is the darkest phase, ideal for stargazing and observing deep-sky objects.',
    'Waxing Crescent': 'The Moon is beginning to show its illuminated side. A thin crescent is visible in the western sky after sunset. Great time for observing lunar features along the terminator.',
    'First Quarter': 'Half of the Moon is illuminated. The terminator (day-night line) reveals dramatic shadows and terrain details. Excellent for telescopic observation.',
    'Waxing Gibbous': 'More than half of the Moon is illuminated and growing. The bright moonlight begins to wash out fainter stars but reveals stunning lunar surface details.',
    'Full Moon': 'The entire face of the Moon is illuminated by the Sun. While beautiful, the bright light makes it challenging to observe deep-sky objects. Best for lunar observation.',
    'Waning Gibbous': 'The Moon is past full and decreasing in illumination. Still very bright, but rising later in the evening. Good for late-night lunar observation.',
    'Last Quarter': 'Half of the Moon is illuminated on the opposite side from First Quarter. Rises around midnight. Excellent for early morning observation.',
    'Waning Crescent': 'A thin crescent is visible in the eastern sky before sunrise. The Moon is approaching New Moon. Good for observing earthshine on the dark portion.',
  };

  return descriptions[phaseName] || `The Moon is ${phase.toFixed(1)}% illuminated.`;
}

function MoonPhaseIcon({ phase }: { phase: number }) {
  // Convert phase percentage to angle (0 = new moon, 50 = first quarter, 100 = full)
  const illumination = phase / 100;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Moon circle */}
      <circle cx="50" cy="50" r="48" fill="#F0F0F0" stroke="#CBD5E1" strokeWidth="2" />

      {/* Shadow overlay based on phase */}
      {phase < 50 ? (
        // Waxing (New to Full) - Right side illuminated
        <ellipse
          cx="50"
          cy="50"
          rx={48 * (1 - illumination * 2)}
          ry="48"
          fill="#1E293B"
          opacity="0.85"
        />
      ) : phase > 50 ? (
        // Waning (Full to New) - Left side illuminated
        <ellipse
          cx="50"
          cy="50"
          rx={48 * ((illumination - 0.5) * 2)}
          ry="48"
          fill="#1E293B"
          opacity="0.85"
        />
      ) : null}

      {/* Moon icon in center */}
      <svg x="30" y="30" width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          stroke="#64748B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </svg>
  );
}
