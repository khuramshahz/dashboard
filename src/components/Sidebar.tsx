import { LayoutDashboard, AlertTriangle, Upload, Database, Fingerprint, Network, TrendingUp, FileText, TestTube, Bot, Shield, Crown, X } from 'lucide-react';
import { useEffect } from 'react';

type SidebarVariant = 'desktop' | 'mobile';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  variant?: SidebarVariant;
}

const menuItems = [
  { name: 'Executive Dashboard', icon: Crown, badge: 'DG' },
  { name: 'Dashboard', icon: LayoutDashboard, badge: null },
  { name: 'Incidents', icon: AlertTriangle, badge: '247' },
  { name: 'Data Ingestion', icon: Upload, badge: 'NEW' },
  { name: 'Evidence Repository', icon: Database, badge: '1.2K' },
  { name: 'Device Signatures', icon: Fingerprint, badge: '18' },
  { name: 'Knowledge Graph', icon: Network, badge: null },
  { name: 'Risk Predictions', icon: TrendingUp, badge: null },
  { name: 'Field Reports', icon: FileText, badge: '89' },
  { name: 'Precursor Monitoring', icon: TestTube, badge: '24' },
  { name: 'MilGPT-Forensics Assistant', icon: Bot, badge: null },
  { name: 'Admin Panel', icon: Shield, badge: null },
];

export default function Sidebar({ activeMenu, setActiveMenu, isOpen = true, onClose, variant = 'desktop' }: SidebarProps) {
  const isMobileVariant = variant === 'mobile';

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileVariant && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileVariant, isOpen]);

  // Don't render mobile variant if not open
  if (isMobileVariant && !isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    console.log('Backdrop clicked - closing sidebar');
    if (onClose) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    console.log('Close button clicked - closing sidebar');
    if (onClose) {
      onClose();
    }
  };

  const handleMenuClick = (menuName: string) => {
    console.log('Menu clicked:', menuName);
    setActiveMenu(menuName);
    // Close mobile sidebar when menu item is clicked
    if (isMobileVariant && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop for mobile drawer - ALWAYS render first */}
      {isMobileVariant && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
          style={{ touchAction: 'none', zIndex: 998 }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobileVariant
            ? 'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 flex flex-col'
            : 'hidden lg:flex lg:flex-col lg:min-w-[16rem] lg:w-64 lg:flex-shrink-0 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 lg:z-40'}
          bg-[#0A192F] border-r border-[#0096FF]/15 shadow-2xl lg:shadow-none overflow-hidden pt-6
        `}
        style={isMobileVariant ? { zIndex: 999 } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 min-w-[16rem]">

          {isMobileVariant && (
            <button
              onClick={handleCloseClick}
              className="p-2 hover:bg-[#FF0000]/20 rounded-lg transition-colors z-10"
              type="button"
              aria-label="Close Navigation"
            >
              <X className="w-5 h-5 text-white/70 hover:text-[#FF0000] transition-colors" />
            </button>
          )}
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item.name)}
                className={`
                  w-full flex items-center justify-between gap-3 px-4 py-3 rounded transition-all text-left
                  ${isActive
                    ? 'bg-[#0096FF]/20 text-[#0096FF] border-l-4 border-[#0096FF] pl-3'
                    : 'text-white/70 hover:bg-white/5 hover:text-white border-l-4 border-transparent pl-3'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`
                      px-2 py-0.5 text-[10px] font-bold rounded flex-shrink-0
                      ${item.badge === 'NEW' ? 'bg-[#00FF88] text-[#0A192F]' : 'bg-[#414141] text-white/80'}
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Fixed Status Section */}
        <div className="p-4 border-t border-[#0096FF]/10 bg-[#0A192F]">
          <div className="p-3 bg-[#0096FF]/5 border border-[#0096FF]/20 rounded">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse shadow-[0_0_8px_#00FF88]"></div>
              <span className="text-[10px] uppercase tracking-wider text-white/60 font-bold">System Status</span>
            </div>
            <p className="text-xs text-white/90">Central Server: Online</p>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 150, 255, 0.2);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 150, 255, 0.5);
          }
        `}} />
      </aside>
    </>
  );
}