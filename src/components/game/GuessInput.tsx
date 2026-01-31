import { useState, FormEvent, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  disabled?: boolean;
  showError?: boolean;
}

export const GuessInput = ({ onSubmit, disabled, showError }: GuessInputProps) => {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (guess.trim() && !disabled) {
      onSubmit(guess.trim());
      setGuess('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type name and lastname..."
            disabled={disabled}
            className={cn(
              "h-12 md:h-14 px-4 text-base md:text-lg",
              "bg-card border-2 border-muted",
              "focus:border-primary focus:ring-primary/20",
              "placeholder:text-muted-foreground/50",
              "transition-all duration-200",
              showError && "shake border-accent"
            )}
            autoComplete="off"
            autoFocus
          />
        </div>
        <Button
          type="submit"
          disabled={disabled || !guess.trim()}
          className={cn(
            "h-12 md:h-14 px-6",
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90",
            "neon-border-yellow",
            "font-display font-semibold uppercase tracking-wider",
            "transition-all duration-200"
          )}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      
      {showError && (
        <p className="mt-2 text-sm text-accent text-center animate-scale-in">
          Try again! 🤔
        </p>
      )}
    </form>
  );
};
