import { useState } from 'react';
import { Network, Users, MapPin, Package, Link2, Search, ZoomIn, ZoomOut } from 'lucide-react';

const entities = [
  { id: 1, type: 'person', name: 'Network Leader A', connections: 12, risk: 95, x: 50, y: 30 },
  { id: 2, type: 'location', name: 'Safe House Beta', connections: 8, risk: 82, x: 25, y: 50 },
  { id: 3, type: 'supplier', name: 'Chemical Source 1', connections: 15, risk: 88, x: 75, y: 45 },
  { id: 4, type: 'incident', name: 'INC-2024-1247', connections: 6, risk: 91, x: 40, y: 70 },
  { id: 5, type: 'person', name: 'Operative B', connections: 5, risk: 76, x: 65, y: 65 },
  { id: 6, type: 'location', name: 'Metro Warehouse', connections: 7, risk: 79, x: 35, y: 25 },
];

const relationships = [
  { from: 1, to: 2, type: 'frequents', strength: 'high' },
  { from: 1, to: 3, type: 'purchases', strength: 'medium' },
  { from: 1, to: 5, type: 'coordinates', strength: 'high' },
  { from: 2, to: 4, type: 'linked-to', strength: 'high' },
  { from: 3, to: 4, type: 'materials', strength: 'medium' },
  { from: 5, to: 4, type: 'involved', strength: 'high' },
  { from: 6, to: 1, type: 'meeting-place', strength: 'medium' },
];

export default function KnowledgeGraph() {
  const [selectedEntity, setSelectedEntity] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredEntities = entities.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const filteredRelationships = relationships.filter(rel => {
    return (
      filteredEntities.some(e => e.id === rel.from) &&
      filteredEntities.some(e => e.id === rel.to)
    );
  });

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'person': return Users;
      case 'location': return MapPin;
      case 'supplier': return Package;
      case 'incident': return Link2;
      default: return Network;
    }
  };

  const getEntityColor = (type: string) => {
    switch (type) {
      case 'person': return '#FF6B00';
      case 'location': return '#0096FF';
      case 'supplier': return '#FFB800';
      case 'incident': return '#FF0000';
      default: return '#2F4F4F';
    }
  };

  const getConnectionColor = (strength: string) => {
    switch (strength) {
      case 'high': return '#FF0000';
      case 'medium': return '#FFB800';
      case 'low': return '#00FF88';
      default: return '#0096FF';
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl text-white font-medium mb-2">Relational Intelligence Graph</h1>
            <p className="text-sm text-white/60 tracking-wide uppercase">Core Intelligence System v4.2.0 | Entity Mapping</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative group flex-1 sm:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#0096FF] transition-colors duration-300 pointer-events-none z-10" />
              <input
                type="text"
                placeholder="            Search entities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 bg-[#112240]/80 backdrop-blur-xl border border-[#0096FF]/30 rounded-xl !pl-16 pr-5 py-3 text-sm text-white placeholder-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.2)] focus:outline-none focus:border-[#0096FF] focus:ring-1 focus:ring-[#0096FF] focus:shadow-[0_0_25px_rgba(0,150,255,0.2)] transition-all duration-300"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#112240]/80 backdrop-blur-xl border border-[#0096FF]/30 rounded-xl px-6 py-3 text-sm text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)] focus:outline-none focus:border-[#0096FF] focus:ring-1 focus:ring-[#0096FF] hover:border-[#0096FF]/60 transition-all duration-300 cursor-pointer appearance-none min-w-[180px]"
            >
              <option value="all">All Entity Types</option>
              <option value="person">Persons of Interest</option>
              <option value="location">Strategic Locations</option>
              <option value="supplier">Supply Networks</option>
              <option value="incident">Active Incidents</option>
            </select>
            <div className="flex bg-[#0A192F] rounded-lg border border-[#0096FF]/20 p-1">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-2 hover:bg-[#0096FF]/10 rounded transition-colors group"
              >
                <ZoomOut className="w-4 h-4 text-white/60 group-hover:text-white" />
              </button>
              <div className="w-px bg-[#0096FF]/10 mx-1 my-1" />
              <button
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-2 hover:bg-[#0096FF]/10 rounded transition-colors group"
              >
                <ZoomIn className="w-4 h-4 text-white/60 group-hover:text-white" />
              </button>
            </div>
            <button className="flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-[#0096FF] via-[#0066FF] to-[#0052FF] hover:from-[#0052FF] hover:to-[#0033CC] text-white rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,150,255,0.3)] hover:shadow-[0_0_30px_rgba(0,150,255,0.5)] active:scale-[0.98] border border-white/10 hover:border-white/30 group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12"></div>
              <Network className="w-5 h-5 relative z-10" />
              <span className="whitespace-nowrap relative z-10">Expand Analysis</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FF6B00]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-[#FF6B00]" />
              <div>
                <p className="text-white/60 text-xs">Persons of Interest</p>
                <p className="text-2xl text-white">142</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-[#0096FF]" />
              <div>
                <p className="text-white/60 text-xs">Key Locations</p>
                <p className="text-2xl text-white">87</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FFB800]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-[#FFB800]" />
              <div>
                <p className="text-white/60 text-xs">Supply Networks</p>
                <p className="text-2xl text-white">34</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FF0000]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Link2 className="w-8 h-8 text-[#FF0000]" />
              <div>
                <p className="text-white/60 text-xs">Connections</p>
                <p className="text-2xl text-white">658</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Graph Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h2 className="text-lg text-white font-medium">Network Visualization</h2>
              <div className="text-xs text-[#0096FF] bg-[#0096FF]/10 px-2 py-1 rounded">
                Active: 6 entities, 7 relationships
              </div>
            </div>

            <div className="relative h-[400px] md:h-[600px] bg-[#0A192F] rounded-lg border border-[#0096FF]/10 overflow-hidden">
              {/* Grid background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 150, 255, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 150, 255, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />

              <svg className="absolute inset-0 w-full h-full" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}>
                {/* Draw connections */}
                {filteredRelationships.map((rel, idx) => {
                  const fromEntity = entities.find(e => e.id === rel.from);
                  const toEntity = entities.find(e => e.id === rel.to);

                  if (!fromEntity || !toEntity) return null;

                  return (
                    <g key={idx}>
                      <line
                        x1={`${fromEntity.x}%`}
                        y1={`${fromEntity.y}%`}
                        x2={`${toEntity.x}%`}
                        y2={`${toEntity.y}%`}
                        stroke={getConnectionColor(rel.strength)}
                        strokeWidth={rel.strength === 'high' ? 3 : 2}
                        opacity={0.6}
                        strokeDasharray={rel.strength === 'low' ? '5,5' : '0'}
                      />
                      {/* Connection label */}
                      <text
                        x={`${(fromEntity.x + toEntity.x) / 2}%`}
                        y={`${(fromEntity.y + toEntity.y) / 2}%`}
                        fill="#ffffff60"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        {rel.type}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Draw entity nodes */}
              <div
                className="absolute inset-0 transition-transform duration-500"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
              >
                {filteredEntities.map((entity) => {
                  const Icon = getEntityIcon(entity.type);
                  const color = getEntityColor(entity.type);
                  const isSelected = selectedEntity === entity.id;

                  return (
                    <div
                      key={entity.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{
                        left: `${entity.x}%`,
                        top: `${entity.y}%`,
                        zIndex: isSelected ? 30 : 20
                      }}
                      onClick={() => setSelectedEntity(entity.id)}
                    >
                      <div className="relative">
                        {/* Glow effect */}
                        <div
                          className="absolute inset-0 rounded-full blur-xl animate-pulse"
                          style={{
                            backgroundColor: color,
                            width: '80px',
                            height: '80px',
                            opacity: isSelected ? 0.6 : 0.3,
                            transform: 'translate(-20px, -20px)'
                          }}
                        />

                        {/* Node circle */}
                        <div
                          className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${isSelected ? 'scale-125' : 'group-hover:scale-110'
                            }`}
                          style={{
                            backgroundColor: `${color}40`,
                            borderColor: isSelected ? '#FFFFFF' : color
                          }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        {/* Label */}
                        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
                          <p className="text-xs text-white whitespace-nowrap bg-[#0A192F]/80 px-2 py-1 rounded">
                            {entity.name}
                          </p>
                          <p className="text-xs text-white/60 mt-1">
                            {entity.connections} connections
                          </p>
                        </div>

                        {/* Risk badge */}
                        <div
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-[#0A192F] flex items-center justify-center text-xs"
                          style={{
                            backgroundColor: entity.risk >= 90 ? '#FF0000' : entity.risk >= 80 ? '#FF6B00' : '#FFB800'
                          }}
                        >
                          {entity.risk}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredEntities.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Search className="w-12 h-12 text-white/10 mx-auto mb-3" />
                    <p className="text-white/40">No entities match your search criteria</p>
                    <button
                      onClick={() => { setSearchTerm(''); setTypeFilter('all'); }}
                      className="mt-4 text-[#0096FF] text-sm hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[10px] md:text-xs">
              <div className="space-y-3">
                <p className="text-white font-medium uppercase tracking-widest opacity-40">Entity Classifications</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]" />
                    <span className="text-white/80">Person of Interest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0096FF] shadow-[0_0_8px_#0096FF]" />
                    <span className="text-white/80">Location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]" />
                    <span className="text-white/80">Supplier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FF0000] shadow-[0_0_8px_#FF0000]" />
                    <span className="text-white/80">Active Incident</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-white font-medium uppercase tracking-widest opacity-40">Relationship Intensity</p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 bg-[#FF0000]" />
                    <span className="text-white/80">Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 bg-[#FFB800]" />
                    <span className="text-white/80">Established</span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
                    <div className="w-6 h-0.5 border-t border-dashed border-[#00FF88]" />
                    <span className="text-white/80">Suspected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Entity Details Panel */}
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
            <h2 className="text-lg text-white mb-4">Entity Details</h2>

            {selectedEntity ? (
              <div className="space-y-4">
                {(() => {
                  const entity = entities.find(e => e.id === selectedEntity);
                  if (!entity) return null;

                  const Icon = getEntityIcon(entity.type);
                  const color = getEntityColor(entity.type);

                  return (
                    <>
                      <div className="flex items-center gap-3 pb-4 border-b border-[#0096FF]/20">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                        <div>
                          <p className="text-white">{entity.name}</p>
                          <p className="text-xs text-white/60 capitalize">{entity.type}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-white/60 mb-1">Risk Score</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-[#414141] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${entity.risk}%`,
                                  backgroundColor: entity.risk >= 90 ? '#FF0000' : entity.risk >= 80 ? '#FF6B00' : '#FFB800'
                                }}
                              />
                            </div>
                            <span className="text-sm text-white">{entity.risk}%</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-white/60 mb-1">Total Connections</p>
                          <p className="text-xl text-white">{entity.connections}</p>
                        </div>

                        <div>
                          <p className="text-xs text-white/60 mb-2">Related Entities</p>
                          <div className="space-y-2">
                            {relationships
                              .filter(r => r.from === entity.id || r.to === entity.id)
                              .map((rel, idx) => {
                                const relatedId = rel.from === entity.id ? rel.to : rel.from;
                                const relatedEntity = entities.find(e => e.id === relatedId);
                                if (!relatedEntity) return null;

                                return (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-[#0A192F]/50 rounded">
                                    <span className="text-xs text-white/80">{relatedEntity.name}</span>
                                    <span
                                      className="text-xs px-2 py-0.5 rounded"
                                      style={{
                                        backgroundColor: `${getConnectionColor(rel.strength)}20`,
                                        color: getConnectionColor(rel.strength)
                                      }}
                                    >
                                      {rel.strength}
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>

                      <button className="w-full px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors text-sm">
                        View Full Profile
                      </button>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-12">
                <Network className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-sm text-white/60">Select an entity to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
