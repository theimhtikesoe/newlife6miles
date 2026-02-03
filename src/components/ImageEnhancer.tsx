import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  Sun, 
  Contrast, 
  Palette, 
  Thermometer, 
  Focus,
  RotateCcw,
  Sparkles,
  Monitor,
  Film,
  Package,
  Coffee
} from "lucide-react";
import { 
  useImageOptimizer, 
  presets, 
  presetLabels, 
  PresetType,
  ImageSettings 
} from "@/hooks/useImageOptimizer";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface ImageEnhancerProps {
  imageSrc: string;
  onEnhanced?: (enhancedSrc: string) => void;
  className?: string;
  showControls?: boolean;
}

const sliderConfig: {
  key: keyof ImageSettings;
  label: { en: string; mm: string };
  icon: typeof Sun;
  min: number;
  max: number;
}[] = [
  { key: "brightness", label: { en: "Brightness", mm: "အလင်းရောင်" }, icon: Sun, min: -100, max: 100 },
  { key: "contrast", label: { en: "Contrast", mm: "ကွန်ထရာစ်" }, icon: Contrast, min: -100, max: 100 },
  { key: "saturation", label: { en: "Saturation", mm: "ရောင်စုံမှု" }, icon: Palette, min: -100, max: 100 },
  { key: "warmth", label: { en: "Warmth", mm: "နွေးထွေးမှု" }, icon: Thermometer, min: -100, max: 100 },
  { key: "sharpness", label: { en: "Sharpness", mm: "ချွန်ထက်မှု" }, icon: Focus, min: 0, max: 100 },
];

const presetConfig: { key: PresetType; icon: typeof Sparkles }[] = [
  { key: "adReady", icon: Sparkles },
  { key: "cleanWeb", icon: Monitor },
  { key: "cinematic", icon: Film },
  { key: "product", icon: Package },
  { key: "lifestyle", icon: Coffee },
];

const ImageEnhancer = ({ 
  imageSrc, 
  onEnhanced, 
  className,
  showControls = true 
}: ImageEnhancerProps) => {
  const { t, language } = useLanguage();
  const [showOriginal, setShowOriginal] = useState(false);
  const {
    settings,
    processedSrc,
    originalSrc,
    isProcessing,
    updateSetting,
    applyPreset,
    reset,
  } = useImageOptimizer(imageSrc);

  const handlePresetClick = (preset: PresetType) => {
    applyPreset(preset);
    onEnhanced?.(processedSrc);
  };

  const handleSliderChange = (key: keyof ImageSettings, value: number[]) => {
    updateSetting(key, value[0]);
    onEnhanced?.(processedSrc);
  };

  const handleReset = () => {
    reset();
    onEnhanced?.(originalSrc);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Image Preview */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
        <img
          src={showOriginal ? originalSrc : processedSrc}
          alt="Enhanced preview"
          className={cn(
            "w-full h-full object-contain p-4 transition-opacity duration-300",
            isProcessing && "opacity-50"
          )}
        />
        
        {/* Processing indicator */}
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Compare toggle */}
        <button
          className="absolute bottom-4 right-4 px-3 py-1.5 text-xs font-medium bg-background/90 backdrop-blur rounded-full border shadow-sm hover:bg-background transition-colors"
          onMouseDown={() => setShowOriginal(true)}
          onMouseUp={() => setShowOriginal(false)}
          onMouseLeave={() => setShowOriginal(false)}
          onTouchStart={() => setShowOriginal(true)}
          onTouchEnd={() => setShowOriginal(false)}
        >
          {t("Hold to compare", "နှိုင်းယှဉ်ရန် ဖိထားပါ")}
        </button>
      </div>

      {showControls && (
        <>
          {/* Presets */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              {t("Quick Presets", "အမြန်ပရီဆက်များ")}
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {presetConfig.map(({ key, icon: Icon }) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetClick(key)}
                  className={cn(
                    "flex flex-col items-center gap-1 h-auto py-2 text-xs",
                    JSON.stringify(settings) === JSON.stringify(presets[key]) && 
                      "border-primary bg-primary/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{presetLabels[key][language]}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">
                {t("Fine Tune", "အသေးစိတ်ချိန်ညှိ")}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                {t("Reset", "ပြန်လည်သတ်မှတ်")}
              </Button>
            </div>

            {sliderConfig.map(({ key, label, icon: Icon, min, max }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    {label[language]}
                  </label>
                  <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                    {settings[key]}
                  </span>
                </div>
                <Slider
                  value={[settings[key]]}
                  min={min}
                  max={max}
                  step={1}
                  onValueChange={(value) => handleSliderChange(key, value)}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageEnhancer;
