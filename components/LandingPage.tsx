import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-white">
      
      {/* CUSTOM CSS ANIMATIONS */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(30, 58, 138, 0.4); }
          50% { box-shadow: 0 0 40px rgba(37, 99, 235, 0.6); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 200% 200%; 
          animation: gradient-shift 15s ease infinite; 
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 animate-gradient" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fadeInUp">
          {/* Badge */}
          <div className="inline-block mb-8">
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-900 px-8 py-3 rounded-full text-sm font-semibold shadow-lg border border-blue-200">
              🚀 Yapay Zeka Destekli
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
            Bitirme Projesi
            <br />
            <span className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Değerlendirmesi
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto mb-4 leading-relaxed">
            Yapay zeka teknolojisi ile bitirme projesi değerlendirme sürecinizi dönüştürün. 
            Akademik standartlara tam uyum, objektif puanlama ve kapsamlı analiz.
          </p>
          <p className="text-slate-500 font-medium opacity-80 mb-12">
             Tümü dakikalar içinde.
          </p>
        </div>
      </section>

      {/* ÖZELLİKLER VE SÜREÇ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* SOL: ÖZELLİKLER */}
            <div className="animate-fadeInUp">
              <h2 className="text-4xl font-bold text-slate-900 mb-10 flex items-center gap-3">
                <span className="text-5xl">✨</span>
                Sistem Özellikleri
              </h2>
              
              <div className="space-y-6">
                {/* Kart 1 */}
                <div className="group backdrop-blur-xl bg-white/80 p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                      ⚡
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Hızlı Değerlendirme</h3>
                      <p className="text-slate-600">Ortalama 1-2 dakikada tam değerlendirme raporu</p>
                    </div>
                  </div>
                </div>

                {/* Kart 2 */}
                <div className="group backdrop-blur-xl bg-white/80 p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                      📊
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">10 Kriterde Analiz</h3>
                      <p className="text-slate-600">Başlık uyumu, yöntem, bulgular, kaynakça ve format kontrolü</p>
                    </div>
                  </div>
                </div>

                {/* Kart 3 */}
                <div className="group backdrop-blur-xl bg-white/80 p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Format Denetimi</h3>
                      <p className="text-slate-600">Tablo/şekil formatı, APA atıfları, yazım kuralları otomatik kontrol</p>
                    </div>
                  </div>
                </div>

                {/* Kart 4 */}
                <div className="group backdrop-blur-xl bg-white/80 p-8 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                      📝
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Detaylı Gerekçelendirme</h3>
                      <p className="text-slate-600">Her kriter için sayfa numaralı somut geri bildirimler</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SAĞ: SÜREÇ */}
            <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <h2 className="text-4xl font-bold text-slate-900 mb-10 flex items-center gap-3">
                <span className="text-5xl">🔄</span>
                Değerlendirme Süreci
              </h2>

              <div className="space-y-8">
                {/* Adım 1 */}
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-blue-900/50">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">PDF Yükleme</h3>
                    <p className="text-lg text-slate-600">Öğrencinin bitirme projesini PDF olarak sisteme yükleyin</p>
                  </div>
                </div>

                <div className="ml-10 border-l-4 border-dashed border-blue-300 h-12"></div>

                {/* Adım 2 */}
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-blue-900/50">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Otomatik Analiz</h3>
                    <p className="text-lg text-slate-600">Yapay zeka 10 kriterde değerlendirme yapar (1-2 dk)</p>
                  </div>
                </div>

                <div className="ml-10 border-l-4 border-dashed border-blue-300 h-12"></div>

                {/* Adım 3 */}
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-blue-900/50">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Rapor İnceleme</h3>
                    <p className="text-lg text-slate-600">Detaylı puanlama ve gerekçelerle sonuç raporunu görüntüleyin</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Stat 1 */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="text-6xl mb-4">🎯</div>
              <div className="text-7xl font-bold text-white mb-3">10</div>
              <div className="text-xl text-white font-semibold">Değerlendirme Kriteri</div>
            </div>

            {/* Stat 2 */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="text-6xl mb-4">✓</div>
              <div className="text-7xl font-bold text-white mb-3">100%</div>
              <div className="text-xl text-white font-semibold">Objektif Puanlama</div>
            </div>

            {/* Stat 3 */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="text-6xl mb-4">⚡</div>
              <div className="text-7xl font-bold text-white mb-3">1-2 dk</div>
              <div className="text-xl text-white font-semibold">Ortalama Süre</div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
            Değerlendirmeye Başlayın
          </h2>
          <p className="text-2xl text-white/80 mb-16">
            Objektif • Hızlı • Detaylı
          </p>

          <button 
            onClick={onStart}
            className="inline-block bg-white text-blue-900 font-bold px-16 py-8 rounded-3xl text-3xl shadow-[0_0_80px_rgba(255,255,255,0.5)] hover:shadow-[0_0_120px_rgba(255,255,255,0.8)] hover:scale-110 transition-all duration-300"
          >
            Değerlendirmeye Başla →
          </button>

          <p className="text-white/60 text-sm mt-8">✓ Ücretsiz deneme</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;