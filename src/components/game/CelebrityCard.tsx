import { Celebrity } from '@/data/celebrities';
import { cn } from '@/lib/utils';

interface CelebrityCardProps {
  celebrity: Celebrity;
  revealed?: boolean;
}

export const CelebrityCard = ({ celebrity, revealed = false }: CelebrityCardProps) => {
  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Glow effect behind the card */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />
      
      {/* Main card */}
      <div
        className={cn(
          "relative aspect-square rounded-xl overflow-hidden",
          "border-2 border-primary/50",
          "neon-border-yellow",
          !revealed && "celebrity-mask"
        )}
      >
        <img
          src={celebrity.imageUrl}
          alt={revealed ? `${celebrity.name} ${celebrity.lastname}` : "Mystery celebrity"}
          className={cn(
            "w-full h-full object-cover",
            !revealed && "blur-md scale-110"
          )}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        
        {/* Overlay for masked state */}
        {!revealed && (
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-card/70 to-background/90 flex items-center justify-center">
            <span className="font-display text-6xl md:text-7xl font-bold text-primary neon-text-yellow animate-float">
              ?
            </span>
          </div>
        )}
        
        {/* Revealed name */}
        {revealed && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4">
            <p className="font-display text-lg text-center text-primary neon-text-yellow">
              {celebrity.name} {celebrity.lastname}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
