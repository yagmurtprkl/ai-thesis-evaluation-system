export interface GeneralInfo {
  proje_basligi: string;
  toplam_sayfa: number;
  degerlendirme_tarihi: string;
}

export interface CriterionResult {
  kriter_no: number;
  kriter_adi: string;
  puan: number;
  max_puan: number;
  guclu_yonler: string[];
  gelisim_alanlari: string[];
  gerekce: string;
}

export interface GeneralEvaluation {
  guclu_yonler: string[];
  gelisim_alanlari: string[];
  kritik_hatalar: string[];
  genel_yorum: string;
}

export interface AnalysisResult {
  genel_bilgi: GeneralInfo;
  toplam_puan: number;
  durum: string; // BAŞARISIZ/YETERSİZ/ORTA/İYİ/MÜKEMMEL
  sistem_onerisi: string;
  kriterler: CriterionResult[];
  genel_degerlendirme: GeneralEvaluation;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}