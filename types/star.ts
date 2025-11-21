import { EquatorialCoordinate, HorizontalCoordinate, ScreenCoordinate } from './astronomy';

// Star catalog entry (HYG database format)
export interface StarCatalogEntry {
  id: number;                    // Star ID
  hip?: number;                  // Hipparcos catalog number
  hd?: number;                   // Henry Draper catalog number
  hr?: number;                   // Harvard Revised (Yale Bright Star) number
  gl?: string;                   // Gliese catalog number
  bf?: string;                   // Bayer/Flamsteed designation
  proper?: string;               // Proper name (e.g., "Sirius", "Vega")
  ra: number;                    // Right Ascension (degrees, J2000)
  dec: number;                   // Declination (degrees, J2000)
  dist?: number;                 // Distance (parsecs)
  pmra?: number;                 // Proper motion in RA (mas/year)
  pmdec?: number;                // Proper motion in Dec (mas/year)
  rv?: number;                   // Radial velocity (km/s)
  mag: number;                   // Apparent visual magnitude
  absmag?: number;               // Absolute magnitude
  spect?: string;                // Spectral type
  ci?: number;                   // Color index (B-V)
  x?: number;                    // Cartesian x (parsecs)
  y?: number;                    // Cartesian y (parsecs)
  z?: number;                    // Cartesian z (parsecs)
  vx?: number;                   // Velocity x (parsecs/year)
  vy?: number;                   // Velocity y (parsecs/year)
  vz?: number;                   // Velocity z (parsecs/year)
  rarad?: number;                // RA in radians
  decrad?: number;               // Dec in radians
  pmrarad?: number;              // Proper motion RA in radians/year
  pmdecrad?: number;             // Proper motion Dec in radians/year
  bayer?: string;                // Bayer designation
  flam?: number;                 // Flamsteed number
  con?: string;                  // Constellation abbreviation
  comp?: number;                 // Component identifier
  comp_primary?: number;         // Primary component ID
  base?: string;                 // Base star name
  lum?: number;                  // Luminosity (solar units)
  var?: string;                  // Variable star designation
  var_min?: number;              // Variable magnitude minimum
  var_max?: number;              // Variable magnitude maximum
}

// Calculated star for rendering
export interface CalculatedStar {
  id: number;
  name?: string;
  equatorial: EquatorialCoordinate;
  horizontal: HorizontalCoordinate;
  screen: ScreenCoordinate;
  magnitude: number;
  color: string;       // RGB hex color
  visible: boolean;    // Above horizon
  radius: number;      // Render size in pixels
  constellation?: string;
}

// Star rendering options
export interface StarRenderOptions {
  minMagnitude: number;      // Faintest stars to show
  maxMagnitude: number;      // Brightest stars
  sizeScale: number;         // Size multiplier
  colorMode: 'realistic' | 'white' | 'custom';
  customColor?: string;      // Used if colorMode is 'custom'
  showNames: boolean;        // Show star names
  nameThreshold: number;     // Only show names for stars brighter than this
}
