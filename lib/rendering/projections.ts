import { HorizontalCoordinate, ScreenCoordinate, ProjectionType, ViewOrientation } from '@/types';
import { degreesToRadians, radiansToDegrees } from '../astronomy/siderealTime';

/**
 * Map projection utilities
 * Convert celestial sphere coordinates to 2D screen coordinates
 */

export interface ProjectionConfig {
  canvasWidth: number;
  canvasHeight: number;
  centerX: number;
  centerY: number;
  scale: number;  // pixels per degree
}

/**
 * Stereographic Projection
 * Most common projection for star maps
 * Preserves angles and shapes of constellations
 * Projects sphere onto a plane from one pole
 */
export function stereographicProjection(
  horizontal: HorizontalCoordinate,
  config: ProjectionConfig,
  viewOrientation: ViewOrientation = { centerAltitude: 90, centerAzimuth: 0, rotation: 0, fieldOfView: 180 }
): ScreenCoordinate | null {
  const { altitude, azimuth } = horizontal;

  // Check if point is visible (above horizon)
  if (altitude < -5) {
    return null; // Below horizon with small margin
  }

  // Convert to radians
  const altRad = degreesToRadians(altitude);
  const azRad = degreesToRadians(azimuth);

  // Stereographic projection formula
  // For zenith view (looking straight up):
  // x = k * cos(alt) * sin(az)
  // y = -k * cos(alt) * cos(az)
  // where k = scale factor

  const k = config.scale;
  const zenithDistance = 90 - altitude; // Distance from zenith in degrees
  const zenithDistRad = degreesToRadians(zenithDistance);

  // Stereographic scale factor: r = 2 * tan(zenithDist / 2)
  const r = 2 * Math.tan(zenithDistRad / 2) * k;

  // Calculate screen position
  const x = config.centerX + r * Math.sin(azRad);
  const y = config.centerY - r * Math.cos(azRad); // Negative because screen Y increases downward

  // Check if within canvas bounds
  if (x < 0 || x > config.canvasWidth || y < 0 || y > config.canvasHeight) {
    return null;
  }

  return { x, y };
}

/**
 * Orthographic Projection
 * Shows hemisphere as it would appear from infinite distance
 * Like a photograph of the globe
 */
export function orthographicProjection(
  horizontal: HorizontalCoordinate,
  config: ProjectionConfig,
  viewOrientation: ViewOrientation = { centerAltitude: 90, centerAzimuth: 0, rotation: 0, fieldOfView: 180 }
): ScreenCoordinate | null {
  const { altitude, azimuth } = horizontal;

  // Check if visible
  if (altitude < 0) {
    return null;
  }

  const altRad = degreesToRadians(altitude);
  const azRad = degreesToRadians(azimuth);

  // Orthographic projection formula
  // x = R * cos(alt) * sin(az)
  // y = R * sin(alt)

  const R = config.scale;

  const x = config.centerX + R * Math.cos(altRad) * Math.sin(azRad);
  const y = config.centerY - R * Math.sin(altRad);

  if (x < 0 || x > config.canvasWidth || y < 0 || y > config.canvasHeight) {
    return null;
  }

  return { x, y };
}

/**
 * Lambert Azimuthal Equal-Area Projection
 * Preserves area ratios - scientifically accurate
 * Good for whole-sky maps
 */
export function lambertProjection(
  horizontal: HorizontalCoordinate,
  config: ProjectionConfig,
  viewOrientation: ViewOrientation = { centerAltitude: 90, centerAzimuth: 0, rotation: 0, fieldOfView: 180 }
): ScreenCoordinate | null {
  const { altitude, azimuth } = horizontal;

  if (altitude < -5) {
    return null;
  }

  const altRad = degreesToRadians(altitude);
  const azRad = degreesToRadians(azimuth);

  // Lambert azimuthal equal-area projection
  // k = sqrt(2 / (1 + sin(alt)))
  const k = Math.sqrt(2 / (1 + Math.sin(altRad))) * config.scale;

  const x = config.centerX + k * Math.cos(altRad) * Math.sin(azRad);
  const y = config.centerY - k * Math.cos(altRad) * Math.cos(azRad);

  if (x < 0 || x > config.canvasWidth || y < 0 || y > config.canvasHeight) {
    return null;
  }

  return { x, y };
}

/**
 * Gnomonic Projection
 * Great circles appear as straight lines
 * Useful for navigation
 */
export function gnomonicProjection(
  horizontal: HorizontalCoordinate,
  config: ProjectionConfig,
  viewOrientation: ViewOrientation = { centerAltitude: 90, centerAzimuth: 0, rotation: 0, fieldOfView: 180 }
): ScreenCoordinate | null {
  const { altitude, azimuth } = horizontal;

  // Gnomonic only works for altitude > 0
  if (altitude <= 0) {
    return null;
  }

  const altRad = degreesToRadians(altitude);
  const azRad = degreesToRadians(azimuth);

  // Gnomonic projection
  // Scale factor inversely proportional to sin(alt)
  const k = config.scale / Math.sin(altRad);

  const x = config.centerX + k * Math.cos(altRad) * Math.sin(azRad);
  const y = config.centerY - k * Math.cos(altRad) * Math.cos(azRad);

  // Gnomonic can produce very large values near horizon - clamp
  if (
    x < -config.canvasWidth ||
    x > config.canvasWidth * 2 ||
    y < -config.canvasHeight ||
    y > config.canvasHeight * 2
  ) {
    return null;
  }

  return { x, y };
}

/**
 * Generic projection function that dispatches to specific projection type
 */
export function project(
  horizontal: HorizontalCoordinate,
  config: ProjectionConfig,
  projectionType: ProjectionType = 'stereographic',
  viewOrientation?: ViewOrientation
): ScreenCoordinate | null {
  switch (projectionType) {
    case 'stereographic':
      return stereographicProjection(horizontal, config, viewOrientation);
    case 'lambert':
      return lambertProjection(horizontal, config, viewOrientation);
    case 'orthographic':
      return orthographicProjection(horizontal, config, viewOrientation);
    case 'gnomonic':
      return gnomonicProjection(horizontal, config, viewOrientation);
    default:
      return stereographicProjection(horizontal, config, viewOrientation);
  }
}

/**
 * Calculate optimal projection configuration for a canvas
 */
export function createProjectionConfig(
  canvasWidth: number,
  canvasHeight: number,
  fieldOfView: number = 180 // degrees
): ProjectionConfig {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Calculate scale to fit field of view
  // For stereographic projection with FOV 180°, zenith distance is 90°
  // r = 2 * tan(zenithDist/2) * scale
  // At horizon (zenithDist = 90°), r = 2 * tan(45°) * scale = 2 * scale
  // We want this to equal radius, so: scale = radius / 2
  const radius = Math.min(canvasWidth, canvasHeight) / 2 * 0.9; // 0.9 for padding
  const scale = radius / 2; // For stereographic projection at horizon

  return {
    canvasWidth,
    canvasHeight,
    centerX,
    centerY,
    scale,
  };
}

/**
 * Inverse stereographic projection
 * Convert screen coordinates back to horizontal coordinates
 * Useful for click detection and interaction
 */
export function inverseStereographicProjection(
  screen: ScreenCoordinate,
  config: ProjectionConfig
): HorizontalCoordinate | null {
  const dx = screen.x - config.centerX;
  const dy = -(screen.y - config.centerY); // Flip Y

  const r = Math.sqrt(dx * dx + dy * dy);

  // Calculate zenith distance from radius
  const zenithDist = 2 * Math.atan(r / (2 * config.scale));
  const altitude = 90 - radiansToDegrees(zenithDist);

  // Calculate azimuth from dx, dy
  let azimuth = radiansToDegrees(Math.atan2(dx, dy));
  if (azimuth < 0) azimuth += 360;

  return {
    altitude,
    azimuth,
  };
}

/**
 * Calculate zoom factor needed to fit a specific field of view
 */
export function calculateZoomForFOV(currentScale: number, desiredFOV: number, canvasSize: number): number {
  const targetScale = (canvasSize * 0.45) / desiredFOV;
  return targetScale / currentScale;
}
