import { useState, useEffect } from 'react';
import { Activity, MapPin, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

interface ThreatOrigin {
  country: string;
  count: number;
  trend: 'up' | 'down';
}

interface ThreatTarget {
  location: string;
  count: number;
  severity: 'critical' | 'high' | 'medium';
}

interface ThreatActivity {
  id: string;
  time: string;
  source: string;
  target: string;
  type: string;
  severity: string;
}

export default function ThreatMap() {
  const [activeConnections, setActiveConnections] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnections(Math.floor(Math.random() * 50) + 120);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const threatOrigins: ThreatOrigin[] = [
    { country: 'Afghanistan', count: 1847, trend: 'up' },
    { country: 'India', count: 1231, trend: 'up' },
    { country: 'Iran', count: 892, trend: 'down' },
    { country: 'Tajikistan', count: 534, trend: 'up' },
    { country: 'Uzbekistan', count: 421, trend: 'down' },
  ];

  const threatTargets: ThreatTarget[] = [
    { location: 'Peshawar', count: 2341, severity: 'critical' },
    { location: 'Quetta', count: 1876, severity: 'critical' },
    { location: 'Karachi', count: 1654, severity: 'high' },
    { location: 'Islamabad', count: 1203, severity: 'high' },
    { location: 'Lahore', count: 987, severity: 'high' },
  ];

  const recentActivities: ThreatActivity[] = [
    { id: '1', time: '23:47:12', source: 'Kandahar, AFG', target: 'Peshawar', type: 'IED Components', severity: 'CRITICAL' },
    { id: '2', time: '23:45:33', source: 'Mumbai, IND', target: 'Karachi', type: 'HUMINT Alert', severity: 'HIGH' },
    { id: '3', time: '23:44:18', source: 'Zahedan, IRN', target: 'Quetta', type: 'Precursor Chemicals', severity: 'CRITICAL' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg overflow-hidden shadow-2xl shadow-[#0096FF]/10">
      {/* Header */}
      <div className="bg-[#0A192F] border-b border-[#0096FF]/20 p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Activity className="w-4 h-4 text-[#0096FF] flex-shrink-0" />
            <h2 className="text-sm text-white truncate">Threat Intelligence Map</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse"></div>
            <span className="text-[10px] text-white/60">LIVE</span>
          </div>
        </div>
      </div>

      {/* Main Map Section */}
      <div className="p-4 space-y-4">
        {/* Map Visualization */}
        <div className="bg-[#0A192F] border border-[#0096FF] rounded-lg p-3 relative overflow-hidden" style={{ height: '400px' }}>
          {/* Map background with grid */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="200 50 420 350" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="500"
                  stroke="#0096FF" strokeWidth="0.5" opacity="0.3" />
              ))}
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40}
                  stroke="#0096FF" strokeWidth="0.5" opacity="0.3" />
              ))}
            </svg>
          </div>

          {/* Pakistan and neighboring countries */}
          <svg viewBox="200 50 420 350" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Afghanistan (Northwest) */}
            <path d="M 280 120 L 310 100 L 340 95 L 365 110 L 380 140 L 370 170 L 350 185 L 320 180 L 300 160 L 285 140 Z"
              fill="#2F4F4F" fillOpacity="0.3" stroke="#0096FF" strokeWidth="1.5" opacity="0.5" />
            <text x="330" y="145" fill="#FFFFFF" fontSize="10" opacity="0.6" textAnchor="middle">Afghanistan</text>

            {/* Iran (West) */}
            <path d="M 240 180 L 280 160 L 300 185 L 310 220 L 305 255 L 285 275 L 260 270 L 245 245 L 240 210 Z"
              fill="#2F4F4F" fillOpacity="0.3" stroke="#0096FF" strokeWidth="1.5" opacity="0.5" />
            <text x="275" y="220" fill="#FFFFFF" fontSize="10" opacity="0.6" textAnchor="middle">Iran</text>

            {/* China (Northeast) */}
            <path d="M 400 80 L 450 70 L 490 85 L 510 110 L 500 140 L 475 155 L 445 150 L 420 130 L 405 105 Z"
              fill="#2F4F4F" fillOpacity="0.3" stroke="#0096FF" strokeWidth="1.5" opacity="0.5" />
            <text x="455" y="115" fill="#FFFFFF" fontSize="10" opacity="0.6" textAnchor="middle">China</text>

            {/* India (East) */}
            <path d="M 510 160 L 560 150 L 595 175 L 610 215 L 605 265 L 585 310 L 555 340 L 520 350 L 495 340 L 480 310 L 475 270 L 485 230 L 500 190 Z"
              fill="#2F4F4F" fillOpacity="0.3" stroke="#0096FF" strokeWidth="1.5" opacity="0.5" />
            <text x="545" y="250" fill="#FFFFFF" fontSize="11" opacity="0.6" textAnchor="middle">India</text>

            {/* Pakistan (Main focus - highlighted) */}
            <path d="
              M 350 185
              L 380 170
              L 410 165
              L 445 175
              L 470 190
              L 485 215
              L 490 245
              L 485 280
              L 470 310
              L 450 330
              L 420 345
              L 385 355
              L 355 360
              L 325 355
              L 310 340
              L 305 315
              L 315 285
              L 330 260
              L 340 230
              L 345 205
              Z
            "
              fill="rgba(0, 150, 255, 0.15)"
              stroke="#0096FF"
              strokeWidth="2.5"
              opacity="0.9" />

            {/* Major cities in Pakistan with pulsing markers */}

            {/* Peshawar (Northwest) - Critical */}
            <circle cx="365" cy="190" r="5" fill="#FF6B6B" opacity="0.8">
              <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="365" cy="190" r="3" fill="#FF6B6B" />
            <text x="365" y="182" fill="#FF6B6B" fontSize="9" textAnchor="middle" fontWeight="600">Peshawar</text>

            {/* Islamabad (North-center) - High */}
            <circle cx="400" cy="200" r="4" fill="#FFD93D" opacity="0.8">
              <animate attributeName="r" values="4;7;4" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="200" r="3" fill="#FFD93D" />
            <text x="400" y="192" fill="#FFD93D" fontSize="9" textAnchor="middle" fontWeight="600">Islamabad</text>

            {/* Lahore (East) - High */}
            <circle cx="455" cy="225" r="4" fill="#FFD93D" opacity="0.8">
              <animate attributeName="r" values="4;7;4" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="455" cy="225" r="3" fill="#FFD93D" />
            <text x="455" y="217" fill="#FFD93D" fontSize="9" textAnchor="middle" fontWeight="600">Lahore</text>

            {/* Quetta (Southwest) - Critical */}
            <circle cx="340" cy="250" r="5" fill="#FF6B6B" opacity="0.8">
              <animate attributeName="r" values="5;8;5" dur="2.1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.1s" repeatCount="indefinite" />
            </circle>
            <circle cx="340" cy="250" r="3" fill="#FF6B6B" />
            <text x="340" y="242" fill="#FF6B6B" fontSize="9" textAnchor="middle" fontWeight="600">Quetta</text>

            {/* Karachi (South) - High */}
            <circle cx="360" cy="345" r="4" fill="#FFD93D" opacity="0.8">
              <animate attributeName="r" values="4;7;4" dur="2.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="360" cy="345" r="3" fill="#FFD93D" />
            <text x="360" y="337" fill="#FFD93D" fontSize="9" textAnchor="middle" fontWeight="600">Karachi</text>

            {/* Pakistan Label */}
            <text x="390" y="280" fill="#0096FF" fontSize="14" fontWeight="bold" textAnchor="middle" opacity="0.7">
              PAKISTAN
            </text>
          </svg>

          {/* Threat connections */}
          <svg viewBox="200 50 420 350" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="threatGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0" />
                <stop offset="50%" stopColor="#FF6B6B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="threatGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD93D" stopOpacity="0" />
                <stop offset="50%" stopColor="#FFD93D" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FFD93D" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Critical threats from Afghanistan to Peshawar */}
            <path d="M 330 145 Q 340 165 365 190" stroke="url(#threatGrad1)" strokeWidth="2" fill="none">
              <animate attributeName="stroke-dasharray" from="0 400" to="400 0" dur="2.5s" repeatCount="indefinite" />
            </path>

            {/* Critical threats from Afghanistan to Quetta */}
            <path d="M 320 180 Q 325 215 340 250" stroke="url(#threatGrad1)" strokeWidth="2" fill="none">
              <animate attributeName="stroke-dasharray" from="0 400" to="400 0" dur="3s" repeatCount="indefinite" />
            </path>

            {/* Critical threats from Iran to Quetta */}
            <path d="M 275 220 Q 305 235 340 250" stroke="url(#threatGrad1)" strokeWidth="2" fill="none">
              <animate attributeName="stroke-dasharray" from="0 400" to="400 0" dur="2.8s" repeatCount="indefinite" />
            </path>

            {/* High threats from India to Lahore */}
            <path d="M 510 190 Q 485 205 455 225" stroke="url(#threatGrad2)" strokeWidth="1.5" fill="none">
              <animate attributeName="stroke-dasharray" from="0 400" to="400 0" dur="3.5s" repeatCount="indefinite" />
            </path>

            {/* High threats from India to Karachi */}
            <path d="M 520 350 Q 440 350 360 345" stroke="url(#threatGrad2)" strokeWidth="1.5" fill="none">
              <animate attributeName="stroke-dasharray" from="0 400" to="400 0" dur="4s" repeatCount="indefinite" />
            </path>

            {/* High threats from China to Islamabad */}
            <path d="M 445 150 Q 420 175 400 200" stroke="url(#threatGrad2)" strokeWidth="1.5" fill="none">
              <animate attributeName="stroke-dasharray" from="0 400" to="400 0" dur="3.2s" repeatCount="indefinite" />
            </path>
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-[#0A192F]/90 border border-[#0096FF]/30 rounded p-2 backdrop-blur-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#FF6B6B]"></div>
                <span className="text-[10px] text-white/80">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[#FFD93D]"></div>
                <span className="text-[10px] text-white/80">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Threat Origins & Targets - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Threat Origins */}
          <div className="bg-[#0A192F] border border-[#0096FF] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-3 h-3 text-[#FF6B6B]" />
              <h3 className="text-xs text-white uppercase tracking-wide">Origins</h3>
            </div>
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
              {threatOrigins.map((origin, index) => (
                <div key={index} className="flex items-center justify-between p-1.5 bg-[#0d1f3a]/50 rounded border border-[#0096FF]/10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#0096FF] text-[10px] w-4">{index + 1}</span>
                    <span className="text-white/90 text-[10px]">{origin.country}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-[10px]">{origin.count}</span>
                    {origin.trend === 'up' ? (
                      <TrendingUp className="w-2.5 h-2.5 text-[#FF6B6B]" />
                    ) : (
                      <TrendingUp className="w-2.5 h-2.5 text-[#00FF88] rotate-180" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Threat Targets */}
          <div className="bg-[#0A192F] border border-[#0096FF] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-3 h-3 text-[#FFD93D]" />
              <h3 className="text-xs text-white uppercase tracking-wide">Targets</h3>
            </div>
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
              {threatTargets.map((target, index) => (
                <div key={index} className="flex items-center justify-between p-1.5 bg-[#0d1f3a]/50 rounded border border-[#0096FF]/10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#0096FF] text-[10px] w-4">{index + 1}</span>
                    <span className="text-white/90 text-[10px]">{target.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-[10px]">{target.count}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${target.severity === 'critical' ? 'bg-[#FF6B6B]' :
                      target.severity === 'high' ? 'bg-[#FFD93D]' : 'bg-[#00FF88]'
                      }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-[#0A192F] border border-[#0096FF] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3 h-3 text-[#0096FF]" />
            <h3 className="text-xs text-white uppercase tracking-wide">Live Activities</h3>
          </div>
          <div className="space-y-1.5">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-1.5 bg-[#0d1f3a]/50 rounded border border-[#0096FF]/10 text-[10px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#0096FF]">{activity.time}</span>
                  <span className={activity.severity === 'CRITICAL' ? 'text-[#FF6B6B]' :
                    activity.severity === 'HIGH' ? 'text-[#FFD93D]' : 'text-[#00FF88]'}>
                    {activity.severity}
                  </span>
                </div>
                <div className="text-white/80">{activity.source} → {activity.target}</div>
                <div className="text-white/60">{activity.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}