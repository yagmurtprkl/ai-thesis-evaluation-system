import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { AnalysisResult } from '../types';

export const analyzeThesis = async (file: File): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key eksik. Lütfen ortam değişkenlerini kontrol edin.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Convert File to Base64
  const base64Data = await fileToBase64(file);
  const base64Content = base64Data.split(',')[1]; // Remove data:application/pdf;base64, prefix

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // Use pro model for complex analysis tasks
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: 'application/json',
      temperature: 0.2, // Low temperature for more deterministic analysis
      maxOutputTokens: 8192, // Maximize output tokens
    },
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: file.type,
            data: base64Content
          }
        },
        {
          text: "Lütfen ekteki PDF dosyasını sağlanan kriterlere göre değerlendir ve geçerli bir JSON çıktısı üret. Gerekçeleri kısa tut."
        }
      ]
    }
  });

  let responseText = response.text;
  if (!responseText) {
    throw new Error("Gemini API boş yanıt döndürdü.");
  }

  // Cleanup potential markdown fences if present
  responseText = responseText.replace(/```json\n?/g, '').replace(/```/g, '').trim();

  try {
    return JSON.parse(responseText) as AnalysisResult;
  } catch (error) {
    console.error("JSON Parse Hatası:", error);
    console.log("Raw Response:", responseText);
    
    // Check if the response seems truncated
    if (!responseText.endsWith('}')) {
       throw new Error("Analiz raporu çok kapsamlı olduğu için yarıda kesildi. Lütfen tekrar deneyiniz veya dosyanın daha kısa bir bölümünü yükleyiniz.");
    }
    
    throw new Error("API yanıtı geçerli bir JSON formatında değil. Lütfen tekrar deneyiniz.");
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};