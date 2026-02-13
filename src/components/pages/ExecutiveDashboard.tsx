import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Crown, TrendingUp, AlertTriangle, Target, Users, Shield, MapPin, Activity, ArrowUp, ArrowDown, Zap, Eye, CheckCircle, XCircle, Clock, Briefcase, X, FileText, ExternalLink } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const executiveMetrics = [
  {
    label: 'National Threat Level',
    value: 'ELEVATED',
    score: 72,
    trend: '+8%',
    trendUp: true,
    icon: Shield,
    color: '#FF6B00',
    description: 'Multi-source intelligence assessment'
  },
  {
    label: 'Active Investigations',
    value: '247',
    score: 85,
    trend: '+12',
    trendUp: true,
    icon: Target,
    color: '#0096FF',
    description: 'Ongoing forensic operations'
  },
  {
    label: 'Incidents (30d)',
    value: '89',
    score: 45,
    trend: '-23%',
    trendUp: false,
    icon: AlertTriangle,
    color: '#00FF88',
    description: 'Compared to previous period'
  },
  {
    label: 'Intelligence Success Rate',
    value: '94.3%',
    score: 94,
    trend: '+2.1%',
    trendUp: true,
    icon: CheckCircle,
    color: '#00FF88',
    description: 'Actionable intelligence accuracy'
  },
];

const nationalThreatTrend = [
  { month: 'Jun', level: 58, incidents: 42, prevented: 38 },
  { month: 'Jul', level: 62, incidents: 47, prevented: 43 },
  { month: 'Aug', level: 68, incidents: 53, prevented: 48 },
  { month: 'Sep', level: 71, incidents: 61, prevented: 55 },
  { month: 'Oct', level: 69, incidents: 58, prevented: 52 },
  { month: 'Nov', level: 73, incidents: 64, prevented: 59 },
  { month: 'Dec', level: 72, incidents: 62, prevented: 58 },
];

const regionalThreatDistribution = [
  { region: 'KPK Province', threat: 92, incidents: 34, status: 'Critical' },
  { region: 'Balochistan', threat: 88, incidents: 28, status: 'Critical' },
  { region: 'Karachi Metro', threat: 76, incidents: 21, status: 'High' },
  { region: 'Punjab', threat: 64, incidents: 15, status: 'Elevated' },
  { region: 'Sindh Interior', threat: 58, incidents: 11, status: 'Moderate' },
  { region: 'Islamabad Capital', threat: 52, incidents: 8, status: 'Moderate' },
];

const operationalReadiness = [
  { category: 'Personnel', value: 96 },
  { category: 'Equipment', value: 89 },
  { category: 'Intelligence', value: 94 },
  { category: 'Coordination', value: 91 },
  { category: 'Response Time', value: 87 },
  { category: 'Training', value: 93 },
];

const threatTypeDistribution = [
  { name: 'IED/VBIED', value: 38, color: '#FF0000' },
  { name: 'Network Activity', value: 24, color: '#FF6B00' },
  { name: 'Border Threats', value: 18, color: '#FFB800' },
  { name: 'Cyber Attacks', value: 12, color: '#0096FF' },
  { name: 'Other', value: 8, color: '#2F4F4F' },
];

const keyIntelligenceUpdates = [
  {
    id: 1,
    priority: 'CRITICAL',
    title: 'Cross-Border Network Detected',
    region: 'Peshawar District',
    timestamp: '2h ago',
    status: 'Active Investigation',
    officer: 'Brig. Ahmed Khan',
    confidence: 96
  },
  {
    id: 2,
    priority: 'HIGH',
    title: 'Precursor Materials Intercepted',
    region: 'Quetta',
    timestamp: '5h ago',
    status: 'Neutralized',
    officer: 'Col. Fatima Malik',
    confidence: 92
  },
  {
    id: 3,
    priority: 'HIGH',
    title: 'Suspicious Network Pattern',
    region: 'Karachi Port',
    timestamp: '8h ago',
    status: 'Under Surveillance',
    officer: 'Maj. Hassan Raza',
    confidence: 88
  },
  {
    id: 4,
    priority: 'MEDIUM',
    title: 'Device Signature Match',
    region: 'Lahore',
    timestamp: '12h ago',
    status: 'Analysis Complete',
    officer: 'Capt. Zainab Ali',
    confidence: 85
  },
];

const agencyPerformance = [
  { metric: 'Case Closure Rate', current: 87, target: 85, unit: '%' },
  { metric: 'Response Time (avg)', current: 2.4, target: 3.0, unit: 'hrs' },
  { metric: 'Intelligence Sharing', current: 94, target: 90, unit: '%' },
  { metric: 'Threat Prevention', current: 91, target: 85, unit: '%' },
];

const allIntelligenceReports = [
  ...keyIntelligenceUpdates,
  {
    id: 5,
    priority: 'MEDIUM',
    title: 'Encrypted Comms Intercept',
    region: 'Cyber Command',
    timestamp: '14h ago',
    status: 'Decryption in Progress',
    officer: 'Lt. Cdr. Hamza',
    confidence: 78
  },
  {
    id: 6,
    priority: 'LOW',
    title: 'Routine Border Scan',
    region: 'Waziristan Sector',
    timestamp: '1d ago',
    status: 'Completed',
    officer: 'Maj. Zeeshan',
    confidence: 99
  },
  {
    id: 7,
    priority: 'HIGH',
    title: 'Asset Relocation Detected',
    region: 'Rawalpindi',
    timestamp: '1d 4h ago',
    status: 'Monitoring',
    officer: 'Col. Riaz',
    confidence: 88
  }
];

// Detailed regional data
const regionalDetailedData: Record<string, any> = {
  'KPK Province': {
    recentIncidents: [
      { id: 1, type: 'IED Attack', location: 'Peshawar District', date: '2024-02-08', casualties: 3, status: 'Investigating' },
      { id: 2, type: 'Border Infiltration', location: 'Khyber Agency', date: '2024-02-07', casualties: 0, status: 'Neutralized' },
      { id: 3, type: 'Network Activity', location: 'Swat Valley', date: '2024-02-06', casualties: 0, status: 'Under Surveillance' },
    ],
    activeOperations: [
      { name: 'Operation Thunder Strike', status: 'Active', personnel: 450, startDate: '2024-01-15' },
      { name: 'Border Patrol Alpha', status: 'Active', personnel: 200, startDate: '2024-02-01' },
    ],
    intelligence: {
      threatSources: ['Cross-border networks', 'Local extremist cells', 'IED manufacturing'],
      keyTargets: 12,
      surveillancePoints: 28,
      informantNetwork: 'Extensive'
    }
  },
  'Balochistan': {
    recentIncidents: [
      { id: 1, type: 'Precursor Seizure', location: 'Quetta', date: '2024-02-09', casualties: 0, status: 'Completed' },
      { id: 2, type: 'Vehicle Checkpoint', location: 'Chaman Border', date: '2024-02-07', casualties: 0, status: 'Ongoing' },
      { id: 3, type: 'Suspicious Activity', location: 'Gwadar Port', date: '2024-02-05', casualties: 0, status: 'Monitoring' },
    ],
    activeOperations: [
      { name: 'Coastal Security', status: 'Active', personnel: 320, startDate: '2024-01-20' },
      { name: 'Highway Patrol', status: 'Active', personnel: 180, startDate: '2024-01-10' },
    ],
    intelligence: {
      threatSources: ['Separatist groups', 'Smuggling networks', 'Foreign interference'],
      keyTargets: 9,
      surveillancePoints: 22,
      informantNetwork: 'Moderate'
    }
  },
  'Karachi Metro': {
    recentIncidents: [
      { id: 1, type: 'Cyber Attack Attempt', location: 'Port Authority', date: '2024-02-10', casualties: 0, status: 'Blocked' },
      { id: 2, type: 'Suspicious Package', location: 'Saddar', date: '2024-02-08', casualties: 0, status: 'Cleared' },
      { id: 3, type: 'Network Monitoring', location: 'Clifton', date: '2024-02-06', casualties: 0, status: 'Active' },
    ],
    activeOperations: [
      { name: 'Metro Shield', status: 'Active', personnel: 580, startDate: '2024-01-05' },
      { name: 'Port Security', status: 'Active', personnel: 250, startDate: '2024-01-12' },
    ],
    intelligence: {
      threatSources: ['Urban networks', 'Port vulnerabilities', 'Financial crimes'],
      keyTargets: 15,
      surveillancePoints: 45,
      informantNetwork: 'Strong'
    }
  },
  'Punjab': {
    recentIncidents: [
      { id: 1, type: 'Device Signature Match', location: 'Lahore', date: '2024-02-09', casualties: 0, status: 'Analyzed' },
      { id: 2, type: 'Routine Patrol', location: 'Multan', date: '2024-02-07', casualties: 0, status: 'Normal' },
      { id: 3, type: 'Intelligence Tip', location: 'Faisalabad', date: '2024-02-05', casualties: 0, status: 'Verified' },
    ],
    activeOperations: [
      { name: 'Urban Watch', status: 'Active', personnel: 420, startDate: '2024-01-18' },
      { name: 'Highway Security', status: 'Active', personnel: 190, startDate: '2024-01-25' },
    ],
    intelligence: {
      threatSources: ['Sleeper cells', 'Transit routes', 'Communication hubs'],
      keyTargets: 8,
      surveillancePoints: 32,
      informantNetwork: 'Moderate'
    }
  },
  'Sindh Interior': {
    recentIncidents: [
      { id: 1, type: 'Routine Inspection', location: 'Hyderabad', date: '2024-02-08', casualties: 0, status: 'Clear' },
      { id: 2, type: 'Border Patrol', location: 'Tharparkar', date: '2024-02-06', casualties: 0, status: 'Normal' },
      { id: 3, type: 'Community Report', location: 'Larkana', date: '2024-02-04', casualties: 0, status: 'Investigated' },
    ],
    activeOperations: [
      { name: 'Rural Patrol', status: 'Active', personnel: 280, startDate: '2024-01-22' },
      { name: 'Border Watch', status: 'Active', personnel: 150, startDate: '2024-02-01' },
    ],
    intelligence: {
      threatSources: ['Smuggling routes', 'Rural hideouts', 'Transit points'],
      keyTargets: 5,
      surveillancePoints: 18,
      informantNetwork: 'Developing'
    }
  },
  'Islamabad Capital': {
    recentIncidents: [
      { id: 1, type: 'Security Drill', location: 'Blue Area', date: '2024-02-10', casualties: 0, status: 'Completed' },
      { id: 2, type: 'VIP Protection', location: 'Diplomatic Enclave', date: '2024-02-09', casualties: 0, status: 'Ongoing' },
      { id: 3, type: 'Cyber Monitoring', location: 'Government Sector', date: '2024-02-07', casualties: 0, status: 'Active' },
    ],
    activeOperations: [
      { name: 'Capital Shield', status: 'Active', personnel: 650, startDate: '2024-01-01' },
      { name: 'Diplomatic Security', status: 'Active', personnel: 300, startDate: '2024-01-01' },
    ],
    intelligence: {
      threatSources: ['High-value targets', 'Diplomatic threats', 'Cyber attacks'],
      keyTargets: 6,
      surveillancePoints: 52,
      informantNetwork: 'Extensive'
    }
  }
};

// Detailed report data
const detailedReports: Record<number, any> = {
  1: {
    title: 'Cross-Border Network Detected',
    summary: 'High-frequency communication intercepts indicate coordinated movement along the Peshawar border sector. Satellite imagery confirms vehicle mobilization matching known smuggling patterns.',
    intelligenceSource: 'SIGINT / SATINT',
    entities: ['Network Alpha', 'Safe House B-12'],
    recommendedActions: ['Deploy rapid response team', 'Increase drone surveillance', 'Alert border checkpoints'],
    fullAnalysis: 'Analysis of encrypted communications suggests a major narcotics and arms shipment is planned for the next 48 hours. The network is using new frequency hopping techniques to evade detection. Corroborating human intelligence places key operatives in the vicinity.'
  },
  2: {
    title: 'Precursor Materials Intercepted',
    summary: 'A commercial truck intercepted at Quetta checkpoint contained 500kg of dual-use chemicals (Ammonium Nitrate) concealed under agricultural produce.',
    intelligenceSource: 'HUMINT / Checkpoint Inspection',
    entities: ['Transport Company X', 'Operative Y'],
    recommendedActions: ['Conduct forensic analysis of materials', 'Trace supply chain origin', 'Interrogate driver'],
    fullAnalysis: 'The quantity of materials seized is sufficient for multiple large-scale IEDs. Preliminary testing confirms high purity. Driver claims ignorance but has prior flags for suspicious activity. Connection to regional extremist groups is suspected.'
  },
  3: {
    title: 'Suspicious Network Pattern',
    summary: 'Anomalous data traffic detected from a shipping container in Karachi Port. Pattern matches control signals for remote detonation devices.',
    intelligenceSource: 'CYBERINT',
    entities: ['Container #KPC-9982', 'Foreign IP Address'],
    recommendedActions: ['Lock down port sector 4', 'Jam local frequencies', 'Deploy bomb disposal unit'],
    fullAnalysis: 'Cyber surveillance algorithms flagged the traffic due to its unique packet structure. The signals are originating from a registered commercial container but are communicating with a known hostile server node. Immediate physical inspection required.'
  },
  4: {
    title: 'Device Signature Match',
    summary: 'Forensic analysis of a recovered device in Lahore matches the signature of a known bomb-maker previously active in the border region.',
    intelligenceSource: 'FORENSICS',
    entities: ['Bomb Maker Z', 'Lahore Cell'],
    recommendedActions: ['Update threat profiles', 'Expand search radius', 'Cross-reference with recent travel records'],
    fullAnalysis: 'The circuit design and soldering technique are distinctive to "Engineer Z". This suggests the individual has relocated or is training a new cell in the urban center. This represents a significant escalation in local threat capability.'
  },
  5: {
    title: 'Encrypted Comms Intercept',
    summary: 'A burst of high-grade encrypted traffic was intercepted from a known safehouse node. The encryption protocol matches foreign militant standards.',
    intelligenceSource: 'SIGINT',
    entities: ['Node X-ray', 'Foreign Group A'],
    recommendedActions: ['Prioritize decryption', 'Trace signal origin', 'Deploy field operatives'],
    fullAnalysis: 'The signal duration and frequency hopping suggest a high-value coordination message. While content remains encrypted, traffic analysis indicates a broadcast to multiple sleeper cells.'
  },
  6: {
    title: 'Routine Border Scan',
    summary: 'Daily aerial surveillance of the Waziristan sector shows no anomalous movements. Local terrain changes are consistent with seasonal weather patterns.',
    intelligenceSource: 'IMINT (Drone)',
    entities: ['Sector 7G'],
    recommendedActions: ['Continue scheduled monitoring', 'Update seasonal baselines'],
    fullAnalysis: 'No threats detected. Baseline terrain data has been updated. Vegetation growth in key passes is noted for future reference in ground operations.'
  },
  7: {
    title: 'Asset Relocation Detected',
    summary: 'Surveillance confirms the movement of a high-value asset from a suspected safehouse in Rawalpindi to an undisclosed location in the suburbs.',
    intelligenceSource: 'HUMINT / Surveillance',
    entities: ['Target Alpha', 'Vehicle Toyota Hilux'],
    recommendedActions: ['Maintain visual contact', 'Prepare localized containment team', 'Do not engage without confirmation'],
    fullAnalysis: 'Target Alpha was observed entering a vehicle at 0400 hours. Movement appears to be a defensive relocation following recent raids. This presents a potential opportunity for capture in transit, though risks of collateral damage in urban areas must be weighed.'
  }
};

export default function ExecutiveDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [showAllReportsModal, setShowAllReportsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ message: string, type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportPDF = () => {
    if (selectedReport === null) return;

    const detailed = detailedReports[selectedReport as keyof typeof detailedReports];
    const metadata = allIntelligenceReports.find(r => r.id === selectedReport);

    if (!detailed || !metadata) return;

    showToast('Initializing secure strategic briefing export...', 'info');

    setTimeout(() => {
      const doc = new jsPDF();
      const timestamp = new Date().toLocaleString();
      const reportID = `INTEL-TX-${selectedReport}-${Math.floor(Math.random() * 10000)}`;

      // --- Modern Background / Header ---
      doc.setFillColor(10, 25, 47); // Navy blue header
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('EXECUTIVE INTELLIGENCE BRIEF', 20, 22);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`REPORT ID: ${reportID} | GENERATED: ${timestamp}`, 20, 32);

      // --- Security Classification ---
      doc.setFillColor(255, 0, 0); // Red tag for executive reports
      doc.rect(160, 15, 40, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('TOP SECRET // NOFORN', 180, 21.5, { align: 'center' });

      let y = 55;

      // --- Metadata Grid ---
      doc.setFillColor(240, 245, 250);
      doc.rect(20, y, 170, 30, 'F');
      doc.setTextColor(10, 25, 47);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('TITLE:', 25, y + 8);
      doc.text('OFFICER:', 25, y + 16);
      doc.text('PRIORITY:', 25, y + 24);
      doc.text('REGION:', 100, y + 8);
      doc.text('SOURCE:', 100, y + 16);
      doc.text('CONFIDENCE:', 100, y + 24);

      doc.setFont('helvetica', 'normal');
      doc.text(detailed.title, 45, y + 8);
      doc.text(metadata.officer, 45, y + 16);
      doc.text(metadata.priority, 45, y + 24);
      doc.text(metadata.region, 125, y + 8);
      doc.text(detailed.intelligenceSource, 125, y + 16);
      doc.text(`${metadata.confidence}%`, 125, y + 24);
      y += 45;

      const addSection = (title: string, content: string | string[], isList = false) => {
        doc.setTextColor(10, 25, 47);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 20, y);
        y += 2;
        doc.setDrawColor(0, 150, 255);
        doc.setLineWidth(0.5);
        doc.line(20, y, 190, y);
        y += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);

        if (isList && Array.isArray(content)) {
          content.forEach(item => {
            doc.text(`- ${item}`, 20, y);
            y += 5;
          });
          y += 5;
        } else {
          const splitText = doc.splitTextToSize(content as string || 'Information restricted.', 170);
          doc.text(splitText, 20, y);
          y += (splitText.length * 5) + 12;
        }

        if (y > 250) {
          doc.addPage();
          y = 30;
        }
      };

      addSection('EXECUTIVE SUMMARY', detailed.summary);
      addSection('DETAILED OPERATIONAL ANALYSIS', detailed.fullAnalysis);
      addSection('RECOMMENDED ACTION PROTOCOLS', detailed.recommendedActions, true);
      addSection('IDENTIFIED ENTITIES & NETWORKS', detailed.entities.join(', '));

      // --- Footer ---
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 280, 190, 280);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('STRICTLY CONFIDENTIAL // EXECUTIVE COMMAND LEVEL 1 ACCESS ONLY', 20, 285);
        doc.text(`PAGE ${i} OF ${pageCount}`, 190, 285, { align: 'right' });
      }

      doc.save(`Executive_Intel_Report_${selectedReport}.pdf`);
      showToast('Strategic Intel PDF generated and exported successfully.', 'success');
    }, 2000);
  };

  const handleInitiateProtocol = () => {
    console.log('Initiate Protocol button clicked');
    showToast('Response protocol initiated. Teams have been alerted.', 'info');
  };

  const getThreatColor = (level: number) => {
    if (level >= 80) return '#FF0000';
    if (level >= 70) return '#FF6B00';
    if (level >= 60) return '#FFB800';
    return '#00FF88';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return '#FF0000';
      case 'HIGH': return '#FF6B00';
      case 'MEDIUM': return '#FFB800';
      default: return '#0096FF';
    }
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Executive Header */}
      <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FFB800] rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FFB800]/20 rounded-lg flex items-center justify-center border border-[#FFB800]/30 shadow-lg shadow-[#FFB800]/10">
              <Crown className="w-7 h-7 md:w-8 md:h-8 text-[#FFB800]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-white font-medium mb-1">Executive Command</h1>
              <p className="text-xs md:text-sm text-white/50 tracking-wide">Director General - National Intelligence Nexus</p>
            </div>
          </div>
          <div className="md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#FFB800]/30 pl-4 md:pl-0 md:pr-4">
            <div className="flex items-center md:justify-end gap-2 mb-1">
              <div className="w-2.5 h-2.5 bg-[#00FF88] rounded-full animate-pulse shadow-[0_0_8px_#00FF88]"></div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00FF88]">Live Intel Feed</span>
            </div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Last Update: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {executiveMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg p-4 hover:border-[#0096FF]/40 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${metric.color}20` }}>
                    <Icon className="w-5 h-5" style={{ color: metric.color }} />
                  </div>
                  <div className="flex items-center gap-1">
                    {metric.trendUp ? (
                      <ArrowUp className="w-4 h-4 text-[#00FF88]" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-[#FF6B00]" />
                    )}
                    <span className={`text-xs ${metric.trendUp ? 'text-[#00FF88]' : 'text-[#FF6B00]'}`}>
                      {metric.trend}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl text-white mb-1">{metric.value}</p>
                  <p className="text-xs text-white/60 mb-2">{metric.label}</p>
                  <div className="h-1 bg-[#414141] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${metric.score}%`,
                        backgroundColor: metric.color
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* National Threat Trend */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <h2 className="text-lg text-white">National Threat Assessment</h2>
                <p className="text-sm text-white/60">6-Month Strategic Overview</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF6B00]" />
                <span className="text-xs text-white/60">Threat Level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0096FF]" />
                <span className="text-xs text-white/60">Incidents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                <span className="text-xs text-white/60">Prevented</span>
              </div>
            </div>
          </div>

          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={nationalThreatTrend}>
                <defs>
                  <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0096FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0096FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0096FF" opacity={0.1} />
                <XAxis dataKey="month" stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 10 }} />
                <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff60', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A192F',
                    border: '1px solid #0096FF',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="level" stroke="#FF6B00" fill="url(#threatGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="incidents" stroke="#0096FF" fill="url(#incidentGradient)" strokeWidth={2} />
                <Line type="monotone" dataKey="prevented" stroke="#00FF88" strokeWidth={2} dot={{ fill: '#00FF88', r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-lg">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Threat Level</p>
              <p className="text-xl text-[#FF6B00] font-bold">72/100</p>
              <p className="text-[10px] text-white/60 mt-1">ELEVATED STATUS</p>
            </div>
            <div className="p-3 bg-[#0096FF]/10 border border-[#0096FF]/30 rounded-lg">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Avg Incidents</p>
              <p className="text-xl text-[#0096FF] font-bold">56</p>
              <p className="text-[10px] text-white/60 mt-1">6-MONTH BASELINE</p>
            </div>
            <div className="p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Prevention</p>
              <p className="text-xl text-[#00FF88] font-bold">93.5%</p>
              <p className="text-[10px] text-white/60 mt-1">OPERATIONAL SUCCESS</p>
            </div>
          </div>
        </div>

        {/* Threat Type Distribution */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-[#0096FF]" />
            </div>
            <div>
              <h2 className="text-lg text-white">Threat Distribution</h2>
              <p className="text-sm text-white/60">By Category (30d)</p>
            </div>
          </div>

          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {threatTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A192F',
                    border: '1px solid #0096FF',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {threatTypeDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                  <span className="text-white/80">{item.name}</span>
                </div>
                <span className="text-white/60">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Threat Assessment & Operational Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Threat Map */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#FF6B00]" />
            </div>
            <div>
              <h2 className="text-lg text-white">Regional Threat Assessment</h2>
              <p className="text-sm text-white/60">Province-Level Intelligence</p>
            </div>
          </div>

          <div className="space-y-3">
            {regionalThreatDistribution.map((region, index) => (
              <div
                key={region.region}
                className="p-3 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg hover:border-[#0096FF]/30 transition-all cursor-pointer"
                onClick={() => setSelectedRegion(region.region)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getThreatColor(region.threat)}20` }}>
                      <span className="text-xs" style={{ color: getThreatColor(region.threat) }}>{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm text-white">{region.region}</p>
                      <p className="text-xs text-white/60">{region.incidents} incidents</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg" style={{ color: getThreatColor(region.threat) }}>{region.threat}</p>
                    <p className="text-xs text-white/60">{region.status}</p>
                  </div>
                </div>
                <div className="h-1.5 bg-[#414141] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${region.threat}%`,
                      backgroundColor: getThreatColor(region.threat)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Readiness */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#00FF88]/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div>
              <h2 className="text-lg text-white">Operational Readiness</h2>
              <p className="text-sm text-white/60">Multi-Domain Assessment</p>
            </div>
          </div>

          <div className="h-64 md:h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={operationalReadiness}>
                <PolarGrid stroke="#0096FF" opacity={0.2} />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: '#ffffff80', fontSize: 10 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#ffffff60', fontSize: 9 }}
                />
                <Radar
                  name="Readiness"
                  dataKey="value"
                  stroke="#00FF88"
                  fill="#00FF88"
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

          <div className="mt-4 p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">Overall Readiness Score</span>
              <span className="text-sm text-[#00FF88]">91.7% - EXCELLENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Detail Modal */}
      {selectedRegion && regionalDetailedData[selectedRegion] && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedRegion(null)}>
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border-b border-[#0096FF]/20 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <div>
                  <h2 className="text-xl text-white">{selectedRegion} - Detailed Intelligence</h2>
                  <p className="text-sm text-white/60">Comprehensive Regional Assessment</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRegion(null)}
                className="w-10 h-10 bg-[#FF0000]/20 hover:bg-[#FF0000]/30 border border-[#FF0000] rounded-lg flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-[#FF0000]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Recent Incidents */}
              <div>
                <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#FF6B00]" />
                  Recent Incidents
                </h3>
                <div className="space-y-3">
                  {regionalDetailedData[selectedRegion].recentIncidents.map((incident: any) => (
                    <div key={incident.id} className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm text-white font-medium">{incident.type}</p>
                          <p className="text-xs text-white/60 mt-1">{incident.location}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-[#0096FF]/20 border border-[#0096FF] rounded text-[#0096FF]">
                          {incident.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/60">
                        <span>Date: {incident.date}</span>
                        <span>Casualties: {incident.casualties}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Operations */}
              <div>
                <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#0096FF]" />
                  Active Operations
                </h3>
                <div className="space-y-3">
                  {regionalDetailedData[selectedRegion].activeOperations.map((operation: any, idx: number) => (
                    <div key={idx} className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm text-white font-medium">{operation.name}</p>
                          <p className="text-xs text-white/60 mt-1">Started: {operation.startDate}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-[#00FF88]/20 border border-[#00FF88] rounded text-[#00FF88]">
                          {operation.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Users className="w-3 h-3" />
                        <span>{operation.personnel} Personnel Deployed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intelligence Summary */}
              <div>
                <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#FFB800]" />
                  Intelligence Summary
                </h3>
                <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg space-y-4">
                  <div>
                    <p className="text-xs text-white/60 mb-2">Threat Sources</p>
                    <div className="flex flex-wrap gap-2">
                      {regionalDetailedData[selectedRegion].intelligence.threatSources.map((source: string, idx: number) => (
                        <span key={idx} className="text-xs px-3 py-1 bg-[#FF6B00]/20 border border-[#FF6B00] rounded text-[#FF6B00]">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-[#0096FF]/10 border border-[#0096FF]/30 rounded">
                      <p className="text-xs text-white/60 mb-1">Key Targets</p>
                      <p className="text-xl text-[#0096FF]">{regionalDetailedData[selectedRegion].intelligence.keyTargets}</p>
                    </div>
                    <div className="p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded">
                      <p className="text-xs text-white/60 mb-1">Surveillance Points</p>
                      <p className="text-xl text-[#00FF88]">{regionalDetailedData[selectedRegion].intelligence.surveillancePoints}</p>
                    </div>
                    <div className="p-3 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded">
                      <p className="text-xs text-white/60 mb-1">Informant Network</p>
                      <p className="text-xl text-[#FFB800]">{regionalDetailedData[selectedRegion].intelligence.informantNetwork}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Report Modal */}
      {selectedReport && detailedReports[selectedReport] && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedReport(null)}>
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border-b border-[#0096FF]/20 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <div>
                  <h2 className="text-xl text-white">Intelligence Report #{selectedReport}</h2>
                  <p className="text-sm text-white/60">CLASSIFIED • {detailedReports[selectedReport].title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="w-10 h-10 bg-[#FF0000]/20 hover:bg-[#FF0000]/30 border border-[#FF0000] rounded-lg flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-[#FF0000]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Executive Summary */}
              <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                <h3 className="text-sm text-[#0096FF] uppercase tracking-wider mb-2">Executive Summary</h3>
                <p className="text-white/90 leading-relaxed">{detailedReports[selectedReport].summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Source & Entities */}
                <div className="space-y-4">
                  <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg h-full">
                    <h3 className="text-sm text-[#0096FF] uppercase tracking-wider mb-3">Intelligence Source</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-4 h-4 text-[#FFB800]" />
                      <span className="text-white font-medium">{detailedReports[selectedReport].intelligenceSource}</span>
                    </div>

                    <h3 className="text-sm text-[#0096FF] uppercase tracking-wider mb-3">Related Entities</h3>
                    <div className="flex flex-wrap gap-2">
                      {detailedReports[selectedReport].entities.map((entity: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs rounded">
                          {entity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommended Actions */}
                <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                  <h3 className="text-sm text-[#00FF88] uppercase tracking-wider mb-3">Recommended Actions</h3>
                  <ul className="space-y-2">
                    {detailedReports[selectedReport].recommendedActions.map((action: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00FF88] mt-0.5" />
                        <span className="text-white/80 text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Full Analysis */}
              <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                <h3 className="text-sm text-[#0096FF] uppercase tracking-wider mb-2">Full Analysis</h3>
                <p className="text-white/80 text-sm leading-relaxed">{detailedReports[selectedReport].fullAnalysis}</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#0096FF]/10">
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-[#0A192F] border border-[#0096FF]/30 text-white/80 text-sm rounded hover:bg-[#0096FF]/10 transition-colors"
                >
                  Export PDF
                </button>
                <button
                  onClick={handleInitiateProtocol}
                  className="px-4 py-2 bg-[#0096FF] text-white text-sm rounded hover:bg-[#0096FF]/90 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Initiate Response Protocol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Reports Modal */}
      {showAllReportsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowAllReportsModal(false)}>
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border-b border-[#0096FF]/20 p-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#0096FF]" />
                </div>
                <div>
                  <h2 className="text-xl text-white">All Intelligence Briefings</h2>
                  <p className="text-sm text-white/60">Live Feed & Archived Reports</p>
                </div>
              </div>
              <button
                onClick={() => setShowAllReportsModal(false)}
                className="w-10 h-10 bg-[#FF0000]/20 hover:bg-[#FF0000]/30 border border-[#FF0000] rounded-lg flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-[#FF0000]" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allIntelligenceReports.map((update) => (
                <div
                  key={update.id}
                  className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg hover:border-[#0096FF]/30 transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: `${getPriorityColor(update.priority)}20`,
                          color: getPriorityColor(update.priority),
                          border: `1px solid ${getPriorityColor(update.priority)}`
                        }}
                      >
                        {update.priority}
                      </div>
                      <span className="text-xs text-white/60">{update.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#0096FF]" />
                      <span className="text-xs text-[#0096FF]">{update.confidence}%</span>
                    </div>
                  </div>

                  <h3 className="text-sm text-white mb-2 font-medium">{update.title}</h3>

                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{update.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Briefcase className="w-3 h-3" />
                      <span>{update.officer}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#0096FF]/10 mt-auto">
                    <span className="text-xs text-[#0096FF]">{update.status}</span>
                    <button
                      onClick={() => {
                        setShowAllReportsModal(false);
                        setSelectedReport(update.id);
                      }}
                      className="px-3 py-1 bg-[#0096FF]/10 hover:bg-[#0096FF]/20 border border-[#0096FF]/30 rounded text-xs text-[#0096FF] flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Key Intelligence Updates */}
      <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#0096FF]" />
            </div>
            <div>
              <h2 className="text-lg text-white">Priority Intelligence Updates</h2>
              <p className="text-sm text-white/60">Real-Time Strategic Briefing</p>
            </div>
          </div>
          <button
            onClick={() => setShowAllReportsModal(true)}
            className="w-full md:w-auto px-4 py-2 bg-[#0096FF]/20 border border-[#0096FF] rounded text-xs text-[#0096FF] hover:bg-[#0096FF]/30 transition-all"
          >
            View All Reports
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyIntelligenceUpdates.map((update) => (
            <div
              key={update.id}
              className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg hover:border-[#0096FF]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: `${getPriorityColor(update.priority)}20`,
                      color: getPriorityColor(update.priority),
                      border: `1px solid ${getPriorityColor(update.priority)}`
                    }}
                  >
                    {update.priority}
                  </div>
                  <span className="text-xs text-white/60">{update.timestamp}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#0096FF]" />
                  <span className="text-xs text-[#0096FF]">{update.confidence}%</span>
                </div>
              </div>

              <h3 className="text-sm text-white mb-2">{update.title}</h3>

              <div className="flex items-center justify-between text-xs mb-3">
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-3 h-3" />
                  <span>{update.region}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Briefcase className="w-3 h-3" />
                  <span>{update.officer}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#0096FF]/10">
                <span className="text-xs text-white/60">Status:</span>
                <span className="text-xs text-[#0096FF]">{update.status}</span>
              </div>

              <button
                onClick={() => setSelectedReport(update.id)}
                className="w-full mt-3 py-2 bg-[#0096FF]/10 border border-[#0096FF]/30 rounded text-xs text-[#0096FF] hover:bg-[#0096FF]/20 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-3 h-3" />
                View Full Report
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Agency Performance Metrics */}
      <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#FFB800]/20 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#FFB800]" />
          </div>
          <div>
            <h2 className="text-lg text-white">Agency Performance Metrics</h2>
            <p className="text-sm text-white/60">Key Performance Indicators vs Targets</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agencyPerformance.map((item) => {
            const isAboveTarget = item.current >= item.target;
            const percentage = (item.current / item.target) * 100;

            return (
              <div
                key={item.metric}
                className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs text-white/60">{item.metric}</p>
                  {isAboveTarget ? (
                    <CheckCircle className="w-4 h-4 text-[#00FF88]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#FF6B00]" />
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-2xl ${isAboveTarget ? 'text-[#00FF88]' : 'text-[#FF6B00]'}`}>
                    {item.current}
                  </span>
                  <span className="text-sm text-white/60">{item.unit}</span>
                </div>

                <p className="text-xs text-white/60 mb-2">Target: {item.target}{item.unit}</p>

                <div className="h-1.5 bg-[#414141] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: isAboveTarget ? '#00FF88' : '#FF6B00'
                    }}
                  />
                </div>
              </div>
            );
          })}
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
              <p className="text-sm font-bold mb-0.5">{toastMessage.type === 'success' ? 'Success' : 'Information'}</p>
              <p className="text-xs opacity-90">{toastMessage.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
