import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Play, Camera, Brain, CheckSquare, BadgeCheck, Code, ArrowRight, Award } from 'lucide-react';

export default function Landing() {
  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center w-full px-6 lg:px-12 max-w-[1400px] mx-auto h-16">
          <div className="flex items-center gap-8 h-full">
            <span className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              TrafficWatch AI
            </span>
            <div className="hidden md:flex items-center gap-8 h-full ml-4">
              <a className="text-blue-600 border-b-2 border-blue-600 h-full flex items-center text-sm font-semibold transition-colors" href="#">Platform</a>
              <a className="text-slate-500 hover:text-slate-900 h-full flex items-center text-sm font-semibold transition-colors" href="#">Features</a>
              <a className="text-slate-500 hover:text-slate-900 h-full flex items-center text-sm font-semibold transition-colors" href="#">Analytics</a>
              <a className="text-slate-500 hover:text-slate-900 h-full flex items-center text-sm font-semibold transition-colors" href="#">Rewards</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="hidden lg:flex items-center justify-center text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors">
              Login
            </Link>
            <Link to="/upload" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
              Report Violation
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                <Shield size={16} />
                Institutional Grade Traffic Safety
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Modernizing Traffic <br/> Safety through <span className="text-blue-600">AI</span>.
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                Empowering citizens and municipalities with real-time, automated traffic violation detection. Precision legal authority meets modern civic engagement.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/upload" className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-bold text-sm shadow-md hover:bg-blue-700 transition-all flex justify-center items-center">
                  Start Reporting Today
                </Link>
                <button className="bg-white border border-slate-200 px-8 py-3.5 rounded-lg font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Play size={18} />
                  How it Works
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
                <img alt="AI Traffic Interface" className="w-full h-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-awncr-ddaQFpcw1Z9MYKg_en0n-Ig1npRWEaFq-99DnPhopYmkSVa8-Om--dNnnwKPZADRqPDQcLf347k1Y9XTj7rfQslNjRSgmfU2jTsCj6bxGFXZxI8_YI2fb0liK0GFtytYlfApTTer42jFXbZKUq7ZpHJbxXzzW3jN0-t0S-ahRZKbM4zp2Nrp3lDm8GLYTffg4UIdRzrCccYatjtHrV2GxOAoIrpiDabJOVp8thqynLIgExuTNnPHi0UHIFSvA3GOXkd6g"/>
              </div>
              {/* Floating Accents */}
              <div className="absolute -top-6 -right-6 bg-emerald-700 text-white px-5 py-3 rounded-xl shadow-xl z-20 flex items-center gap-3">
                <BadgeCheck size={24} className="text-emerald-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold opacity-90">Accuracy</div>
                  <div className="text-lg font-extrabold">98.4%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-slate-50 py-16 border-y border-slate-100">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-700 mb-2">50,000+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Violations Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-700 mb-2">98%</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-700 mb-2">120+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cities Onboarded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-700 mb-2">1.2M</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Safe Miles Tracked</div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Streamlined Compliance in Three Steps</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Our institutional-grade pipeline ensures every violation is captured with forensic precision and legal compliance.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[1px] bg-slate-200 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <Camera size={32} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900">1. Capture</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-4">High-resolution photographic evidence is captured via mobile app or fixed municipal infrastructure cameras.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <Brain size={32} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900">2. Analyze</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-4">Proprietary AI models identify license plates, vehicle make, and violation type with over 98% accuracy.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <CheckSquare size={32} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900">3. Report</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-4">Evidence is packaged into a legally compliant report and submitted to local authorities for validation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="col-span-1 md:col-span-2 bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-between">
                <div className="p-10 pb-0">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <BadgeCheck size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">AI License Plate Recognition</h3>
                  <p className="text-slate-500 max-w-lg mb-8">Our neural networks are trained on millions of diverse conditions—rain, glare, and high speed—to ensure flawless identification every time.</p>
                </div>
                <div className="w-full h-48 lg:h-64 mt-auto">
                  <img alt="AI Vision Plate" className="w-full h-full object-cover rounded-t-xl opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtAvFiC7H2jiCeQoc8KJurV872Wutc4WY-I_cOSuek-FzTsDTDo_d4FtF4ETLXiTfHgjRayRc_2BMByDhCW7ZT0I4tTQ_9y95UcUsfBsNrpmEs647kPGhSkbzER-DssdV2v3B-y-Ltx9tWPWiQmr71gGI381vQUlr_jkfNQaFBzEkp0w7GtxKoReRBLYrKocobS7MRqMyRIR_sdPdfti9Oi_mxqWZ7CNzzytFCld_OHlM0xWFrjpxgXcVWhv4jQXYeoI_LpZWh7Ac"/>
                </div>
              </div>

              <div className="col-span-1 bg-blue-600 rounded-3xl p-10 flex flex-col justify-center">
                <div className="w-12 h-12 bg-blue-500/30 text-white rounded-xl flex items-center justify-center mb-6">
                  <Award size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Reward Points</h3>
                <p className="text-blue-100 mb-10 leading-relaxed">Civic duty rewarded. Earn "SafeCity Credits" for every validated report, redeemable at local municipal services or community partners.</p>
                <Link to="/rewards" className="bg-white text-blue-600 py-4 px-6 rounded-xl font-bold text-center hover:bg-blue-50 transition-colors shadow-sm w-full mt-auto">
                  Explore Rewards Program
                </Link>
              </div>

              <div className="col-span-1 bg-blue-50/50 border border-blue-100 rounded-3xl p-10 flex flex-col">
                <div className="w-12 h-12 bg-white text-blue-600 shadow-sm border border-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Validation</h3>
                <p className="text-slate-500 text-sm">Instant AI verification reduces manual review time by 85% for city officials.</p>
              </div>

              <div className="col-span-1 md:col-span-2 bg-blue-50/50 border border-blue-100 rounded-3xl p-10 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Institutional Integration</h3>
                <p className="text-slate-500 text-sm max-w-lg mb-6">Seamlessly connects with existing police databases and municipal ERP systems through our secure, encrypted API gateway.</p>
                <div className="flex gap-4">
                  <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-mono font-bold text-slate-700 flex items-center gap-2">
                    <Code size={14} /> 400-001
                  </div>
                  <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-mono font-bold text-slate-700 flex items-center gap-2">
                    <Code size={14} /> REST API
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-10">Ready to make your streets safer?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/upload" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-500 transition-all">
                Start Reporting Today
              </Link>
              <button className="bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all">
                Request City Demo
              </button>
            </div>
            <p className="mt-8 text-slate-400 text-sm font-medium">Joining 500+ active reporting communities worldwide.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             <div className="text-base font-bold text-slate-900">TrafficWatch AI</div>
             <p className="text-xs text-slate-500">© 2024 TrafficWatch AI. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-slate-500 hover:text-slate-900 transition-colors text-xs font-medium" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-slate-900 transition-colors text-xs font-medium" href="#">Terms of Service</a>
            <a className="text-slate-500 hover:text-slate-900 transition-colors text-xs font-medium" href="#">API Documentation</a>
            <a className="text-slate-500 hover:text-slate-900 transition-colors text-xs font-medium" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

