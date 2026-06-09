import React, { useState, useEffect } from 'react';
import { ShieldAlert, Map, Activity, MapPin, AlertTriangle, ChevronRight, BarChart3, TrendingUp, Radar } from 'lucide-react';

export default function Analytics() {
  const [violations, setViolations] = useState<{x: number, y: number, id: number, type: string, opacity: number}[]>([]);
  const [metrics, setMetrics] = useState({ illegalParking: 42, busLane: 28, redLight: 15 });

  useEffect(() => {
    // Simulate real-time geospatial plotting
    const interval = setInterval(() => {
      const newViolation = {
        id: Date.now(),
        x: Math.floor(Math.random() * 90) + 5, // 5% to 95%
        y: Math.floor(Math.random() * 90) + 5,
        type: ['Parking', 'Speeding', 'Red Light', 'Bus Lane'][Math.floor(Math.random() * 4)],
        opacity: 1
      };
      
      setViolations(prev => [...prev.slice(-15), newViolation]);
      
      // slightly jiggle metrics for "real-time" feel
      setMetrics(prev => ({
        illegalParking: Math.max(30, Math.min(50, prev.illegalParking + (Math.random() > 0.5 ? 1 : -1))),
        busLane: Math.max(20, Math.min(35, prev.busLane + (Math.random() > 0.5 ? 1 : -1))),
        redLight: Math.max(10, Math.min(25, prev.redLight + (Math.random() > 0.5 ? 1 : -1)))
      }));

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6 max-w-[1400px] mx-auto pt-4 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-end bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Activity size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Intelligence Dashboard</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium ml-13">City-wide surveillance data and predictive AI modeling streaming in real-time.</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-100 font-bold text-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          SYSTEM ONLINE
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6 flex-1 mb-6">
        {/* Geographic Plotting Simulator */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <Map size={18} className="text-blue-600" /> Live Spatial Heatmap
            </h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
              <Radar size={14} className="animate-spin-slow" /> SCANNING
            </span>
          </div>
          
          <div className="flex-1 bg-slate-900 relative overflow-hidden group min-h-[400px]">
             {/* Radar grid background */}
             <div className="absolute inset-0 border border-blue-500/10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
             
             {/* Radar sweep line */}
             <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] z-10 animate-radar-sweep opacity-50"></div>

             {violations.map((v, i) => (
               <div key={v.id} className="absolute flex flex-col items-center transition-all duration-1000" style={{ left: `${v.x}%`, top: `${v.y}%`, opacity: v.opacity - (violations.length - i) * 0.05 }}>
                 <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute opacity-75"></div>
                 <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-lg relative z-10"></div>
                 <span className="mt-1 bg-slate-800/80 backdrop-blur text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-600 whitespace-nowrap z-20">
                   {v.type}
                 </span>
               </div>
             ))}

             <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-3 rounded-lg flex gap-4">
                   <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase">Active Nodes</div>
                     <div className="text-xl font-mono text-white font-bold">1,204</div>
                   </div>
                   <div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase">Detection Rate</div>
                     <div className="text-xl font-mono text-emerald-400 font-bold">94.2%</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
        
        {/* Right side metrics */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <BarChart3 size={16} /> Violation Classification
            </h3>
            <div className="space-y-5">
               <div>
                 <div className="flex justify-between mb-2 text-xs font-bold text-slate-700"><span>Illegal Parking</span> <span className="text-blue-600">{metrics.illegalParking}%</span></div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out" style={{ width: `${metrics.illegalParking}%` }}></div></div>
               </div>
               <div>
                 <div className="flex justify-between mb-2 text-xs font-bold text-slate-700"><span>Bus Lane Blockade</span> <span className="text-emerald-600">{metrics.busLane}%</span></div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${metrics.busLane}%` }}></div></div>
               </div>
               <div>
                 <div className="flex justify-between mb-2 text-xs font-bold text-slate-700"><span>Red Light Breach</span> <span className="text-red-600">{metrics.redLight}%</span></div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-red-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${metrics.redLight}%` }}></div></div>
               </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl shadow-sm flex-1 flex flex-col justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle size={100} className="text-red-600" />
             </div>
             <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-red-700 flex items-center gap-2 relative z-10">
               <ShieldAlert size={20} className="animate-pulse" /> AI Predictive Alert
             </h3>
             <p className="text-sm font-medium text-red-900/80 leading-relaxed mb-4 relative z-10">
               Neural Node Alpha detects 40% degradation in crosswalk markers at Sector 5. Algorithmic correlation to recent violation spikes confirmed.
             </p>
             <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded-lg self-start transition-colors shadow-sm relative z-10 flex items-center gap-1">
               Dispatch Municipal Works <ChevronRight size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
