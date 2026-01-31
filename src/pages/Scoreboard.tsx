import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Loader2, AlertCircle, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ScoreEntry {
  id: number;
  nickname: string;
  score: number | string;
}

const Scoreboard = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('/izimybes/api/scores');
        
        if (!response.ok) {
          throw new Error('Failed to fetch scores');
        }

        const data: ScoreEntry[] = await response.json();
        
        // Sort by score descending (handle both string and number scores)
        const sortedScores = data.sort((a, b) => {
          const scoreA = typeof a.score === 'string' ? parseInt(a.score, 10) : a.score;
          const scoreB = typeof b.score === 'string' ? parseInt(b.score, 10) : b.score;
          return scoreB - scoreA;
        });

        setScores(sortedScores);
      } catch (err) {
        setError('Failed to load scoreboard. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return 'text-primary neon-text-yellow'; // Gold
      case 1: return 'text-gray-400'; // Silver
      case 2: return 'text-amber-700'; // Bronze
      default: return 'text-muted-foreground';
    }
  };

  const getRowStyle = (index: number) => {
    switch (index) {
      case 0: return 'bg-primary/10 border-primary/30 neon-border-yellow';
      case 1: return 'bg-gray-500/10 border-gray-500/30';
      case 2: return 'bg-amber-900/10 border-amber-900/30';
      default: return 'bg-card border-border';
    }
  };

  return (
    <div className="min-h-screen gradient-bg animated-gradient">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-primary neon-text-yellow" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Scoreboard
          </h1>
          <p className="text-muted-foreground mt-2">Top Lithuanian celebrity experts</p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading scores...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-10 h-10 text-accent mb-4" />
            <p className="text-accent">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="ghost"
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && scores.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Medal className="w-10 h-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No scores yet. Be the first!</p>
          </div>
        )}

        {/* Scores list */}
        {!isLoading && !error && scores.length > 0 && (
          <div className="max-w-lg mx-auto space-y-3">
            {scores.map((entry, index) => (
              <div
                key={entry.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg border-2",
                  "transition-all duration-200",
                  getRowStyle(index),
                  index < 3 && "animate-scale-in"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Rank */}
                <div className={cn(
                  "w-8 h-8 flex items-center justify-center",
                  "font-display font-bold text-lg",
                  getMedalColor(index)
                )}>
                  {index < 3 ? (
                    <Medal className="w-6 h-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Nickname */}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium truncate",
                    index === 0 && "text-primary"
                  )}>
                    {entry.nickname}
                  </p>
                </div>

                {/* Score */}
                <div className={cn(
                  "font-display text-xl font-bold",
                  getMedalColor(index)
                )}>
                  {typeof entry.score === 'string' ? parseInt(entry.score, 10) : entry.score}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to game button */}
        <div className="flex justify-center mt-8">
          <Link to="/">
            <Button
              className={cn(
                "h-12 px-8",
                "bg-secondary text-secondary-foreground",
                "hover:bg-secondary/90",
                "neon-border-green",
                "font-display font-semibold uppercase tracking-wider"
              )}
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Play Game
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
