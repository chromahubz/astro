'use client';

import { useStarMapStore } from '@/stores/starMapStore';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export function StarMapControls() {
  const {
    zoomLevel,
    setZoomLevel,
    resetView,
    showGrid,
    toggleGrid,
    showHorizon,
    toggleHorizon,
    showCardinalPoints,
    toggleCardinalPoints,
    showPlanets,
    togglePlanets,
    starOptions,
    setStarOptions,
    starViewMode,
    setStarViewMode,
  } = useStarMapStore();

  return (
    <div className="space-y-4 p-4 bg-slate-700 rounded-lg">
      {/* Zoom Controls */}
      <div className="space-y-2">
        <Label className="text-white text-sm">Zoom</Label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
            className="w-8 h-8 flex items-center justify-center rounded bg-slate-600 hover:bg-slate-500 text-white transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <Slider
            value={[zoomLevel]}
            onValueChange={(values) => setZoomLevel(values[0])}
            min={0.5}
            max={5}
            step={0.25}
            className="flex-1"
          />
          <button
            onClick={() => setZoomLevel(Math.min(5, zoomLevel + 0.25))}
            className="w-8 h-8 flex items-center justify-center rounded bg-slate-600 hover:bg-slate-500 text-white transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Star View Mode */}
      <div className="space-y-2">
        <Label className="text-white">Star Catalog</Label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setStarViewMode('minimal')}
            className={`p-2 rounded text-sm font-medium transition ${
              starViewMode === 'minimal'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-600'
            }`}
          >
            Minimal
            <div className="text-xs opacity-75">~15 stars</div>
          </button>
          <button
            onClick={() => setStarViewMode('standard')}
            className={`p-2 rounded text-sm font-medium transition ${
              starViewMode === 'standard'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-600'
            }`}
          >
            Standard
            <div className="text-xs opacity-75">~40 stars</div>
          </button>
          <button
            onClick={() => setStarViewMode('full')}
            className={`p-2 rounded text-sm font-medium transition ${
              starViewMode === 'full'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-600'
            }`}
          >
            Full
            <div className="text-xs opacity-75">~62 stars</div>
          </button>
        </div>
      </div>

      {/* View Options */}
      <div className="space-y-2">
        <Label className="text-white">Display Options</Label>
        <div className="space-y-2">
          <button
            onClick={toggleGrid}
            className={`w-full flex items-center justify-between p-2 rounded ${showGrid ? 'bg-blue-900/50 text-blue-300' : 'bg-slate-800 text-gray-400'} hover:bg-blue-900/30 transition`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              Grid Lines
            </span>
            {showGrid && <span className="text-xs">ON</span>}
          </button>

          <button
            onClick={toggleHorizon}
            className={`w-full flex items-center justify-between p-2 rounded ${showHorizon ? 'bg-blue-900/50 text-blue-300' : 'bg-slate-800 text-gray-400'} hover:bg-blue-900/30 transition`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
              </svg>
              Horizon Circle
            </span>
            {showHorizon && <span className="text-xs">ON</span>}
          </button>

          <button
            onClick={toggleCardinalPoints}
            className={`w-full flex items-center justify-between p-2 rounded ${showCardinalPoints ? 'bg-blue-900/50 text-blue-300' : 'bg-slate-800 text-gray-400'} hover:bg-blue-900/30 transition`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Cardinal Points (N/E/S/W)
            </span>
            {showCardinalPoints && <span className="text-xs">ON</span>}
          </button>

          <button
            onClick={() => setStarOptions({ showNames: !starOptions.showNames })}
            className={`w-full flex items-center justify-between p-2 rounded ${starOptions.showNames ? 'bg-blue-900/50 text-blue-300' : 'bg-slate-800 text-gray-400'} hover:bg-blue-900/30 transition`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Star Names
            </span>
            {starOptions.showNames && <span className="text-xs">ON</span>}
          </button>

          <button
            onClick={togglePlanets}
            className={`w-full flex items-center justify-between p-2 rounded ${showPlanets ? 'bg-blue-900/50 text-blue-300' : 'bg-slate-800 text-gray-400'} hover:bg-blue-900/30 transition`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Planets & Moon
            </span>
            {showPlanets && <span className="text-xs">ON</span>}
          </button>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        onClick={resetView}
        variant="outline"
        className="w-full"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset View
      </Button>
    </div>
  );
}
