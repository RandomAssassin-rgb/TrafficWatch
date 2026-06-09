import React, { useState, useEffect } from 'react';
import { Award, Bus, Coffee } from 'lucide-react';
import { getAllReports } from '../utils/storage';

export default function Rewards() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    setReports(getAllReports());
  }, []);

  const totalRewards = reports
    .filter(r => r.status === 'authorized')
    .reduce((sum, r) => sum + (r.reportData.financials?.citizen_reward_points || 0), 0);

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-500 pt-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Operative Rewards</h1>
        <p className="text-slate-500">Redeem SafeCity yield for approved municipal resources.</p>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden group">
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600">
            <Award size={32} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Available Yield</div>
            <div className="text-4xl font-black text-blue-600 tracking-tight">{totalRewards.toLocaleString()} <span className="text-lg font-bold opacity-70">CRD</span></div>
          </div>
        </div>
        <button className="mt-6 md:mt-0 relative z-10 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors">
          Authorize Transfer
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:border-blue-200 transition-colors">
          <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Bus size={20} />
            </div>
            Transit Infrastructure Pass
          </h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">Authorize 10 multi-zone transit jumps. Valid on all municipal networks.</p>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold">
            REQ: 500 CRD
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:border-blue-200 transition-colors">
          <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
              <Coffee size={20} />
            </div>
            Ration Voucher
          </h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">$10 credit line valid at approved Sector 4 nutrient dispensaries.</p>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold">
            REQ: 750 CRD
          </div>
        </div>
      </div>
    </div>
  );
}
