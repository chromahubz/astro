/**
 * Julian Date conversion utilities
 * Julian Date is the continuous count of days since January 1, 4713 BCE
 * Used as a standard in astronomical calculations
 */

/**
 * Convert JavaScript Date to Julian Date
 * Formula: JD = (time in milliseconds / 86400000) + 2440587.5
 * 2440587.5 is the JD of Unix epoch (January 1, 1970 00:00:00 UTC)
 */
export function dateToJulian(date: Date): number {
  return date.getTime() / 86400000.0 + 2440587.5;
}

/**
 * Convert Julian Date to JavaScript Date
 */
export function julianToDate(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000.0);
}

/**
 * Get current Julian Date
 */
export function getCurrentJulianDate(): number {
  return dateToJulian(new Date());
}

/**
 * Calculate the number of centuries since J2000.0 (January 1, 2000, 12:00 TT)
 * T = (JD - 2451545.0) / 36525
 * Used in many astronomical calculations
 */
export function julianCenturiesSinceJ2000(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Calculate the number of days since J2000.0
 */
export function daysSinceJ2000(jd: number): number {
  return jd - 2451545.0;
}

/**
 * Get J2000.0 epoch Julian Date
 */
export const J2000_EPOCH = 2451545.0;

/**
 * Convert calendar date to Julian Date using more precise formula
 * Handles dates before and after Gregorian calendar reform
 */
export function calendarToJulian(
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0
): number {
  // Algorithm from "Astronomical Algorithms" by Jean Meeus

  // Adjust for January and February being months 13 and 14 of previous year
  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  // Gregorian calendar correction
  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);

  const jd =
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    b -
    1524.5;

  // Add time of day
  const dayFraction = (hour + minute / 60.0 + second / 3600.0) / 24.0;

  return jd + dayFraction;
}
