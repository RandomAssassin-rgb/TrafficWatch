import React, { useRef, useEffect, useState } from 'react';
import { Camera, AlertTriangle, Crosshair, Activity, VideoOff, CheckCircle } from 'lucide-react';

export default function LiveCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [activeViolation, setActiveViolation] = useState<any>(null);
  const [recentDetections, setRecentDetections] = useState<any[]>([]);

  // Start the camera
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // Prefer back camera on mobile
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreaming(true);
        }
      } catch (err: any) {
        console.error("Error accessing camera:", err);
        setErrorMsg('Unable to access camera. Please allow camera permissions.');
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Scanning loop (every 4 seconds)
  useEffect(() => {
    if (!isStreaming) return;

    let intervalId: NodeJS.Timeout;

    const scanFrame = async () => {
      if (!videoRef.current || !canvasRef.current || isScanning) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      // Set canvas size to match video exactly
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Extract high-res base64 frame
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const base64String = dataUrl.split(',')[1];

      setIsScanning(true);

      try {
        const response = await fetch('/api/analyze-evidence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64String,
            mimeType: 'image/jpeg'
          })
        });

        if (response.ok) {
          const data = await response.json();
          
          // Precision/Confidence Thresholding: Only alert if confidence >= 85%
          const violation = data.violation_detection;
          if (violation && violation.violation_type && violation.violation_type !== 'None') {
            const conf = violation.confidence_score || 0;
            if (conf >= 0.85) {
              setActiveViolation(violation);
              
              // Add to recent detections if it's new
              setRecentDetections(prev => {
                const newLog = {
                  time: new Date().toLocaleTimeString(),
                  type: violation.violation_type,
                  conf: Math.round(conf * 100),
                  severity: violation.severity || 'Unknown'
                };
                return [newLog, ...prev].slice(0, 5); // Keep last 5
              });
              
              // Automatically save to My Reports
              import('../utils/storage').then(({ saveReport }) => {
                 saveReport({
                    previewUrl: dataUrl, // The high-res frame with violation
                    status: 'pending',
                    reportData: data
                 });
              }).catch(e => console.error("Failed to save report:", e));

              // Clear the active alert after 3 seconds
              setTimeout(() => {
                setActiveViolation(null);
              }, 3000);
            }
          }
        }
      } catch (err) {
        console.error("Scan error:", err);
      } finally {
        setIsScanning(false);
      }
    };

    intervalId = setInterval(scanFrame, 4000);
    return () => clearInterval(intervalId);
  }, [isStreaming, isScanning]);

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-64px)] flex flex-col space-y-6 pt-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Camera size={24} className="text-blue-600" /> Live Camera Enforcement
          </h1>
          <p className="text-sm text-slate-500 mt-1">Autonomous scanning active. Requires 85%+ confidence.</p>
        </div>
        <div className="flex gap-4 items-center">
          {isScanning && (
             <span className="text-xs font-bold text-blue-600 flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
               <Activity size={14} className="animate-spin" /> SCANNING FRAME...
             </span>
          )}
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs px-2.5 py-1 flex items-center gap-1.5 font-bold rounded-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> LIVE
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden pb-6">
        
        {/* Live Camera View */}
        <div className="lg:col-span-3 bg-black rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl border border-slate-800">
          
          {errorMsg ? (
            <div className="flex flex-col items-center justify-center text-slate-400">
               <VideoOff size={48} className="mb-4 opacity-50" />
               <p className="font-medium">{errorMsg}</p>
            </div>
          ) : (
            <>
              {/* Video Feed */}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* HUD Overlays */}
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 m-4 rounded-lg">
                 <div className="absolute top-4 left-4 text-white/70 font-mono text-xs flex flex-col gap-1">
                   <span>SYS.OP.AUTO</span>
                   <span>RES: 1080p</span>
                   <span>INTERVAL: 4000ms</span>
                 </div>
                 
                 <div className="absolute inset-0 flex items-center justify-center opacity-30">
                   <Crosshair size={200} className="text-white" strokeWidth={0.5} />
                 </div>
                 
                 {/* Active Violation Alert Overlay */}
                 {activeViolation && (
                   <div className="absolute inset-0 bg-red-600/20 flex flex-col items-center justify-center backdrop-blur-sm animate-in zoom-in duration-200">
                     <div className="bg-red-600 text-white px-8 py-6 rounded-2xl border-4 border-red-400 shadow-2xl flex flex-col items-center text-center max-w-md">
                        <AlertTriangle size={48} className="mb-4 animate-bounce" />
                        <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">High-Confidence Violation Detected</span>
                        <h2 className="text-3xl font-black uppercase tracking-wider mb-2 leading-tight">
                          {activeViolation.violation_type}
                        </h2>
                        <span className="bg-white text-red-700 px-3 py-1 rounded-md text-sm font-bold shadow-inner">
                          AI Confidence: {(activeViolation.confidence_score * 100).toFixed(1)}%
                        </span>
                     </div>
                   </div>
                 )}
              </div>
            </>
          )}

        </div>

        {/* Sidebar Log */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col shadow-sm">
           <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
             Recent Detections
             <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Top 5</span>
           </h3>
           
           <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
             {recentDetections.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-3 opacity-60">
                 <CheckCircle size={32} />
                 <p className="text-sm">No violations detected recently.<br/>Street is clear.</p>
               </div>
             ) : (
               recentDetections.map((det, i) => (
                 <div key={i} className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col gap-2 animate-in slide-in-from-right-4">
                   <div className="flex justify-between items-start">
                     <span className="text-xs font-bold text-slate-500">{det.time}</span>
                     <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded border border-red-200">
                       {det.severity}
                     </span>
                   </div>
                   <h4 className="font-bold text-sm text-slate-900 leading-tight">{det.type}</h4>
                   <div className="text-xs text-blue-600 font-bold bg-blue-50 w-fit px-2 py-1 rounded-md">
                     {det.conf}% Match
                   </div>
                 </div>
               ))
             )}
           </div>
        </div>

      </div>
    </div>
  );
}
