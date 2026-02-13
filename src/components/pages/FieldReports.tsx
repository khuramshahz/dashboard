import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FileText, Search, Filter, Download, Eye, Edit, Calendar, User, AlertTriangle, CheckCircle, Clock, X, Save, Upload, AlertCircle, Zap } from 'lucide-react';
import logoImage from 'figma:asset/77a28d02665bc232e09053c20449a74bee8c11da.png';

const initialReports = [
  { id: 'FR-2024-089', title: 'Peshawar Blast Site Analysis', date: '2024-12-08', officer: 'Major Ahmed Khan', status: 'completed', priority: 'high', incident: 'INC-2024-1247', pages: 24, attachments: 8 },
  { id: 'FR-2024-088', title: 'Defused Device Technical Report', date: '2024-12-07', officer: 'Lt. Fatima Malik', status: 'completed', priority: 'medium', incident: 'INC-2024-1245', pages: 18, attachments: 12 },
  { id: 'FR-2024-087', title: 'Quetta District Surveillance Log', date: '2024-12-06', officer: 'Capt. Hassan Raza', status: 'pending-review', priority: 'medium', incident: 'INC-2024-1244', pages: 32, attachments: 6 },
  { id: 'FR-2024-086', title: 'Chemical Analysis - Precursor Materials', date: '2024-12-05', officer: 'Dr. Zainab Qureshi', status: 'in-progress', priority: 'high', incident: 'INC-2024-1246', pages: 15, attachments: 20 },
  { id: 'FR-2024-085', title: 'Multan Sector HUMINT Brief', date: '2024-12-04', officer: 'Major Imran Siddiqui', status: 'completed', priority: 'critical', incident: 'INC-2024-1242', pages: 45, attachments: 14 },
  { id: 'FR-2024-084', title: 'Post-Blast Forensic Assessment', date: '2024-12-03', officer: 'Capt. Bilal Ahmed', status: 'pending-review', priority: 'high', incident: 'INC-2024-1241', pages: 28, attachments: 18 },
];

export default function FieldReports() {
  const [reports, setReports] = useState(initialReports);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showReportViewer, setShowReportViewer] = useState(false);
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [templateData, setTemplateData] = useState({
    incidentId: '',
    location: '',
    date: '',
    summary: '',
    findings: '',
    recommendations: '',
  });

  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const generatePDF = (reportData: any, filename: string) => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();
    const reportID = reportData.id || `TR-${Math.floor(Math.random() * 1000000)}`;

    // --- Modern Background / Header ---
    doc.setFillColor(10, 25, 47); // Navy blue header
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('OFFICIAL FORENSIC REPORT', 20, 22);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`REPORT ID: ${reportID} | GENERATED: ${timestamp}`, 20, 32);

    // --- Security Classification ---
    doc.setFillColor(255, 107, 0); // Orange tag
    doc.rect(160, 15, 40, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('SECRET // NOFORN', 180, 21.5, { align: 'center' });

    let y = 55;

    // --- Metadata Information ---
    doc.setFillColor(240, 245, 250);
    doc.rect(20, y, 170, 25, 'F');
    doc.setTextColor(10, 25, 47);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('TITLE:', 25, y + 8);
    doc.text('OFFICER:', 25, y + 16);
    doc.text('INCIDENT:', 100, y + 8);
    doc.text('DATE:', 100, y + 16);

    doc.setFont('helvetica', 'normal');
    doc.text(reportData.title || selectedTemplate || 'Untitled Report', 45, y + 8);
    doc.text(reportData.officer || 'N/A', 45, y + 16);
    doc.text(reportData.incident || reportData.incidentId || 'N/A', 125, y + 8);
    doc.text(reportData.date || 'N/A', 125, y + 16);
    y += 35;

    const addSection = (title: string, content: string) => {
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
      const splitText = doc.splitTextToSize(content || 'Information Pending Analysis.', 170);
      doc.text(splitText, 20, y);
      y += (splitText.length * 5) + 12;

      if (y > 250) {
        doc.addPage();
        y = 30;
      }
    };

    addSection('EXECUTIVE SUMMARY', reportData.summary);
    addSection('FORENSIC FINDINGS', reportData.findings);
    addSection('RECOMMENDATIONS', reportData.recommendations);

    // --- Footer ---
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 280, 190, 280);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('CLASSIFIED FORENSIC MATERIAL // NATIONAL FORSENSIC AGENCY', 20, 285);
      doc.text(`PAGE ${i} OF ${pageCount}`, 190, 285, { align: 'right' });
    }

    doc.save(filename);
  };

  const handleDownloadPDF = () => {
    const report = reports.find(r => r.id === selectedReport);
    if (!report) return;

    generatePDF({
      ...report,
      summary: 'This forensic report presents a comprehensive analysis of explosive materials and device fragments recovered from the incident site.',
      findings: '- Device construction indicates moderate level of technical expertise\n- Chemical signature analysis completed with 94% confidence match\n- Detonation mechanism consistent with TTP Cluster patterns',
      recommendations: '- Continue monitoring supply chain for similar component patterns\n- Cross-reference with regional intelligence databases'
    }, `${report.id}_Report.pdf`);

    showToast('Report PDF downloaded successfully.', 'success');
  };

  const handleEditReport = () => {
    const report = reports.find(r => r.id === selectedReport);
    if (!report) return;

    // Pre-fill the template data with existing report info
    setTemplateData({
      incidentId: report.incident,
      location: 'Peshawar District, Khyber Pakhtunkhwa', // Placeholder as it's not in the main object
      date: report.date,
      summary: 'This forensic report presents a comprehensive analysis of explosive materials and device fragments recovered from the incident site.',
      findings: '- Device construction indicates moderate level of technical expertise\n- Chemical signature analysis completed with 94% confidence match\n- Detonation mechanism consistent with TTP Cluster patterns',
      recommendations: '- Continue monitoring supply chain for similar component patterns\n- Cross-reference with regional intelligence databases',
    });

    setSelectedTemplate(report.title);
    setSelectedReport(null);
    setShowTemplateForm(true);
    setIsEditing(true);

    showToast('Edit mode enabled. Report data loaded.', 'info');
  };

  const handleExportReports = () => {
    showToast('Initializing secure field records aggregate export...', 'info');

    setTimeout(() => {
      const doc = new jsPDF();
      const timestamp = new Date().toLocaleString();
      const exportID = `EXP-${Math.floor(Math.random() * 1000000)}`;

      // --- Modern Header ---
      doc.setFillColor(10, 25, 47);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('FIELD RECORDS AGGREGATE', 20, 22);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`EXPORT ID: ${exportID} | GENERATED: ${timestamp}`, 20, 32);

      // --- Security Tag ---
      doc.setFillColor(255, 107, 0);
      doc.rect(160, 15, 40, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('SECRET // NOFORN', 180, 21.5, { align: 'center' });

      let y = 55;

      // --- Summary Stats ---
      doc.setTextColor(10, 25, 47);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EXECUTIVE RECORDS SUMMARY', 20, y);
      y += 8;

      const stats = [
        { label: 'Total Reports', value: reports.length },
        { label: 'Completed', value: reports.filter(r => r.status === 'completed').length },
        { label: 'Critical Priority', value: reports.filter(r => r.priority === 'critical').length },
        { label: 'Total Pages', value: reports.reduce((sum, r) => sum + r.pages, 0) }
      ];

      stats.forEach((s, i) => {
        doc.setFillColor(240, 245, 250);
        doc.rect(20 + (i * 43), y, 40, 20, 'F');
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(s.label, 22 + (i * 43), y + 6);
        doc.setFontSize(14);
        doc.setTextColor(10, 25, 47);
        doc.text(s.value.toString(), 22 + (i * 43), y + 15);
      });
      y += 30;

      // --- Records Table ---
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('DETAILED DISPOSITION LIST', 20, y);
      y += 8;

      doc.setFillColor(0, 150, 255);
      doc.rect(20, y, 170, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text('REPORT ID', 25, y + 5.5);
      doc.text('TITLE', 55, y + 5.5);
      doc.text('OFFICER', 115, y + 5.5);
      doc.text('STATUS', 150, y + 5.5);
      doc.text('PRIORITY', 175, y + 5.5);
      y += 8;

      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'normal');
      reports.forEach((r, idx) => {
        if (idx % 2 === 0) doc.setFillColor(248, 249, 250);
        else doc.setFillColor(255, 255, 255);
        doc.rect(20, y, 170, 8, 'F');

        doc.text(r.id, 25, y + 5.5);
        doc.text(r.title.substring(0, 25), 55, y + 5.5);
        doc.text(r.officer, 115, y + 5.5);
        doc.text(r.status, 150, y + 5.5);

        doc.setTextColor(r.priority === 'critical' ? 200 : 60, 0, 0);
        doc.text(r.priority, 175, y + 5.5);
        doc.setTextColor(60, 60, 60);
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
        doc.text('OFFICIAL NFA RECORDS MATERIAL // CONTROLLED DISSEMINATION', 20, 285);
        doc.text(`PAGE ${i} OF ${pageCount}`, 190, 285, { align: 'right' });
      }

      doc.save(`Field_Records_Export_${exportID}.pdf`);
      showToast('All records exported to professional PDF successfully.', 'success');
    }, 2000);
  };

  const handleUploadReport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulation of file upload processing
      setTimeout(() => {
        showToast(`Report "${file.name}" uploaded and queued for processing.`, 'success');
      }, 1000);
    }
  };

  const handleSaveReport = (shouldDownload = false) => {
    if (isEditing && selectedTemplate) {
      // Find the report being edited (we matched by title primarily in this simplified flow, but ideally ID)
      // Since we don't store the ID in templateData, let's just find the one with the matching title for now or just update the one we came from.
      // A better way is to store the ID in templateData or a separate state `editingReportId`.
      // For now, let's assume we are editing the one that matches `selectedTemplate` if it was set from title, 
      // OR we just find the report that was selected before. But `selectedReport` is null now.
      // Let's rely on finding a report with the same Incident ID or Title.

      const updatedReports = reports.map(r => {
        if (r.title === selectedTemplate || r.incident === templateData.incidentId) {
          return {
            ...r,
            incident: templateData.incidentId,
            date: templateData.date,
            // In a real app we'd update summary/findings too, but our report object is simple summary.
          };
        }
        return r;
      });
      setReports(updatedReports);
      showToast('Report updated successfully.', 'success');
    } else {
      // Create new report
      const newReport = {
        id: `FR-2025-${Math.floor(Math.random() * 1000)}`,
        title: selectedTemplate || 'New Field Report',
        date: templateData.date || new Date().toISOString().split('T')[0],
        officer: 'Current User', // Placeholder
        status: 'in-progress',
        priority: 'medium',
        incident: templateData.incidentId || 'INC-PENDING',
        pages: 1,
        attachments: 0
      };
      setReports([newReport, ...reports]);
      showToast('New report created successfully.', 'success');
    }

    if (shouldDownload) {
      generatePDF({
        ...templateData,
        title: selectedTemplate || 'Field Report',
        id: isEditing ? 'UPDATED-REPORT' : 'NEW-REPORT',
        officer: 'Current User'
      }, `${templateData.incidentId || 'Report'}.pdf`);
      showToast('PDF download started.', 'success');
    }

    setShowTemplateForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending-review': return AlertCircle;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#00FF88';
      case 'in-progress': return '#FFB800';
      case 'pending-review': return '#0096FF';
      default: return '#414141';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#FF0000';
      case 'high': return '#FF6B00';
      case 'medium': return '#FFB800';
      case 'low': return '#00FF88';
      default: return '#0096FF';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl text-white mb-2">Field Reports</h1>
            <p className="text-white/60">Forensic analysis reports and field documentation</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleExportReports}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#414141] hover:bg-[#414141]/80 border border-[#0096FF]/30 rounded-lg transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export All</span>
            </button>
            <label className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors cursor-pointer text-sm">
              <Upload className="w-4 h-4" />
              <span>Upload Report</span>
              <input
                type="file"
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleUploadReport}
              />
            </label>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#00FF88]/20 rounded-lg p-4">
            <p className="text-white/60 text-xs mb-1">Completed Reports</p>
            <p className="text-2xl text-[#00FF88]">{reports.filter(r => r.status === 'completed').length}</p>
          </div>
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FFB800]/20 rounded-lg p-4">
            <p className="text-white/60 text-xs mb-1">In Progress</p>
            <p className="text-2xl text-[#FFB800]">{reports.filter(r => r.status === 'in-progress').length}</p>
          </div>
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
            <p className="text-white/60 text-xs mb-1">Pending Review</p>
            <p className="text-2xl text-[#0096FF]">{reports.filter(r => r.status === 'pending-review').length}</p>
          </div>
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FF6B00]/20 rounded-lg p-4">
            <p className="text-white/60 text-xs mb-1">Total Documents</p>
            <p className="text-2xl text-white">{reports.reduce((sum, r) => sum + r.pages, 0)}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search reports by title or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#0096FF]"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending-review">Pending Review</option>
            </select>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredReports.map((report) => {
            const StatusIcon = getStatusIcon(report.status);

            return (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`
                  bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border rounded-lg p-5 cursor-pointer transition-all
                  ${selectedReport === report.id
                    ? 'border-[#0096FF] shadow-lg shadow-[#0096FF]/20'
                    : 'border-[#0096FF]/20 hover:border-[#0096FF]/40'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#0096FF]/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#0096FF]" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{report.title}</h3>
                      <p className="text-xs text-[#0096FF]">{report.id}</p>
                    </div>
                  </div>

                  <div
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: `${getPriorityColor(report.priority)}20`,
                      color: getPriorityColor(report.priority)
                    }}
                  >
                    {report.priority}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                  <div>
                    <p className="text-white/60">Date:</p>
                    <p className="text-white/90">{report.date}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Officer:</p>
                    <p className="text-white/90">{report.officer}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Linked Incident:</p>
                    <p className="text-[#0096FF]">{report.incident}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Pages:</p>
                    <p className="text-white/90">{report.pages} pages, {report.attachments} attachments</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#0096FF]/10">
                  <div className="flex items-center gap-2">
                    <StatusIcon
                      className="w-4 h-4"
                      style={{ color: getStatusColor(report.status) }}
                    />
                    <span className="text-xs text-white/70 capitalize">
                      {report.status.replace('-', ' ')}
                    </span>
                  </div>

                  <button className="flex items-center gap-2 px-3 py-1 bg-[#0096FF]/20 hover:bg-[#0096FF]/30 border border-[#0096FF] text-[#0096FF] rounded text-xs transition-colors">
                    <Eye className="w-3 h-3" />
                    <span>View Report</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Report Template Section */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          <h2 className="text-lg text-white mb-4">Standard Report Templates</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Post-Blast Analysis', icon: FileText, fields: 12 },
              { name: 'Device Technical Report', icon: FileText, fields: 18 },
              { name: 'HUMINT Brief Template', icon: FileText, fields: 8 },
            ].map((template, idx) => (
              <div key={idx} className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded-lg hover:border-[#0096FF]/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <template.icon className="w-5 h-5 text-[#0096FF]" />
                  <h3 className="text-sm text-white">{template.name}</h3>
                </div>
                <p className="text-xs text-white/60">{template.fields} required fields</p>
                <button
                  onClick={() => {
                    setSelectedTemplate(template.name);
                    setTemplateData({
                      incidentId: '',
                      location: '',
                      date: new Date().toISOString().split('T')[0],
                      summary: '',
                      findings: '',
                      recommendations: ''
                    });
                    setIsEditing(false);
                    setShowTemplateForm(true);
                  }}
                  className="w-full mt-3 px-3 py-1.5 bg-[#0096FF]/20 hover:bg-[#0096FF]/30 border border-[#0096FF] text-[#0096FF] rounded text-xs transition-colors"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Viewer Modal */}
      {selectedReport && (() => {
        const report = reports.find(r => r.id === selectedReport);
        if (!report) return null;

        return (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedReport(null)}>
            <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-[#0096FF]/20 flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="bg-[#0A192F] border-b border-[#0096FF]/20 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-white mb-1">{report.title}</h2>
                  <p className="text-sm text-[#0096FF]">{report.id}</p>
                </div>
                <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Document Viewer */}
              <div className="flex-1 overflow-auto p-6">
                <div className="bg-white/5 border border-[#0096FF]/20 rounded-lg p-8 space-y-6">
                  {/* Report Header */}
                  <div className="text-center border-b border-[#0096FF]/20 pb-6">
                    <img
                      src={logoImage}
                      alt="EIFA Logo"
                      className="w-24 h-24 mx-auto mb-4 object-contain"
                    />
                    <h1 className="text-2xl text-white mb-2">{report.title}</h1>
                    <p className="text-sm text-white/60">National Forensic Agency - Pakistan</p>
                    <p className="text-xs text-white/40 mt-2">CLASSIFIED - FOR OFFICIAL USE ONLY</p>
                  </div>

                  {/* Document Metadata */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-[#0A192F]/50 rounded-lg">
                    <div>
                      <p className="text-xs text-white/60 mb-1">Report ID:</p>
                      <p className="text-sm text-white">{report.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Date:</p>
                      <p className="text-sm text-white">{report.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Lead Officer:</p>
                      <p className="text-sm text-white">{report.officer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Linked Incident:</p>
                      <p className="text-sm text-[#0096FF]">{report.incident}</p>
                    </div>
                  </div>

                  {/* Report Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white mb-2">Executive Summary</h3>
                      <p className="text-sm text-white/70 leading-relaxed">
                        This forensic report presents a comprehensive analysis of explosive materials and device fragments recovered from the incident site. The investigation was conducted following standard NFA protocols and international forensic best practices.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-white mb-2">Incident Overview</h3>
                      <p className="text-sm text-white/70 leading-relaxed">
                        On {report.date}, an explosive incident occurred in the designated location. Initial response teams secured the perimeter and forensic specialists were deployed for evidence collection. A total of {report.attachments} pieces of physical evidence were documented and processed.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-white mb-2">Forensic Findings</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-white/70">
                        <li>Device construction indicates moderate level of technical expertise</li>
                        <li>Chemical signature analysis completed with 94% confidence match</li>
                        <li>Detonation mechanism consistent with TTP Cluster patterns</li>
                        <li>Multiple component sources identified through supply chain analysis</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-white mb-2">Evidence Catalog</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded">
                          <p className="text-xs text-white/60">CCTV Footage</p>
                          <p className="text-sm text-white mt-1">245 MB</p>
                        </div>
                        <div className="p-3 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded">
                          <p className="text-xs text-white/60">Scene Photos</p>
                          <p className="text-sm text-white mt-1">48 MB</p>
                        </div>
                        <div className="p-3 bg-[#0A192F]/50 border border-[#0096FF]/10 rounded">
                          <p className="text-xs text-white/60">Field Notes</p>
                          <p className="text-sm text-white mt-1">2.4 MB</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white mb-2">Recommendations</h3>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-white/70">
                        <li>Continue monitoring supply chain for similar component patterns</li>
                        <li>Cross-reference with regional intelligence databases</li>
                        <li>Enhanced surveillance in identified high-risk sectors</li>
                        <li>Update threat assessment protocols based on findings</li>
                      </ol>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="pt-6 border-t border-[#0096FF]/20">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-white/60 mb-2">Prepared By:</p>
                        <p className="text-sm text-white">{report.officer}</p>
                        <p className="text-xs text-white/40">Forensic Analyst, NFA</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-2">Approved By:</p>
                        <p className="text-sm text-white">Director General Asif</p>
                        <p className="text-xs text-white/40">Director General, NFA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-[#0A192F] border-t border-[#0096FF]/20 p-4 flex gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="flex-1 px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={handleEditReport}
                  className="flex-1 px-4 py-2 bg-[#414141] hover:bg-[#414141]/80 border border-[#0096FF]/30 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Report</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Template Form Modal */}
      {showTemplateForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowTemplateForm(false)}>
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#0096FF]/20" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-[#0A192F] border-b border-[#0096FF]/20 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl text-white mb-1">Create New Report</h2>
                <p className="text-sm text-[#0096FF]">{selectedTemplate}</p>
              </div>
              <button onClick={() => setShowTemplateForm(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-white text-sm uppercase tracking-wide opacity-60">Report Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Incident ID <span className="text-[#FF0000]">*</span>
                    </label>
                    <input
                      type="text"
                      value={templateData.incidentId}
                      onChange={(e) => setTemplateData({ ...templateData, incidentId: e.target.value })}
                      placeholder="INC-2024-XXXX"
                      className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-2">
                      Report Date <span className="text-[#FF0000]">*</span>
                    </label>
                    <input
                      type="date"
                      value={templateData.date}
                      onChange={(e) => setTemplateData({ ...templateData, date: e.target.value })}
                      className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0096FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">
                    Location <span className="text-[#FF0000]">*</span>
                  </label>
                  <input
                    type="text"
                    value={templateData.location}
                    onChange={(e) => setTemplateData({ ...templateData, location: e.target.value })}
                    placeholder="e.g., Peshawar District, Khyber Pakhtunkhwa"
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF]"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-4">
                <h3 className="text-white text-sm uppercase tracking-wide opacity-60">Report Content</h3>

                <div>
                  <label className="block text-sm text-white mb-2">
                    Executive Summary <span className="text-[#FF0000]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={templateData.summary}
                    onChange={(e) => setTemplateData({ ...templateData, summary: e.target.value })}
                    placeholder="Provide a brief overview of the incident and investigation..."
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">
                    Forensic Findings <span className="text-[#FF0000]">*</span>
                  </label>
                  <textarea
                    rows={7}
                    value={templateData.findings}
                    onChange={(e) => setTemplateData({ ...templateData, findings: e.target.value })}
                    placeholder="Detail the forensic analysis, evidence collected, and technical observations..."
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">
                    Recommendations <span className="text-[#FF0000]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={templateData.recommendations}
                    onChange={(e) => setTemplateData({ ...templateData, recommendations: e.target.value })}
                    placeholder="List actionable recommendations based on the findings..."
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF] resize-none"
                  />
                </div>
              </div>

              {/* Classification & Additional Options */}
              <div className="space-y-4">
                <h3 className="text-white text-sm uppercase tracking-wide opacity-60">Classification & Options</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Classification Level <span className="text-[#FF0000]">*</span>
                    </label>
                    <select className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0096FF]">
                      <option>CONFIDENTIAL</option>
                      <option>SECRET</option>
                      <option>TOP SECRET</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-2">
                      Priority Level <span className="text-[#FF0000]">*</span>
                    </label>
                    <select className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0096FF]">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Lead Investigator <span className="text-[#FF0000]">*</span>
                    </label>
                    <select className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0096FF]">
                      <option>Major Ahmed Khan</option>
                      <option>Lt. Fatima Malik</option>
                      <option>Capt. Hassan Raza</option>
                      <option>Dr. Zainab Qureshi</option>
                      <option>Capt. Bilal Ahmed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-2">
                      Report Type <span className="text-[#FF0000]">*</span>
                    </label>
                    <select className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0096FF]">
                      <option>Field Report</option>
                      <option>Technical Analysis</option>
                      <option>HUMINT Brief</option>
                      <option>Post-Blast Assessment</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="p-4 bg-[#0096FF]/10 border border-[#0096FF] rounded-lg">
                <p className="text-sm text-white/80">
                  <span className="text-[#0096FF]">Note:</span> All fields marked with <span className="text-[#FF0000]">*</span> are required. Reports will be automatically classified as CONFIDENTIAL and subject to NFA security protocols.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#0A192F] border-t border-[#0096FF]/20 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setShowTemplateForm(false)}
                className="flex-1 px-6 py-3 bg-[#414141] hover:bg-[#414141]/80 border border-[#0096FF]/30 rounded-lg transition-colors text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveReport(false)}
                className="flex-1 px-6 py-3 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors flex items-center justify-center gap-2 text-white"
              >
                <Save className="w-5 h-5" />
                <span>{isEditing ? 'Save Changes' : 'Create Report'}</span>
              </button>
              <button
                onClick={() => handleSaveReport(true)}
                className="flex-1 px-6 py-3 bg-[#0096FF]/20 hover:bg-[#0096FF]/30 border border-[#0096FF] rounded-lg transition-colors flex items-center justify-center gap-2 text-[#0096FF]"
              >
                <Download className="w-5 h-5" />
                <span>Save & Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

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