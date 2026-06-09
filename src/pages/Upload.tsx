import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle2, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { saveReport } from '../utils/storage';

export default function Upload() {
  const [fileHover, setFileHover] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFileHover(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64data = reader.result as string;
          const base64String = base64data.split(',')[1];
          
          const response = await fetch('/api/analyze-evidence', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              imageBase64: base64String,
              mimeType: selectedFile.type
            })
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Server Error (${response.status}): ${errText}`);
          }

          const data = await response.json();
          
          // Save to localStorage as a pending report
          const stored = saveReport({
            previewUrl: base64data,
            status: 'pending',
            reportData: data
          });

          // Navigate to Reports/Admin page with the data, preview, and stored ID
          navigate('/admin', { state: { report: data, previewUrl: base64data, id: stored.id } });
        } catch (innerError: any) {
          console.error("Evidence Analysis Error:", innerError);
          alert(`Error analyzing evidence:\n\n${innerError.message}`);
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error(error);
      alert('Error analyzing evidence. See console.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-500 pt-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Submit New Report</h1>
        <p className="text-slate-500">Upload evidence of a traffic violation. Our AI will automatically extract the necessary details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Upload Evidence */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Upload Evidence</h2>
            <p className="text-slate-500 text-sm mb-6">Provide clear photos or video of the incident.</p>

            <div className="mb-8">
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*,video/*"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              />
              
              {!selectedFile ? (
                <div 
                  className={`border-2 border-dashed rounded-xl p-10 text-center flex flex-col items-center justify-center transition-all cursor-pointer ${fileHover ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'}`}
                  onDragOver={(e) => { e.preventDefault(); setFileHover(true); }}
                  onDragLeave={() => setFileHover(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <UploadCloud size={32} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Drag and drop your file here</h3>
                  <p className="text-sm text-slate-500 mb-6">Support JPG, PNG, or MP4 (Max 50MB)</p>
                  <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-sm pointer-events-none">
                    Select File
                  </button>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center group h-64">
                  <img src={previewUrl!} alt="Preview" className="max-w-full max-h-full object-contain" />
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-red-50 transition-colors"
                    >
                      Remove File
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4">Evidence Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-600 text-sm">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Clear view of the license plate</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600 text-sm">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Visible context of the violation</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600 text-sm">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Time and location metadata included if possible</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Report Details Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col h-full">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Report Details</h2>
          
          <div className="space-y-5 flex-1">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date & Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Calendar size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Auto-extracted from evidence" 
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Auto-extracted from evidence" 
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Violation Type</label>
              <div className="relative">
                <select 
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  defaultValue=""
                >
                  <option value="" disabled>Select violation type</option>
                  <option value="parking">Illegal Parking</option>
                  <option value="speeding">Speeding</option>
                  <option value="red_light">Running Red Light</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Additional Notes</label>
              <textarea 
                rows={4}
                placeholder="Add any additional context or details here..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={!selectedFile || isProcessing}
            className={`w-full mt-8 py-3.5 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 ${
              (!selectedFile || isProcessing) 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Submit Report'}
          </button>
        </div>
      </div>
    </div>
  );
}
