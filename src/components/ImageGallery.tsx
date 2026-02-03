import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OptimizedImage from "./OptimizedImage";
import ImageEnhancer from "./ImageEnhancer";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  labels?: string[];
  showLabels?: boolean; // Whether to show labels (default: true for bottles, false for caps)
}

const ImageGallery = ({ images, productName, labels, showLabels = true }: ImageGalleryProps) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showEnhancer, setShowEnhancer] = useState(false);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const defaultLabels = [
    t("Without Cap", "အဖုံးမပါ"),
    t("With Cap", "အဖုံးပါ"),
  ];

  const displayLabels = labels || defaultLabels;

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
        <span className="text-4xl font-bold text-primary/30">
          {productName.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
          <OptimizedImage
            src={images[activeIndex]}
            alt={`${productName} - ${displayLabels[activeIndex] || `View ${activeIndex + 1}`}`}
            className="p-8 group-hover:scale-105 transition-transform duration-500"
            aspectRatio="square"
            priority
            enhanceOnHover
          />
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsZoomed(true)}
            className="w-8 h-8 bg-background/80 backdrop-blur"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setShowEnhancer(true)}
            className="w-8 h-8 bg-background/80 backdrop-blur"
          >
            <Settings2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 justify-center">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all",
                activeIndex === idx
                  ? "border-primary shadow-md scale-105"
                  : "border-transparent hover:border-primary/50"
              )}
            >
              <OptimizedImage
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="p-1"
                aspectRatio="square"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Labels - Only show if showLabels is true */}
      {showLabels && images.length > 1 && (
        <div className="flex gap-3 justify-center text-sm text-muted-foreground">
          {displayLabels.slice(0, images.length).map((label, idx) => (
            <span
              key={idx}
              className={cn(
                "cursor-pointer transition-colors",
                activeIndex === idx && "text-primary font-medium"
              )}
              onClick={() => setActiveIndex(idx)}
            >
              {label}
              {idx < displayLabels.length - 1 && idx < images.length - 1 && (
                <span className="ml-3 text-muted-foreground/50">|</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Zoom Dialog */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-4xl p-0 bg-background">
          <div className="relative aspect-square">
            <img
              src={images[activeIndex]}
              alt={productName}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhancer Dialog */}
      <Dialog open={showEnhancer} onOpenChange={setShowEnhancer}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("Image Enhancement", "ပုံ ပြုပြင်ခြင်း")}</DialogTitle>
          </DialogHeader>
          <ImageEnhancer imageSrc={images[activeIndex]} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
