import React, { useRef, useState, useEffect } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);

  // Simulated progress for loading state
  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndProcess(e.target.files[0]);
    }
  };

  const validateAndProcess = (file: File) => {
    if (file.type !== 'application/pdf') {
      alert("Lütfen sadece PDF dosyası yükleyiniz.");
      return;
    }
    onFileSelect(file);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div 
        className={`
          relative w-full border-2 border-dashed rounded-3xl transition-all duration-300 flex flex-col items-center justify-center p-12 text-center
          ${isLoading ? 'border-slate-300 bg-slate-50/50 cursor-not-allowed' : 'cursor-pointer'}
          ${!isLoading && dragActive ? 'border-blue-600 bg-blue-50 scale-[1.01] shadow-2xl' : 'border-blue-900/30 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-600'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!isLoading ? onButtonClick : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleChange}
        />
        
        {isLoading ? (
          <div className="flex flex-col items-center w-full max-w-md animate-fade-in-up">
            {/* Custom Spinner */}
            <div className="relative w-20 h-20 mb-8">
               <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mb-2">Tez Analiz Ediliyor...</h3>
            <p className="text-slate-500 mb-8">Yapay zeka kriterleri kontrol ederken lütfen bekleyiniz.</p>
            
            {/* Progress Bar */}
            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-900 to-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="mt-3 text-sm text-blue-900/60 font-medium">{Math.round(progress)}% Tamamlandı</p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-lg shadow-blue-100/50 text-blue-900 group-hover:scale-110 transition-transform">
              📄
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Bitirme Projesi Yükle</h3>
            <p className="text-slate-600 mb-8 max-w-sm mx-auto">
              Dosyayı buraya sürükleyip bırakın veya bilgisayarınızdan seçmek için tıklayın
            </p>
            
            <button 
              type="button"
              className="px-10 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-900/30 hover:scale-105 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick();
              }}
            >
              Dosya Seç (PDF)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;