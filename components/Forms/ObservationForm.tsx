'use client';

import { useState } from 'react';
import { useStarMapStore } from '@/stores/starMapStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LOCATION_PRESETS } from '@/lib/data/locationPresets';
import { searchCity, GeocodingResult } from '@/lib/services/geocoding';

export function ObservationForm() {
  const { setObservationInfo } = useStarMapStore();

  // Form state
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [elevation, setElevation] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');

  // City search state
  const [citySearch, setCitySearch] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine date and time
    const dateTimeString = `${date}T${time}`;
    const observationDate = new Date(dateTimeString);

    // Create observation info
    setObservationInfo({
      date: observationDate,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        elevation: elevation ? parseFloat(elevation) : undefined,
      },
    });
  };

  const loadPreset = (presetId: string) => {
    const preset = LOCATION_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setLatitude(preset.location.latitude.toString());
      setLongitude(preset.location.longitude.toString());
      setElevation(preset.location.elevation?.toString() || '');
      setSelectedPreset(presetId);
    }
  };

  const handleCitySearch = async () => {
    if (!citySearch.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchCity(citySearch);
      setSearchResults(results);
    } catch (error) {
      console.error('City search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (result: GeocodingResult) => {
    setLatitude(result.location.latitude.toString());
    setLongitude(result.location.longitude.toString());
    setElevation(result.location.elevation?.toString() || '');
    setCitySearch(result.name);
    setSearchResults([]);
    setSelectedPreset('');
  };

  // Set current date/time
  const setNow = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
    setDate(dateStr);
    setTime(timeStr);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-slate-800 rounded-lg">
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Observation Details</h2>
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-gray-200">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="bg-slate-700 text-white border-slate-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-gray-200">
            Time (Local)
          </Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="bg-slate-700 text-white border-slate-600"
          />
        </div>
      </div>

      <Button type="button" onClick={setNow} variant="outline" className="w-full">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Use Current Date/Time
      </Button>

      {/* City Search */}
      <div className="space-y-2">
        <Label htmlFor="citySearch" className="text-gray-200 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search City
        </Label>
        <div className="flex gap-2">
          <Input
            id="citySearch"
            type="text"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
            placeholder="Type city name..."
            className="bg-slate-700 text-white border-slate-600 flex-1"
          />
          <Button
            type="button"
            onClick={handleCitySearch}
            disabled={isSearching || !citySearch.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSearching ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </Button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="bg-slate-700 rounded-md border border-slate-600 max-h-48 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectSearchResult(result)}
                className="w-full text-left p-3 hover:bg-slate-600 transition border-b border-slate-600 last:border-b-0"
              >
                <div className="font-medium text-white">{result.name}</div>
                <div className="text-xs text-gray-400">{result.displayName}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {result.location.latitude.toFixed(4)}°, {result.location.longitude.toFixed(4)}°
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Location Preset Selector */}
      <div className="space-y-2">
        <Label htmlFor="preset" className="text-gray-200 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Preset Locations
        </Label>
        <select
          id="preset"
          value={selectedPreset}
          onChange={(e) => loadPreset(e.target.value)}
          className="w-full p-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">-- Select a location --</option>
          {LOCATION_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name} - {preset.description}
            </option>
          ))}
        </select>
      </div>

      {/* Location Coordinates */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude" className="text-gray-200 text-sm">
            Latitude (°)
          </Label>
          <Input
            id="latitude"
            type="number"
            step="0.000001"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="0.0"
            required
            className="bg-slate-700 text-white border-slate-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="longitude" className="text-gray-200 text-sm">
            Longitude (°)
          </Label>
          <Input
            id="longitude"
            type="number"
            step="0.000001"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="0.0"
            required
            className="bg-slate-700 text-white border-slate-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="elevation" className="text-gray-200 text-sm">
            Elevation (m)
          </Label>
          <Input
            id="elevation"
            type="number"
            step="1"
            value={elevation}
            onChange={(e) => setElevation(e.target.value)}
            placeholder="0"
            className="bg-slate-700 text-white border-slate-600"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" size="lg">
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Generate Star Map
      </Button>
    </form>
  );
}
