import { EquatorialCoordinate } from './astronomy';

// Constellation line (connects stars)
export interface ConstellationLine {
  constellation: string;  // 3-letter IAU code (e.g., "UMa" for Ursa Major)
  stars: number[];        // Array of Hipparcos numbers defining the line
}

// Constellation boundary point
export interface ConstellationBoundaryPoint {
  ra: number;   // Right Ascension (hours)
  dec: number;  // Declination (degrees)
}

// Constellation boundary
export interface ConstellationBoundary {
  constellation: string;
  points: ConstellationBoundaryPoint[];
}

// Constellation metadata
export interface ConstellationInfo {
  code: string;           // 3-letter IAU code
  name: string;           // Latin name (e.g., "Ursa Major")
  nameEn: string;         // English name (e.g., "Great Bear")
  nameSr?: string;        // Serbian name (optional)
  genitive?: string;      // Latin genitive form
  abbreviation: string;   // Standard abbreviation
  area: number;           // Area in square degrees
  rank?: number;          // Size rank (1-88)
}

// GeoJSON format for constellation data (from d3-celestial)
export interface ConstellationGeoJSON {
  type: 'Feature' | 'FeatureCollection';
  features?: ConstellationFeature[];
  geometry?: ConstellationGeometry;
  properties?: ConstellationProperties;
}

export interface ConstellationFeature {
  type: 'Feature';
  id: string;
  properties: ConstellationProperties;
  geometry: ConstellationGeometry;
}

export interface ConstellationProperties {
  id: string;           // Constellation code
  name?: string;        // Constellation name
  desig?: string;       // Designation
  display?: string[];   // Display names in different languages
}

export interface ConstellationGeometry {
  type: 'MultiLineString' | 'Polygon' | 'Point';
  coordinates: number[][] | number[][][] | number[];
}

// Constellation rendering options
export interface ConstellationRenderOptions {
  showLines: boolean;
  showBoundaries: boolean;
  showLabels: boolean;
  lineColor: string;
  lineWidth: number;
  boundaryColor: string;
  boundaryWidth: number;
  labelColor: string;
  labelSize: number;
}
