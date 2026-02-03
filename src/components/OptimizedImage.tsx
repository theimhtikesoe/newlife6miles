import { useState, useRef, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "auto";
  objectFit?: "contain" | "cover" | "fill";
  priority?: boolean;
  onLoad?: () => void;
  enhanceOnHover?: boolean;
}

const OptimizedImage = memo(({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = "auto",
  objectFit = "contain",
  priority = false,
  onLoad,
  enhanceOnHover = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before visible
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const aspectRatioClasses = {
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    auto: "",
  };

  const objectFitClasses = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-secondary/30",
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
      onMouseEnter={() => enhanceOnHover && setIsHovered(true)}
      onMouseLeave={() => enhanceOnHover && setIsHovered(false)}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-muted to-secondary animate-pulse" />
      )}

      {/* Image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          className={cn(
            "w-full h-full transition-all duration-500",
            objectFitClasses[objectFit],
            isLoaded ? "opacity-100" : "opacity-0",
            "brightness-110 contrast-105 saturate-105", // Always enhanced for brighter look
            className
          )}
          style={{
            // Add explicit dimensions for layout stability
            aspectRatio: aspectRatio !== "auto" 
              ? aspectRatio === "square" ? "1/1" 
              : aspectRatio === "landscape" ? "4/3" 
              : "3/4" 
              : undefined,
          }}
        />
      )}

      {/* Hover overlay for enhancement effect */}
      {enhanceOnHover && isHovered && isLoaded && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/5 to-transparent" />
      )}
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
