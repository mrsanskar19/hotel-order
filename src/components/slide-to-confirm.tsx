
'use client';
import { useState, useRef, type MouseEvent, type TouchEvent, useEffect } from 'react';
import { ChevronRight, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideToConfirmProps {
  onConfirm: () => void;
  text?: string;
  loadingText?: string;
  successText?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
}

export function SlideToConfirm({
  onConfirm,
  text = 'Slide to confirm',
  loadingText = 'Processing...',
  successText = 'Confirmed!',
  isLoading = false,
  isSuccess = false,
}: SlideToConfirmProps) {
  const [isSliding, setIsSliding] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSuccess || isLoading) {
      setSlideProgress(1);
    } else {
      if (!isSliding) {
        setSlideProgress(0);
      }
    }
  }, [isLoading, isSuccess, isSliding]);

  const handleInteractionStart = (e: MouseEvent | TouchEvent) => {
    if (isLoading || isSuccess) return;
    setIsSliding(true);
    if (sliderRef.current) sliderRef.current.style.transition = 'none';
    if (e.currentTarget) e.currentTarget.classList.add('grabbing');
  };

  const handleInteractionMove = (clientX: number) => {
    if (!isSliding || isLoading || isSuccess || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const sliderWidth = sliderRef.current?.offsetWidth || 56;
    let progress = (clientX - rect.left - sliderWidth / 2) / (rect.width - sliderWidth);
    progress = Math.max(0, Math.min(1, progress));
    
    setSlideProgress(progress);

    if (progress >= 1) {
      setIsSliding(false);
      onConfirm();
    }
  };

  const handleInteractionEnd = (e: MouseEvent | TouchEvent) => {
    if (!isSliding) return;
    setIsSliding(false);
    if (sliderRef.current) sliderRef.current.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
    if (slideProgress < 1) {
      setSlideProgress(0);
    }
     if (e.currentTarget) e.currentTarget.classList.remove('grabbing');
  };
  
  const sliderPosition = `calc(${slideProgress * 100}% - ${slideProgress * 56}px)`;
  const trackWidth = `${slideProgress * 100}%`;
  
  let textToShow = text;
  if(isLoading) textToShow = loadingText;
  if(isSuccess) textToShow = successText;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-14 rounded-full bg-secondary border select-none overflow-hidden",
        "flex items-center justify-center text-secondary-foreground font-semibold",
        (isLoading || isSuccess) ? 'cursor-not-allowed' : 'cursor-grab',
        isSliding && 'grabbing'
      )}
      onMouseDown={(e) => handleInteractionStart(e as unknown as MouseEvent)}
      onMouseMove={(e) => handleInteractionMove(e.clientX)}
      onMouseUp={(e) => handleInteractionEnd(e as unknown as MouseEvent)}
      onMouseLeave={(e) => isSliding && handleInteractionEnd(e as unknown as MouseEvent)}
      onTouchStart={(e) => handleInteractionStart(e as unknown as TouchEvent)}
      onTouchMove={(e) => handleInteractionMove(e.touches[0].clientX)}
      onTouchEnd={(e) => handleInteractionEnd(e as unknown as TouchEvent)}
    >
      <div 
        className="absolute left-0 top-0 h-full bg-primary/80 rounded-full"
        style={{ width: trackWidth, transition: isSliding ? 'none' : 'width 0.3s ease' }}
      />
      <div
        ref={sliderRef}
        className="absolute left-0 top-0 h-14 w-14 rounded-full flex items-center justify-center bg-primary text-primary-foreground shadow-lg"
        style={{ 
          transform: `translateX(${sliderPosition})`, 
          transition: isSliding ? 'none' : 'transform 0.3s ease',
          backgroundColor: `hsl(var(--primary) / ${Math.max(0.8, slideProgress * 1.5)})`
        }}
      >
        <div 
          className="absolute inset-0 bg-primary rounded-full transition-opacity"
          style={{
            opacity: slideProgress,
            transition: isSliding ? 'none' : 'opacity 0.3s ease'
          }}
        />
        <div className="relative">
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isSuccess ? (
            <Check className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </div>
      </div>

      <span className={cn(
          "z-10 transition-opacity duration-300 text-primary-foreground mix-blend-overlay",
          isLoading || isSuccess ? 'opacity-100' : 'opacity-80'
      )}>
        {textToShow}
      </span>
    </div>
  );
}
