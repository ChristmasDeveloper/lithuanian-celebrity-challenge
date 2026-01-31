import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: number;
  showAnimation?: boolean;
}

export const ScoreDisplay = ({ score, showAnimation }: ScoreDisplayProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-sm uppercase tracking-widest text-muted-foreground font-display">
        Score
      </span>
      <div
        className={cn(
          "font-display text-4xl md:text-5xl font-bold text-primary neon-text-yellow",
          showAnimation && "animate-scale-in"
        )}
      >
        {score}
      </div>
    </div>
  );
};
