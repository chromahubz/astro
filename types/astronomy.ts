// Core astronomical coordinate types

export interface EquatorialCoordinate {
  rightAscension: number; // hours (0-24)
  declination: number;    // degrees (-90 to +90)
}

export interface HorizontalCoordinate {
  azimuth: number;   // degrees (0-360, 0=North, 90=East)
  altitude: number;  // degrees (-90 to +90, 90=zenith)
}

export interface CartesianCoordinate {
  x: number;
  y: number;
  z: number;
}

export interface ScreenCoordinate {
  x: number;
  y: number;
}

// Observer location on Earth
export interface ObserverLocation {
  latitude: number;   // degrees (-90 to +90)
  longitude: number;  // degrees (-180 to +180)
  elevation?: number; // meters above sea level
  timezone?: string;  // IANA timezone identifier
}

// Birth/observation info
export interface ObservationInfo {
  date: Date;
  location: ObserverLocation;
}

// Projection types
export type ProjectionType = 'stereographic' | 'lambert' | 'gnomonic' | 'orthographic';

// View orientation
export interface ViewOrientation {
  centerAltitude: number;  // degrees
  centerAzimuth: number;   // degrees
  rotation: number;        // degrees (field rotation)
  fieldOfView: number;     // degrees
}
