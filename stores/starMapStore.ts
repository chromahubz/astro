import { create } from 'zustand';
import { ObservationInfo, ObserverLocation, ProjectionType, CalculatedStar, StarRenderOptions, ConstellationRenderOptions } from '@/types';
import type { PlanetData, MoonData } from '@/lib/astronomy/planets';
import type { BirthChartData } from '@/types/astrology';
import type { HouseSystem } from '@/lib/astrology/houses';
import { calculateBirthChart } from '@/lib/astrology/birthChart';

/**
 * Star Map Application State
 * Manages observation info, rendering options, and calculated star positions
 */

interface StarMapState {
  // Observation data
  observationInfo: ObservationInfo | null;

  // Rendering options
  starOptions: StarRenderOptions;
  constellationOptions: ConstellationRenderOptions;
  projectionType: ProjectionType;
  fieldOfView: number; // degrees

  // Calculated data (computed after observation info changes)
  calculatedStars: CalculatedStar[] | null;
  planets: PlanetData[] | null;
  moon: MoonData | null;
  isCalculating: boolean;
  calculationError: string | null;
  astronomicalAnalysis: string | null;

  // UI state
  showGrid: boolean;
  showHorizon: boolean;
  showCardinalPoints: boolean;
  showPlanets: boolean;
  backgroundColor: string;

  // Zoom and pan
  zoomLevel: number;
  panX: number;
  panY: number;

  // Star view mode
  starViewMode: 'minimal' | 'standard' | 'full';

  // Birth chart data
  birthChart: BirthChartData | null;
  houseSystem: HouseSystem;

  // Actions
  setObservationInfo: (info: ObservationInfo) => void;
  setObservationDate: (date: Date) => void;
  setObserverLocation: (location: ObserverLocation) => void;

  setStarOptions: (options: Partial<StarRenderOptions>) => void;
  setConstellationOptions: (options: Partial<ConstellationRenderOptions>) => void;
  setProjectionType: (type: ProjectionType) => void;
  setFieldOfView: (fov: number) => void;

  setCalculatedStars: (stars: CalculatedStar[]) => void;
  setPlanets: (planets: PlanetData[]) => void;
  setMoon: (moon: MoonData | null) => void;
  setAstronomicalAnalysis: (analysis: string | null) => void;
  setIsCalculating: (calculating: boolean) => void;
  setCalculationError: (error: string | null) => void;

  toggleGrid: () => void;
  toggleHorizon: () => void;
  toggleCardinalPoints: () => void;
  togglePlanets: () => void;
  setBackgroundColor: (color: string) => void;

  setZoomLevel: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  resetView: () => void;

  setStarViewMode: (mode: 'minimal' | 'standard' | 'full') => void;

  // Birth chart actions
  calculateAndSetBirthChart: () => void;
  setHouseSystem: (system: HouseSystem) => void;
  setBirthChart: (chart: BirthChartData | null) => void;

  // Presets
  loadPreset: (presetName: string) => void;
}

// Default rendering options
const defaultStarOptions: StarRenderOptions = {
  minMagnitude: 6.5,
  maxMagnitude: -2,
  sizeScale: 1.0,
  colorMode: 'realistic',
  showNames: true,
  nameThreshold: 2.0, // Show names for stars brighter than magnitude 2
};

const defaultConstellationOptions: ConstellationRenderOptions = {
  showLines: true,
  showBoundaries: false,
  showLabels: true,
  lineColor: '#4A5568',
  lineWidth: 1,
  boundaryColor: '#2D3748',
  boundaryWidth: 0.5,
  labelColor: '#A0AEC0',
  labelSize: 12,
};

export const useStarMapStore = create<StarMapState>((set, get) => ({
  // Initial state
  observationInfo: null,

  starOptions: defaultStarOptions,
  constellationOptions: defaultConstellationOptions,
  projectionType: 'stereographic',
  fieldOfView: 180,

  calculatedStars: null,
  planets: null,
  moon: null,
  isCalculating: false,
  calculationError: null,
  astronomicalAnalysis: null,

  showGrid: true,
  showHorizon: true,
  showCardinalPoints: true,
  showPlanets: true,
  backgroundColor: '#0A0E1A',

  zoomLevel: 1.0,
  panX: 0,
  panY: 0,

  starViewMode: 'standard',

  birthChart: null,
  houseSystem: 'placidus',

  // Actions
  setObservationInfo: (info) => {
    set({ observationInfo: info });
    // Auto-regenerate birth chart if one already exists
    const currentState = get();
    if (currentState.birthChart) {
      // Use setTimeout to ensure state is updated first
      setTimeout(() => {
        get().calculateAndSetBirthChart();
      }, 0);
    }
  },

  setObservationDate: (date) =>
    set((state) => ({
      observationInfo: state.observationInfo
        ? { ...state.observationInfo, date }
        : null,
    })),

  setObserverLocation: (location) =>
    set((state) => ({
      observationInfo: state.observationInfo
        ? { ...state.observationInfo, location }
        : null,
    })),

  setStarOptions: (options) =>
    set((state) => ({
      starOptions: { ...state.starOptions, ...options },
    })),

  setConstellationOptions: (options) =>
    set((state) => ({
      constellationOptions: { ...state.constellationOptions, ...options },
    })),

  setProjectionType: (type) => set({ projectionType: type }),

  setFieldOfView: (fov) => set({ fieldOfView: Math.max(10, Math.min(180, fov)) }),

  setCalculatedStars: (stars) => set({ calculatedStars: stars, isCalculating: false }),

  setPlanets: (planets) => set({ planets }),

  setMoon: (moon) => set({ moon }),

  setAstronomicalAnalysis: (analysis) => set({ astronomicalAnalysis: analysis }),

  setIsCalculating: (calculating) => set({ isCalculating: calculating }),

  setCalculationError: (error) => set({ calculationError: error, isCalculating: false }),

  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),

  toggleHorizon: () => set((state) => ({ showHorizon: !state.showHorizon })),

  toggleCardinalPoints: () =>
    set((state) => ({ showCardinalPoints: !state.showCardinalPoints })),

  togglePlanets: () => set((state) => ({ showPlanets: !state.showPlanets })),

  setBackgroundColor: (color) => set({ backgroundColor: color }),

  setZoomLevel: (zoom) => set({ zoomLevel: Math.max(0.1, Math.min(10, zoom)) }),

  setPan: (x, y) => set({ panX: x, panY: y }),

  resetView: () => set({ zoomLevel: 1.0, panX: 0, panY: 0 }),

  setStarViewMode: (mode) => set({ starViewMode: mode }),

  // Birth chart actions
  calculateAndSetBirthChart: () => {
    const { observationInfo, houseSystem } = get();
    if (!observationInfo) return;

    try {
      const birthChart = calculateBirthChart(observationInfo, {
        houseSystem,
        includeMinorAspects: true,
        calculatePatterns: true,
        generateInterpretations: true
      });

      set({ birthChart });
    } catch (error) {
      console.error('Birth chart calculation error:', error);
      set({ birthChart: null });
    }
  },

  setHouseSystem: (system) => {
    set({ houseSystem: system });
    // Recalculate birth chart with new house system
    get().calculateAndSetBirthChart();
  },

  setBirthChart: (chart) => set({ birthChart: chart }),

  loadPreset: (presetName) => {
    const presets: Record<string, Partial<StarMapState>> = {
      default: {
        starOptions: defaultStarOptions,
        constellationOptions: defaultConstellationOptions,
        projectionType: 'stereographic',
        fieldOfView: 180,
        showGrid: true,
        showHorizon: true,
        showCardinalPoints: true,
        backgroundColor: '#0A0E1A',
      },
      minimalist: {
        starOptions: {
          ...defaultStarOptions,
          colorMode: 'white',
          showNames: false,
        },
        constellationOptions: {
          ...defaultConstellationOptions,
          showLines: false,
          showLabels: false,
        },
        showGrid: false,
        showHorizon: false,
        showCardinalPoints: false,
        backgroundColor: '#000000',
      },
      detailed: {
        starOptions: {
          ...defaultStarOptions,
          minMagnitude: 8.0,
          showNames: true,
          nameThreshold: 3.0,
        },
        constellationOptions: {
          ...defaultConstellationOptions,
          showLines: true,
          showBoundaries: true,
          showLabels: true,
        },
        showGrid: true,
        showHorizon: true,
        showCardinalPoints: true,
      },
      scientific: {
        starOptions: {
          ...defaultStarOptions,
          colorMode: 'realistic',
          showNames: true,
          nameThreshold: 1.5,
        },
        constellationOptions: {
          ...defaultConstellationOptions,
          showLines: true,
          showBoundaries: true,
        },
        projectionType: 'lambert',
        showGrid: true,
      },
    };

    const preset = presets[presetName];
    if (preset) {
      set(preset);
    }
  },
}));
