'use client';

import { HouseSystem } from '@/lib/astrology/houses';
import { Label } from '@/components/ui/label';

interface HouseSystemSelectorProps {
  currentSystem: HouseSystem;
  onChange: (system: HouseSystem) => void;
}

export function HouseSystemSelector({ currentSystem, onChange }: HouseSystemSelectorProps) {
  const systems: { value: HouseSystem; label: string; description: string }[] = [
    {
      value: 'placidus',
      label: 'Placidus',
      description: 'Most popular - time-based quadrant system'
    },
    {
      value: 'whole-sign',
      label: 'Whole Sign',
      description: 'Ancient method - each sign = one house'
    },
    {
      value: 'equal',
      label: 'Equal House',
      description: 'All houses 30° wide from Ascendant'
    }
  ];

  return (
    <div className="space-y-3">
      <Label className="text-white">House System</Label>
      <div className="grid grid-cols-3 gap-2">
        {systems.map(system => (
          <button
            key={system.value}
            onClick={() => onChange(system.value)}
            className={`p-3 rounded-lg text-left transition ${
              currentSystem === system.value
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            <div className="font-semibold text-sm">{system.label}</div>
            <div className="text-xs opacity-75 mt-1">{system.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
