import { ObserverLocation } from '@/types';

export interface GeocodingResult {
  name: string;
  displayName: string;
  location: ObserverLocation;
  country?: string;
}

/**
 * Search for a city using OpenStreetMap Nominatim API
 * Free geocoding service, no API key required
 */
export async function searchCity(cityName: string): Promise<GeocodingResult[]> {
  if (!cityName || cityName.trim().length < 2) {
    return [];
  }

  try {
    const encodedCity = encodeURIComponent(cityName.trim());
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedCity}&format=json&limit=5&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'StarMapApp/1.0', // Required by Nominatim usage policy
      },
    });

    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();

    return data.map((item: any) => ({
      name: item.name,
      displayName: item.display_name,
      location: {
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        elevation: 0, // Nominatim doesn't provide elevation
      },
      country: item.address?.country,
    }));
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
}

/**
 * Get the user's current location using browser geolocation API
 */
export async function getCurrentLocation(): Promise<ObserverLocation | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          elevation: position.coords.altitude || undefined,
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        resolve(null);
      }
    );
  });
}
