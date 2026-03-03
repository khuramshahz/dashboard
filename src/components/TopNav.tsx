import { useState } from 'react';
import { Bell, Settings, User, X, Activity, Lock, Database, Menu } from 'lucide-react';
import logoImage from 'figma:asset/77a28d02665bc232e09053c20449a74bee8c11da.png';

interface TopNavProps {
  onToggleSidebar?: () => void;
  onShowSystemLogs: () => void;
  onShowSecurityAudit: () => void;
  isMobile: boolean;
}

export default function TopNav({ onToggleSidebar, onShowSystemLogs, onShowSecurityAudit, isMobile }: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const notifications = [
    { id: 1, type: 'alert', message: 'High-priority incident detected in Peshawar District', time: '5 min ago' },
    { id: 2, type: 'info', message: 'Chemical analysis completed for INC-2024-1246', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Evidence upload successful: EV-2024-1247-003', time: '2 hours ago' },
  ];

  const iconBar = (
    <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
      <button
        onClick={() => { setShowNotifications(!showNotifications); setShowSettings(false); }}
        className="relative p-2 hover:bg-white/5 rounded transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
        <span className="absolute top-0 right-0 min-w-[14px] sm:min-w-[18px] h-[14px] sm:h-[18px] px-1 bg-[#FF6B00] text-white text-[8px] sm:text-[10px] rounded-full flex items-center justify-center font-bold leading-none">
          {notifications.length}
        </span>
      </button>
      <button
        onClick={() => { setShowSettings(!showSettings); setShowNotifications(false); }}
        className={`p-2 rounded transition-colors ${showSettings ? 'bg-[#0096FF]/20 text-[#0096FF]' : 'hover:bg-white/5 text-white/80'}`}
        aria-label="Settings"
      >
        <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#2F4F4F]/30 hover:bg-[#2F4F4F]/50 rounded transition-colors border border-[#2F4F4F]">
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
        {!isMobile && <span className="text-xs sm:text-sm text-white/90 whitespace-nowrap">Forensic Analyst</span>}
      </button>
    </div>
  );

  const notificationsDropdown = showNotifications && (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
      <div className="fixed top-16 left-2 right-2 w-auto sm:left-auto sm:right-6 sm:w-96 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg shadow-2xl shadow-black/50 z-[60]">
        <div className="p-3 sm:p-4 border-b border-[#0096FF]/20">
          <h3 className="text-white text-sm sm:text-base">Security Alerts</h3>
          <p className="text-xs text-white/60 mt-1">{notifications.length} unread notifications</p>
        </div>
        <div className="max-h-[50vh] sm:max-h-96 overflow-y-auto">
          {notifications.map(notif => (
            <div key={notif.id} className="p-3 sm:p-4 border-b border-[#0096FF]/10 hover:bg-white/5 transition-colors">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.type === 'alert' ? 'bg-[#FF0000]' :
                  notif.type === 'success' ? 'bg-[#00FF88]' : 'bg-[#0096FF]'
                  }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-white">{notif.message}</p>
                  <p className="text-xs text-white/60 mt-1">{notif.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 sm:p-3 border-t border-[#0096FF]/20">
          <button className="w-full text-xs sm:text-sm text-[#0096FF] hover:text-[#0096FF]/80 transition-colors">
            View All Alerts
          </button>
        </div>
      </div>
    </>
  );

  const settingsDropdown = showSettings && (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
      <div className="fixed top-16 left-2 right-2 w-auto sm:left-auto sm:right-6 sm:w-80 bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg shadow-2xl shadow-black/50 z-[60]">
        <div className="p-3 sm:p-4 border-b border-[#0096FF]/20">
          <h3 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">System Settings</h3>
          <p className="text-[10px] text-[#0096FF] mt-0.5">Control Panel v4.2.0</p>
        </div>
        <div className="p-2 space-y-1 max-h-[60vh] overflow-y-auto">
          {[
            { label: 'User Profile', icon: User, desc: 'Lead Forensic Analyst', action: undefined as (() => void) | undefined },
            { label: 'System Preferences', icon: Activity, desc: 'Display & UI Config', action: undefined as (() => void) | undefined },
            { label: 'Security Protocols', icon: Lock, desc: 'Access & Encryption', action: undefined as (() => void) | undefined },
            { label: 'Database Config', icon: Database, desc: 'Storage & Sync', action: undefined as (() => void) | undefined },
            { label: 'System Logs', icon: Activity, desc: 'View audit trail', action: () => { onShowSystemLogs(); setShowSettings(false); } },
            { label: 'Security Audit', icon: Lock, desc: 'Review access events', action: () => { onShowSecurityAudit(); setShowSettings(false); } },
          ].map((item, idx) => (
            <button key={idx} onClick={item.action} className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-[#0096FF]/10 rounded-lg transition-all group text-left" type="button">
              <item.icon className="w-4 h-4 text-[#0096FF] group-hover:scale-110 transition-transform flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-white/90 group-hover:text-white truncate">{item.label}</p>
                <p className="text-[10px] text-white/40 truncate">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="p-2 border-t border-[#0096FF]/10">
          <button className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-[#FF0000]/10 rounded-lg transition-all group text-left">
            <X className="w-4 h-4 text-[#FF0000] flex-shrink-0" />
            <span className="text-xs sm:text-sm text-[#FF0000]">Secure Logout</span>
          </button>
        </div>
      </div>
    </>
  );

  // MOBILE layout
  if (isMobile) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-gradient-to-r from-[#030712] via-[#071225] to-[#030712] border-b border-[#0096FF]/20 flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <button onClick={onToggleSidebar} className="p-2 hover:bg-white/5 rounded transition-colors text-white/80" aria-label="Toggle Sidebar">
              <Menu className="w-5 h-5" />
            </button>
            <img src={logoImage} alt="EIFA Logo" className="w-8 h-8 object-contain" />
            <span className="text-sm tracking-wide text-[#0096FF] font-semibold">EIFA</span>
          </div>
          {iconBar}
        </header>
        {notificationsDropdown}
        {settingsDropdown}
      </>
    );
  }

  // DESKTOP layout
  return (
    <>
      {/* Logo zone over sidebar (w-64 = 256px matches sidebar width) */}
      <div className="fixed top-0 left-0 w-64 h-16 z-50 bg-gradient-to-r from-[#030712] to-[#071225] border-b border-[#0096FF]/20 flex items-center gap-3 px-4">
        <img src={logoImage} alt="EIFA Logo" className="w-10 h-10 object-contain flex-shrink-0" />
        <span className="text-base tracking-wide text-[#0096FF] font-semibold">EIFA</span>
      </div>

      {/* Nav starts exactly at sidebar right edge */}
      <nav className="fixed top-0 left-64 right-0 h-16 z-50 bg-gradient-to-r from-[#071225] to-[#030712] border-b border-[#0096FF]/20 flex items-center justify-between px-4">
        <div style={{ paddingLeft: '40px' }}>
          <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-green-400">
            Explosive Intelligence & Forensic Analysis Tool
          </span>
        </div>
        {iconBar}
      </nav>

      {notificationsDropdown}
      {settingsDropdown}
    </>
  );
}