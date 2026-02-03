import { useState, useCallback, useRef, useEffect } from "react";

export interface ImageSettings {
  brightness: number; // -100 to 100
  contrast: number; // -100 to 100
  saturation: number; // -100 to 100
  warmth: number; // -100 to 100
  sharpness: number; // 0 to 100
}

export type PresetType = "original" | "adReady" | "cleanWeb" | "cinematic" | "product" | "lifestyle";

export const presets: Record<PresetType, ImageSettings> = {
  original: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    warmth: 0,
    sharpness: 0,
  },
  adReady: {
    brightness: 10,
    contrast: 20,
    saturation: 25,
    warmth: 5,
    sharpness: 30,
  },
  cleanWeb: {
    brightness: 5,
    contrast: 10,
    saturation: 10,
    warmth: 0,
    sharpness: 15,
  },
  cinematic: {
    brightness: -5,
    contrast: 25,
    saturation: -10,
    warmth: 15,
    sharpness: 20,
  },
  product: {
    brightness: 15,
    contrast: 15,
    saturation: 20,
    warmth: -5,
    sharpness: 40,
  },
  lifestyle: {
    brightness: 8,
    contrast: 10,
    saturation: 15,
    warmth: 20,
    sharpness: 10,
  },
};

export const presetLabels: Record<PresetType, { en: string; mm: string }> = {
  original: { en: "Original", mm: "မူရင်း" },
  adReady: { en: "Ad Ready", mm: "ကြော်ငြာအဆင်သင့်" },
  cleanWeb: { en: "Clean Web", mm: "ဝဘ်ဆိုက်သန့်" },
  cinematic: { en: "Cinematic", mm: "ရုပ်ရှင်ပုံစံ" },
  product: { en: "Product", mm: "ပစ္စည်း" },
  lifestyle: { en: "Lifestyle", mm: "လိုက်ဖ်စတိုင်" },
};

export const useImageOptimizer = (imageSrc: string) => {
  const [settings, setSettings] = useState<ImageSettings>(presets.product);
  const [processedSrc, setProcessedSrc] = useState<string>(imageSrc);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSrc] = useState(imageSrc);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const processImage = useCallback(async (newSettings: ImageSettings) => {
    if (!imageSrc) return;
    
    setIsProcessing(true);
    
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement("canvas");
        canvasRef.current = canvas;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply adjustments
        const brightnessMultiplier = 1 + newSettings.brightness / 100;
        const contrastFactor = (259 * (newSettings.contrast + 255)) / (255 * (259 - newSettings.contrast));
        const saturationMultiplier = 1 + newSettings.saturation / 100;
        const warmthAmount = newSettings.warmth / 100;

        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          // Brightness
          r *= brightnessMultiplier;
          g *= brightnessMultiplier;
          b *= brightnessMultiplier;

          // Contrast
          r = contrastFactor * (r - 128) + 128;
          g = contrastFactor * (g - 128) + 128;
          b = contrastFactor * (b - 128) + 128;

          // Saturation
          const gray = 0.2989 * r + 0.587 * g + 0.114 * b;
          r = gray + saturationMultiplier * (r - gray);
          g = gray + saturationMultiplier * (g - gray);
          b = gray + saturationMultiplier * (b - gray);

          // Warmth (adjust red and blue channels)
          r += warmthAmount * 20;
          b -= warmthAmount * 20;

          // Clamp values
          data[i] = Math.max(0, Math.min(255, r));
          data[i + 1] = Math.max(0, Math.min(255, g));
          data[i + 2] = Math.max(0, Math.min(255, b));
        }

        ctx.putImageData(imageData, 0, 0);

        // Apply sharpening using convolution (simplified)
        if (newSettings.sharpness > 0) {
          const sharpAmount = newSettings.sharpness / 200;
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = canvas.width;
          tempCanvas.height = canvas.height;
          const tempCtx = tempCanvas.getContext("2d");
          
          if (tempCtx) {
            tempCtx.filter = `contrast(${1 + sharpAmount})`;
            tempCtx.drawImage(canvas, 0, 0);
            ctx.globalAlpha = 0.5;
            ctx.drawImage(tempCanvas, 0, 0);
            ctx.globalAlpha = 1;
          }
        }

        const result = canvas.toDataURL("image/jpeg", 0.92);
        setProcessedSrc(result);
        setIsProcessing(false);
        resolve(result);
      };

      img.onerror = () => {
        setIsProcessing(false);
        resolve(imageSrc);
      };

      img.src = imageSrc;
    });
  }, [imageSrc]);

  const updateSetting = useCallback((key: keyof ImageSettings, value: number) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    processImage(newSettings);
  }, [settings, processImage]);

  const applyPreset = useCallback((preset: PresetType) => {
    const newSettings = presets[preset];
    setSettings(newSettings);
    processImage(newSettings);
  }, [processImage]);

  const reset = useCallback(() => {
    setSettings(presets.original);
    setProcessedSrc(originalSrc);
  }, [originalSrc]);

  // Initial processing with default preset
  useEffect(() => {
    if (imageSrc) {
      processImage(settings);
    }
  }, [imageSrc]);

  return {
    settings,
    processedSrc,
    originalSrc,
    isProcessing,
    updateSetting,
    applyPreset,
    reset,
  };
};

// Utility to detect image orientation
export const detectOrientation = (width: number, height: number): "portrait" | "landscape" | "square" => {
  const ratio = width / height;
  if (ratio > 1.1) return "landscape";
  if (ratio < 0.9) return "portrait";
  return "square";
};

// Utility to calculate optimal dimensions for web
export const getOptimalDimensions = (
  width: number,
  height: number,
  maxWidth = 800,
  maxHeight = 800
): { width: number; height: number } => {
  if (width <= maxWidth && height <= maxHeight) {
    return { width, height };
  }

  const aspectRatio = width / height;

  if (width > height) {
    return {
      width: Math.min(width, maxWidth),
      height: Math.min(width, maxWidth) / aspectRatio,
    };
  }

  return {
    width: Math.min(height, maxHeight) * aspectRatio,
    height: Math.min(height, maxHeight),
  };
};
