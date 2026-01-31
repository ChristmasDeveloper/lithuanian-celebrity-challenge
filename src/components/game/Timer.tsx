import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimerProps {
  duration: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

export const Timer = ({ duration, isRunning, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);

  const isLow = timeLeft <= 10;
  const isCritical = timeLeft <= 5;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        "w-24 h-24 md:w-28 md:h-28 rounded-full",
        "border-4 transition-all duration-300",
        isCritical 
          ? "border-accent neon-border-red animate-timer-pulse" 
          : isLow 
            ? "border-primary neon-border-yellow" 
            : "border-secondary neon-border-green"
      )}
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className={cn(
            "transition-all duration-1000",
            isCritical ? "text-accent/30" : isLow ? "text-primary/30" : "text-secondary/30"
          )}
          strokeDasharray={`${(timeLeft / duration) * 283} 283`}
        />
      </svg>
      
      {/* Time display */}
      <span
        className={cn(
          "font-display text-2xl md:text-3xl font-bold",
          isCritical 
            ? "text-accent neon-text-red" 
            : isLow 
              ? "text-primary neon-text-yellow" 
              : "text-secondary neon-text-green"
        )}
      >
        {timeLeft}
      </span>
    </div>
  );
};
