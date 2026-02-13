import { useState } from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Minus, Brain, Target, Zap, AlertCircle, Activity, Shield, Eye, X, MapPin, Calendar, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Cell } from 'recharts';

export const districtRiskData = [
  { district: 'Peshawar District', risk: 94, trend: 'up', previous: 87, confidence: 96, aiPredicted: 97 },
  { district: 'Quetta Region', risk: 89, trend: 'up', previous: 85, confidence: 94, aiPredicted: 92 },
  { district: 'Karachi Metro', risk: 82, trend: 'down', previous: 88, confidence: 91, aiPredicted: 79 },
  { district: 'Balochistan Border', risk: 76, trend: 'stable', previous: 76, confidence: 88, aiPredicted: 76 },
  { district: 'KPK Province', risk: 71, trend: 'up', previous: 65, confidence: 92, aiPredicted: 74 },
  { district: 'Lahore District', risk: 68, trend: 'down', previous: 74, confidence: 89, aiPredicted: 65 },
  { district: 'Gwadar Port', risk: 62, trend: 'stable', previous: 61, confidence: 85, aiPredicted: 63 },
  { district: 'FATA Region', risk: 58, trend: 'up', previous: 52, confidence: 87, aiPredicted: 61 },
  { district: 'Punjab Border', risk: 54, trend: 'down', previous: 59, confidence: 90, aiPredicted: 51 },
  { district: 'Sindh Interior', risk: 47, trend: 'stable', previous: 48, confidence: 86, aiPredicted: 47 },
];

const forecastData = [
  { date: 'Dec 1', risk: 45, upperBound: 52, lowerBound: 38, actual: 44, mlConfidence: 87 },
  { date: 'Dec 5', risk: 48, upperBound: 56, lowerBound: 40, actual: 49, mlConfidence: 89 },
  { date: 'Dec 10', risk: 52, upperBound: 61, lowerBound: 43, actual: 51, mlConfidence: 91 },
  { date: 'Dec 15', risk: 58, upperBound: 68, lowerBound: 48, actual: 57, mlConfidence: 93 },
  { date: 'Dec 20', risk: 65, upperBound: 77, lowerBound: 53, actual: null, mlConfidence: 88 },
  { date: 'Dec 25', risk: 72, upperBound: 85, lowerBound: 59, actual: null, mlConfidence: 84 },
  { date: 'Dec 30', risk: 68, upperBound: 80, lowerBound: 56, actual: null, mlConfidence: 81 },
  { date: 'Jan 4', risk: 62, upperBound: 73, lowerBound: 51, actual: null, mlConfidence: 79 },
];

export const threatVectorData = [
  { vector: 'IED/VBIED', score: 92, max: 100 },
  { vector: 'Suicide Attack', score: 78, max: 100 },
  { vector: 'Network Activity', score: 85, max: 100 },
  { vector: 'Border Threat', score: 88, max: 100 },
  { vector: 'HUMINT Alert', score: 71, max: 100 },
  { vector: 'Cyber Attack', score: 64, max: 100 },
];

const mlModelMetrics = [
  { name: 'Random Forest', accuracy: 94.3, precision: 92.1, recall: 95.7 },
  { name: 'Neural Network', accuracy: 96.8, precision: 95.4, recall: 97.2 },
  { name: 'XGBoost', accuracy: 93.7, precision: 91.8, recall: 94.6 },
  { name: 'Ensemble Model', accuracy: 97.5, precision: 96.9, recall: 98.1 },
];

const riskFactors = [
  { factor: 'Geographic', value: 88 },
  { factor: 'Temporal', value: 76 },
  { factor: 'Network', value: 92 },
  { factor: 'Historical', value: 81 },
  { factor: 'Intelligence', value: 85 },
  { factor: 'Environmental', value: 69 },
];

export default function RiskPrediction() {
  const [selectedModel, setSelectedModel] = useState('Ensemble Model');
  const [timeframe, setTimeframe] = useState('30-Day');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Detailed data for each district
  const districtDetailedData: Record<string, any> = {
    'Peshawar District': {
      threatAnalysis: [
        { type: 'IED Activity', level: 'Critical', probability: 94, trend: 'Increasing' },
        { type: 'Network Movement', level: 'High', probability: 87, trend: 'Stable' },
        { type: 'Border Infiltration', level: 'High', probability: 82, trend: 'Increasing' }
      ],
      recentActivities: [
        { date: '2024-12-08', event: 'IED incident in central district', impact: 'High' },
        { date: '2024-12-05', event: 'Increased network chatter detected', impact: 'Medium' },
        { date: '2024-12-02', event: 'Border patrol engagement', impact: 'Medium' }
      ],
      intelligence: {
        humintSources: 12,
        sigintAlerts: 8,
        activeOperations: 5,
        surveillancePoints: 18
      }
    },
    'Quetta Region': {
      threatAnalysis: [
        { type: 'VBIED Threat', level: 'Critical', probability: 91, trend: 'Increasing' },
        { type: 'Sectarian Violence', level: 'High', probability: 85, trend: 'Stable' },
        { type: 'Targeted Killings', level: 'Medium', probability: 72, trend: 'Decreasing' }
      ],
      recentActivities: [
        { date: '2024-12-07', event: 'Vehicle checkpoint established', impact: 'High' },
        { date: '2024-12-04', event: 'Intelligence gathering operation', impact: 'Medium' },
        { date: '2024-12-01', event: 'Community engagement initiative', impact: 'Low' }
      ],
      intelligence: {
        humintSources: 15,
        sigintAlerts: 11,
        activeOperations: 7,
        surveillancePoints: 22
      }
    },
    'Karachi Metro': {
      threatAnalysis: [
        { type: 'Organized Crime', level: 'High', probability: 88, trend: 'Decreasing' },
        { type: 'Extortion Networks', level: 'High', probability: 79, trend: 'Stable' },
        { type: 'Gang Violence', level: 'Medium', probability: 71, trend: 'Decreasing' }
      ],
      recentActivities: [
        { date: '2024-12-06', event: 'Major gang arrest operation', impact: 'High' },
        { date: '2024-12-03', event: 'Port security enhancement', impact: 'Medium' },
        { date: '2024-11-30', event: 'Intelligence network expansion', impact: 'Medium' }
      ],
      intelligence: {
        humintSources: 28,
        sigintAlerts: 15,
        activeOperations: 9,
        surveillancePoints: 35
      }
    },
    'Balochistan Border': {
      threatAnalysis: [
        { type: 'Cross-Border Activity', level: 'High', probability: 84, trend: 'Stable' },
        { type: 'Smuggling Operations', level: 'Medium', probability: 73, trend: 'Stable' },
        { type: 'Separatist Activity', level: 'Medium', probability: 68, trend: 'Decreasing' }
      ],
      recentActivities: [
        { date: '2024-12-05', event: 'Border patrol increased', impact: 'High' },
        { date: '2024-12-02', event: 'Smuggling route disrupted', impact: 'Medium' },
        { date: '2024-11-29', event: 'Community outreach program', impact: 'Low' }
      ],
      intelligence: {
        humintSources: 10,
        sigintAlerts: 6,
        activeOperations: 4,
        surveillancePoints: 14
      }
    },
    'KPK Province': {
      threatAnalysis: [
        { type: 'Militant Activity', level: 'High', probability: 79, trend: 'Increasing' },
        { type: 'IED Threat', level: 'Medium', probability: 68, trend: 'Stable' },
        { type: 'Kidnapping Risk', level: 'Medium', probability: 64, trend: 'Decreasing' }
      ],
      recentActivities: [
        { date: '2024-12-04', event: 'Counter-insurgency operation', impact: 'High' },
        { date: '2024-12-01', event: 'IED defused successfully', impact: 'Medium' },
        { date: '2024-11-28', event: 'Local intelligence network activated', impact: 'Medium' }
      ],
      intelligence: {
        humintSources: 16,
        sigintAlerts: 9,
        activeOperations: 6,
        surveillancePoints: 20
      }
    },
    'Lahore District': {
      threatAnalysis: [
        { type: 'Soft Target Threat', level: 'Medium', probability: 72, trend: 'Decreasing' },
        { type: 'Cyber Threat', level: 'Medium', probability: 65, trend: 'Stable' },
        { type: 'Protest Violence', level: 'Low', probability: 58, trend: 'Decreasing' }
      ],
      recentActivities: [
        { date: '2024-12-03', event: 'Enhanced security at public venues', impact: 'Medium' },
        { date: '2024-11-30', event: 'Cyber defense upgrade', impact: 'Low' },
        { date: '2024-11-27', event: 'Community policing initiative', impact: 'Low' }
      ],
      intelligence: {
        humintSources: 22,
        sigintAlerts: 12,
        activeOperations: 3,
        surveillancePoints: 28
      }
    },
    'Gwadar Port': {
      threatAnalysis: [
        { type: 'Maritime Security', level: 'Medium', probability: 69, trend: 'Stable' },
        { type: 'Infrastructure Threat', level: 'Medium', probability: 61, trend: 'Stable' },
        { type: 'Foreign Intelligence', level: 'Low', probability: 54, trend: 'Stable' }
      ],
      recentActivities: [
        { date: '2024-12-02', event: 'Port security drill conducted', impact: 'Medium' },
        { date: '2024-11-29', event: 'Surveillance system upgrade', impact: 'Medium' },
        { date: '2024-11-26', event: 'Maritime patrol increased', impact: 'Low' }
      ],
      intelligence: {
        humintSources: 8,
        sigintAlerts: 5,
        activeOperations: 2,
        surveillancePoints: 12
      }
    },
    'FATA Region': {
      threatAnalysis: [
        { type: 'Tribal Conflict', level: 'Medium', probability: 66, trend: 'Increasing' },
        { type: 'Weapons Smuggling', level: 'Medium', probability: 59, trend: 'Stable' },
        { type: 'Extremist Recruitment', level: 'Low', probability: 52, trend: 'Decreasing' }
      ],
      recentActivities: [
        { date: '2024-12-01', event: 'Tribal jirga mediation', impact: 'High' },
        { date: '2024-11-28', event: 'Weapons cache discovered', impact: 'Medium' },
        { date: '2024-11-25', event: 'Development project initiated', impact: 'Low' }
      ],
      intelligence: {
        humintSources: 11,
        sigintAlerts: 4,
        activeOperations: 3,
        surveillancePoints: 9
      }
    },
    'Punjab Border': {
      threatAnalysis: [
        { type: 'Cross-Border Smuggling', level: 'Medium', probability: 62, trend: 'Decreasing' },
        { type: 'Agricultural Terrorism', level: 'Low', probability: 51, trend: 'Stable' },
        { type: 'Water Conflict', level: 'Low', probability: 48, trend: 'Decreasing' }
      ],
      recentActivities: [
        { date: '2024-11-30', event: 'Border fence reinforcement', impact: 'Medium' },
        { date: '2024-11-27', event: 'Agricultural security assessment', impact: 'Low' },
        { date: '2024-11-24', event: 'Water resource monitoring', impact: 'Low' }
      ],
      intelligence: {
        humintSources: 7,
        sigintAlerts: 3,
        activeOperations: 2,
        surveillancePoints: 10
      }
    },
    'Sindh Interior': {
      threatAnalysis: [
        { type: 'Banditry', level: 'Low', probability: 55, trend: 'Stable' },
        { type: 'Sectarian Tension', level: 'Low', probability: 47, trend: 'Stable' },
        { type: 'Rural Crime', level: 'Low', probability: 42, trend: 'Decreasing' }
      ],
      recentActivities: [
        { date: '2024-11-29', event: 'Rural patrol expansion', impact: 'Medium' },
        { date: '2024-11-26', event: 'Community watch program', impact: 'Low' },
        { date: '2024-11-23', event: 'Interfaith dialogue session', impact: 'Low' }
      ],
      intelligence: {
        humintSources: 9,
        sigintAlerts: 2,
        activeOperations: 1,
        surveillancePoints: 8
      }
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return '#FF0000';
    if (risk >= 70) return '#FF6B00';
    if (risk >= 60) return '#FFB800';
    return '#00FF88';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#FF6B00';
      case 'down': return '#00FF88';
      default: return '#0096FF';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Model Status Bar */}
      <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#00FF88]" />
              <div>
                <p className="text-sm text-white">MilGPT Risk Engine</p>
                <p className="text-xs text-white/60">Neural Network v4.2 Active</p>
              </div>
            </div>
            <div className="h-8 w-px bg-[#0096FF]/20"></div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#0096FF]" />
              <div>
                <p className="text-sm text-[#0096FF]">97.5% Accuracy</p>
                <p className="text-xs text-white/60">Last trained: 2h ago</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="px-3 py-1 bg-[#00FF88]/20 border border-[#00FF88] rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#00FF88]">Real-time Analysis Active</span>
              </div>
            </div>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-[#0A192F] border border-[#0096FF]/30 rounded px-3 py-1 text-xs text-white focus:outline-none focus:border-[#0096FF]"
            >
              {mlModelMetrics.map(model => (
                <option key={model.name} value={model.name}>{model.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* District Risk Ranking with AI Predictions */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <h2 className="text-lg text-white">AI-Powered Risk Ranking</h2>
                <p className="text-sm text-white/60">Top 10 High-Risk Areas</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-[#0096FF]/10 border border-[#0096FF] rounded self-start sm:self-auto">
              <Brain className="w-3 h-3 text-[#0096FF]" />
              <span className="text-xs text-[#0096FF]">ML Enhanced</span>
            </div>
          </div>

          <div className="space-y-2 max-h-none lg:max-h-[450px] overflow-visible lg:overflow-y-auto pr-0 lg:pr-2 custom-scrollbar">
            {districtRiskData.map((district, index) => {
              const TrendIcon = getTrendIcon(district.trend);

              return (
                <div
                  key={district.district}
                  className="p-3 bg-[#0A192F]/50 rounded-lg border border-[#0096FF]/10 hover:border-[#0096FF]/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {/* Rank */}
                    <div className="w-8 h-8 rounded-full bg-[#0096FF]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm text-[#0096FF]">{index + 1}</span>
                    </div>

                    {/* District info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <p className="text-sm text-white truncate flex-1 min-w-0">{district.district}</p>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div
                              className="text-lg"
                              style={{ color: getRiskColor(district.risk) }}
                            >
                              {district.risk}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendIcon
                              className="w-3 h-3"
                              style={{ color: getTrendColor(district.trend) }}
                            />
                            <span
                              className="text-xs"
                              style={{ color: getTrendColor(district.trend) }}
                            >
                              {Math.abs(district.risk - district.previous)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Risk bar */}
                      <div className="flex-1 h-1.5 bg-[#414141] rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${district.risk}%`,
                            backgroundColor: getRiskColor(district.risk)
                          }}
                        />
                      </div>

                      {/* AI Prediction & Confidence */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-white/40">AI Prediction:</span>
                          <span className="text-[#0096FF]">{district.aiPredicted}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-[#00FF88]" />
                          <span className="text-[#00FF88]">{district.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Risk scale legend */}
          <div className="mt-4 pt-4 border-t border-[#0096FF]/20">
            <p className="text-xs text-white/60 mb-2">Risk Scale</p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: '#00FF88' }} />
                <span className="text-xs text-white/60">&lt;60</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: '#FFB800' }} />
                <span className="text-xs text-white/60">60-69</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: '#FF6B00' }} />
                <span className="text-xs text-white/60">70-79</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: '#FF0000' }} />
                <span className="text-xs text-white/60">80+</span>
              </div>
            </div>
          </div>
        </div>

        {/* 30-Day Risk Forecast with ML Confidence */}
        <div className="lg:col-span-3 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#0096FF]" />
              </div>
              <div>
                <h2 className="text-lg text-white">Predictive Risk Forecast</h2>
                <p className="text-sm text-white/60">Neural Network Predictions</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-[#0A192F] border border-[#0096FF]/30 rounded px-3 py-1 text-xs text-white focus:outline-none focus:border-[#0096FF]"
              >
                <option>7-Day</option>
                <option>30-Day</option>
                <option>90-Day</option>
              </select>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0096FF]" />
                  <span className="text-xs text-white/60">Predicted</span>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                  <span className="text-xs text-white/60">Actual</span>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <div className="w-3 h-3 rounded-full bg-[#0096FF]/30" />
                  <span className="text-xs text-white/60">Confidence Band</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0096FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0096FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0096FF" opacity={0.1} />
                <XAxis
                  dataKey="date"
                  stroke="#ffffff60"
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                />
                <YAxis
                  stroke="#ffffff60"
                  tick={{ fill: '#ffffff60', fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A192F',
                    border: '1px solid #0096FF',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#ffffff' }}
                  formatter={(value: any, name: string) => {
                    if (name === 'mlConfidence') return [`${value}%`, 'ML Confidence'];
                    return [value, name];
                  }}
                />

                {/* Confidence band */}
                <Area
                  type="monotone"
                  dataKey="upperBound"
                  stroke="none"
                  fill="#0096FF"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="lowerBound"
                  stroke="none"
                  fill="#ffffff"
                  fillOpacity={0.05}
                />

                {/* Main prediction line */}
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#0096FF"
                  strokeWidth={3}
                  dot={{ fill: '#0096FF', r: 4 }}
                  activeDot={{ r: 6 }}
                />

                {/* Actual values line */}
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#00FF88"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#00FF88', r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Intelligence triggers with ML confidence */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-lg">
              <p className="text-xs text-white/60 mb-1">Peak Risk Period</p>
              <p className="text-sm text-[#FF6B00] mb-1">Dec 20-25</p>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#FFB800]" />
                <span className="text-xs text-white/60">88% confidence</span>
              </div>
            </div>
            <div className="p-3 bg-[#0096FF]/10 border border-[#0096FF]/30 rounded-lg">
              <p className="text-xs text-white/60 mb-1">Pattern Detection</p>
              <p className="text-sm text-[#0096FF] mb-1">Network B3</p>
              <div className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-[#0096FF]" />
                <span className="text-xs text-white/60">High correlation</span>
              </div>
            </div>
            <div className="p-3 bg-[#2F4F4F]/30 border border-[#2F4F4F] rounded-lg">
              <p className="text-xs text-white/60 mb-1">HUMINT Source</p>
              <p className="text-sm text-white/90 mb-1">Metro Intel</p>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#2F4F4F]" />
                <span className="text-xs text-white/60">Verified</span>
              </div>
            </div>
            <div className="p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg">
              <p className="text-xs text-white/60 mb-1">Model Accuracy</p>
              <p className="text-sm text-[#00FF88] mb-1">97.5%</p>
              <div className="flex items-center gap-1">
                <Brain className="w-3 h-3 text-[#00FF88]" />
                <span className="text-xs text-white/60">Ensemble AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Vector Analysis */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#FF6B00]" />
            </div>
            <div>
              <h2 className="text-lg text-white">Threat Vector Analysis</h2>
              <p className="text-sm text-white/60">Multi-dimensional Risk</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatVectorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#0096FF" opacity={0.1} />
                <XAxis type="number" domain={[0, 100]} stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 10 }} />
                <YAxis type="category" dataKey="vector" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 10 }} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A192F',
                    border: '1px solid #0096FF',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                  {threatVectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getRiskColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3 bg-[#0096FF]/10 border border-[#0096FF]/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Highest Threat Vector</span>
              <span className="text-sm text-[#FF0000]">IED/VBIED (92)</span>
            </div>
          </div>
        </div>

        {/* Risk Factor Radar */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-[#0096FF]" />
            </div>
            <div>
              <h2 className="text-lg text-white">Risk Factor Matrix</h2>
              <p className="text-sm text-white/60">6-Dimensional Analysis</p>
            </div>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={riskFactors}>
                <PolarGrid stroke="#0096FF" opacity={0.2} />
                <PolarAngleAxis
                  dataKey="factor"
                  tick={{ fill: '#ffffff80', fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#ffffff60', fontSize: 10 }}
                />
                <Radar
                  name="Risk Level"
                  dataKey="value"
                  stroke="#0096FF"
                  fill="#0096FF"
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A192F',
                    border: '1px solid #0096FF',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 p-3 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Critical Factor</span>
              <span className="text-sm text-[#FF6B00]">Network Analysis (92)</span>
            </div>
          </div>
        </div>

        {/* ML Model Performance */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#00FF88]/20 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div>
              <h2 className="text-lg text-white">ML Model Performance</h2>
              <p className="text-sm text-white/60">Active Models Comparison</p>
            </div>
          </div>

          <div className="space-y-3">
            {mlModelMetrics.map((model, index) => (
              <div
                key={model.name}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${selectedModel === model.name
                  ? 'bg-[#0096FF]/20 border-[#0096FF]'
                  : 'bg-[#0A192F]/50 border-[#0096FF]/10 hover:border-[#0096FF]/30'
                  }`}
                onClick={() => setSelectedModel(model.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">{model.name}</span>
                  {selectedModel === model.name && (
                    <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-white/40 mb-1">Accuracy</p>
                    <p className="text-[#00FF88]">{model.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">Precision</p>
                    <p className="text-[#0096FF]">{model.precision}%</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">Recall</p>
                    <p className="text-[#FFB800]">{model.recall}%</p>
                  </div>
                </div>

                <div className="mt-2 h-1 bg-[#414141] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0096FF] to-[#00FF88] rounded-full transition-all duration-500"
                    style={{ width: `${model.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">Selected Model</span>
              <span className="text-[#00FF88]">{selectedModel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* District Detail Modal */}
      {selectedDistrict && districtDetailedData[selectedDistrict] && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedDistrict(null)}
        >
          <div
            className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border-b border-[#0096FF]/20 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <div>
                  <h2 className="text-2xl text-white font-bold">{selectedDistrict}</h2>
                  <p className="text-sm text-white/60">Detailed Risk Analysis & Intelligence</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="w-10 h-10 bg-[#FF0000]/20 hover:bg-[#FF0000]/30 border border-[#FF0000] rounded-lg flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-[#FF0000]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Threat Analysis Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-[#FF6B00]" />
                  <h3 className="text-lg text-white font-semibold">Threat Analysis</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {districtDetailedData[selectedDistrict].threatAnalysis.map((threat: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm text-white font-medium">{threat.type}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${threat.level === 'Critical' ? 'bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30' :
                            threat.level === 'High' ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30' :
                              'bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30'
                            }`}
                        >
                          {threat.level}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/60">Probability:</span>
                          <span className="text-[#0096FF]">{threat.probability}%</span>
                        </div>
                        <div className="h-1.5 bg-[#414141] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0096FF] rounded-full transition-all"
                            style={{ width: `${threat.probability}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/60">Trend:</span>
                          <span className={`${threat.trend === 'Increasing' ? 'text-[#FF6B00]' :
                            threat.trend === 'Decreasing' ? 'text-[#00FF88]' :
                              'text-[#0096FF]'
                            }`}>
                            {threat.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-[#0096FF]" />
                  <h3 className="text-lg text-white font-semibold">Recent Activities</h3>
                </div>
                <div className="space-y-3">
                  {districtDetailedData[selectedDistrict].recentActivities.map((activity: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg hover:border-[#0096FF]/30 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-white mb-1">{activity.event}</p>
                          <p className="text-xs text-white/60">{activity.date}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${activity.impact === 'High' ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30' :
                          activity.impact === 'Medium' ? 'bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30' :
                            'bg-[#0096FF]/20 text-[#0096FF] border border-[#0096FF]/30'
                          }`}>
                          {activity.impact} Impact
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intelligence Summary Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#00FF88]" />
                  <h3 className="text-lg text-white font-semibold">Intelligence Summary</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#0096FF]/10 border border-[#0096FF]/30 rounded-lg">
                    <p className="text-xs text-white/60 mb-1">HUMINT Sources</p>
                    <p className="text-2xl text-[#0096FF] font-bold">{districtDetailedData[selectedDistrict].intelligence.humintSources}</p>
                  </div>
                  <div className="p-4 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-lg">
                    <p className="text-xs text-white/60 mb-1">SIGINT Alerts</p>
                    <p className="text-2xl text-[#FF6B00] font-bold">{districtDetailedData[selectedDistrict].intelligence.sigintAlerts}</p>
                  </div>
                  <div className="p-4 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg">
                    <p className="text-xs text-white/60 mb-1">Active Operations</p>
                    <p className="text-2xl text-[#00FF88] font-bold">{districtDetailedData[selectedDistrict].intelligence.activeOperations}</p>
                  </div>
                  <div className="p-4 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-lg">
                    <p className="text-xs text-white/60 mb-1">Surveillance Points</p>
                    <p className="text-2xl text-[#FFB800] font-bold">{districtDetailedData[selectedDistrict].intelligence.surveillancePoints}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}