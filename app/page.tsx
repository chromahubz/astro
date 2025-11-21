'use client';

import { StarMapCanvas } from '@/components/StarMap/StarMapCanvas';
import { StarMapControls } from '@/components/StarMap/StarMapControls';
import { ObservationForm } from '@/components/Forms/ObservationForm';
import { MoonInfoPanel } from '@/components/Moon/MoonInfoPanel';
import { InterpretationPanel } from '@/components/BirthChart/InterpretationPanel';
import { HouseSystemSelector } from '@/components/BirthChart/HouseSystemSelector';
import { ChartSummary } from '@/components/BirthChart/ChartSummary';
import { PlanetaryMusicPlayer } from '@/components/PlanetaryMusic/PlanetaryMusicPlayer';
import { useStarMapStore } from '@/stores/starMapStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const {
    observationInfo,
    isCalculating,
    calculatedStars,
    astronomicalAnalysis,
    birthChart,
    houseSystem,
    setHouseSystem,
    calculateAndSetBirthChart
  } = useStarMapStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <div>
                <h1 className="text-2xl font-bold text-white">Star Map Generator</h1>
                <p className="text-sm text-gray-400">Astronomically Accurate Night Sky</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isCalculating && (
                <span className="text-sm text-blue-400 flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Calculating...
                </span>
              )}
              {calculatedStars && (
                <span className="text-sm text-green-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {calculatedStars.length} stars
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-1">
            <ObservationForm />

            {/* Info Card */}
            <div className="mt-6 p-6 bg-slate-800 rounded-lg space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How It Works
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Enter date, time, and location</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>See exact star positions in the night sky</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Realistic star colors based on temperature</span>
                </li>
              </ul>
            </div>

            {/* Current Observation Info */}
            {observationInfo && (
              <div className="mt-6 p-6 bg-blue-900/20 border border-blue-700 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Current Observation
                </h3>
                <div className="space-y-2 text-sm text-blue-100">
                  <div>
                    <span className="text-blue-300">Date:</span>{' '}
                    {observationInfo.date.toLocaleDateString()}
                  </div>
                  <div>
                    <span className="text-blue-300">Time:</span>{' '}
                    {observationInfo.date.toLocaleTimeString()}
                  </div>
                  <div>
                    <span className="text-blue-300">Location:</span>{' '}
                    {observationInfo.location.latitude.toFixed(4)}°,{' '}
                    {observationInfo.location.longitude.toFixed(4)}°
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Star Map */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Night Sky View
                </h2>
              </div>

              <div className="aspect-square bg-slate-900 rounded-lg overflow-hidden">
                {observationInfo ? (
                  <StarMapCanvas />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center space-y-3">
                      <svg className="w-16 h-16 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <p className="text-lg">Enter details to see the star map</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              {observationInfo && (
                <div className="mt-6">
                  <StarMapControls />
                </div>
              )}

              {/* Astronomical Analysis */}
              {astronomicalAnalysis && (
                <div className="mt-6 p-6 bg-slate-700 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Astronomical Analysis
                  </h3>
                  <pre className="text-sm text-gray-200 font-mono whitespace-pre-wrap leading-relaxed">
                    {astronomicalAnalysis}
                  </pre>
                </div>
              )}

              {/* Moon Info Panel */}
              {observationInfo && (
                <div className="mt-6">
                  <MoonInfoPanel />
                </div>
              )}

              {/* Birth Chart Section */}
              {observationInfo && (
                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Birth Chart Analysis
                    </h2>
                    {!birthChart && (
                      <Button
                        onClick={calculateAndSetBirthChart}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Generate Birth Chart
                      </Button>
                    )}
                  </div>

                  {birthChart && (
                    <>
                      {/* House System Selector */}
                      <HouseSystemSelector
                        currentSystem={houseSystem}
                        onChange={setHouseSystem}
                      />

                      {/* Chart Summary and Interpretations */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                          <ChartSummary birthChart={birthChart} />
                        </div>
                        <div className="lg:col-span-2">
                          {birthChart.interpretations && (
                            <InterpretationPanel interpretations={birthChart.interpretations} />
                          )}
                        </div>
                      </div>

                      {/* Planetary Music Player */}
                      <div className="mt-6">
                        <PlanetaryMusicPlayer birthChart={birthChart} />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          <p>Star Map Generator - Astronomically Accurate Night Sky</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/verify" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verify Accuracy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
