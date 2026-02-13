import StatsCards from '../StatsCards';
import IncidentMap from '../IncidentMap';
import Timeline from '../Timeline';
import DeviceSignatures from '../DeviceSignatures';
import RiskPrediction from '../RiskPrediction';
import ThreatMap from '../ThreatMap';

export default function Dashboard() {
  return (
    <div className="py-6 z-0 relative">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl text-white mb-2">Intelligence Dashboard</h1>
          <p className="text-white/60">National-level threat monitoring and forensic analytics</p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6 items-start">
          <div className="space-y-6 min-w-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThreatMap />
              <IncidentMap />
            </div>
            <Timeline />
            <DeviceSignatures />
          </div>

          <div className="space-y-6 min-w-0">
            <RiskPrediction />
          </div>
        </div>
      </div>
    </div>
  );
}