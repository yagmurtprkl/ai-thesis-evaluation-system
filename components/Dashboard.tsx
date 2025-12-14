import React from 'react';
import { AnalysisResult } from '../types';
import CriteriaCard from './CriteriaCard';
import AnalysisChart from './AnalysisChart';

interface DashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ result, onReset }) => {
  
  const downloadReport = () => {
    const lines = [
      "AKADEMİK DEĞERLENDİRME RAPORU (V4.0 Ultra Precision)",
      "==================================================",
      `Proje Başlığı: ${result.genel_bilgi.proje_basligi}`,
      `Değerlendirme Tarihi: ${result.genel_bilgi.degerlendirme_tarihi}`,
      `Toplam Puan: ${result.toplam_puan}/100 (${result.durum})`,
      "==================================================\n",
      "DETAYLI KRİTER PUANLARI:",
      "------------------------"
    ];

    result.kriterler.forEach((item) => {
      lines.push(`K${item.kriter_no}: ${item.kriter_adi}`);
      lines.push(`Puan: ${item.puan}/10`);
      lines.push(`Gerekçe: ${item.gerekce}`);
      if (item.gelisim_alanlari && item.gelisim_alanlari.length > 0) {
        lines.push(`Gelişim Alanları:`);
        item.gelisim_alanlari.forEach(ga => lines.push(`- ${ga}`));
      }
      lines.push("");
    });

    lines.push("GENEL DEĞERLENDİRME:");
    lines.push("GÜÇLÜ YÖNLER:");
    result.genel_degerlendirme.guclu_yonler.forEach(item => lines.push(`• ${item}`));
    lines.push("");

    lines.push("GELİŞİM ALANLARI:");
    result.genel_degerlendirme.gelisim_alanlari.forEach(item => lines.push(`• ${item}`));
    lines.push("");

    if (result.genel_degerlendirme.kritik_hatalar.length > 0) {
      lines.push("KRİTİK HATALAR:");
      result.genel_degerlendirme.kritik_hatalar.forEach(item => lines.push(`• ${item}`));
      lines.push("");
    }

    lines.push("GENEL YORUM:");
    lines.push(result.genel_degerlendirme.genel_yorum);

    const blob = new Blob([lines.join("\n")], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Değerlendirme_Raporu_${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-20 px-6 bg-slate-50 animate-fade-in-up">
      
      {/* 1. HEADER CARD */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto mb-10 border border-blue-700 relative overflow-hidden">
        {/* Abstract pattern decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2 tracking-tight">Değerlendirme Tamamlandı!</h2>
            <p className="text-blue-100 text-lg max-w-2xl">
              <span className="font-semibold text-white">"{result.genel_bilgi.proje_basligi}"</span> başlıklı proje için detaylı analiz raporu hazırdır.
            </p>
          </div>
          <div className="bg-blue-950/40 px-6 py-3 rounded-xl backdrop-blur-md border border-blue-400/30 shadow-lg">
             <span className="block text-xs text-blue-200 uppercase tracking-wider font-semibold mb-1">Tespit Edilen Sayfa</span>
             <span className="text-3xl font-bold font-mono">{result.genel_bilgi.toplam_sayfa}</span>
          </div>
        </div>
      </div>

      {/* 2. SCORE & DOWNLOAD SECTION */}
      <div className="max-w-6xl mx-auto mb-16 flex flex-col lg:flex-row items-center justify-center gap-12">
        
        {/* Score Indicator Card */}
        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-200 text-center relative max-w-sm w-full backdrop-blur-xl hover:-translate-y-1 transition-transform duration-300">
           <div className="absolute top-4 right-4 text-slate-300">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
             </svg>
           </div>
           
           <div className="flex justify-center mb-6 scale-110">
             <AnalysisChart score={result.toplam_puan} />
           </div>
           
           <h3 className={`text-3xl font-bold mb-2 tracking-tight 
             ${result.toplam_puan >= 70 ? 'text-emerald-600' : result.toplam_puan >= 60 ? 'text-amber-500' : 'text-red-600'}
           `}>
             {result.durum}
           </h3>
           <p className="text-slate-500 text-sm font-medium">Akademik Yeterlilik Durumu</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6 w-full max-w-md">
           <button 
             onClick={downloadReport}
             className="group flex items-center justify-center gap-4 bg-emerald-600 text-white px-8 py-6 rounded-2xl shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 hover:scale-105 transition-all duration-300 font-bold text-xl relative overflow-hidden"
           >
             <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
             </svg>
             Raporu İndir
           </button>

           <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
             <h4 className="font-bold text-slate-800 mb-3 text-lg flex items-center gap-2">
                <span>💡</span> Sistem Önerisi
             </h4>
             <p className="text-slate-600 leading-relaxed italic border-l-4 border-blue-900 pl-4">
               "{result.sistem_onerisi}"
             </p>
           </div>
        </div>
      </div>

      {/* 3. FEEDBACK SECTIONS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
         {/* Strengths */}
         <div className="bg-emerald-50/50 backdrop-blur-sm border-l-8 border-emerald-500 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-lg">✓</span> 
              Güçlü Yönler
            </h3>
            <ul className="space-y-4">
               {result.genel_degerlendirme.guclu_yonler.map((item, i) => (
                 <li key={i} className="flex gap-4 text-emerald-900/90 text-lg">
                   <span className="mt-2 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                   {item}
                 </li>
               ))}
            </ul>
         </div>

         {/* Improvements */}
         <div className="bg-amber-50/50 backdrop-blur-sm border-l-8 border-amber-500 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-lg">⚠</span>
              Gelişim Alanları
            </h3>
            <ul className="space-y-4">
               {result.genel_degerlendirme.gelisim_alanlari.map((item, i) => (
                 <li key={i} className="flex gap-4 text-amber-900/90 text-lg">
                   <span className="mt-2 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"></span>
                   {item}
                 </li>
               ))}
            </ul>
         </div>

         {/* Critical Errors (Full Width if exists) */}
         {result.genel_degerlendirme.kritik_hatalar.length > 0 && (
           <div className="lg:col-span-2 bg-red-50/50 backdrop-blur-sm border-l-8 border-red-600 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-lg">🔴</span>
                Kritik Hatalar
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                 {result.genel_degerlendirme.kritik_hatalar.map((item, i) => (
                   <li key={i} className="flex gap-4 text-red-900/90 text-lg">
                     <span className="mt-2 w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></span>
                     {item}
                   </li>
                 ))}
              </ul>
           </div>
         )}
      </div>

      {/* 4. CRITERIA GRID */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-blue-900 mb-10 border-b border-slate-200 pb-6 flex items-center gap-3">
            <span className="text-4xl">📊</span> Detaylı Kriter Analizi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {result.kriterler.map((item) => (
            <CriteriaCard 
              key={item.kriter_no}
              data={item}
            />
          ))}
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div className="text-center mt-20">
        <button 
          onClick={onReset}
          className="bg-white text-blue-900 border-2 border-blue-900 px-10 py-4 rounded-xl hover:bg-blue-50 transition-all font-bold text-lg shadow-md hover:shadow-lg"
        >
          ← Yeni Analiz Başlat
        </button>
      </div>

    </div>
  );
};

export default Dashboard;