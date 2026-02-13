import { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const incidents = [
  { id: 'INC-2024-1247', date: '2024-12-08', time: '14:30', location: 'Northern District', type: 'IED', severity: 'high', casualties: 3 },
  { id: 'INC-2024-1246', date: '2024-12-07', time: '09:15', location: 'Metro Area', type: 'VBIED', severity: 'critical', casualties: 12 },
  { id: 'INC-2024-1245', date: '2024-12-06', time: '22:45', location: 'Eastern Zone', type: 'Defused', severity: 'medium', casualties: 0 },
  { id: 'INC-2024-1244', date: '2024-12-05', time: '16:20', location: 'Southern Territory', type: 'IED', severity: 'high', casualties: 5 },
  { id: 'INC-2024-1243', date: '2024-12-04', time: '11:00', location: 'Central Province', type: 'Unknown', severity: 'low', casualties: 0 },
  { id: 'INC-2024-1242', date: '2024-12-03', time: '19:30', location: 'Western Sector', type: 'Suicide', severity: 'critical', casualties: 18 },
  { id: 'INC-2024-1241', date: '2024-12-02', time: '08:45', location: 'Metro Area', type: 'IED', severity: 'medium', casualties: 2 },
  { id: 'INC-2024-1240', date: '2024-12-01', time: '15:10', location: 'Northern District', type: 'Defused', severity: 'low', casualties: 0 },
];

export default function Timeline() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#FF0000';
      case 'high': return '#FF6B00';
      case 'medium': return '#FFB800';
      case 'low': return '#00FF88';
      default: return '#0096FF';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'IED': return '#FF6B00';
      case 'VBIED': return '#FF0000';
      case 'Suicide': return '#FF0000';
      case 'Defused': return '#00FF88';
      case 'Unknown': return '#414141';
      default: return '#0096FF';
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl text-white mb-1">Recent Incidents Timeline</h2>
          <p className="text-sm text-white/60">Last 8 Events - Click for Details</p>
        </div>
        
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-[#0096FF]/20 border border-[#0096FF] text-[#0096FF] rounded text-xs hover:bg-[#0096FF]/30 transition-colors">
            Last 7 Days
          </button>
          <button className="px-3 py-1.5 bg-[#414141]/30 border border-[#414141] text-white/60 rounded text-xs hover:border-white/40 transition-colors">
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="relative mb-6">
        <div className="h-20 relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0096FF]/20 via-[#0096FF]/40 to-[#0096FF]/20" />
          
          {/* Incident dots */}
          <div className="absolute inset-0 flex justify-between items-center">
            {incidents.map((incident, index) => (
              <button
                key={incident.id}
                onClick={() => setSelectedIncident(incident.id)}
                className="relative group"
              >
                {/* Dot */}
                <div 
                  className="w-4 h-4 rounded-full border-2 transition-all duration-200 hover:scale-150 cursor-pointer"
                  style={{ 
                    backgroundColor: getSeverityColor(incident.severity),
                    borderColor: selectedIncident === incident.id ? '#FFFFFF' : getSeverityColor(incident.severity),
                    boxShadow: `0 0 20px ${getSeverityColor(incident.severity)}60`
                  }}
                />
                
                {/* Date label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/40 whitespace-nowrap">
                  {new Date(incident.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>

                {/* Hover tooltip */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-[#0A192F] border border-[#0096FF] rounded px-3 py-2 whitespace-nowrap shadow-xl">
                    <p className="text-xs text-white">{incident.type}</p>
                    <p className="text-xs text-white/60">{incident.time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Incident details table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0096FF]/20">
              <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Incident ID</th>
              <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Date & Time</th>
              <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Location</th>
              <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Type</th>
              <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Severity</th>
              <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Casualties</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr 
                key={incident.id}
                onClick={() => setSelectedIncident(incident.id)}
                className={`
                  border-b border-[#0096FF]/10 cursor-pointer transition-colors
                  ${selectedIncident === incident.id ? 'bg-[#0096FF]/10' : 'hover:bg-white/5'}
                `}
              >
                <td className="py-3 px-4">
                  <span className="text-sm text-[#0096FF]">{incident.id}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/80">{incident.date}</span>
                    <Clock className="w-3 h-3 text-white/40 ml-2" />
                    <span className="text-xs text-white/60">{incident.time}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/80">{incident.location}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span 
                    className="px-2 py-1 rounded text-xs"
                    style={{ 
                      backgroundColor: `${getTypeColor(incident.type)}20`,
                      color: getTypeColor(incident.type)
                    }}
                  >
                    {incident.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getSeverityColor(incident.severity) }}
                    />
                    <span className="text-sm text-white/80 capitalize">{incident.severity}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-white/80">{incident.casualties}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
