import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, SearchX, CheckCircle, XCircle, Eye, ShieldCheck, MapPin, Clock, Smartphone, Cpu, FileText, DollarSign, Award, Loader2 } from 'lucide-react';
import { updateReportStatus } from '../utils/storage';

export default function AdminReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { report, previewUrl, id } = location.state || {};
  const [actionStatus, setActionStatus] = useState<'idle' | 'authorizing' | 'rejecting' | 'authorized' | 'rejected'>('idle');

  const handleAuthorize = () => {
    setActionStatus('authorizing');
    if (id) {
      updateReportStatus(id, 'authorized');
    }
    setTimeout(() => {
      setActionStatus('authorized');
      setTimeout(() => navigate('/reports'), 1500); // Redirect to Reports to see the update
    }, 1000);
  };

  const handleReject = () => {
    setActionStatus('rejecting');
    if (id) {
      updateReportStatus(id, 'rejected');
    }
    setTimeout(() => {
      setActionStatus('rejected');
      setTimeout(() => navigate('/reports'), 1500); // Redirect to Reports to see the update
    }, 1000);
  };

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-full">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <SearchX size={32} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">No Evidence Submissions Selected</h2>
        <p className="text-sm text-slate-500 my-4 max-w-md">Select an evidence record from the dashboard or upload a new one to begin review.</p>
        <Link to="/upload" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">Go to Upload</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-64px)] flex flex-col space-y-6 pt-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
        <div>
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-blue-600 mb-2 flex items-center gap-1 font-bold text-sm">
            <ArrowLeft size={16} /> Return to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              Intelligence Review
            </h1>
            <span className="bg-red-50 text-red-700 border border-red-100 text-xs px-2.5 py-1 flex items-center gap-1.5 font-bold rounded-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> PRIORITY
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleReject}
            disabled={actionStatus !== 'idle'}
            className="bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-700 hover:text-red-700 px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {actionStatus === 'rejecting' ? <Loader2 size={18} className="animate-spin" /> : actionStatus === 'rejected' ? <XCircle size={18} /> : <XCircle size={18} />}
            {actionStatus === 'rejecting' ? 'Rejecting...' : actionStatus === 'rejected' ? 'Rejected' : 'Reject Evidence'}
          </button>
          <button 
            onClick={handleAuthorize}
            disabled={actionStatus !== 'idle'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-md disabled:opacity-50"
          >
            {actionStatus === 'authorizing' ? <Loader2 size={18} className="animate-spin" /> : actionStatus === 'authorized' ? <CheckCircle size={18} /> : <CheckCircle size={18} />}
            {actionStatus === 'authorizing' ? 'Authorizing...' : actionStatus === 'authorized' ? 'Authorized' : 'Authorize Citation'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden pb-6">
        {/* Left Col (2 parts): Evidence Viewer */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl flex flex-col shadow-sm overflow-hidden h-full">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900">
              <Eye size={18} className="text-blue-600" /> Media Feed
            </h2>
            <div className="flex gap-2">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 flex items-center gap-1.5 rounded-md text-xs font-bold">
                <ShieldCheck size={14} /> Cryptographic Hash Verified
              </span>
            </div>
          </div>
          
          <div className="relative flex-1 bg-slate-900 flex items-center justify-center p-4 overflow-hidden">
            <img src={previewUrl || "https://dummyimage.com/1200x800/111/444&text=NO+SIGNAL"} alt="Reported Evidence" className="max-w-full max-h-full object-contain" />
            
            {/* Violation Overlay on Image */}
            {report.violation_detection?.violation_type && report.violation_detection.violation_type !== 'None' && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-red-600/90 text-white px-6 py-3 rounded-lg border-2 border-red-400 shadow-2xl backdrop-blur-sm z-20 flex flex-col items-center animate-in slide-in-from-top-4">
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Detected Violation</span>
                 <span className="text-2xl font-black uppercase tracking-wider">{report.violation_detection.violation_type}</span>
              </div>
            )}

            {/* Bounding boxes */}
            {report.vehicle_detection?.bounding_box_suggestions?.map((box: any, i: number) => (
               <div key={i} className="absolute border-2 border-blue-500 bg-blue-500/10 flex items-center justify-center rounded-sm" style={{
                 left: box.x1 || '20%', top: box.y1 || '20%', width: box.width || '40%', height: box.height || '40%'
               }}>
                 <span className="absolute -top-6 left-[-2px] bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-t-sm whitespace-nowrap">TARGET LOCK</span>
               </div>
            ))}
          </div>

          {/* Telemetry Footer */}
          <div className="p-4 grid grid-cols-3 gap-4 bg-slate-50 shrink-0 border-t border-slate-100">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">GPS Coordinates</div>
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" />
                40.7128° N, 74.0060° W
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Temporal Data</div>
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                14:32:05 EDT
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Capture Device</div>
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Smartphone size={16} className="text-blue-600" />
                ID: A9-8X-Z2
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: AI Intel */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden shrink-0">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900">
                <Cpu size={18} className="text-blue-600" /> Analysis Results
              </h2>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="border border-red-200 bg-red-50 p-5 rounded-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Primary Violation Detected
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">{report.violation_detection?.violation_type}</h3>
                  <p className="text-sm text-slate-700 mb-4">{report.violation_detection?.evidence_description}</p>
                  
                  <div className="flex items-center gap-2">
                    <div className="bg-white text-red-700 px-2.5 py-1 rounded-md text-xs font-bold border border-red-200 shadow-sm">
                      Severity: {report.violation_detection?.severity || 'Unknown'}
                    </div>
                    <div className="bg-white text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-200 shadow-sm">
                      AI CONFIDENCE: {report.violation_detection?.confidence_score ? (report.violation_detection.confidence_score * 100).toFixed(1) + '%' : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject Classification</div>
                  <div className="font-bold text-sm text-slate-900">{report.vehicle_classification?.make || 'UNKNOWN'} {report.vehicle_classification?.type}</div>
                  <div className="text-xs text-slate-500">{report.vehicle_classification?.color}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Plate OCR Extracted</div>
                  <div className="font-bold text-lg text-blue-600 tracking-wider font-mono">
                    {report.number_plate_ocr?.plate_number || 'UNKNOWN'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-bold uppercase">
                     {report.number_plate_ocr?.region_state_hint || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText size={16} /> Generated Citation Narrative
                </h3>
                <p className="text-sm border-l-2 border-slate-300 pl-4 italic text-slate-700 leading-relaxed">
                  "{report.investigation_report?.generated_narrative}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                   <div>
                     <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Calculated Fine</div>
                     <div className="text-2xl font-bold text-slate-900">${report.financials?.recommended_fine_amount_usd}</div>
                   </div>
                   <DollarSign size={32} className="text-slate-300" />
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm flex justify-between items-center">
                   <div>
                     <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Citizen Reward</div>
                     <div className="text-2xl font-bold text-emerald-700">+{report.financials?.citizen_reward_points}</div>
                   </div>
                   <Award size={32} className="text-emerald-200" />
                </div>
              </div>

            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm shrink-0">
             <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                 <FileText size={16} /> Source JSON Payload
               </h3>
             </div>
             <pre className="p-6 text-slate-600 text-xs font-mono overflow-auto h-48 bg-slate-50">
               {JSON.stringify(report, null, 2)}
             </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
