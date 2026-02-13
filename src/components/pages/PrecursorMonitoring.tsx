import { useState } from 'react';
import { TestTube, AlertTriangle, TrendingUp, MapPin, Package, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const chemicalData = [
  { name: 'Ammonium Nitrate', detected: 45, threshold: 30, risk: 'high', trend: 'up' },
  { name: 'Hydrogen Peroxide', detected: 28, threshold: 25, risk: 'medium', trend: 'up' },
  { name: 'Acetone', detected: 32, threshold: 35, risk: 'medium', trend: 'stable' },
  { name: 'Sulfuric Acid', detected: 18, threshold: 20, risk: 'low', trend: 'down' },
  { name: 'Nitric Acid', detected: 22, threshold: 15, risk: 'high', trend: 'up' },
  { name: 'TATP Precursors', detected: 12, threshold: 10, risk: 'high', trend: 'up' },
];

const purchaseAlerts = [
  { id: 'PA-2024-156', date: '2024-12-08', supplier: 'Karachi Chemical Supply', chemical: 'Ammonium Nitrate', quantity: '500kg', location: 'Peshawar District', risk: 95, flagged: true },
  { id: 'PA-2024-155', date: '2024-12-07', supplier: 'Lahore Fertilizers Ltd', chemical: 'Hydrogen Peroxide', quantity: '200L', location: 'Quetta Cantonment', risk: 78, flagged: false },
  { id: 'PA-2024-154', date: '2024-12-07', supplier: 'Multan Industries', chemical: 'Nitric Acid', quantity: '150L', location: 'Rawalpindi City', risk: 88, flagged: true },
  { id: 'PA-2024-153', date: '2024-12-06', supplier: 'Islamabad Lab Supplies', chemical: 'Acetone', quantity: '300L', location: 'Islamabad Blue Area', risk: 45, flagged: false },
  { id: 'PA-2024-152', date: '2024-12-06', supplier: 'Faisalabad Chemical Co', chemical: 'Sulfuric Acid', quantity: '100L', location: 'Lahore Garrison', risk: 52, flagged: false },
];

const trendData = [
  { month: 'Jun', purchases: 32, threshold: 40 },
  { month: 'Jul', purchases: 38, threshold: 40 },
  { month: 'Aug', purchases: 45, threshold: 40 },
  { month: 'Sep', purchases: 52, threshold: 40 },
  { month: 'Oct', purchases: 48, threshold: 40 },
  { month: 'Nov', purchases: 65, threshold: 40 },
  { month: 'Dec', purchases: 58, threshold: 40 },
];

export default function PrecursorMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChemical, setSelectedChemical] = useState<string | null>(null);

  const getRiskColor = (risk: string | number) => {
    if (typeof risk === 'number') {
      if (risk >= 80) return '#FF0000';
      if (risk >= 60) return '#FF6B00';
      if (risk >= 40) return '#FFB800';
      return '#00FF88';
    }

    switch (risk) {
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl text-white mb-2">Precursor Monitoring</h1>
            <p className="text-white/60">Chemical tracking and suspicious purchase detection</p>
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors font-medium text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Generate Alert</span>
          </button>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FF0000]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF0000]/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#FF0000]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Critical Alerts</p>
                <p className="text-2xl text-white">12</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FFB800]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFB800]/20 rounded-lg flex items-center justify-center">
                <TestTube className="w-5 h-5 text-[#FFB800]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Monitored Chemicals</p>
                <p className="text-2xl text-white">24</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-[#0096FF]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Tracked Suppliers</p>
                <p className="text-2xl text-white">156</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#00FF88]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00FF88]/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#00FF88]" />
              </div>
              <div>
                <p className="text-white/60 text-xs">This Month</p>
                <p className="text-2xl text-white">58</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chemical Detection Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
            <h2 className="text-lg text-white mb-4">Chemical Detection Levels</h2>

            <div className="h-[300px] md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chemicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0096FF" opacity={0.1} />
                  <XAxis
                    dataKey="name"
                    stroke="#ffffff60"
                    tick={{ fill: '#ffffff60', fontSize: 11 }}
                    angle={-15}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    stroke="#ffffff60"
                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0A192F',
                      border: '1px solid #0096FF',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="threshold" fill="#0096FF" opacity={0.3} name="Threshold" />
                  <Bar dataKey="detected" fill="#FF6B00" name="Detected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chemical Watch List */}
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
            <h2 className="text-lg text-white mb-4">Watch List</h2>

            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {chemicalData.map((chemical, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedChemical(chemical.name)}
                  className={`
                    p-3 rounded-lg border cursor-pointer transition-all
                    ${selectedChemical === chemical.name
                      ? 'bg-[#0096FF]/10 border-[#0096FF]'
                      : 'bg-[#0A192F]/50 border-[#0096FF]/10 hover:border-[#0096FF]/30'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TestTube className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white">{chemical.name}</span>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getRiskColor(chemical.risk) }}
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/60">Detected:</span>
                      <span className="text-white/90">{chemical.detected} cases</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Threshold:</span>
                      <span className="text-white/90">{chemical.threshold} cases</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Trend:</span>
                      <span
                        className="capitalize"
                        style={{
                          color: chemical.trend === 'up' ? '#FF6B00' : chemical.trend === 'down' ? '#00FF88' : '#0096FF'
                        }}
                      >
                        {chemical.trend}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Purchase Trend */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <h2 className="text-lg text-white mb-4 uppercase tracking-widest text-xs opacity-60">Purchase Activity (Last 6 Months)</h2>

          <div className="h-[250px] md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0096FF" opacity={0.1} />
                <XAxis
                  dataKey="month"
                  stroke="#ffffff60"
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                />
                <YAxis
                  stroke="#ffffff60"
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A192F',
                    border: '1px solid #0096FF',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="threshold"
                  stroke="#0096FF"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Alert Threshold"
                />
                <Line
                  type="monotone"
                  dataKey="purchases"
                  stroke="#FF6B00"
                  strokeWidth={3}
                  name="Detected Purchases"
                  dot={{ fill: '#FF6B00', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Purchase Alerts */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg text-white font-medium">Recent Suspicious Alerts</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Filter alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF]"
              />
            </div>
          </div>

          <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-[#0096FF]/20">
                  <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Alert ID</th>
                  <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Date</th>
                  <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Supplier</th>
                  <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Chemical</th>
                  <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Quantity</th>
                  <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Location</th>
                  <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Risk Score</th>
                  <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchaseAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="border-b border-[#0096FF]/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="text-sm text-[#0096FF]">{alert.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-white/80">{alert.date}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-white/80">{alert.supplier}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <TestTube className="w-4 h-4 text-white/40" />
                        <span className="text-sm text-white/90">{alert.chemical}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-white/80">{alert.quantity}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white/40" />
                        <span className="text-sm text-white/80">{alert.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getRiskColor(alert.risk) }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: getRiskColor(alert.risk) }}
                        >
                          {alert.risk}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {alert.flagged ? (
                        <span className="px-2 py-1 bg-[#FF0000]/20 border border-[#FF0000] text-[#FF0000] rounded text-xs">
                          Flagged
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-[#00FF88]/20 border border-[#00FF88] text-[#00FF88] rounded text-xs">
                          Monitoring
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}