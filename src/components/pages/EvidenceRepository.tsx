import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Database, Search, Filter, Download, Eye, Video, Image, FileText, Folder, Calendar, User, MapPin, Tag, X, Play, CheckCircle, Zap, AlertCircle } from 'lucide-react';

const repositoryItems = [
  {
    id: 'EV-2024-1247-001',
    incidentId: 'INC-2024-1247',
    type: 'video',
    title: 'Blast Site Surveillance Footage',
    date: '2024-12-08',
    uploadedBy: 'Major Ahmed Khan',
    location: 'Peshawar District',
    size: '245 MB',
    tags: ['blast-site', 'surveillance', 'high-priority'],
    views: 12
  },
  {
    id: 'EV-2024-1247-002',
    incidentId: 'INC-2024-1247',
    type: 'image',
    title: 'Device Fragment Photos (Set 1)',
    date: '2024-12-08',
    uploadedBy: 'Lt. Fatima Malik',
    location: 'Peshawar District',
    size: '48 MB',
    tags: ['device-fragments', 'forensic-evidence'],
    views: 8
  },
  {
    id: 'EV-2024-1246-001',
    incidentId: 'INC-2024-1246',
    type: 'document',
    title: 'Chemical Analysis Report',
    date: '2024-12-07',
    uploadedBy: 'Dr. Zainab Qureshi',
    location: 'Karachi Central',
    size: '2.4 MB',
    tags: ['chemical-analysis', 'lab-report'],
    views: 15
  },
  {
    id: 'EV-2024-1245-001',
    incidentId: 'INC-2024-1245',
    type: 'image',
    title: 'Defused Device Documentation',
    date: '2024-12-06',
    uploadedBy: 'Capt. Hassan Raza',
    location: 'Quetta Cantonment',
    size: '32 MB',
    tags: ['defused-device', 'technical-diagram'],
    views: 6
  },
  {
    id: 'EV-2024-1244-001',
    incidentId: 'INC-2024-1244',
    type: 'video',
    title: 'Pre-Incident CCTV Recording',
    date: '2024-12-05',
    uploadedBy: 'Capt. Bilal Ahmed',
    location: 'Lahore Garrison',
    size: '512 MB',
    tags: ['cctv', 'pre-incident', 'surveillance'],
    views: 18
  },
  {
    id: 'EV-2024-1243-001',
    incidentId: 'INC-2024-1243',
    type: 'document',
    title: 'Field Officer Initial Report',
    date: '2024-12-04',
    uploadedBy: 'Major Imran Siddiqui',
    location: 'Islamabad Blue Area',
    size: '1.8 MB',
    tags: ['field-report', 'initial-assessment'],
    views: 10
  },
  {
    id: 'EV-2024-1242-001',
    incidentId: 'INC-2024-1242',
    type: 'image',
    title: 'Post-Blast Scene Photos (Complete Set)',
    date: '2024-12-03',
    uploadedBy: 'Major Ahmed Khan',
    location: 'Multan Cantt',
    size: '128 MB',
    tags: ['blast-site', 'scene-documentation', 'high-priority'],
    views: 22
  },
  {
    id: 'EV-2024-1241-001',
    incidentId: 'INC-2024-1241',
    type: 'video',
    title: 'Bomb Disposal Operation Recording',
    date: '2024-12-02',
    uploadedBy: 'Lt. Fatima Malik',
    location: 'Rawalpindi City',
    size: '320 MB',
    tags: ['bomb-disposal', 'operation-video'],
    views: 14
  },
];

export default function EvidenceRepository({ onNavigate }: { onNavigate?: (menu: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleViewIncident = (incidentId: string) => {
    showToast(`Accessing secure Incident records for ${incidentId}...`, 'info');
    if (onNavigate) {
      setTimeout(() => {
        onNavigate('Incidents');
      }, 1000);
    }
  };

  const parseSizeToMb = (size: string) => {
    const match = size.match(/([\d.]+)/);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    if (size.toLowerCase().includes('tb')) return value * 1024 * 1024;
    if (size.toLowerCase().includes('gb')) return value * 1024;
    return value;
  };

  const formatSizeLabel = (sizeMb: number) => {
    if (sizeMb >= 1024) {
      return `${(sizeMb / 1024).toFixed(1)} GB`;
    }
    return `${sizeMb.toFixed(1)} MB`;
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const clearSelection = () => setSelectedItems([]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'image': return Image;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return '#FF6B00';
      case 'image': return '#0096FF';
      case 'document': return '#FFB800';
      default: return '#2F4F4F';
    }
  };

  const filteredItems = repositoryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.incidentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const selectAllFiltered = () => {
    if (filteredItems.length === 0) {
      showToast('No filtered evidence available to select.', 'info');
      return;
    }
    setSelectedItems(filteredItems.map((item) => item.id));
    showToast('Filtered evidence set armed for batch export.', 'info');
  };

  const isItemSelected = (itemId: string) => selectedItems.includes(itemId);

  const stats = {
    total: repositoryItems.length,
    videos: repositoryItems.filter(i => i.type === 'video').length,
    images: repositoryItems.filter(i => i.type === 'image').length,
    documents: repositoryItems.filter(i => i.type === 'document').length,
    totalSize: '1.2 TB'
  };
  const selectedCount = selectedItems.length;

  const handleAdvancedFilter = () => {
    showToast('Initializing advanced secure filtering protocols...', 'info');
  };

  const handleBatchDownload = () => {
    const batchItems = selectedItems.length
      ? repositoryItems.filter((item) => selectedItems.includes(item.id))
      : filteredItems;

    if (batchItems.length === 0) {
      showToast('No items available for batch download.', 'info');
      return;
    }

    showToast(`Initializing secure PDF dossier for ${batchItems.length} artifact${batchItems.length > 1 ? 's' : ''}...`, 'info');

    setTimeout(() => {
      const totalSizeMb = batchItems.reduce((sum, item) => sum + parseSizeToMb(item.size), 0);
      const packageId = `EVP-${Math.floor(Math.random() * 1000000)}`;
      const doc = new jsPDF();
      const timestamp = new Date().toLocaleString();
      const modeLabel = selectedItems.length ? 'MANUAL SELECTION' : 'FILTERED DATASET';

      // Header
      doc.setFillColor(10, 25, 47);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('EVIDENCE BATCH DOSSIER', 20, 22);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`PACKAGE ID: ${packageId} | GENERATED: ${timestamp}`, 20, 32);
      doc.setFillColor(255, 107, 0);
      doc.rect(160, 15, 38, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('SECRET // NOFORN', 179, 21.5, { align: 'center' });

      let y = 55;

      // Stats cards
      const stats = [
        { label: 'Total Items', value: batchItems.length },
        { label: 'Video Assets', value: batchItems.filter(i => i.type === 'video').length },
        { label: 'Image Assets', value: batchItems.filter(i => i.type === 'image').length },
        { label: 'Aggregate Size', value: formatSizeLabel(totalSizeMb) },
      ];

      stats.forEach((stat, index) => {
        doc.setFillColor(240, 245, 250);
        doc.rect(20 + index * 43, y, 40, 20, 'F');
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.text(stat.label.toUpperCase(), 22 + index * 43, y + 6);
        doc.setFontSize(14);
        doc.setTextColor(10, 25, 47);
        doc.text(String(stat.value), 22 + index * 43, y + 15);
      });
      y += 30;

      const addSection = (title: string, content: string) => {
        if (y > 250) {
          doc.addPage();
          y = 30;
        }
        doc.setTextColor(10, 25, 47);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(title, 20, y);
        y += 2;
        doc.setDrawColor(0, 150, 255);
        doc.setLineWidth(0.5);
        doc.line(20, y, 190, y);
        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const split = doc.splitTextToSize(content, 170);
        doc.text(split, 20, y);
        y += split.length * 5 + 10;
      };

      const highValueClusters = [...new Set(batchItems.map(item => item.incidentId))].slice(0, 4).join(', ');
      addSection(
        'Operational Summary',
        `Mode: ${modeLabel}. Filters: ${searchTerm ? `query="${searchTerm}"` : 'none'}, type=${typeFilter}. ` +
        `Aggregate payload spans ${batchItems.length} assets across incidents ${highValueClusters || 'N/A'} with a combined footprint of ${formatSizeLabel(totalSizeMb)}.`
      );

      addSection(
        'Handling Protocol',
        '- Maintain chain-of-custody continuity when disseminating this dossier.\n- Sync extracted assets with MilGPT knowledge graph on receipt.\n- Report anomalies in metadata signatures to the NFA cyber desk within 2 hours.'
      );

      // Table header
      const headers = ['Evidence ID', 'Incident', 'Type', 'Size', 'Uploader', 'Date'];
      const colWidths = [38, 32, 22, 20, 38, 20];

      const drawTableHeader = () => {
        doc.setFillColor(0, 150, 255);
        doc.rect(20, y, 170, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        let x = 23;
        headers.forEach((header, idx) => {
          doc.text(header, x, y + 5.5);
          x += colWidths[idx];
        });
        y += 8;
      };

      if (y > 240) {
        doc.addPage();
        y = 30;
      }
      drawTableHeader();

      batchItems.forEach((item, index) => {
        if (y > 275) {
          doc.addPage();
          y = 30;
          drawTableHeader();
        }

        const fill = index % 2 === 0 ? 248 : 235;
        doc.setFillColor(fill, fill, fill);
        doc.rect(20, y, 170, 8, 'F');
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(8.5);

        const row = [
          item.id,
          item.incidentId,
          item.type.toUpperCase(),
          item.size,
          item.uploadedBy,
          item.date,
        ];

        let x = 23;
        row.forEach((value, idx) => {
          const text = doc.splitTextToSize(value, colWidths[idx] - 3);
          doc.text(text, x, y + 5);
          x += colWidths[idx];
        });

        y += 8;
      });

      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 280, 190, 280);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('NATIONAL FORENSIC AGENCY // CONTROLLED EVIDENCE EXPORT', 20, 285);
        doc.text(`PAGE ${i} OF ${totalPages}`, 190, 285, { align: 'right' });
      }

      doc.save(`Evidence_Batch_${packageId}.pdf`);
      if (selectedItems.length) {
        clearSelection();
      }
      showToast('Field-grade PDF dossier generated successfully.', 'success');
    }, 1200);
  };


  const handleDownload = (item: typeof repositoryItems[0]) => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();
    const dossierId = `${item.id}-DOSSIER`;

    // Header
    doc.setFillColor(10, 25, 47);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('EVIDENCE INTELLIGENCE DOSSIER', 20, 22);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`DOSSIER ID: ${dossierId} | GENERATED: ${timestamp}`, 20, 32);
    doc.setFillColor(255, 107, 0);
    doc.rect(160, 15, 38, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('SECRET // NOFORN', 179, 21.5, { align: 'center' });

    let y = 55;

    // Metadata panel
    doc.setFillColor(240, 245, 250);
    doc.rect(20, y, 170, 30, 'F');
    doc.setTextColor(10, 25, 47);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('EVIDENCE ID', 25, y + 8);
    doc.text('INCIDENT ID', 25, y + 16);
    doc.text('FILE SIZE', 25, y + 24);
    doc.text('UPLOAD DATE', 110, y + 8);
    doc.text('ASSET TYPE', 110, y + 16);
    doc.text('LOCATION', 110, y + 24);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(item.id, 55, y + 8);
    doc.text(item.incidentId, 55, y + 16);
    doc.text(item.size, 55, y + 24);
    doc.text(`${item.date}`, 150, y + 8);
    doc.text(item.type.toUpperCase(), 150, y + 16);
    doc.text(item.location, 150, y + 24);
    y += 42;

    const addSection = (title: string, content: string) => {
      if (y > 250) {
        doc.addPage();
        y = 30;
      }
      doc.setTextColor(10, 25, 47);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(title, 20, y);
      y += 2;
      doc.setDrawColor(0, 150, 255);
      doc.setLineWidth(0.5);
      doc.line(20, y, 190, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const split = doc.splitTextToSize(content, 170);
      doc.text(split, 20, y);
      y += split.length * 5 + 10;
    };

    addSection(
      'Operational Context',
      `${item.title}. Captured by ${item.uploadedBy}. Asset classified under priority tag set: ${item.tags.join(', ')}.`
    );

    addSection(
      'Chain of Custody',
      `1. ${item.uploadedBy} — Uploaded ${item.date} 14:30
2. Dr. Zainab Qureshi — Verified ${item.date} 16:45
3. NFA Digital Vault — Archived ${new Date().toLocaleDateString()}`
    );

    addSection(
      'Handling Notes',
      `- Review high-resolution source via secure workstation only.
    - Sync extracted intelligence to MilGPT assistant tagging this Evidence ID.
    - Report integrity anomalies to the NFA cyber desk within 2 hours.`
    );

    // Tags
    doc.setTextColor(10, 25, 47);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Tagging Matrix', 20, y);
    y += 2;
    doc.setDrawColor(0, 150, 255);
    doc.line(20, y, 190, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const tagsText = item.tags.length ? item.tags.map(tag => `• ${tag}`).join('\n') : 'No tags assigned.';
    const tagSplit = doc.splitTextToSize(tagsText, 170);
    doc.text(tagSplit, 20, y);
    y += tagSplit.length * 5 + 10;

    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 280, 190, 280);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('NFA EVIDENCE DIVISION // CONTROLLED MATERIAL', 20, 285);
      doc.text(`PAGE ${i} OF ${totalPages}`, 190, 285, { align: 'right' });
    }

    doc.save(`${item.id}_Evidence_Dossier.pdf`);
    showToast(`Evidence ${item.id} PDF download started.`, 'success');
  };


  return (
    <div className="w-full relative z-0">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#FFB800] to-[#FF6B00] rounded-xl flex items-center justify-center shrink-0">
              <Database className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-white mb-1 font-bold">Evidence Repository</h1>
              <p className="text-xs md:text-sm text-white/60">Forensic materials and intelligence storage</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAdvancedFilter}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#414141] hover:bg-[#414141]/80 border border-[#0096FF]/30 rounded-lg transition-colors text-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Advanced Filter</span>
            </button>
            <button
              onClick={handleBatchDownload}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors font-medium shadow-lg shadow-[#0096FF]/20 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Batch Download{selectedCount ? ` (${selectedCount})` : ''}</span>
            </button>
          </div>
        </div>

        <div className="bg-[#0A192F]/60 border border-[#0096FF]/10 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 text-xs sm:text-sm text-white/70">
          <div className="flex items-center gap-2">
            {selectedCount > 0 ? (
              <CheckCircle className="w-4 h-4 text-[#00FF88]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#0096FF]" />
            )}
            <span className="font-medium text-white/80">
              {selectedCount > 0
                ? `${selectedCount} evidence file${selectedCount > 1 ? 's' : ''} armed for batch export.`
                : 'Select evidence tiles or stage the filtered results to enable batch export.'}
            </span>
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <button
              onClick={selectAllFiltered}
              className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
            >
              Select Filtered Results
            </button>
            {selectedCount > 0 && (
              <button
                onClick={clearSelection}
                className="px-3 py-1 rounded-lg border border-[#FF6B00]/30 text-[#FF6B00] bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 transition-colors"
              >
                Clear Selection
              </button>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Folder className="w-8 h-8 text-[#0096FF]" />
              <div>
                <p className="text-white/60 text-xs">Total Items</p>
                <p className="text-2xl text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FF6B00]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Video className="w-8 h-8 text-[#FF6B00]" />
              <div>
                <p className="text-white/60 text-xs">Videos</p>
                <p className="text-2xl text-white">{stats.videos}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Image className="w-8 h-8 text-[#0096FF]" />
              <div>
                <p className="text-white/60 text-xs">Images</p>
                <p className="text-2xl text-white">{stats.images}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#FFB800]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#FFB800]" />
              <div>
                <p className="text-white/60 text-xs">Documents</p>
                <p className="text-2xl text-white">{stats.documents}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#00FF88]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-[#00FF88]" />
              <div>
                <p className="text-white/60 text-xs">Storage Used</p>
                <p className="text-2xl text-white">{stats.totalSize}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search by title, incident ID, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0096FF]"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#0096FF]"
            >
              <option value="all">All Types</option>
              <option value="video">Videos Only</option>
              <option value="image">Images Only</option>
              <option value="document">Documents Only</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${viewMode === 'grid'
                  ? 'bg-[#0096FF] text-white'
                  : 'bg-[#414141] text-white/60 hover:text-white'
                  }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${viewMode === 'list'
                  ? 'bg-[#0096FF] text-white'
                  : 'bg-[#414141] text-white/60 hover:text-white'
                  }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Evidence Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              const typeColor = getTypeColor(item.type);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`
                    relative bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border rounded-lg overflow-hidden cursor-pointer transition-all
                    ${selectedItem === item.id || isItemSelected(item.id)
                      ? 'border-[#0096FF] shadow-lg shadow-[#0096FF]/20 scale-105'
                      : 'border-[#0096FF]/20 hover:border-[#0096FF]/40'
                    }
                  `}
                >
                  <label
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute top-3 right-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold border transition-colors z-10 ${isItemSelected(item.id)
                      ? 'bg-[#00FF88]/20 border-[#00FF88] text-[#00FF88]'
                      : 'bg-black/40 border-white/20 text-white/70 hover:text-white'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={isItemSelected(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      className="w-3 h-3 accent-[#0096FF]"
                    />
                    <span>{isItemSelected(item.id) ? 'Selected' : 'Stage'}</span>
                  </label>
                  {/* Thumbnail */}
                  <div
                    className="h-40 flex items-center justify-center"
                    style={{ backgroundColor: `${typeColor}10` }}
                  >
                    <TypeIcon className="w-16 h-16" style={{ color: typeColor }} />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm text-white line-clamp-2">{item.title}</h3>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <User className="w-3 h-3" />
                        <span>{item.uploadedBy}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#0096FF]">
                        <Tag className="w-3 h-3" />
                        <span>{item.incidentId}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#414141] text-white/70 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-[#414141] text-white/70 rounded text-xs">
                          +{item.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#0096FF]/10">
                      <span className="text-xs text-white/60">{item.size}</span>
                      <button
                        onClick={(e: React.MouseEvent) => { e.stopPropagation(); setSelectedItem(item.id); }}
                        className="flex items-center gap-1 px-2 py-1 bg-[#0096FF]/20 hover:bg-[#0096FF]/30 border border-[#0096FF] text-[#0096FF] rounded text-xs transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-[#0096FF]/20 bg-[#0A192F]/50">
                    <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Stage</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Type</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Title</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Incident ID</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Date</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Uploaded By</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Size</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Views</th>
                    <th className="text-left py-3 px-4 text-xs text-white/60 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => {
                    const TypeIcon = getTypeIcon(item.type);
                    const typeColor = getTypeColor(item.type);
                    const rowSelected = isItemSelected(item.id);

                    return (
                      <tr
                        key={item.id}
                        className={`border-b border-[#0096FF]/10 transition-colors cursor-pointer ${rowSelected ? 'bg-[#0096FF]/5' : 'hover:bg-white/5'}`}
                        onClick={() => setSelectedItem(item.id)}
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={rowSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleItemSelection(item.id);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 accent-[#0096FF]"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <TypeIcon className="w-5 h-5" style={{ color: typeColor }} />
                            <span className="text-xs text-white/70 capitalize">{item.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-white">{item.title}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-[#0096FF]">{item.incidentId}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-white/70">{item.date}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-white/70">{item.uploadedBy}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-white/70">{item.size}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-white/70">{item.views}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={(e: React.MouseEvent) => { e.stopPropagation(); setSelectedItem(item.id); }}
                              className="p-1.5 bg-[#0096FF]/20 hover:bg-[#0096FF]/30 border border-[#0096FF] text-[#0096FF] rounded transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleDownload(item); }}
                              className="p-1.5 bg-[#00FF88]/20 hover:bg-[#00FF88]/30 border border-[#00FF88] text-[#00FF88] rounded transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="text-center text-sm text-white/60">
          Showing {filteredItems.length} of {repositoryItems.length} items
        </div>
      </div>

      {/* Evidence Detail Modal */}
      {selectedItem && repositoryItems.find(i => i.id === selectedItem) && (() => {
        const item = repositoryItems.find(i => i.id === selectedItem)!;
        const TypeIcon = getTypeIcon(item.type);
        const typeColor = getTypeColor(item.type);

        return (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[2000] p-4" onClick={() => setSelectedItem(null)}>
            <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF] rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#0096FF]/20" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0A192F] border-b border-[#0096FF]/20 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${typeColor}20` }}>
                    <TypeIcon className="w-6 h-6" style={{ color: typeColor }} />
                  </div>
                  <div>
                    <h2 className="text-xl text-white mb-1">{item.title}</h2>
                    <p className="text-sm text-[#0096FF]">{item.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Preview Area */}
                <div className="h-96 rounded-lg overflow-hidden flex items-center justify-center" style={{ backgroundColor: `${typeColor}10` }}>
                  {item.type === 'video' ? (
                    <div className="text-center">
                      <Play className="w-24 h-24 mx-auto mb-4" style={{ color: typeColor }} />
                      <p className="text-white">Video Player</p>
                      <p className="text-sm text-white/60 mt-2">Duration: 04:32</p>
                    </div>
                  ) : item.type === 'image' ? (
                    <div className="text-center">
                      <Image className="w-24 h-24 mx-auto mb-4" style={{ color: typeColor }} />
                      <p className="text-white">Image Preview</p>
                      <p className="text-sm text-white/60 mt-2">Resolution: 4096 x 3072</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileText className="w-24 h-24 mx-auto mb-4" style={{ color: typeColor }} />
                      <p className="text-white">Document Viewer</p>
                      <p className="text-sm text-white/60 mt-2">Pages: 24</p>
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg">
                    <h3 className="text-white mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#0096FF]" />
                      File Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">File Type:</span>
                        <span className="text-white capitalize">{item.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">File Size:</span>
                        <span className="text-white">{item.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Upload Date:</span>
                        <span className="text-white">{item.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Views:</span>
                        <span className="text-white">{item.views}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg">
                    <h3 className="text-white mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FFB800]" />
                      Related Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Incident ID:</span>
                        <span className="text-[#0096FF]">{item.incidentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Location:</span>
                        <span className="text-white">{item.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Uploaded By:</span>
                        <span className="text-white">{item.uploadedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Classification:</span>
                        <span className="text-[#FF0000]">CLASSIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg">
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#00FF88]" />
                    Tags & Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#0096FF]/20 border border-[#0096FF] text-[#0096FF] rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Chain of Custody */}
                <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg">
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#FFB800]" />
                    Chain of Custody
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-[#0d1f3a] rounded">
                      <div className="w-2 h-2 bg-[#00FF88] rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm text-white">{item.uploadedBy}</p>
                        <p className="text-xs text-white/60">Uploaded - {item.date} 14:30</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-[#0d1f3a] rounded">
                      <div className="w-2 h-2 bg-[#0096FF] rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm text-white">Dr. Zainab Qureshi</p>
                        <p className="text-xs text-white/60">Verified - {item.date} 16:45</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleDownload(item)}
                    className="px-4 py-2 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => handleViewIncident(item.incidentId)}
                    className="px-4 py-2 bg-[#414141] hover:bg-[#414141]/80 border border-[#0096FF]/30 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Incident</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

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
          </div>
        </div>
      )}
    </div>
  );
}