import { useState } from 'react';
import { Upload, File, Video, Image, FileText, MapPin, Calendar, Clock, User, AlertTriangle, TestTube, Fingerprint, Save, X, Plus, Check } from 'lucide-react';

export default function DataIngestion() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; type: string; size: string }>>([]);
  const [formData, setFormData] = useState({
    incidentId: '',
    incidentType: '',
    severity: '',
    date: '',
    time: '',
    location: '',
    coordinates: '',
    casualties: '',
    description: '',
    fieldOfficer: '',
    deviceType: '',
    explosiveType: '',
    triggerMechanism: '',
    ttpcCluster: '',
  });

  const steps = [
    { id: 1, name: 'Basic Information', icon: FileText },
    { id: 2, name: 'Location & Time', icon: MapPin },
    { id: 3, name: 'Device Details', icon: Fingerprint },
    { id: 4, name: 'Evidence Upload', icon: Upload },
    { id: 5, name: 'Review & Submit', icon: Check },
  ];

  const handleFileUpload = (type: string) => {
    // Simulate file upload
    const mockFile = {
      name: `${type}_evidence_${Date.now()}.${type === 'video' ? 'mp4' : type === 'image' ? 'jpg' : 'pdf'}`,
      type: type,
      size: `${Math.floor(Math.random() * 50 + 10)} MB`
    };
    setUploadedFiles([...uploadedFiles, mockFile]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    alert('Incident data submitted successfully! ID: INC-2024-' + Math.floor(Math.random() * 1000));
    // Reset form
    setCurrentStep(1);
    setUploadedFiles([]);
    setFormData({
      incidentId: '',
      incidentType: '',
      severity: '',
      date: '',
      time: '',
      location: '',
      coordinates: '',
      casualties: '',
      description: '',
      fieldOfficer: '',
      deviceType: '',
      explosiveType: '',
      triggerMechanism: '',
      ttpcCluster: '',
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'image': return Image;
      case 'document': return FileText;
      default: return File;
    }
  };

  return (
    <div className="w-full z-0 relative">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#0096FF] to-[#2F4F4F] rounded-xl flex items-center justify-center shrink-0">
              <Upload className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl text-white mb-1 font-bold">Data Ingestion Module</h1>
              <p className="text-xs md:text-sm text-white/60">Forensic evidence submission portal</p>
            </div>
          </div>

          <div className="md:text-right border-l-2 border-[#0096FF]/20 pl-4">
            <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest mb-1">Active Session</p>
            <p className="text-sm text-[#0096FF] font-medium">Major Ahmed Khan</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-4 md:p-6 overflow-x-auto custom-scrollbar">
          <div className="flex items-center justify-between min-w-[600px] md:min-w-0 z-[1000] relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;

              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all
                        ${isCompleted
                          ? 'bg-[#00FF88] border-[#00FF88]'
                          : isCurrent
                            ? 'bg-[#0096FF] border-[#0096FF] scale-110'
                            : 'bg-[#414141] border-[#414141]'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      ) : (
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      )}
                    </div>
                    <p className={`text-[10px] md:text-xs mt-2 font-medium ${isCurrent ? 'text-[#0096FF]' : 'text-white/60'} whitespace-nowrap`}>
                      {step.name}
                    </p>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 md:mx-4 mb-6" style={{
                      backgroundColor: isCompleted ? '#00FF88' : '#414141'
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gradient-to-br from-[#0d1f3a] to-[#0A192F] border border-[#0096FF]/20 rounded-lg p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg text-white mb-4">Basic Incident Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-white/80 mb-2 block">Incident ID (Auto-generated)</label>
                  <input
                    type="text"
                    value={formData.incidentId || `INC-2024-${Math.floor(Math.random() * 10000)}`}
                    disabled
                    className="w-full bg-[#414141] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">Incident Type *</label>
                  <select
                    value={formData.incidentType}
                    onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select Type</option>
                    <option value="IED">IED (Improvised Explosive Device)</option>
                    <option value="VBIED">VBIED (Vehicle-Borne IED)</option>
                    <option value="Suicide">Suicide Bombing</option>
                    <option value="Defused">Defused Device</option>
                    <option value="Unknown">Unknown/Under Investigation</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">Severity Level *</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select Severity</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">Casualties</label>
                  <input
                    type="number"
                    value={formData.casualties}
                    onChange={(e) => setFormData({ ...formData, casualties: e.target.value })}
                    placeholder="Number of casualties"
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">Field Officer *</label>
                  <input
                    type="text"
                    value={formData.fieldOfficer}
                    onChange={(e) => setFormData({ ...formData, fieldOfficer: e.target.value })}
                    placeholder="Officer name and ID"
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-white/80 mb-2 block">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Detailed description of the incident..."
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg text-white mb-4">Location & Timing Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-white/80 mb-2 block">Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg pl-10 pr-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">Time *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg pl-10 pr-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-white/80 mb-2 block">Location Name *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Northern District, Metro Area"
                      className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">Latitude</label>
                  <input
                    type="text"
                    placeholder="e.g., 34.5280"
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">Longitude</label>
                  <input
                    type="text"
                    placeholder="e.g., 69.1725"
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-6 h-64 bg-[#0A192F] border border-[#0096FF]/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-sm text-white/60">Interactive map for location selection</p>
                  <p className="text-xs text-white/40">Click to set coordinates</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg text-white mb-4">Device & Forensic Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-white/80 mb-2 block">Device Type</label>
                  <select
                    value={formData.deviceType}
                    onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select Device Type</option>
                    <option value="roadside">Roadside IED</option>
                    <option value="package">Package Bomb</option>
                    <option value="vehicle">Vehicle-Borne</option>
                    <option value="suicide-vest">Suicide Vest</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">Explosive Type</label>
                  <select
                    value={formData.explosiveType}
                    onChange={(e) => setFormData({ ...formData, explosiveType: e.target.value })}
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select Explosive</option>
                    <option value="ammonium-nitrate">Ammonium Nitrate</option>
                    <option value="c4">C4</option>
                    <option value="petn">PETN</option>
                    <option value="tnt">TNT</option>
                    <option value="tatp">TATP</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">Trigger Mechanism</label>
                  <select
                    value={formData.triggerMechanism}
                    onChange={(e) => setFormData({ ...formData, triggerMechanism: e.target.value })}
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select Trigger</option>
                    <option value="remote-rf">Remote (RF)</option>
                    <option value="remote-cell">Remote (Cell Phone)</option>
                    <option value="timer">Timer-based</option>
                    <option value="pressure">Pressure Switch</option>
                    <option value="wired">Wired Circuit</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-white/80 mb-2 block">TTP Cluster (AI-Suggested)</label>
                  <input
                    type="text"
                    value={formData.ttpcCluster}
                    onChange={(e) => setFormData({ ...formData, ttpcCluster: e.target.value })}
                    placeholder="e.g., B2, A1"
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-white/80 mb-2 block">Chemical Analysis Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Precursor chemicals, composition analysis, trace elements..."
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-white/80 mb-2 block">Construction Method Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Assembly technique, skill level, unique characteristics..."
                    className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg text-white mb-4">Evidence & Media Upload</h2>

              {/* Upload Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => handleFileUpload('image')}
                  className="p-4 md:p-6 bg-[#0A192F] border-2 border-dashed border-[#0096FF]/30 hover:border-[#0096FF] rounded-lg transition-all group"
                >
                  <Image className="w-8 h-8 md:w-12 md:h-12 text-[#0096FF] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white text-sm md:text-base mb-1">Upload Images</p>
                  <p className="text-[10px] md:text-xs text-white/60">Photos, forensic images</p>
                </button>

                <button
                  onClick={() => handleFileUpload('video')}
                  className="p-4 md:p-6 bg-[#0A192F] border-2 border-dashed border-[#0096FF]/30 hover:border-[#0096FF] rounded-lg transition-all group"
                >
                  <Video className="w-8 h-8 md:w-12 md:h-12 text-[#0096FF] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white text-sm md:text-base mb-1">Upload Videos</p>
                  <p className="text-[10px] md:text-xs text-white/60">Surveillance, scene footage</p>
                </button>

                <button
                  onClick={() => handleFileUpload('document')}
                  className="p-4 md:p-6 bg-[#0A192F] border-2 border-dashed border-[#0096FF]/30 hover:border-[#0096FF] rounded-lg transition-all group"
                >
                  <FileText className="w-8 h-8 md:w-12 md:h-12 text-[#0096FF] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white text-sm md:text-base mb-1">Upload Documents</p>
                  <p className="text-[10px] md:text-xs text-white/60">Reports, lab results</p>
                </button>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg p-4">
                  <h3 className="text-white mb-3">Uploaded Files ({uploadedFiles.length})</h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, idx) => {
                      const FileIcon = getFileIcon(file.type);

                      return (
                        <div key={idx} className="flex items-center justify-between p-3 bg-[#0d1f3a] border border-[#0096FF]/10 rounded">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0096FF]/20 rounded flex items-center justify-center">
                              <FileIcon className="w-5 h-5 text-[#0096FF]" />
                            </div>
                            <div>
                              <p className="text-sm text-white">{file.name}</p>
                              <p className="text-xs text-white/60">{file.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(idx)}
                            className="p-2 hover:bg-[#FF0000]/20 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-[#FF0000]" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Metadata Tags */}
              <div>
                <label className="text-sm text-white/80 mb-2 block">Evidence Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., blast-site, device-fragments, chemical-samples"
                  className="w-full bg-[#0A192F] border border-[#0096FF]/30 rounded-lg px-4 py-2 text-white placeholder-white/40"
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-lg text-white mb-4">Review & Submit</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg">
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0096FF]" />
                    Basic Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Incident Type:</span>
                      <span className="text-white">{formData.incidentType || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Severity:</span>
                      <span className="text-white capitalize">{formData.severity || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Field Officer:</span>
                      <span className="text-white">{formData.fieldOfficer || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg">
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0096FF]" />
                    Location & Time
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Date:</span>
                      <span className="text-white">{formData.date || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Time:</span>
                      <span className="text-white">{formData.time || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Location:</span>
                      <span className="text-white">{formData.location || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg">
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-[#0096FF]" />
                    Device Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Device Type:</span>
                      <span className="text-white">{formData.deviceType || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Explosive:</span>
                      <span className="text-white">{formData.explosiveType || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Trigger:</span>
                      <span className="text-white">{formData.triggerMechanism || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0A192F]/50 border border-[#0096FF]/20 rounded-lg">
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#0096FF]" />
                    Evidence Files
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Total Files:</span>
                      <span className="text-white">{uploadedFiles.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Images:</span>
                      <span className="text-white">{uploadedFiles.filter(f => f.type === 'image').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Videos:</span>
                      <span className="text-white">{uploadedFiles.filter(f => f.type === 'video').length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white mb-1">Data Verification</p>
                    <p className="text-xs text-white/70">Please review all information carefully before submission. This data will be permanently stored in the central repository and processed by AI systems for analysis.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="w-full sm:w-auto px-8 py-3 bg-[#414141] hover:bg-[#414141]/80 border border-[#0096FF]/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Previous Step
          </button>

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              className="w-full sm:w-auto px-8 py-3 bg-[#0096FF] hover:bg-[#0096FF]/80 rounded-lg transition-colors font-medium shadow-lg shadow-[#0096FF]/20"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#00FF88] hover:bg-[#00FF88]/80 text-[#0A192F] rounded-lg transition-colors font-bold"
            >
              <Save className="w-4 h-4" />
              <span>Submit to Repository</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}