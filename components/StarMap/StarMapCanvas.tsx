'use client';

import { useRef, useEffect, useState } from 'react';
import { useStarMapStore } from '@/stores/starMapStore';
import { calculateStarPositions } from '@/lib/data/loadStarCatalog';
import { createProjectionConfig, project } from '@/lib/rendering/projections';
import { calculateAllCelestialBodies, analyzePlanetaryPositions } from '@/lib/astronomy/planets';

export function StarMapCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const {
    observationInfo,
    calculatedStars,
    planets,
    moon,
    starOptions,
    constellationOptions,
    showGrid,
    showHorizon,
    showCardinalPoints,
    showPlanets,
    backgroundColor,
    zoomLevel,
    panX,
    panY,
    starViewMode,
    setCalculatedStars,
    setPlanets,
    setMoon,
    setAstronomicalAnalysis,
    setIsCalculating,
    setCalculationError,
    setPan,
  } = useStarMapStore();

  // Calculate star positions when observation info changes
  useEffect(() => {
    if (!observationInfo || !canvasRef.current) return;

    setIsCalculating(true);

    try {
      const canvas = canvasRef.current;
      const config = createProjectionConfig(canvas.width, canvas.height);

      // Calculate star positions
      const stars = calculateStarPositions(
        observationInfo,
        config,
        starOptions.minMagnitude,
        starViewMode
      );

      setCalculatedStars(stars);

      // Calculate planet and moon positions
      const { planets, moon } = calculateAllCelestialBodies(observationInfo);

      // Project planets to screen coordinates
      const planetsWithScreen = planets.map(planet => ({
        ...planet,
        screen: project(planet.horizontal, config)
      }));

      // Project moon to screen coordinates
      const moonWithScreen = moon ? {
        ...moon,
        screen: project(moon.horizontal, config)
      } : null;

      setPlanets(planetsWithScreen);
      setMoon(moonWithScreen);

      // Generate astronomical analysis
      const analysis = analyzePlanetaryPositions(planets, moon, observationInfo);
      setAstronomicalAnalysis(analysis);

      setCalculationError(null);
    } catch (error) {
      console.error('Error calculating star positions:', error);
      setCalculationError(error instanceof Error ? error.message : 'Unknown error');
    }
  }, [observationInfo, starOptions.minMagnitude, starViewMode, setCalculatedStars, setIsCalculating, setCalculationError, setPlanets, setMoon, setAstronomicalAnalysis]);

  // Render canvas when data or options change
  useEffect(() => {
    if (!canvasRef.current || !calculatedStars) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save context state
    ctx.save();

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply zoom and pan transformation
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.translate(centerX + panX, centerY + panY);
    ctx.scale(zoomLevel, zoomLevel);
    ctx.translate(-centerX, -centerY);

    // Draw horizon circle
    if (showHorizon) {
      drawHorizon(ctx, canvas.width, canvas.height);
    }

    // Draw grid
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }

    // Draw cardinal points
    if (showCardinalPoints) {
      drawCardinalPoints(ctx, canvas.width, canvas.height);
    }

    // Draw stars
    drawStars(ctx, calculatedStars, starOptions.colorMode, starOptions.sizeScale);

    // Draw star names
    if (starOptions.showNames) {
      drawStarNames(ctx, calculatedStars, starOptions.nameThreshold);
    }

    // Draw planets (if enabled)
    if (showPlanets && planets) {
      drawPlanets(ctx, planets);
    }

    // Draw moon (if enabled)
    if (showPlanets && moon) {
      drawMoon(ctx, moon);
    }

    // Restore context state
    ctx.restore();
  }, [
    calculatedStars,
    planets,
    moon,
    starOptions,
    constellationOptions,
    showGrid,
    showHorizon,
    showCardinalPoints,
    showPlanets,
    backgroundColor,
    zoomLevel,
    panX,
    panY,
  ]);

  // Mouse event handlers for pan/drag
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const newPanX = e.clientX - dragStart.x;
    const newPanY = e.clientY - dragStart.y;
    setPan(newPanX, newPanY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={1200}
        height={1200}
        className="max-w-full max-h-full cursor-grab active:cursor-grabbing"
        style={{ imageRendering: 'auto' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

// Helper rendering functions

function drawHorizon(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 * 0.9;

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 * 0.9;

  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 0.5;

  // Concentric circles (altitude lines) every 30 degrees
  for (let alt = 30; alt <= 90; alt += 30) {
    const radius = maxRadius * (1 - alt / 90);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Radial lines (azimuth lines) every 30 degrees
  for (let az = 0; az < 360; az += 30) {
    const angleRad = (az - 90) * (Math.PI / 180); // -90 to start from North
    const x = centerX + maxRadius * Math.cos(angleRad);
    const y = centerY + maxRadius * Math.sin(angleRad);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function drawCardinalPoints(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 * 0.95;

  const cardinals = [
    { label: 'N', angle: 0 },
    { label: 'E', angle: 90 },
    { label: 'S', angle: 180 },
    { label: 'W', angle: 270 },
  ];

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  cardinals.forEach(({ label, angle }) => {
    const angleRad = (angle - 90) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);
    ctx.fillText(label, x, y);
  });
}

function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: any[],
  colorMode: string,
  sizeScale: number
) {
  stars.forEach((star) => {
    if (!star.visible || !star.screen) return;

    const { x, y } = star.screen;
    const radius = star.radius * sizeScale;
    const color = colorMode === 'white' ? '#FFFFFF' : star.color;

    // Draw star with glow effect
    ctx.save();

    // Outer glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
    gradient.addColorStop(0, color + '80'); // 50% opacity
    gradient.addColorStop(0.5, color + '20'); // 12% opacity
    gradient.addColorStop(1, color + '00'); // 0% opacity

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
    ctx.fill();

    // Core star
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
}

function drawStarNames(ctx: CanvasRenderingContext2D, stars: any[], threshold: number) {
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  stars.forEach((star) => {
    if (!star.visible || !star.screen || !star.name) return;
    if (star.magnitude > threshold) return;

    const { x, y } = star.screen;
    const offset = star.radius * 4 + 5;

    ctx.fillText(star.name, x + offset, y);
  });
}

function drawPlanets(ctx: CanvasRenderingContext2D, planets: any[]) {
  planets.forEach((planet) => {
    if (!planet.visible || !planet.screen) return;

    const { x, y } = planet.screen;
    const radius = planet.magnitude < 0 ? 8 : 6; // Larger for bright planets

    // Draw outer glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.5);
    gradient.addColorStop(0, planet.color + '80');
    gradient.addColorStop(0.5, planet.color + '40');
    gradient.addColorStop(1, planet.color + '00');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Draw planet body
    ctx.fillStyle = planet.color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw planet symbol
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(planet.symbol, x, y);

    // Draw planet name
    ctx.fillStyle = '#E2E8F0';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(planet.name, x + radius + 8, y);
  });
}

function drawMoon(ctx: CanvasRenderingContext2D, moon: any) {
  if (!moon.visible || !moon.screen) return;

  const { x, y } = moon.screen;
  const radius = 10; // Moon is large and bright

  // Draw outer glow
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
  gradient.addColorStop(0, '#F0F0F0FF');
  gradient.addColorStop(0.3, '#F0F0F080');
  gradient.addColorStop(0.7, '#F0F0F020');
  gradient.addColorStop(1, '#F0F0F000');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
  ctx.fill();

  // Draw moon body
  ctx.fillStyle = '#F0F0F0';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw phase shadow (simple crescent representation)
  if (moon.phase < 95 && moon.phase > 5) {
    const shadowOffset = ((moon.phase - 50) / 50) * radius;
    ctx.fillStyle = '#0A0E1A80';
    ctx.beginPath();
    ctx.arc(x + shadowOffset, y, radius * 0.9, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw moon label
  ctx.fillStyle = '#E2E8F0';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Moon (${moon.phaseName})`, x + radius + 8, y);
}
