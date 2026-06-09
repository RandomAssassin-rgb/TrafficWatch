import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, Search, Filter, Calendar, MapPin, 
  CheckCircle2, XCircle, Clock, ChevronRight, 
  Trash2, DollarSign, Award, AlertTriangle, ArrowUpDown
} from 'lucide-react';
import { getAllReports, deleteReport, ReportRecord } from '../utils/storage';

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'authorized' | 'rejected'>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'fine-desc' | 'reward-desc'>('date-desc');

  useEffect(() => {
    setReports(getAllReports());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering details navigation
    if (confirm('Are you sure you want to delete this report record?')) {
      deleteReport(id);
      setReports(getAllReports());
    }
  };

  const handleViewDetails = (record: ReportRecord) => {
    navigate('/admin', { 
      state: { 
        report: record.reportData, 
        previewUrl: record.previewUrl, 
        id: record.id 
      } 
    });
  };

  // Stats calculation
  const totalReports = reports.length;
  const pendingCount = reports.filter(r => r.status === 'pending').length;
  const authorizedCount = reports.filter(r => r.status === 'authorized').length;
  const totalRewards = reports
    .filter(r => r.status === 'authorized')
    .reduce((sum, r) => sum + (r.reportData.financials?.citizen_reward_points || 0), 0);

  // Search & filter logic
  const filteredReports = reports
    .filter(r => {
      const matchSearch = 
        (r.id?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.reportData.violation_detection?.violation_type?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.reportData.number_plate_ocr?.plate_number?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.reportData.vehicle_classification?.make?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.reportData.vehicle_detection?.vehicle_type?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      if (sortBy === 'date-asc') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      if (sortBy === 'fine-desc') {
        const fineA = a.reportData.financials?.recommended_fine_amount_usd || 0;
        const fineB = b.reportData.financials?.recommended_fine_amount_usd || 0;
        return fineB - fineA;
      }
      if (sortBy === 'reward-desc') {
        const rA = a.reportData.financials?.citizen_reward_points || 0;
        const rB = b.reportData.financials?.citizen_reward_points || 0;
        return rB - rA;
      }
      return 0;
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'authorized':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            <CheckCircle2 size={13} className="shrink-0 text-emerald-600" />
            Authorized
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            <XCircle size={13} className="shrink-0 text-rose-600" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">
            <Clock size={13} className="shrink-0 text-amber-500" />
            Pending Review
          </span>
        );
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">CRITICAL</span>;
      case 'high':
        return <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">HIGH</span>;
      case 'medium':
        return <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">MEDIUM</span>;
      default:
        return <span className="bg-slate-50 text-slate-700 border border-slate-200 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">LOW</span>;
    }
  };

  const formatDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500 pt-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Submitted Reports</h1>
          <p className="text-slate-500">Track and review citizen evidence logs, AI analytics, and legal authorization states.</p>
        </div>
        <Link 
          to="/upload" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span>📤</span> Submit New Evidence
        </Link>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1">Total Submissions</div>
          <div className="text-3xl font-extrabold text-slate-900">{totalReports}</div>
          <div className="text-xs text-slate-400 mt-2">All recorded database entries</div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1">Pending Review</div>
          <div className="text-3xl font-extrabold text-amber-600 flex items-center gap-2">
            {pendingCount}
            {pendingCount > 0 && <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>}
          </div>
          <div className="text-xs text-slate-400 mt-2">Awaiting citation authorization</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1">Citations Approved</div>
          <div className="text-3xl font-extrabold text-emerald-600">{authorizedCount}</div>
          <div className="text-xs text-slate-400 mt-2">Successfully issued as fines</div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-md text-white border border-blue-700">
          <div className="text-xs font-bold text-blue-100 tracking-wider uppercase mb-1">SafeCity Points Earned</div>
          <div className="text-3xl font-extrabold flex items-center gap-2">
            <Award size={28} className="text-amber-300 animate-bounce" />
            {totalRewards}
          </div>
          <div className="text-xs text-blue-200 mt-2">From approved citation reports</div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input 
            type="text"
            placeholder="Search by ID, violation type, plate, or vehicle brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-slate-400"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1.5">
            <Filter size={14} /> Status:
          </span>
          <button 
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${statusFilter === 'all' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            All
          </button>
          <button 
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${statusFilter === 'pending' ? 'bg-amber-500 text-white border-amber-500 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setStatusFilter('authorized')}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${statusFilter === 'authorized' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            Authorized
          </button>
          <button 
            onClick={() => setStatusFilter('rejected')}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${statusFilter === 'rejected' ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            Rejected
          </button>
        </div>

        {/* Sort select */}
        <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ArrowUpDown size={14} /> Sort By:
          </span>
          <select 
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="fine-desc">Highest Fine</option>
            <option value="reward-desc">Highest Reward</option>
          </select>
        </div>

      </div>

      {/* Reports Table / Card Container */}
      {filteredReports.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
            <FileText size={32} className="text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No reports found</h2>
          <p className="text-sm text-slate-500 max-w-md mb-8">
            No matching submitted reports found in the local database. Try adjusting your filter or submit new traffic evidence.
          </p>
          <Link 
            to="/upload" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            Submit New Evidence
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6 select-none">Evidence</th>
                  <th className="py-4 px-6 select-none">Incident Details</th>
                  <th className="py-4 px-6 select-none">Plate / Vehicle</th>
                  <th className="py-4 px-6 select-none">Status</th>
                  <th className="py-4 px-6 select-none">Citation Value</th>
                  <th className="py-4 px-6 text-right select-none">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((record) => {
                  const violation = record.reportData.violation_detection;
                  const plate = record.reportData.number_plate_ocr;
                  const vehicle = record.reportData.vehicle_classification;
                  const financials = record.reportData.financials;

                  return (
                    <tr 
                      key={record.id}
                      onClick={() => handleViewDetails(record)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      {/* Evidence Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center relative shrink-0">
                          <img 
                            src={record.previewUrl} 
                            alt="Evidence" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </td>

                      {/* Incident Details */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          {violation?.violation_type || 'Unknown Violation'}
                          {violation?.severity && getSeverityBadge(violation.severity)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <span className="font-mono font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                            {record.id}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} className="text-slate-400" />
                            {formatDateTime(record.timestamp)}
                          </span>
                        </div>
                      </td>

                      {/* Plate / Vehicle */}
                      <td className="py-4 px-6">
                        {plate?.plate_number ? (
                          <div className="inline-block bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold px-2 py-0.5 rounded text-xs tracking-wider uppercase mb-1">
                            {plate.plate_number}
                          </div>
                        ) : (
                          <div className="text-xs italic text-slate-400 mb-1">NO PLATE DETECTED</div>
                        )}
                        <div className="text-xs text-slate-500">
                          {vehicle?.make || 'Unknown Make'} {vehicle?.type || 'Vehicle'} • {vehicle?.color || 'Color'}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        {getStatusBadge(record.status)}
                      </td>

                      {/* Citation Value */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-bold text-slate-900 flex items-center text-slate-700">
                            <DollarSign size={14} className="text-slate-400" />
                            {financials?.recommended_fine_amount_usd || 0}
                          </div>
                          <div className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                            <Award size={12} className="text-emerald-500" />
                            +{financials?.citizen_reward_points || 0} pts
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(record)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Inspect Intelligence Report"
                          >
                            <ChevronRight size={18} />
                          </button>
                          <button
                            onClick={(e) => handleDelete(record.id, e)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Record"
                          >
                            <Trash2 size={18} />
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
      
    </div>
  );
}
