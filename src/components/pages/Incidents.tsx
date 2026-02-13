import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { AlertTriangle, Search, Filter, MapPin, Calendar, Clock, TrendingUp, Eye, X, FileText, Image as ImageIcon, Video, Download, User, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const incidentsData = [
  { id: 'INC-2024-1247', date: '2024-12-08', time: '14:30', location: 'Peshawar District', coords: '34.0°N, 71.5°E', type: 'IED', severity: 'high', casualties: 3, status: 'Under Investigation', ttpcCluster: 'B2', evidence: 12 },
  { id: 'INC-2024-1246', date: '2024-12-07', time: '09:15', location: 'Karachi Central', coords: '24.8°N, 67.0°E', type: 'VBIED', severity: 'critical', casualties: 12, status: 'Analysis Complete', ttpcCluster: 'A1', evidence: 28 },
  { id: 'INC-2024-1245', date: '2024-12-06', time: '22:45', location: 'Quetta Cantonment', coords: '30.2°N, 67.0°E', type: 'Defused', severity: 'medium', casualties: 0, status: 'Forensic Processing', ttpcCluster: 'C2', evidence: 8 },
  { id: 'INC-2024-1244', date: '2024-12-05', time: '16:20', location: 'Lahore Garrison', coords: '31.5°N, 74.3°E', type: 'IED', severity: 'high', casualties: 5, status: 'Under Investigation', ttpcCluster: 'B2', evidence: 15 },
  { id: 'INC-2024-1243', date: '2024-12-04', time: '11:00', location: 'Islamabad Blue Area', coords: '33.7°N, 73.1°E', type: 'Unknown', severity: 'low', casualties: 0, status: 'Initial Assessment', ttpcCluster: 'N/A', evidence: 3 },
  { id: 'INC-2024-1242', date: '2024-12-03', time: '19:30', location: 'Multan Cantt', coords: '30.2°N, 71.5°E', type: 'Suicide', severity: 'critical', casualties: 18, status: 'Analysis Complete', ttpcCluster: 'D4', evidence: 22 },
  { id: 'INC-2024-1241', date: '2024-12-02', time: '08:45', location: 'Rawalpindi City', coords: '33.6°N, 73.0°E', type: 'IED', severity: 'medium', casualties: 2, status: 'Closed', ttpcCluster: 'B3', evidence: 10 },
  { id: 'INC-2024-1240', date: '2024-12-01', time: '15:10', location: 'Faisalabad District', coords: '31.4°N, 73.1°E', type: 'Defused', severity: 'low', casualties: 0, status: 'Closed', ttpcCluster: 'C2', evidence: 6 },
];

export default function Incidents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const filteredIncidents = incidentsData.filter(incident => {
    const matchesSearch = incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const selectedIncidentData = incidentsData.find(inc => inc.id === selectedIncident);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#FF0000';
      case 'high': return '#FF6B00';
      case 'medium': return '#FFB800';
      case 'low': return '#00FF88';
      default: return '#0096FF';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Closed') return CheckCircle;
    if (status === 'Analysis Complete') return CheckCircle;
    if (status.includes('Investigation')) return AlertTriangle;
    return Eye;
  };

  const handleExportReport = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();
    const reportId = `SR-${Math.floor(Math.random() * 1000000)}`;

    // Header
    doc.setFillColor(10, 25, 47);
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('STRATEGIC INCIDENT REPORT', 20, 24);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Report ID: ${reportId} | Generated: ${timestamp}`, 20, 36);
    doc.setFillColor(255, 59, 48);
    doc.rect(160, 18, 35, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('CLASSIFIED', 177.5, 25, { align: 'center' });

    let y = 60;
    const stats = [
      { label: 'Total Incidents', value: incidentsData.length },
      { label: 'Critical Threats', value: incidentsData.filter(i => i.severity === 'critical').length },
      { label: 'Total Casualties', value: incidentsData.reduce((sum, incident) => sum + incident.casualties, 0) },
      { label: 'Evidence Files', value: incidentsData.reduce((sum, incident) => sum + incident.evidence, 0) },
    ];

    stats.forEach((stat, index) => {
      const cardX = 15 + index * 47;
      doc.setFillColor(13, 31, 58);
      doc.rect(cardX, y, 42, 24, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text(stat.label.toUpperCase(), cardX + 3, y + 9);
      doc.setFontSize(16);
      doc.text(`${stat.value}`, cardX + 3, y + 19);
    });
    y += 34;

    const addSection = (title: string, content: string) => {
      if (y > 250) {
        doc.addPage();
        y = 30;
      }
      doc.setTextColor(10, 25, 47);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(title, 20, y);
      y += 4;
      doc.setDrawColor(0, 150, 255);
      doc.setLineWidth(0.5);
      doc.line(20, y, 190, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const split = doc.splitTextToSize(content, 170);
      doc.text(split, 20, y);
      y += split.length * 5 + 8;
    };

    const highRiskZones = incidentsData
      .filter(i => i.severity !== 'low')
      .slice(0, 4)
      .map(i => `${i.location} (${i.severity.toUpperCase()})`)
      .join(', ');

    addSection(
      'Strategic Overview',
      `Operational tempo remains ${incidentsData.length > 6 ? 'elevated' : 'stable'} with ${incidentsData.filter(i => i.severity === 'critical').length} critical threats observed. Priority monitoring cells should continue focusing on ${highRiskZones || 'priority corridors identified by SIGINT teams'}.`
    );

    addSection(
      'Recommended Actions',
      `- Sustain HUMINT surveillance across recurring clusters (B2, D4)
- Synchronize forensic results with MilGPT threat graph every 4 hours
- Deploy rapid-response labs to Karachi and Multan sectors for residue triage`
    );

    const tableHeaders = ['ID', 'Date', 'Location', 'Type', 'Severity', 'Status', 'Evidence'];
    const columnWidths = [24, 20, 38, 22, 22, 52, 20];

    const drawTableHeader = () => {
      doc.setFillColor(0, 150, 255);
      doc.rect(15, y, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      let x = 17;
      tableHeaders.forEach((header, idx) => {
        doc.text(header, x, y + 5.5);
        x += columnWidths[idx];
      });
      y += 8;
    };

    if (y > 240) {
      doc.addPage();
      y = 30;
    }
    drawTableHeader();

    incidentsData.forEach((incident, index) => {
      if (y > 275) {
        doc.addPage();
        y = 30;
        drawTableHeader();
      }

      const fill = index % 2 === 0 ? 248 : 235;
      doc.setFillColor(fill, fill, fill);
      doc.rect(15, y, 180, 8, 'F');

      doc.setTextColor(30, 30, 30);
      doc.setFontSize(8.5);
      const rowValues = [
        incident.id,
        incident.date,
        incident.location,
        incident.type,
        incident.severity.toUpperCase(),
        incident.status,
        `${incident.evidence} files`
      ];

      let x = 17;
      rowValues.forEach((value, idx) => {
        const text = doc.splitTextToSize(value, columnWidths[idx] - 2);
        doc.text(text, x, y + 5);
        x += columnWidths[idx];
      });

      y += 8;
    });

    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setDrawColor(200, 200, 200);
      doc.line(15, 285, 195, 285);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text('NATIONAL FORENSIC AGENCY // STRATEGIC BRIEFING MATERIAL', 15, 290);
      doc.text(`Page ${i} of ${totalPages}`, 195, 290, { align: 'right' });
    }

    doc.save(`Strategic_Incident_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleDownloadIncidentReport = (incident: typeof incidentsData[0]) => {
    // Create detailed incident report
    const reportContent = `
INCIDENT REPORT
===============

Incident ID: ${incident.id}
Date: ${incident.date}
Time: ${incident.time}
Location: ${incident.location}
Coordinates: ${incident.coords}

INCIDENT DETAILS
================
Type: ${incident.type}
Severity: ${incident.severity.toUpperCase()}
Casualties: ${incident.casualties}
Status: ${incident.status}
TTP Cluster: ${incident.ttpcCluster}

EVIDENCE
========
Total Evidence Files: ${incident.evidence}
- CCTV Footage: 245 MB
- Scene Photos: 48 MB
- Field Reports: 2.4 MB

ASSIGNED TEAM
=============
Lead Investigator: Major Ahmed Khan
Forensic Analyst: Dr. Zainab Qureshi

REPORT GENERATED: ${new Date().toLocaleString()}
    `.trim();

    // Create blob and download
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${incident.id}_full_report.txt`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewEvidenceRepository = (incident: typeof incidentsData[0]) => {
    // Create evidence repository summary
    const evidenceContent = `
EVIDENCE REPOSITORY
===================
Incident: ${incident.id}
Location: ${incident.location}
Date: ${incident.date}

EVIDENCE INVENTORY
==================

1. VIDEO EVIDENCE
   - CCTV_Footage_001.mp4 (245 MB)
   - Uploaded: ${incident.date} ${incident.time}
   - Status: Verified
   - Hash: a3f5e8d9c2b1f4a6

2. PHOTOGRAPHIC EVIDENCE
   - Scene_Photo_001.jpg (12 MB)
   - Scene_Photo_002.jpg (15 MB)
   - Scene_Photo_003.jpg (21 MB)
   - Uploaded: ${incident.date}
   - Status: Verified
   - Total: 48 MB

3. DOCUMENTATION
   - Field_Report_Initial.pdf (1.2 MB)
   - Forensic_Analysis.pdf (0.8 MB)
   - Witness_Statements.pdf (0.4 MB)
   - Total: 2.4 MB

4. FORENSIC DATA
   - DNA_Samples: 3 items
   - Fingerprints: 7 items
   - Ballistic_Evidence: 2 items

TOTAL EVIDENCE FILES: ${incident.evidence}
TOTAL SIZE: 295.4 MB
CHAIN OF CUSTODY: Verified
ACCESS LEVEL: Classified

Generated: ${new Date().toLocaleString()}
    `.trim();

    // Create blob and download
    const blob = new Blob([evidenceContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${incident.id}_evidence_repository.txt`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full z-0 relative">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#0096FF] to-[#0052FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#0096FF]/20">
              <AlertTriangle className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl text-white font-bold mb-0.5 truncate uppercase tracking-tight">Intelligence Registry</h1>
              <p className="text-[10px] sm:text-xs text-white/50 tracking-widest uppercase font-mono truncate">Live Operational Incident Feed</p>
            </div>
          </div>
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0096FF] via-[#0066FF] to-[#0052FF] hover:from-[#0052FF] hover:to-[#0033CC] text-white rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,150,255,0.3)] hover:shadow-[0_0_30px_rgba(0,150,255,0.5)] active:scale-[0.98] border border-white/10 hover:border-white/30 group relative overflow-hidden"
            onClick={handleExportReport}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12"></div>
            <Download className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Generate Strategic Report</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative z-[1]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search by ID or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF]"
              />
            </div>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#0096FF]"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Critical Threats', value: incidentsData.filter(i => i.severity === 'critical').length, color: '#FF0000', icon: AlertTriangle },
            { label: 'Active Investigation', value: incidentsData.filter(i => i.status.includes('Investigation')).length, color: '#FF6B00', icon: Clock },
            { label: 'Neutralized Devices', value: incidentsData.filter(i => i.type === 'Defused').length, color: '#00FF88', icon: CheckCircle },
            { label: 'Mission Impact', value: incidentsData.reduce((sum, i) => sum + i.casualties, 0), color: '#0096FF', icon: TrendingUp },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/10 rounded-lg p-4 hover:border-[#0096FF]/30 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{stat.label}</p>
                <stat.icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Incidents Registry Focal Point */}
        <div className="bg-[#0A192F]/80 backdrop-blur-md border border-[#0096FF]/20 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto custom-scrollbar p-1">
            <table className="w-full min-w-[1100px] border-collapse">
              <thead>
                <tr className="border-b border-[#0096FF]/20 bg-[#0A192F]/50">
                  <th className="text-left py-4 px-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Registry ID</th>
                  <th className="text-left py-4 px-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Temporal Data</th>
                  <th className="text-left py-4 px-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Geographic Info</th>
                  <th className="text-left py-4 px-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Tactical Type</th>
                  <th className="text-left py-4 px-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Priority</th>
                  <th className="text-left py-4 px-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Impact</th>
                  <th className="text-left py-4 px-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Operational Status</th>
                  <th className="text-left py-4 px-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Classification</th>
                  <th className="text-left py-4 px-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((incident) => {
                  const StatusIcon = getStatusIcon(incident.status);

                  return (
                    <tr
                      key={incident.id}
                      className={`
                        border-b border-[#0096FF]/10 cursor-pointer transition-all
                        ${selectedIncident === incident.id ? 'bg-[#0096FF]/10' : 'hover:bg-white/5'}
                      `}
                      onClick={() => setSelectedIncident(incident.id)}
                    >
                      <td className="py-4 px-6">
                        <span className="text-sm font-mono text-[#0096FF]">{incident.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-sm text-white/90 font-medium">{incident.date}</span>
                          <span className="text-[10px] text-white/40">{incident.time}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-sm text-white/90">{incident.location}</span>
                          <span className="text-[10px] text-white/40 font-mono">{incident.coords}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${getSeverityColor(incident.severity)}20`,
                            color: getSeverityColor(incident.severity),
                            border: `1px solid ${getSeverityColor(incident.severity)}40`
                          }}
                        >
                          {incident.type}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                            style={{ backgroundColor: getSeverityColor(incident.severity), color: getSeverityColor(incident.severity) }}
                          />
                          <span className="text-sm text-white/80 capitalize">{incident.severity}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-bold text-white/90">{incident.casualties}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-[#0096FF]">
                          <StatusIcon className="w-4 h-4" />
                          <span className="text-[11px] font-medium">{incident.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-mono text-[#0096FF]/80">{incident.ttpcCluster}</span>
                      </td>
                      <td className="py-4 px-6">
                        <button className="px-4 py-1.5 bg-[#0096FF]/20 hover:bg-[#0096FF]/30 border border-[#0096FF] text-[#0096FF] rounded text-[11px] font-bold transition-all active:scale-95">
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center text-sm text-white/40 uppercase tracking-widest font-bold">
          {filteredIncidents.length} Records Isolated
        </div>
      </div>

      {/* Incident Detail Modal */}
      {selectedIncident && selectedIncidentData && (
        <div className="fixed inset-0 top-16 bg-black/90 backdrop-blur-md flex items-center justify-center z-[2000] p-0 sm:p-4" onClick={() => setSelectedIncident(null)}>
          <div className="bg-[#0A192F] sm:border sm:border-[#0096FF]/30 sm:rounded-xl w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[calc(100vh-6rem)] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#0A192F]/90 backdrop-blur-md border-b border-[#0096FF]/20 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0096FF]/20 rounded-lg flex items-center justify-center border border-[#0096FF]/30">
                  <AlertTriangle className="w-5 h-5 text-[#0096FF]" />
                </div>
                <div>
                  <h2 className="text-lg text-white font-bold leading-tight uppercase tracking-tight">Post-Incident Analysis</h2>
                  <p className="text-xs text-[#0096FF] font-mono">{selectedIncidentData.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="p-3 hover:bg-[#FF0000]/20 rounded-full transition-all group"
              >
                <X className="w-6 h-6 text-white/60 group-hover:text-[#FF0000]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Status Banner */}
              <div className="p-5 bg-gradient-to-r from-[#0096FF]/10 to-transparent border-l-4 border-[#0096FF] rounded-r-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Incident Lifecycle</p>
                    <p className="text-white text-sm font-medium">{selectedIncidentData.status}</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: getSeverityColor(selectedIncidentData.severity), color: getSeverityColor(selectedIncidentData.severity) }} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{selectedIncidentData.severity} Priority</span>
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-[10px] text-white/40 uppercase font-bold tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#0096FF] rounded-full"></div>
                    Spatio-Temporal Evidence
                  </h3>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-white/40">Timestamp</span>
                      <span className="text-xs text-white font-medium">{selectedIncidentData.date} | {selectedIncidentData.time}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-white/40">Location</span>
                      <span className="text-xs text-white font-medium">{selectedIncidentData.location}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-white/40">Coordinates</span>
                      <span className="text-xs text-[#0096FF] font-mono">{selectedIncidentData.coords}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] text-white/40 uppercase font-bold tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></div>
                    Tactical Parameters
                  </h3>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-white/40">Ordnance Type</span>
                      <span className="text-xs text-white font-medium">{selectedIncidentData.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-white/40">Personnel Loss</span>
                      <span className="text-xs text-[#FF0000] font-bold">{selectedIncidentData.casualties}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-white/40">Signature Cluster</span>
                      <span className="text-xs text-[#0096FF] font-mono">{selectedIncidentData.ttpcCluster}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Hub */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-gradient-to-r from-[#0096FF] to-[#0052FF] hover:from-[#0052FF] hover:to-[#0042CC] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-[#0096FF]/30 hover:shadow-[#0096FF]/50 transition-all active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-white/10"
                  onClick={() => handleDownloadIncidentReport(selectedIncidentData)}
                >
                  <Download className="w-5 h-5" />
                  Detailed Forensic Report
                </button>
                <button
                  className="flex-1 bg-[#1A2C4E] hover:bg-[#233B66] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all active:scale-[0.98] hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-[#0096FF]/30 hover:border-[#0096FF] shadow-lg shadow-black/20"
                  onClick={() => handleViewEvidenceRepository(selectedIncidentData)}
                >
                  <FileText className="w-5 h-5 text-[#0096FF]" />
                  Evidence Repository
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 150, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 150, 255, 0.5);
        }
      `}} />
    </div>
  );
}