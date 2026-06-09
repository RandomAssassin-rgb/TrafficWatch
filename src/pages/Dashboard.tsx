import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, BarChart2, CheckCircle2, MoreHorizontal, Award, Eye, XCircle } from 'lucide-react';
import { getAllReports, ReportRecord } from '../utils/storage';

function formatTimeAgo(isoString: string) {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(isoString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch (e) {
    return 'Recently';
  }
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportRecord[]>([]);

  useEffect(() => {
    setReports(getAllReports());
  }, []);

  const totalReports = reports.length;
  const approvedReports = reports.filter(r => r.status === 'authorized').length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const totalRewards = reports
    .filter(r => r.status === 'authorized')
    .reduce((sum, r) => sum + (r.reportData.financials?.citizen_reward_points || 0), 0);

  // Take the 3 most recent reports
  const recentReports = reports.slice(0, 3);

  const handleActivityClick = (record: ReportRecord) => {
    navigate('/admin', {
      state: {
        report: record.reportData,
        previewUrl: record.previewUrl,
        id: record.id
      }
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-500 pt-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Officer</h1>
          <p className="text-slate-500">Here is your traffic monitoring summary for today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={18} /> Filters
          </button>
          <Link to="/upload" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">
            New Report
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BarChart2 size={20} />
            </div>
            <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold">+12%</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{totalReports}</div>
          <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">Total Reports</div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold">
              {totalReports > 0 ? `${Math.round((approvedReports / totalReports) * 100)}% Rate` : '0% Rate'}
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{approvedReports}</div>
          <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">Approved</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
              <MoreHorizontal size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{pendingReports}</div>
          <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">Pending</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{totalRewards.toLocaleString()}</div>
          <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">Reward Points</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area: Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            <Link to="/reports" className="text-sm font-bold text-blue-600 hover:text-blue-800">View All</Link>
          </div>
          <div className="p-6 relative flex-1">
            {recentReports.length > 0 && (
              <div className="absolute left-[39px] top-10 bottom-10 w-[2px] bg-slate-100 z-0"></div>
            )}
            
            {recentReports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <p className="text-slate-400 text-sm">No activity recorded yet.</p>
                <Link to="/upload" className="text-blue-600 font-bold text-sm hover:underline mt-2">Submit evidence to start</Link>
              </div>
            ) : (
              <div className="space-y-8">
                {recentReports.map((r) => {
                  const isApproved = r.status === 'authorized';
                  const isRejected = r.status === 'rejected';
                  const violationType = r.reportData.violation_detection?.violation_type || 'Violation';
                  const locationHint = r.reportData.number_plate_ocr?.region_state_hint || 'District';
                  
                  return (
                    <div 
                      key={r.id} 
                      onClick={() => handleActivityClick(r)}
                      className="relative z-10 flex gap-6 group cursor-pointer hover:bg-slate-50/50 p-2 -m-2 rounded-xl transition-all"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm ${
                        isApproved ? 'bg-emerald-50 text-emerald-600' :
                        isRejected ? 'bg-rose-50 text-rose-600' :
                        'bg-blue-50 text-blue-600 animate-pulse'
                      }`}>
                        {isApproved ? <CheckCircle2 size={20} /> :
                         isRejected ? <XCircle size={20} /> :
                         <Eye size={20} />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-slate-900 font-medium text-base mb-1 group-hover:text-blue-600 transition-colors">
                          {violationType} {isApproved ? 'approved' : isRejected ? 'rejected' : 'under manual review'} in {locationHint}
                        </h3>
                        <div className="text-sm text-slate-500 mb-2">
                          Report #{r.id} • {formatTimeAgo(r.timestamp)}
                        </div>
                        {isApproved && (
                          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold">
                            <Award size={14} /> +{r.reportData.financials?.citizen_reward_points || 0} pts
                          </div>
                        )}
                        {isRejected && (
                          <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md text-xs font-bold">
                            Rejected citation
                          </div>
                        )}
                        {r.status === 'pending' && (
                          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold animate-pulse">
                            <MoreHorizontal size={14} /> Pending Officer Decision
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Area: Activity Trend */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Activity Trend</h2>
            <p className="text-xs text-slate-500 mb-6">Last 30 Days</p>
            
            <div className="flex items-end justify-between h-24 mb-6 gap-2">
              {[4, 6, 3, 9, 12, 1, 2, 1, 3, 8, 4].map((val, i) => (
                <div key={i} className={`w-full rounded-t-sm ${i === 4 ? 'bg-blue-600' : 'bg-blue-200'}`} style={{ height: `${Math.max(10, val * 8)}%` }}></div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Peak Day</span>
                <span className="font-medium text-slate-900">Tuesday</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Avg Reports/Week</span>
                <span className="font-medium text-slate-900">14.2</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden h-48 relative">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-awncr-ddaQFpcw1Z9MYKg_en0n-Ig1npRWEaFq-99DnPhopYmkSVa8-Om--dNnnwKPZADRqPDQcLf347k1Y9XTj7rfQslNjRSgmfU2jTsCj6bxGFXZxI8_YI2fb0liK0GFtytYlfApTTer42jFXbZKUq7ZpHJbxXzzW3jN0-t0S-ahRZKbM4zp2Nrp3lDm8GLYTffg4UIdRzrCccYatjtHrV2GxOAoIrpiDabJOVp8thqynLIgExuTNnPHi0UHIFSvA3GOXkd6g" alt="Map View" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
          </div>
        </div>
      </div>
    </div>
  );
}
