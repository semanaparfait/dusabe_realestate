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
    <div className="map-container hidden">
      {/* Top Left Menu Panel */}
      <div className="glass-panel map-sidebar-overlay" style={{ background: 'rgba(15, 23, 42, 0.85)' }}>
        <h4 style={{ color: '#FFFFFF', marginBottom: '12px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass className="animate-spin" size={16} style={{ animationDuration: '6s', color: 'var(--accent-gold)' }} />
          AURA Satellite Tracker
        </h4>
        <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '16px' }}>
          Real-time plotting of ultra-exclusive properties. Click nodes to focus telemetry.
        </p>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setMapStyle('blueprint')} 
            className={`luxury-gold-button`}
            style={{ 
              padding: '6px 12px', 
              fontSize: '0.75rem',
              background: mapStyle === 'blueprint' ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)',
              color: mapStyle === 'blueprint' ? '#000' : '#FFF'
            }}
          >
            Blueprint
          </button>
          <button 
            onClick={() => setMapStyle('satellite')} 
            className={`luxury-gold-button`}
            style={{ 
              padding: '6px 12px', 
              fontSize: '0.75rem',
              background: mapStyle === 'satellite' ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)',
              color: mapStyle === 'satellite' ? '#000' : '#FFF'
            }}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Top Right Zoom Controls */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.1, 1.8))} 
          style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex' }}
        >
          <ZoomIn size={16} />
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.8))} 
          style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex' }}
        >
          <ZoomOut size={16} />
        </button>
      </div>

      {/* Canvas Element */}
      <canvas 
        ref={canvasRef}
        className="map-canvas-element"
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        style={{ cursor: hoveredProperty ? 'pointer' : 'default' }}
      />

      {/* Detail Overlay Card Popup */}
      {activeProperty && (
        <div className="map-card-popup glass-panel" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
          <button 
            onClick={() => setActiveProperty(null)}
            className="map-popup-close"
          >
            <X size={12} />
          </button>
          
          <img src={activeProperty.images[0]} alt={activeProperty.title} className="map-popup-img" />
          
          <div className="map-popup-body">
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold-dark)', fontWeight: 'bold' }}>
              {activeProperty.type} • {activeProperty.location.city}
            </span>
            <h4 style={{ fontSize: '1rem', margin: '4px 0 8px' }}>{activeProperty.title}</h4>
            <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                {formatPrice(activeProperty.price)}
              </span>
              <button 
                onClick={() => onSelectProperty(activeProperty)}
                className="luxury-gold-button shine-hover" 
                style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
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
