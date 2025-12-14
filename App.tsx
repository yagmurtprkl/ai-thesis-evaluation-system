import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import { AnalysisResult, AnalysisStatus } from './types';
import { analyzeThesis } from './services/geminiService';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setStatus(AnalysisStatus.ANALYZING);
    setError(null);

    try {
      const analysisResult = await analyzeThesis(file);
      setResult(analysisResult);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu");
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setStatus(AnalysisStatus.IDLE);
  };

  // HEADER COMPONENT (Global Design: Glassmorphism)
  const Header = () => (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => {
            setShowLanding(true);
            handleReset();
          }}
        >
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🎓</div>
          <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Akademik Değerlendirme Sistemi
          </h1>
        </div>
        <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          v2.0
        </div>
      </div>
    </header>
  );

  // FOOTER COMPONENT (Global Design: Dark Gradient)
  const Footer = () => (
    <footer className="bg-gradient-to-r from-slate-900 to-blue-900 border-t border-slate-700 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-slate-300 text-sm font-medium">
          Akademik Değerlendirme Sistemi • v2.0
        </p>
      </div>
    </footer>
  );

  // RENDER LOGIC
  if (showLanding) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900">
        <Header />
        <LandingPage onStart={() => setShowLanding(false)} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      <Header />

      <main className="flex-grow">
        {/* UPLOAD PAGE LAYOUT */}
        {(status === AnalysisStatus.IDLE || status === AnalysisStatus.ANALYZING || status === AnalysisStatus.ERROR) && (
          <section className="min-h-[80vh] flex items-center justify-center py-20 px-6">
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full text-center">
              
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                {status === AnalysisStatus.ERROR ? 'Bir Hata Oluştu' : 'Yeni Analiz Başlat'}
              </h2>
              
              <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                {status === AnalysisStatus.ERROR 
                  ? 'Analiz sırasında beklenmedik bir durum oluştu. Lütfen tekrar deneyiniz.' 
                  : 'Bitirme projesini yükleyin, yapay zeka destekli sistemimiz evrensel akademik kriterlere göre saniyeler içinde detaylı bir analiz raporu hazırlasın.'}
              </p>

              {status === AnalysisStatus.ERROR ? (
                 <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-xl mb-8 text-left">
                    <p className="text-red-800 font-medium">{error}</p>
                    <button 
                      onClick={handleReset}
                      className="mt-4 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      Tekrar Dene
                    </button>
                 </div>
              ) : (
                <FileUpload 
                  onFileSelect={handleFileSelect} 
                  isLoading={status === AnalysisStatus.ANALYZING} 
                />
              )}
            </div>
          </section>
        )}

        {/* RESULTS PAGE LAYOUT */}
        {status === AnalysisStatus.SUCCESS && result && (
          <Dashboard result={result} onReset={handleReset} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;