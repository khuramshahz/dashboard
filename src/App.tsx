import { useEffect, useState } from 'react';
import { Activity, Lock, AlertTriangle, X, User } from 'lucide-react';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import ExecutiveDashboard from './components/pages/ExecutiveDashboard';
import Dashboard from './components/pages/Dashboard';
import Incidents from './components/pages/Incidents';
import DataIngestion from './components/pages/DataIngestion';
import EvidenceRepository from './components/pages/EvidenceRepository';
import DeviceSignaturesPage from './components/pages/DeviceSignaturesPage';
import KnowledgeGraph from './components/pages/KnowledgeGraph';
import RiskPredictionsPage from './components/pages/RiskPredictionsPage';
import FieldReports from './components/pages/FieldReports';
import PrecursorMonitoring from './components/pages/PrecursorMonitoring';
import MilGPTAssistant from './components/pages/MilGPTAssistant';
import AdminPanel from './components/pages/AdminPanel';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('Executive Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal States
  const [showSystemLogs, setShowSystemLogs] = useState(false);
  const [showSecurityAudit, setShowSecurityAudit] = useState(false);

  const systemLogs = [
    { id: 1, timestamp: '2024-12-09 14:30:12', level: 'INFO', service: 'Database', message: 'Backup completed successfully' },
    { id: 2, timestamp: '2024-12-09 14:25:45', level: 'WARNING', service: 'AI Model', message: 'Processing queue at 85% capacity' },
    { id: 3, timestamp: '2024-12-09 14:20:33', level: 'INFO', service: 'Authentication', message: 'User login: Major Ahmed Khan' },
    { id: 4, timestamp: '2024-12-09 14:15:22', level: 'ERROR', service: 'Storage', message: 'Temporary file cleanup failed - retrying' },
    { id: 5, timestamp: '2024-12-09 14:10:11', level: 'INFO', service: 'API', message: 'MilGPT query processed successfully' },
  ];

  const securityAudits = [
    { id: 1, timestamp: '2024-12-09 14:15:23', user: 'Major Ahmed Khan', action: 'Login', status: 'Success', ip: '192.168.1.45' },
    { id: 2, timestamp: '2024-12-09 13:45:12', user: 'Lt. Fatima Malik', action: 'Evidence Upload', status: 'Success', ip: '192.168.1.52' },
    { id: 3, timestamp: '2024-12-09 11:20:05', user: 'Dr. Zainab Qureshi', action: 'Incident Modified', status: 'Success', ip: '192.168.1.78' },
    { id: 4, timestamp: '2024-12-09 10:15:33', user: 'Unknown', action: 'Failed Login Attempt', status: 'Failed', ip: '203.45.67.89' },
    { id: 5, timestamp: '2024-12-09 09:30:22', user: 'Capt. Hassan Raza', action: 'Report Download', status: 'Success', ip: '192.168.1.91' },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderPage = () => {
    switch (activeMenu) {
      case 'Executive Dashboard':
        return <ExecutiveDashboard />;
      case 'Dashboard':
        return <Dashboard />;
      case 'Incidents':
        return <Incidents />;
      case 'Data Ingestion':
        return <DataIngestion />;
      case 'Evidence Repository':
        return <EvidenceRepository onNavigate={setActiveMenu} />;
      case 'Device Signatures':
        return <DeviceSignaturesPage />;
      case 'Knowledge Graph':
        return <KnowledgeGraph />;
      case 'Risk Predictions':
        return <RiskPredictionsPage />;
      case 'Field Reports':
        return <FieldReports />;
      case 'Precursor Monitoring':
        return <PrecursorMonitoring />;
      case 'MilGPT-Forensics Assistant':
        return <MilGPTAssistant />;
      case 'Admin Panel':
        return <AdminPanel />;
      default:
        return <ExecutiveDashboard />;
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0A192F] text-white overflow-x-hidden selection:bg-[#0096FF]/30 flex flex-col">
      {/* Digital mesh background */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 150, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 150, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <TopNav
        onToggleSidebar={handleSidebarToggle}
        onShowSystemLogs={() => setShowSystemLogs(true)}
        onShowSecurityAudit={() => setShowSecurityAudit(true)}
      />

      {/* Mobile drawer sidebar */}
      {isMobile && (
        <Sidebar
          variant="mobile"
          activeMenu={activeMenu}
          setActiveMenu={handleMenuSelect}
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
        />
      )}

      <div className="flex flex-1 w-full pt-16">
        {/* Desktop sidebar */}
        {!isMobile && (
          <Sidebar
            variant="desktop"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        )}

        <div className="flex flex-col flex-1 min-w-0">
          {/* Main content area */}
          <main className="relative flex-1 w-full px-4 md:px-6 lg:px-8 pb-6">
            <div className="w-full h-24 shrink-0" aria-hidden="true" />
            <div className="w-full max-w-7xl mx-auto">
              {renderPage()}
            </div>
          </main>



        </div>

      </div>

      <Footer />


      {/* System Logs Modal */}
      {showSystemLogs && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={() => setShowSystemLogs(false)}>
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg w-[95%] sm:w-[400px] max-h-[450px] overflow-hidden shadow-2xl shadow-[#0096FF]/20 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#0A192F] border-b border-[#0096FF]/20 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-[#0096FF]" />
                <h2 className="text-lg text-white">System Logs</h2>
              </div>
              <button type="button" onClick={() => setShowSystemLogs(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors relative z-50 cursor-pointer">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-4 overflow-auto flex-1">
              <div className="space-y-3">
                {systemLogs.map(log => (
                  <div key={log.id} className="p-3 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg">
                    <div className="flex flex-col gap-1 mb-2">
                      <div className="flex justify-between items-center w-full">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${log.level === 'ERROR' ? 'bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/20' :
                          log.level === 'WARNING' ? 'bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/20' :
                            'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/20'
                          }`}>
                          {log.level}
                        </span>
                        <span className="text-[10px] text-white/50">{log.timestamp}</span>
                      </div>
                    </div>
                    <div className="text-sm text-[#0096FF] font-medium mb-1">{log.service}</div>
                    <p className="text-xs text-white/80 leading-relaxed">{log.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Audit Modal */}
      {showSecurityAudit && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={() => setShowSecurityAudit(false)}>
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FF0000] rounded-lg w-[95%] sm:w-[400px] max-h-[450px] overflow-hidden shadow-2xl shadow-[#FF0000]/20 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#0A192F] border-b border-[#FF0000]/20 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#FF0000]" />
                <h2 className="text-lg text-white">Security Audit Log</h2>
              </div>
              <button type="button" onClick={() => setShowSecurityAudit(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors relative z-50 cursor-pointer">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-auto flex-1">
              {/* Alert Banner */}
              <div className="p-4 bg-[#FF0000]/10 border border-[#FF0000] rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#FF0000] flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base text-white">1 Failed Login Attempt Detected</p>
                    <p className="text-xs text-white/70 mt-1">Suspicious activity from IP: 203.45.67.89</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {securityAudits.map(audit => (
                  <div key={audit.id} className="p-3 bg-[#0A192F]/50 border border-[#FF0000]/10 rounded-lg">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <span className="text-sm font-medium text-white">{audit.action}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${audit.status === 'Failed'
                        ? 'bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/20'
                        : 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/20'
                        }`}>
                        {audit.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <User className="w-3 h-3 text-white/40" />
                      <span className="text-white/80">{audit.user}</span>
                    </div>
                    <div className="flex flex-wrap justify-between items-center text-[10px] text-white/40 pt-2 border-t border-[#FF0000]/10 gap-y-1">
                      <span>{audit.ip}</span>
                      <span>{audit.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}