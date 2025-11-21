import { ObserverLocation } from '@/types';

export interface LocationPreset {
  id: string;
  name: string;
  description: string;
  location: ObserverLocation;
}

export const LOCATION_PRESETS: LocationPreset[] = [
  {
    id: 'belgrade',
    name: 'Belgrade, Serbia',
    description: 'Capital of Serbia',
    location: {
      latitude: 44.7866,
      longitude: 20.4489,
      elevation: 117,
    },
  },
  {
    id: 'greenwich',
    name: 'Greenwich, UK',
    description: 'Royal Observatory - Prime Meridian',
    location: {
      latitude: 51.4769,
      longitude: 0.0,
      elevation: 46,
    },
  },
  {
    id: 'mauna-kea',
    name: 'Mauna Kea, Hawaii',
    description: 'World-class Observatory',
    location: {
      latitude: 19.8207,
      longitude: -155.4681,
      elevation: 4205,
    },
  },
  {
    id: 'la-silla',
    name: 'La Silla, Chile',
    description: 'ESO Observatory',
    location: {
      latitude: -29.2563,
      longitude: -70.7380,
      elevation: 2400,
    },
  },
  {
    id: 'atacama',
    name: 'Atacama Desert, Chile',
    description: 'ALMA Observatory',
    location: {
      latitude: -23.0225,
      longitude: -67.7550,
      elevation: 5050,
    },
  },
  {
    id: 'mount-palomar',
    name: 'Mount Palomar, USA',
    description: 'Palomar Observatory',
    location: {
      latitude: 33.3563,
      longitude: -116.8650,
      elevation: 1712,
    },
  },
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    description: 'Southern Hemisphere View',
    location: {
      latitude: -33.8688,
      longitude: 151.2093,
      elevation: 58,
    },
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    description: 'East Asian View',
    location: {
      latitude: 35.6762,
      longitude: 139.6503,
      elevation: 40,
    },
  },
  {
    id: 'cairo',
    name: 'Cairo, Egypt',
    description: 'Ancient Stargazing Site',
    location: {
      latitude: 30.0444,
      longitude: 31.2357,
      elevation: 23,
    },
  },
  {
    id: 'new-york',
    name: 'New York, USA',
    description: 'Urban East Coast',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      elevation: 10,
    },
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik, Iceland',
    description: 'Northern Lights Region',
    location: {
      latitude: 64.1466,
      longitude: -21.9426,
      elevation: 61,
    },
  },
  {
    id: 'south-pole',
    name: 'Amundsen-Scott Station',
    description: 'South Pole',
    location: {
      latitude: -90.0,
      longitude: 0.0,
      elevation: 2835,
    },
  },
  {
    id: 'equator',
    name: 'Quito, Ecuador',
    description: 'Equator - See Both Hemispheres',
    location: {
      latitude: -0.1807,
      longitude: -78.4678,
      elevation: 2850,
    },
  },
];
