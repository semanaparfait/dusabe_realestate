import React, { useRef, useEffect, useState } from 'react';
import { ZoomIn, ZoomOut, Compass, Eye, X } from 'lucide-react';
import type { Property } from '../data';

interface MapSectionProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  currency: string;
}

export const MapSection: React.FC<MapSectionProps> = ({
  properties,
  onSelectProperty,
  currency
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [mapStyle, setMapStyle] = useState<'blueprint' | 'satellite'>('blueprint');

  // Convert Price for Display
  const formatPrice = (priceUSD: number) => {
    if (currency === 'RWF') {
      const converted = Math.round(priceUSD * 1400);
      if (converted >= 1000000000) {
        return `RWF ${(converted / 1000000000).toFixed(1)}B`;
      }
      return `RWF ${(converted / 1000000).toFixed(0)}M`;
    }
    if (priceUSD >= 1000000) {
      return `$${(priceUSD / 1000000).toFixed(1)}M`;
    }
    return `$${priceUSD.toLocaleString()}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;

    // Draw Loop
    ctx.clearRect(0, 0, width, height);

    // Style properties based on theme
    const isBlueprint = mapStyle === 'blueprint';

    // Draw Map Background
    ctx.fillStyle = isBlueprint ? '#0F172A' : '#1E293B';
    ctx.fillRect(0, 0, width, height);

    // Draw Grid Lines (Blueprint effect)
    ctx.strokeStyle = isBlueprint ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Coastal/Water feature (Luxury Waterfront/Bay area representation)
    ctx.fillStyle = isBlueprint ? 'rgba(37, 99, 235, 0.15)' : 'rgba(30, 58, 138, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.bezierCurveTo(width * 0.3, height * 0.6, width * 0.6, height * 0.9, width, height * 0.65);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Draw Water coast line
    ctx.strokeStyle = isBlueprint ? 'rgba(37, 99, 235, 0.4)' : 'rgba(37, 99, 235, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw Island Circle (representing premium Star Island plot)
    ctx.fillStyle = isBlueprint ? '#1E293B' : '#334155';
    ctx.beginPath();
    ctx.arc(width * 0.7, height * 0.8, 60 * zoom, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw Roads (dotted paths)
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.lineWidth = 4;
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.moveTo(width * 0.1, 0);
    ctx.quadraticCurveTo(width * 0.5, height * 0.3, width * 0.9, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, height * 0.4);
    ctx.lineTo(width, height * 0.4);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Draw Property Pins
    properties.forEach((prop) => {
      const pinX = (prop.mapCoords.x / 100) * width;
      const pinY = (prop.mapCoords.y / 100) * height;

      const isActive = activeProperty?.id === prop.id;
      const isHovered = hoveredProperty?.id === prop.id;

      // Draw Radius range indicator on active/hover
      if (isActive || isHovered) {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
        ctx.beginPath();
        ctx.arc(pinX, pinY, 40 * zoom, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Outer ring
      ctx.fillStyle = isActive ? 'var(--accent-gold)' : (isHovered ? 'var(--secondary)' : '#FFFFFF');
      ctx.beginPath();
      ctx.arc(pinX, pinY, isActive ? 9 : 7, 0, 2 * Math.PI);
      ctx.fill();

      // Draw Core pin
      ctx.fillStyle = isActive ? '#000000' : 'var(--primary)';
      ctx.beginPath();
      ctx.arc(pinX, pinY, isActive ? 5 : 4, 0, 2 * Math.PI);
      ctx.fill();

      // Price Tag Label
      ctx.fillStyle = isActive ? 'var(--accent-gold)' : 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;

      // Round Rect bubble
      const text = formatPrice(prop.price);
      ctx.font = 'bold 9px Poppins, sans-serif';
      const textWidth = ctx.measureText(text).width;
      const paddingX = 8;
      const paddingY = 4;
      const bubbleW = textWidth + paddingX * 2;
      const bubbleH = 14 + paddingY * 2;
      const bubbleX = pinX - bubbleW / 2;
      const bubbleY = pinY - 26;

      // Draw Bubble
      ctx.beginPath();
      ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 6);
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.fillStyle = isActive ? '#000000' : '#FFFFFF';
      ctx.fillText(text, bubbleX + paddingX, bubbleY + 14);
    });

  }, [properties, zoom, activeProperty, hoveredProperty, mapStyle, currency]);

  // Click Handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Detect if clicked any property
    let found = false;
    for (const prop of properties) {
      const pinX = (prop.mapCoords.x / 100) * width;
      const pinY = (prop.mapCoords.y / 100) * height;

      const dist = Math.sqrt((clickX - pinX) ** 2 + (clickY - pinY) ** 2);
      if (dist < 15) {
        setActiveProperty(prop);
        found = true;
        break;
      }
    }
    if (!found) {
      setActiveProperty(null);
    }
  };

  // Hover Handler
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    let foundProp: Property | null = null;
    for (const prop of properties) {
      const pinX = (prop.mapCoords.x / 100) * width;
      const pinY = (prop.mapCoords.y / 100) * height;

      const dist = Math.sqrt((mouseX - pinX) ** 2 + (mouseY - pinY) ** 2);
      if (dist < 15) {
        foundProp = prop;
        break;
      }
    }
    setHoveredProperty(foundProp);
  };

  return (
    <div className="hidden relative rounded-2xl overflow-hidden h-[500px] shadow-card border border-border-light bg-[#111827]">
      {/* Top Left Menu Panel */}
      <div className="absolute top-5 left-5 w-[280px] rounded-xl p-5 z-10 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-[var(--glass-border)] shadow-[0_10px_25px_rgba(0,0,0,0.3)] bg-[rgba(15,23,42,0.85)]">
        <h4 className="text-white mb-3 text-[0.95rem] flex items-center gap-2">
          <Compass className="animate-spin [animation-duration:6s] text-accent-gold" size={16} />
          AURA Satellite Tracker
        </h4>
        <p className="text-[0.75rem] text-slate-400 mb-4">
          Real-time plotting of ultra-exclusive properties. Click nodes to focus telemetry.
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setMapStyle('blueprint')}
            className={`relative overflow-hidden font-heading font-semibold border-none cursor-pointer [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 shadow-[var(--glow-shadow)] rounded-lg py-1.5 px-3 text-[0.75rem] ${mapStyle === 'blueprint' ? 'bg-accent-gold text-black' : 'bg-white/10 text-white'}`}
          >
            Blueprint
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`relative overflow-hidden font-heading font-semibold border-none cursor-pointer [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 shadow-[var(--glow-shadow)] rounded-lg py-1.5 px-3 text-[0.75rem] ${mapStyle === 'satellite' ? 'bg-accent-gold text-black' : 'bg-white/10 text-white'}`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Top Right Zoom Controls */}
      <div className="absolute top-5 right-5 flex flex-col gap-2 z-10">
        <button
          onClick={() => setZoom(prev => Math.min(prev + 0.1, 1.8))}
          className="bg-[rgba(15,23,42,0.8)] border border-white/15 text-white p-2.5 rounded-lg cursor-pointer flex"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.8))}
          className="bg-[rgba(15,23,42,0.8)] border border-white/15 text-white p-2.5 rounded-lg cursor-pointer flex"
        >
          <ZoomOut size={16} />
        </button>
      </div>

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block ${hoveredProperty ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
      />

      {/* Detail Overlay Card Popup */}
      {activeProperty && (
        <div className="absolute bottom-5 right-5 w-[320px] rounded-xl overflow-hidden z-10 [animation:slide-up_var(--transition-normal)] shadow-[0_10px_30px_rgba(0,0,0,0.4)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] border border-border-light bg-bg-secondary">
          <button
            onClick={() => setActiveProperty(null)}
            className="absolute top-2 right-2 bg-black/50 text-white border-none w-6 h-6 rounded-full cursor-pointer flex items-center justify-center z-20"
          >
            <X size={12} />
          </button>

          <img src={activeProperty.images[0]} alt={activeProperty.title} className="h-[120px] w-full object-cover" />

          <div className="p-4">
            <span className="text-[0.65rem] uppercase tracking-[0.1em] text-accent-gold-dark font-bold">
              {activeProperty.type} • {activeProperty.location.city}
            </span>
            <h4 className="text-base my-1 mb-2">{activeProperty.title}</h4>
            <div className="flex justify-items-center justify-between items-center">
              <span className="font-serif italic text-text-primary font-bold">
                {formatPrice(activeProperty.price)}
              </span>
              <button
                onClick={() => onSelectProperty(activeProperty)}
                className="relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none cursor-pointer [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 shadow-[var(--glow-shadow)] rounded-lg py-1.5 px-3 text-[0.75rem] flex items-center gap-1 after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s]"
              >
                <Eye size={12} /> View Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
