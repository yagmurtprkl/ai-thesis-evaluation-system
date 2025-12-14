import React, { useState } from 'react';
import { CriterionResult } from '../types';

interface CriteriaCardProps {
  data: CriterionResult;
}

const CriteriaCard: React.FC<CriteriaCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Determine border and text colors based on score
  const getStatusStyle = (score: number) => {
    if (score >= 8) return { 
        border: 'border-emerald-500', 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700',
        badge: 'bg-emerald-100 text-emerald-800'
    };
    if (score >= 6) return { 
        border: 'border-amber-500', 
        bg: 'bg-amber-50', 
        text: 'text-amber-700',
        badge: 'bg-amber-100 text-amber-800'
    };
    return { 
        border: 'border-red-500', 
        bg: 'bg-red-50', 
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-800'
    };
  };

  const style = getStatusStyle(data.puan);

  return (
    <div className={`group bg-white rounded-2xl shadow-md border-l-8 ${style.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kriter {data.kriter_no}</span>
            </div>
            <h4 className="font-bold text-slate-900 text-xl mb-2">{data.kriter_adi}</h4>
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-none group-hover:text-slate-900 transition-colors">
                {data.gerekce}
            </p>
          </div>
          
          <div className="flex flex-col items-end flex-shrink-0">
             <div className={`text-4xl font-bold ${style.text} flex items-baseline`}>
               {data.puan}<span className="text-sm text-slate-400 font-normal ml-1">/10</span>
             </div>
             <button className="text-slate-400 text-sm mt-3 font-medium hover:text-blue-900 transition-colors flex items-center gap-1">
               {isOpen ? 'Gizle' : 'Detaylar'} 
               <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
             </button>
          </div>
        </div>
      </div>

      {/* Accordion Content */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
          <div className="mt-4 space-y-4">
             
             {/* Criterion Specific Improvements */}
             {data.gelisim_alanlari && data.gelisim_alanlari.length > 0 && (
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <p className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="text-amber-500">⚠</span> Gelişim Alanları
                 </p>
                 <ul className="list-disc list-inside space-y-2">
                   {data.gelisim_alanlari.map((item, i) => (
                     <li key={i} className="text-sm text-slate-600 pl-1">{item}</li>
                   ))}
                 </ul>
               </div>
             )}

             {/* Criterion Specific Strengths */}
             {data.guclu_yonler && data.guclu_yonler.length > 0 && (
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <p className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Güçlü Yönler
                 </p>
                 <ul className="list-disc list-inside space-y-2">
                   {data.guclu_yonler.map((item, i) => (
                     <li key={i} className="text-sm text-slate-600 pl-1">{item}</li>
                   ))}
                 </ul>
               </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CriteriaCard;