import { Shield } from 'lucide-react';

export default function Footer() {
  const timestamp = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <footer className="w-full bg-[#0A192F] border-t border-[#0096FF]/20 mt-auto shrink-0">
      <div className="w-full px-4 md:px-6 py-3">
        {/* MAIN CONTAINER */}
        <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-8">

          {/* LEFT GROUP: Agency & Environment */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* BLOCK 1: Agency Name */}
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#0096FF] shrink-0" />
              <span className="text-xs font-bold text-white/90 uppercase tracking-wider whitespace-nowrap">
                &nbsp;National Forensic Agency&nbsp;
              </span>
            </div>

            {/* BLOCK 2: Secure Env */}
            <div className="flex items-center gap-3">
              <span className="hidden xs:inline text-white/20">|</span>
              <span className="text-xs text-white/50 uppercase tracking-widest whitespace-nowrap">
                Powered by MilGPT
              </span>
            </div>
          </div>

          {/* RIGHT GROUP: Version & Sync */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {/* BLOCK 3: Version */}
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-xs text-white/40 uppercase font-bold tracking-tight">Ver</span>
              <span className="text-[#0096FF] font-mono text-xs bg-[#0096FF]/10 px-2 py-0.5 rounded border border-[#0096FF]/20">
                v2.4.1 Updated
              </span>
            </div>

            {/* BLOCK 4: Sync Time with extra spacing */}
            <div className="flex items-center whitespace-nowrap">
              <span className="font-mono text-xs text-white/60 uppercase ml-3">{timestamp}</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}