import { useState } from 'react';
import { MapPin } from 'lucide-react';

const incidentTypes = ['IED', 'VBIED', 'Suicide', 'Defused', 'Unknown'];

const mockRegions = [
  { name: 'Northern District', incidents: 45, severity: 'high', x: 35, y: 15 },
  { name: 'Central Province', incidents: 32, severity: 'medium', x: 50, y: 35 },
  { name: 'Eastern Zone', incidents: 28, severity: 'medium', x: 75, y: 40 },
  { name: 'Western Sector', incidents: 18, severity: 'low', x: 20, y: 50 },
  { name: 'Southern Territory', incidents: 52, severity: 'high', x: 45, y: 70 },
  { name: 'Metro Area', incidents: 67, severity: 'critical', x: 55, y: 55 },
];

export default function IncidentMap() {
  const [activeFilters, setActiveFilters] = useState<string[]>(incidentTypes);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#FF0000';
      case 'high': return '#FF6B00';
      case 'medium': return '#FFB800';
      case 'low': return '#00FF88';
      default: return '#0096FF';
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl text-white mb-1">Incident Density Heatmap</h2>
          <p className="text-sm text-white/60">AI-Weighted Distribution Analysis</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          {incidentTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`
                px-3 py-1.5 rounded text-xs transition-all border
                ${activeFilters.includes(type)
                  ? 'bg-[#0096FF]/20 border-[#0096FF] text-[#0096FF]'
                  : 'bg-[#414141]/30 border-[#414141] text-white/60 hover:border-white/40'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-96 bg-[#0A192F] rounded-lg border border-[#0096FF]/10 overflow-hidden">
        {/* Mock map background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 150, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 150, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />

        {/* Province borders (abstract shapes) */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <path d="M 50 50 L 200 80 L 280 150 L 250 250 L 100 200 Z" fill="none" stroke="#0096FF" strokeWidth="1"/>
          <path d="M 300 100 L 450 120 L 500 200 L 400 280 L 280 150 Z" fill="none" stroke="#0096FF" strokeWidth="1"/>
          <path d="M 100 300 L 250 250 L 300 400 L 150 450 Z" fill="none" stroke="#0096FF" strokeWidth="1"/>
          <path d="M 500 200 L 650 250 L 600 400 L 450 350 Z" fill="none" stroke="#0096FF" strokeWidth="1"/>
        </svg>

        {/* Incident markers */}
        {mockRegions.map((region, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
            onMouseEnter={() => setHoveredRegion(region.name)}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-full blur-xl animate-pulse"
              style={{ 
                backgroundColor: getSeverityColor(region.severity),
                width: `${region.incidents}px`,
                height: `${region.incidents}px`,
                opacity: 0.4
              }}
            />
            
            {/* Pin marker */}
            <MapPin 
              className="relative z-1 drop-shadow-lg"
              style={{ color: getSeverityColor(region.severity) }}
              size={24}
            />

            {/* Tooltip */}
            {hoveredRegion === region.name && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#0A192F] border border-[#0096FF] rounded px-3 py-2 whitespace-nowrap z-20 shadow-xl">
                <p className="text-sm text-white">{region.name}</p>
                <p className="text-xs text-white/60">{region.incidents} incidents</p>
                <p className="text-xs capitalize" style={{ color: getSeverityColor(region.severity) }}>
                  {region.severity} severity
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-[#0d1f3a]/90 backdrop-blur-sm border border-[#0096FF]/20 rounded p-3">
          <p className="text-xs text-white/60 mb-2">Severity Scale</p>
          <div className="space-y-1">
            {['critical', 'high', 'medium', 'low'].map(severity => (
              <div key={severity} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getSeverityColor(severity) }}
                />
                <span className="text-xs text-white/80 capitalize">{severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
