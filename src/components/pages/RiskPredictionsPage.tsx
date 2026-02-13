import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import RiskPrediction, { districtRiskData, threatVectorData } from '../RiskPrediction';
import { TrendingUp, AlertTriangle, Calendar, Target, CheckCircle, Zap, X, Download, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const threatIndicators = [
  { name: 'HUMINT Reports', value: 85, trend: 'up', change: 12 },
  { name: 'SIGINT Intercepts', value: 72, trend: 'up', change: 8 },
  { name: 'Pattern Anomalies', value: 68, trend: 'down', change: -5 },
  { name: 'Precursor Activity', value: 91, trend: 'up', change: 15 },
];

const historicalTrends = [
  { month: 'Jun', incidents: 32, predicted: 30 },
  { month: 'Jul', incidents: 45, predicted: 42 },
  { month: 'Aug', incidents: 38, predicted: 40 },
  { month: 'Sep', incidents: 52, predicted: 48 },
  { month: 'Oct', incidents: 48, predicted: 50 },
  { month: 'Nov', incidents: 65, predicted: 62 },
  { month: 'Dec', incidents: 58, predicted: 60 },
];

export default function RiskPredictionsPage() {
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerateReport = () => {
    showToast('Initializing secure predictive intelligence report generation...', 'info');

    setTimeout(() => {
      const doc = new jsPDF();
      const timestamp = new Date().toLocaleString();
      const reportID = `TR-${Math.floor(Math.random() * 1000000)}`;

      // --- Modern Background / Header ---
      doc.setFillColor(10, 25, 47); // Navy blue header
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('PREDICTIVE RISK ASSESSMENT', 20, 22);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`REFERENCE ID: ${reportID} | GENERATED: ${timestamp}`, 20, 32);

      // --- Security Classification ---
      doc.setFillColor(255, 107, 0); // Orange tag
      doc.rect(160, 15, 40, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('SECRET // NOFORN', 180, 21.5, { align: 'center' });

      let y = 55;

      // --- Section 1: Executive Summary ---
      doc.setTextColor(10, 25, 47);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('1. EXECUTIVE STRATEGIC OVERVIEW', 20, y);
      y += 2;
      doc.setDrawColor(0, 150, 255);
      doc.setLineWidth(0.5);
      doc.line(20, y, 190, y);
      y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const summary = `This report provides an automated synthesis of multi-source intelligence, incorporating HUMINT, SIGINT, and forensic markers. The current threat landscape indicates a ${districtRiskData[0].risk}% risk concentration in ${districtRiskData[0].district}. The MilGPT neural engine v4.2 suggests an elevated state of readiness for the December 20-25 window.`;
      const splitSummary = doc.splitTextToSize(summary, 170);
      doc.text(splitSummary, 20, y);
      y += (splitSummary.length * 5) + 10;

      // --- Section 2: Key Indicators ---
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(10, 25, 47);
      doc.text('2. OPERATIONAL THREAT INDICATORS', 20, y);
      y += 10;

      threatIndicators.forEach((indicator) => {
        doc.setFillColor(240, 245, 250);
        doc.rect(20, y, 170, 10, 'F');
        doc.setFontSize(10);
        doc.setTextColor(10, 25, 47);
        doc.setFont('helvetica', 'bold');
        doc.text(indicator.name, 25, y + 6.5);

        doc.setFont('helvetica', 'normal');
        doc.text(`Value: ${indicator.value}%`, 100, y + 6.5);

        const trendText = indicator.trend === 'up' ? `+${indicator.change}% (CRITICAL)` : `${indicator.change}% (STABLE)`;
        doc.setTextColor(indicator.trend === 'up' ? 200 : 0, indicator.trend === 'up' ? 50 : 150, 0);
        doc.text(trendText, 150, y + 6.5);

        y += 12;
      });
      y += 5;

      // --- Section 3: High-Risk Districts (Table) ---
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(10, 25, 47);
      doc.text('3. REGIONAL RISK CONCENTRATION', 20, y);
      y += 8;

      // Table Header
      doc.setFillColor(0, 150, 255);
      doc.rect(20, y, 170, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text('DISTRICT', 25, y + 5.5);
      doc.text('RISK LEVEL', 90, y + 5.5);
      doc.text('AI PREDICTION', 130, y + 5.5);
      doc.text('CONFIDENCE', 165, y + 5.5);
      y += 8;

      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'normal');
      districtRiskData.slice(0, 6).forEach((d, idx) => {
        if (idx % 2 === 0) doc.setFillColor(248, 249, 250);
        else doc.setFillColor(255, 255, 255);
        doc.rect(20, y, 170, 8, 'F');

        doc.text(d.district, 25, y + 5.5);
        doc.text(`${d.risk}%`, 95, y + 5.5);
        doc.text(`${d.aiPredicted}%`, 135, y + 5.5);
        doc.text(`${d.confidence}%`, 170, y + 5.5);
        y += 8;
      });

      y += 15;

      // --- Section 4: Vector Analysis ---
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(10, 25, 47);
      doc.text('4. THREAT VECTOR ANALYSIS', 20, y);
      y += 10;

      threatVectorData.forEach(v => {
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        doc.text(v.vector, 20, y);

        // Progress bar for vector
        doc.setFillColor(230, 230, 230);
        doc.rect(60, y - 3, 100, 4, 'F');
        doc.setFillColor(0, 150, 255);
        doc.rect(60, y - 3, v.score, 4, 'F');

        doc.setTextColor(10, 25, 47);
        doc.text(`${v.score}/100`, 165, y);
        y += 8;
      });

      // --- Footer ---
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 280, 190, 280);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('CLASSIFIED MATERIAL // CONTROLLED DISSEMINATION', 20, 285);
        doc.text(`PAGE ${i} OF ${pageCount}`, 190, 285, { align: 'right' });
      }

      doc.save(`Military_Risk_Report_${reportID}.pdf`);
      showToast('Professional Intelligence PDF generated and exported successfully.', 'success');
    }, 2000);
  };

  return (
    <div className="py-6 text-white">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl text-white mb-2">Risk Predictions & Threat Assessment</h1>
            <p className="text-white/60">AI-powered predictive analytics and early warning system</p>
          </div>
          <button
            onClick={handleGenerateReport}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors shadow-lg shadow-[#0096FF]/20 font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>

        {/* Threat Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {threatIndicators.map((indicator, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-white/60">{indicator.name}</p>
                <div className={`flex items-center gap-1 text-xs ${indicator.trend === 'up' ? 'text-[#FF6B00]' : 'text-[#00FF88]'
                  }`}>
                  <TrendingUp className={`w-3 h-3 ${indicator.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{Math.abs(indicator.change)}%</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl text-white">{indicator.value}</p>
                <div className="flex-1 ml-3 h-8">
                  <div className="h-full flex items-end gap-1">
                    {[40, 55, 48, 62, 58, indicator.value].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#0096FF] rounded-t"
                        style={{ height: `${(val / 100) * 100}%`, opacity: i === 5 ? 1 : 0.5 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Risk Prediction Component */}
        <RiskPrediction />

        {/* Historical Accuracy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
            <h2 className="text-lg text-white mb-4">Prediction Accuracy</h2>
            <p className="text-sm text-white/60 mb-4">Actual vs Predicted Incidents (Last 6 Months)</p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0096FF" opacity={0.1} />
                  <XAxis
                    dataKey="month"
                    stroke="#ffffff60"
                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#ffffff60"
                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0A192F',
                      border: '1px solid #0096FF',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke="#FF6B00"
                    strokeWidth={2}
                    name="Actual"
                    dot={{ fill: '#FF6B00', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#0096FF"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted"
                    dot={{ fill: '#0096FF', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Model Accuracy:</span>
                <span className="text-lg text-[#00FF88]">94.2%</span>
              </div>
            </div>
          </div>

          {/* Alert Timeline */}
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
            <h2 className="text-lg text-white mb-4">Recent Alerts & Warnings</h2>

            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              {[
                { date: 'Dec 9, 14:30', type: 'critical', message: 'High-risk spike predicted for Metro Area (Dec 20-25)', confidence: 92 },
                { date: 'Dec 8, 09:15', type: 'warning', message: 'Cluster B2 activity increase detected in Northern District', confidence: 87 },
                { date: 'Dec 7, 16:45', type: 'info', message: 'Precursor procurement pattern identified - 3 locations', confidence: 78 },
                { date: 'Dec 6, 11:20', type: 'critical', message: 'HUMINT correlation: Planned operation in Southern Territory', confidence: 95 },
                { date: 'Dec 5, 08:30', type: 'warning', message: 'Anomalous communications detected - SIGINT analysis ongoing', confidence: 82 },
                { date: 'Dec 4, 19:00', type: 'info', message: 'Risk model updated with new TTP data from INC-2024-1247', confidence: 88 },
              ].map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${alert.type === 'critical'
                    ? 'bg-[#FF0000]/10 border-[#FF0000]/30'
                    : alert.type === 'warning'
                      ? 'bg-[#FFB800]/10 border-[#FFB800]/30'
                      : 'bg-[#0096FF]/10 border-[#0096FF]/30'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${alert.type === 'critical'
                        ? 'text-[#FF0000]'
                        : alert.type === 'warning'
                          ? 'text-[#FFB800]'
                          : 'text-[#0096FF]'
                        }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/60">{alert.date}</span>
                        <span className="text-xs text-white/60">Confidence: {alert.confidence}%</span>
                      </div>
                      <p className="text-sm text-white/90">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events Calendar */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-[#0096FF]" />
            <h2 className="text-lg text-white">High-Risk Period Calendar</h2>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {[...Array(31)].map((_, idx) => {
              const day = idx + 1;
              const isHighRisk = [20, 21, 22, 23, 24, 25].includes(day);
              const isMediumRisk = [15, 16, 26, 27].includes(day);

              return (
                <div
                  key={day}
                  className={`
                    aspect-square rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all
                    ${isHighRisk
                      ? 'bg-[#FF0000]/20 border-[#FF0000] hover:bg-[#FF0000]/30'
                      : isMediumRisk
                        ? 'bg-[#FFB800]/20 border-[#FFB800] hover:bg-[#FFB800]/30'
                        : 'bg-[#0A192F]/50 border-[#0096FF]/10 hover:border-[#0096FF]/30'
                    }
                  `}
                >
                  <span className="text-sm text-white">{day}</span>
                  {(isHighRisk || isMediumRisk) && (
                    <div className="w-1.5 h-1.5 rounded-full mt-1" style={{
                      backgroundColor: isHighRisk ? '#FF0000' : '#FFB800'
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#FF0000]/20 border border-[#FF0000]" />
              <span className="text-white/60">High Risk Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#FFB800]/20 border border-[#FFB800]" />
              <span className="text-white/60">Medium Risk Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#0A192F]/50 border border-[#0096FF]/10" />
              <span className="text-white/60">Normal Period</span>
            </div>
          </div>
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
              <p className="text-sm font-bold mb-0.5">{toastMessage.type === 'success' ? 'Confirmed' : 'System Notice'}</p>
              <p className="text-xs opacity-90">{toastMessage.message}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-70">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
