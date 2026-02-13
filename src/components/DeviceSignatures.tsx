import { Network, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const clusterData = [
  { id: 'A1', nodes: 12, similarity: 94, color: '#FF6B00' },
  { id: 'B3', nodes: 8, similarity: 87, color: '#0096FF' },
  { id: 'C2', nodes: 15, similarity: 91, color: '#2F4F4F' },
  { id: 'D4', nodes: 6, similarity: 78, color: '#FFB800' },
];

const similarityData = [
  { case: 'INC-2024-0892', similarity: 94 },
  { case: 'INC-2024-1104', similarity: 87 },
  { case: 'INC-2024-0756', similarity: 82 },
  { case: 'INC-2024-1189', similarity: 78 },
  { case: 'INC-2024-0623', similarity: 71 },
];

export default function DeviceSignatures() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Device Signature Clusters */}
      <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
            <Network className="w-5 h-5 text-[#0096FF]" />
          </div>
          <div>
            <h2 className="text-lg text-white">Device Signature Clusters</h2>
            <p className="text-sm text-white/60">AI-Identified TTP Patterns</p>
          </div>
        </div>

        {/* Network graph visualization */}
        <div className="relative h-64 bg-[#0A192F] rounded-lg border border-[#0096FF]/10 overflow-hidden mb-4">
          <svg className="absolute inset-0 w-full h-full">
            {/* Connection lines */}
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#0096FF" strokeWidth="1" opacity="0.3" />
            <line x1="50%" y1="50%" x2="80%" y2="25%" stroke="#0096FF" strokeWidth="1" opacity="0.3" />
            <line x1="50%" y1="50%" x2="75%" y2="70%" stroke="#0096FF" strokeWidth="1" opacity="0.3" />
            <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#0096FF" strokeWidth="1" opacity="0.3" />

            {/* Additional cluster connections */}
            <line x1="20%" y1="20%" x2="35%" y2="15%" stroke="#FF6B00" strokeWidth="1" opacity="0.2" />
            <line x1="80%" y1="25%" x2="70%" y2="35%" stroke="#2F4F4F" strokeWidth="1" opacity="0.2" />
          </svg>

          {/* Central node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#0096FF] rounded-full blur-xl opacity-50 animate-pulse" style={{ width: '60px', height: '60px' }} />
              <div className="relative w-12 h-12 bg-gradient-to-br from-[#0096FF] to-[#2F4F4F] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-white">Latest</span>
              </div>
            </div>
          </div>

          {/* Cluster nodes */}
          {clusterData.map((cluster, index) => {
            const positions = [
              { top: '20%', left: '20%' },
              { top: '25%', left: '80%' },
              { top: '70%', left: '75%' },
              { top: '75%', left: '25%' }
            ];

            return (
              <div
                key={cluster.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={positions[index]}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full blur-lg opacity-40"
                    style={{
                      backgroundColor: cluster.color,
                      width: `${cluster.nodes * 3}px`,
                      height: `${cluster.nodes * 3}px`
                    }}
                  />
                  <div
                    className="relative rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${cluster.color}40`,
                      borderColor: cluster.color,
                      width: `${cluster.nodes * 3}px`,
                      height: `${cluster.nodes * 3}px`
                    }}
                  >
                    <span className="text-xs text-white">{cluster.id}</span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-[#0A192F] border border-[#0096FF] rounded px-3 py-2 whitespace-nowrap shadow-xl">
                      <p className="text-xs text-white">Cluster {cluster.id}</p>
                      <p className="text-xs text-white/60">{cluster.nodes} devices</p>
                      <p className="text-xs text-white/60">{cluster.similarity}% similarity</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cluster legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clusterData.map(cluster => (
            <div key={cluster.id} className="flex items-center justify-between p-2 bg-[#0A192F]/50 rounded border border-[#0096FF]/10">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cluster.color }}
                />
                <span className="text-sm text-white">Cluster {cluster.id}</span>
              </div>
              <span className="text-xs text-white/60">{cluster.nodes} devices</span>
            </div>
          ))}
        </div>
      </div>

      {/* Signature Similarity Score */}
      <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#2F4F4F]/40 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[#2F4F4F]" />
          </div>
          <div>
            <h2 className="text-lg text-white">Signature Similarity Score</h2>
            <p className="text-sm text-white/60">vs Latest Incident (INC-2024-1247)</p>
          </div>
        </div>

        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={similarityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#0096FF" opacity={0.1} />
              <XAxis
                type="number"
                stroke="#ffffff60"
                tick={{ fill: '#ffffff60', fontSize: 12 }}
                domain={[0, 100]}
              />
              <YAxis
                type="category"
                dataKey="case"
                stroke="#ffffff60"
                tick={{ fill: '#ffffff80', fontSize: 11 }}
                width={110}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0A192F',
                  border: '1px solid #0096FF',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#ffffff' }}
                itemStyle={{ color: '#0096FF' }}
              />
              <Bar
                dataKey="similarity"
                fill="#0096FF"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top match highlight */}
        <div className="p-4 bg-[#0096FF]/10 border border-[#0096FF]/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/80">Highest Match</span>
            <span className="text-xs text-white/60">Cluster A1</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#0096FF]">94%</span>
            <div className="flex-1">
              <p className="text-sm text-white/90">INC-2024-0892</p>
              <p className="text-xs text-white/60">Northern District • 2024-03-15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
