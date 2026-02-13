import { useState } from 'react';
import { Network, Fingerprint, Search, Filter, Database, CheckCircle, Zap, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const signatureDatabase = [
  { id: 'SIG-A1-034', cluster: 'A1', devices: 12, similarity: 94, components: 'Ammonium Nitrate, Mobile Detonator', trigger: 'Remote (RF)', recent: 'INC-2024-1247', matches: 8 },
  { id: 'SIG-B2-021', cluster: 'B2', devices: 15, similarity: 91, components: 'PETN, Timer Circuit', trigger: 'Timer-based', recent: 'INC-2024-1244', matches: 12 },
  { id: 'SIG-B3-018', cluster: 'B3', devices: 8, similarity: 87, components: 'C4, Pressure Switch', trigger: 'Pressure', recent: 'INC-2024-1246', matches: 6 },
  { id: 'SIG-C2-012', cluster: 'C2', devices: 10, similarity: 82, components: 'TNT, Wire Circuit', trigger: 'Wired', recent: 'INC-2024-1245', matches: 7 },
  { id: 'SIG-D4-009', cluster: 'D4', devices: 6, similarity: 78, components: 'TATP, Mobile Phone', trigger: 'Remote (Cell)', recent: 'INC-2024-1242', matches: 5 },
];

const radarData = [
  { characteristic: 'Explosive Type', A1: 85, B2: 92, C2: 78 },
  { characteristic: 'Trigger Mechanism', A1: 94, B2: 88, C2: 72 },
  { characteristic: 'Construction Method', A1: 88, B2: 91, C2: 85 },
  { characteristic: 'Material Source', A1: 76, B2: 84, C2: 68 },
  { characteristic: 'Assembly Skill', A1: 82, B2: 89, C2: 75 },
];

export default function DeviceSignaturesPage() {
  const [selectedSignature, setSelectedSignature] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };


  const getClusterColor = (cluster: string) => {
    const colors: { [key: string]: string } = {
      'A1': '#FF6B00',
      'B2': '#0096FF',
      'B3': '#2F4F4F',
      'C2': '#FFB800',
      'D4': '#FF0000'
    };
    return colors[cluster] || '#0096FF';
  };

  const filteredSignatures = signatureDatabase.filter(sig =>
    sig.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sig.components.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sig.trigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sig.cluster.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefreshDatabase = () => {
    showToast('Syncing with Central Forensic Database...', 'info');
    setTimeout(() => {
      showToast('Database synchronization complete. 24 new signatures indexed.', 'success');
    }, 1500);
  };


  return (
    <div className="w-full">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl text-white mb-2">Device Signature Analysis</h1>
            <p className="text-sm md:text-base text-white/60">AI-powered TTP clustering and forensic matching</p>
          </div>
          <button
            onClick={handleRefreshDatabase}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors shadow-lg shadow-[#0096FF]/20 font-medium text-sm"
          >
            <Database className="w-4 h-4" />
            <span>Signature Database</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-[#0096FF]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Total Signatures</p>
                <p className="text-2xl text-white">247</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FF6B00]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Active Clusters</p>
                <p className="text-2xl text-white">18</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#00FF88]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00FF88]/20 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-[#00FF88]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">High Similarity</p>
                <p className="text-2xl text-white">52</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FFB800]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFB800]/20 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-[#FFB800]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Recent Matches</p>
                <p className="text-2xl text-white">34</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Signature Database Table */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg text-white font-medium">Verified Signature Database</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Filter by ID, components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredSignatures.map((sig) => (
                <div
                  key={sig.id}
                  onClick={() => setSelectedSignature(sig.id)}
                  className={`
                    p-4 md:p-6 rounded-lg border cursor-pointer transition-all hover:shadow-lg hover:shadow-[#0096FF]/10
                    ${selectedSignature === sig.id
                      ? 'bg-[#0096FF]/10 border-[#0096FF]'
                      : 'bg-[#0A192F]/50 border-[#0096FF]/10 hover:border-[#0096FF]/30'
                    }
                  `}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${getClusterColor(sig.cluster)}20` }}
                      >
                        <span className="text-base font-bold" style={{ color: getClusterColor(sig.cluster) }}>
                          {sig.cluster}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-base md:text-lg font-medium truncate">{sig.id}</p>
                        <p className="text-white/60 text-xs md:text-sm">Cluster {sig.cluster} Pattern</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:block md:text-right w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                      <span className="text-sm text-white/60 md:hidden">Similarity Score</span>
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold" style={{ color: getClusterColor(sig.cluster) }}>
                          {sig.similarity}%
                        </p>
                        <p className="text-xs text-white/60 hidden md:block">similarity</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-sm mt-2">
                    <div className="min-w-0">
                      <p className="text-white/60 text-xs mb-1">Components</p>
                      <p className="text-white/90 leading-snug">{sig.components}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/60 text-xs mb-1">Trigger Type</p>
                      <p className="text-white/90 leading-snug">{sig.trigger}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1">Devices in Cluster</p>
                      <p className="text-white/90 font-medium">{sig.devices}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1">Recent Match</p>
                      <p className="text-[#0096FF] font-medium">{sig.recent}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredSignatures.length === 0 && (
                <div className="text-center py-12">
                  <Fingerprint className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <p className="text-white/40">No signatures matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TTP Characteristic Comparison */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <h2 className="text-lg text-white mb-4">TTP Characteristic Comparison</h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#0096FF" opacity={0.2} />
                <PolarAngleAxis
                  dataKey="characteristic"
                  tick={{ fill: '#ffffff80', fontSize: 10 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#ffffff60', fontSize: 10 }}
                />
                <Radar
                  name="Cluster A1"
                  dataKey="A1"
                  stroke="#FF6B00"
                  fill="#FF6B00"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Cluster B2"
                  dataKey="B2"
                  stroke="#0096FF"
                  fill="#0096FF"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Cluster C2"
                  dataKey="C2"
                  stroke="#FFB800"
                  fill="#FFB800"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A192F',
                    border: '1px solid #0096FF',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF6B00]" />
              <span className="text-xs text-white/80">Cluster A1 - Remote Detonation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0096FF]" />
              <span className="text-xs text-white/80">Cluster B2 - Timer-Based</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
              <span className="text-xs text-white/80">Cluster C2 - Wired Systems</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
        <h2 className="text-lg text-white mb-4">Signature Network Graph</h2>

        <div className="relative h-[400px] md:h-96 bg-[#0A192F] rounded-lg border border-[#0096FF]/10 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            {/* Network connections */}
            <line x1="50%" y1="50%" x2="15%" y2="20%" stroke="#FF6B00" strokeWidth="2" opacity="0.4" />
            <line x1="50%" y1="50%" x2="85%" y2="25%" stroke="#0096FF" strokeWidth="2" opacity="0.4" />
            <line x1="50%" y1="50%" x2="80%" y2="75%" stroke="#FFB800" strokeWidth="2" opacity="0.4" />
            <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#2F4F4F" strokeWidth="2" opacity="0.4" />

            {/* Sub-connections */}
            <line x1="15%" y1="20%" x2="30%" y2="15%" stroke="#FF6B00" strokeWidth="1" opacity="0.2" />
            <line x1="15%" y1="20%" x2="25%" y2="30%" stroke="#FF6B00" strokeWidth="1" opacity="0.2" />
            <line x1="85%" y1="25%" x2="75%" y2="35%" stroke="#0096FF" strokeWidth="1" opacity="0.2" />
          </svg>

          {/* Central hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#0096FF] rounded-full blur-2xl opacity-50 animate-pulse w-24 h-24" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-[#0096FF] to-[#2F4F4F] rounded-full border-4 border-white flex items-center justify-center">
                <Network className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Cluster nodes with positions */}
          {[
            { cluster: 'A1', color: '#FF6B00', pos: { top: '20%', left: '15%' }, size: 12 },
            { cluster: 'B2', color: '#0096FF', pos: { top: '25%', left: '85%' }, size: 15 },
            { cluster: 'C2', color: '#FFB800', pos: { top: '75%', left: '80%' }, size: 10 },
            { cluster: 'B3', color: '#2F4F4F', pos: { top: '80%', left: '20%' }, size: 8 },
          ].map((node) => (
            <div
              key={node.cluster}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={node.pos}
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-50"
                  style={{
                    backgroundColor: node.color,
                    width: `${node.size * 4}px`,
                    height: `${node.size * 4}px`
                  }}
                />
                <div
                  className="relative rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: `${node.color}40`,
                    borderColor: node.color,
                    width: `${node.size * 4}px`,
                    height: `${node.size * 4}px`
                  }}
                >
                  <span className="text-sm text-white">{node.cluster}</span>
                </div>

                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-[#0A192F] border border-[#0096FF] rounded px-3 py-2 whitespace-nowrap shadow-xl">
                    <p className="text-xs text-white">Cluster {node.cluster}</p>
                    <p className="text-xs text-white/60">{node.size} signatures</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[1100] bg-[#0A192F] border border-[#0096FF] shadow-2xl rounded-lg p-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`px-4 py-3 rounded flex items-center gap-3 ${toastMessage.type === 'success'
            ? 'bg-[#00FF88]/20 text-[#00FF88]'
            : 'bg-[#0096FF]/20 text-[#0096FF]'
            }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Zap className="w-5 h-5" />
            )}
            <div>
              <p className="text-sm font-bold mb-0.5">{toastMessage.type === 'success' ? 'Confirmed' : 'System Notice'}</p>
              <p className="text-xs opacity-90">{toastMessage.message}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-70">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
