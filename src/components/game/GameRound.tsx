import { useState, useCallback, useEffect } from 'react';
import { Timer } from './Timer';
import { ScoreDisplay } from './ScoreDisplay';
import { CelebrityCard } from './CelebrityCard';
import { GuessInput } from './GuessInput';
import { ConfettiEffect } from './ConfettiEffect';
import { NicknameForm } from './NicknameForm';
import { Button } from '@/components/ui/button';
import { celebrities, checkGuess, Celebrity } from '@/data/celebrities';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Game configuration
const GAME_DURATION = 60; // seconds

interface GameRoundProps {
  onScoreSaved: () => void;
}

export const GameRound = ({ onScoreSaved }: GameRoundProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [currentCelebrity, setCurrentCelebrity] = useState<Celebrity | null>(null);
  const [usedCelebrities, setUsedCelebrities] = useState<Set<number>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [apiError, setApiError] = useState('');

  // Get a random celebrity that hasn't been used
  const getNextCelebrity = useCallback(() => {
    const availableCelebrities = celebrities.filter(c => !usedCelebrities.has(c.id));
    
    if (availableCelebrities.length === 0) {
      // Reset if all celebrities have been used
      setUsedCelebrities(new Set());
      return celebrities[Math.floor(Math.random() * celebrities.length)];
    }
    
    return availableCelebrities[Math.floor(Math.random() * availableCelebrities.length)];
  }, [usedCelebrities]);

  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setGameEnded(false);
    setUsedCelebrities(new Set());
    setApiError('');
    const firstCelebrity = celebrities[Math.floor(Math.random() * celebrities.length)];
    setCurrentCelebrity(firstCelebrity);
    setUsedCelebrities(new Set([firstCelebrity.id]));
  };

  // Handle time up
  const handleTimeUp = useCallback(() => {
    setIsPlaying(false);
    setGameEnded(true);
  }, []);

  // Handle guess submission
  const handleGuess = (guess: string) => {
    if (!currentCelebrity || !isPlaying) return;

    if (checkGuess(guess, currentCelebrity)) {
      // Correct guess
      setScore(prev => prev + 1);
      setShowScoreAnimation(true);
      setShowConfetti(true);
      setShowError(false);
      
      // Get next celebrity
      const nextCelebrity = getNextCelebrity();
      setCurrentCelebrity(nextCelebrity);
      setUsedCelebrities(prev => new Set([...prev, nextCelebrity.id]));
      
      setTimeout(() => setShowScoreAnimation(false), 300);
    } else {
      // Wrong guess
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  // Save score to API
  const handleSaveScore = async (nickname: string) => {
    setApiError('');
    
    try {
      const response = await fetch('/izimybes/api/celebrities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
          score: String(score), // API expects score as string
        }),
      });

      if (response.status === 400) {
        setApiError('Nickname already exists. Choose another.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to save score');
      }

      // Success - redirect to scoreboard
      onScoreSaved();
    } catch (error) {
      setApiError('Failed to save score. Please try again.');
    }
  };

  // Restart game
  const handleRestart = () => {
    setGameEnded(false);
    setScore(0);
    setIsPlaying(false);
    setCurrentCelebrity(null);
  };

  // Pre-game state
  if (!isPlaying && !gameEnded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-primary neon-text-yellow mb-4">
          Įžymybės
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-md">
          Guess Lithuanian celebrities by their masked photos! Type their full name to score points.
        </p>
        <Button
          onClick={startGame}
          className={cn(
            "h-14 md:h-16 px-10 md:px-12",
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90",
            "neon-border-yellow animate-pulse-border",
            "font-display text-lg md:text-xl font-bold uppercase tracking-widest",
            "transition-all duration-200"
          )}
        >
          Play Now
        </Button>
      </div>
    );
  }

  // Game ended state
  if (gameEnded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <NicknameForm 
          score={score} 
          onSubmit={handleSaveScore}
          error={apiError}
        />
        <Button
          onClick={handleRestart}
          variant="ghost"
          className="mt-6 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
      </div>
    );
  }

  // Active game state
  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 px-4 py-4">
      <ConfettiEffect 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      {/* Header with timer and score */}
      <div className="flex items-center justify-between w-full max-w-md">
        <Timer 
          duration={GAME_DURATION} 
          isRunning={isPlaying} 
          onTimeUp={handleTimeUp} 
        />
        <ScoreDisplay score={score} showAnimation={showScoreAnimation} />
      </div>

      {/* Celebrity card */}
      {currentCelebrity && (
        <CelebrityCard celebrity={currentCelebrity} />
      )}

      {/* Guess input */}
      <GuessInput 
        onSubmit={handleGuess}
        disabled={!isPlaying}
        showError={showError}
      />
    </div>
  );
};
