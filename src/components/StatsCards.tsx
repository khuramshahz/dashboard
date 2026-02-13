import { AlertTriangle, MapPin, Shield, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const statsData = [
  {
    title: 'Total Incidents',
    subtitle: 'Current Year',
    value: '1,247',
    trend: '+12%',
    trendUp: true,
    icon: AlertTriangle,
    color: '#0096FF',
    chartData: [
      { value: 30 }, { value: 45 }, { value: 38 }, { value: 52 },
      { value: 48 }, { value: 65 }, { value: 58 }, { value: 72 }
    ]
  },
  {
    title: 'Active High-Risk Districts',
    subtitle: 'Requires Attention',
    value: '34',
    trend: '-8%',
    trendUp: false,
    icon: MapPin,
    color: '#2F4F4F',
    chartData: [
      { value: 55 }, { value: 48 }, { value: 52 }, { value: 45 },
      { value: 42 }, { value: 38 }, { value: 35 }, { value: 34 }
    ]
  },
  {
    title: 'Alerts Triggered',
    subtitle: 'Last 30 Days',
    value: '156',
    trend: '+24%',
    trendUp: true,
    icon: Shield,
    color: '#0096FF',
    chartData: [
      { value: 20 }, { value: 28 }, { value: 35 }, { value: 42 },
      { value: 48 }, { value: 55 }, { value: 65 }, { value: 78 }
    ]
  }
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown;

        return (
          <div
            key={index}
            className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6 relative overflow-hidden group hover:border-[#0096FF]/40 transition-all"
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: stat.color }}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/60 text-xs mb-1">{stat.subtitle}</p>
                  <h3 className="text-white/90 text-sm">{stat.title}</h3>
                </div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl text-white mb-1">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`w-3 h-3 ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`} />
                    <span className={`text-xs ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.trend}
                    </span>
                    <span className="text-xs text-white/40">vs last period</span>
                  </div>
                </div>

                <div className="w-24 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stat.chartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={stat.color}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
