import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trophy, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NicknameFormProps {
  score: number;
  onSubmit: (nickname: string) => Promise<void>;
  error?: string;
}

export const NicknameForm = ({ score, onSubmit, error }: NicknameFormProps) => {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const trimmed = nickname.trim();
    if (trimmed.length < 3) {
      setValidationError('Nickname must be at least 3 characters');
      return;
    }
    if (trimmed.length > 20) {
      setValidationError('Nickname must be 20 characters or less');
      return;
    }
    
    setValidationError('');
    setIsLoading(true);
    
    try {
      await onSubmit(trimmed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-scale-in">
      {/* Final score display */}
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-primary neon-text-yellow" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Game Over!
        </h2>
        <p className="text-muted-foreground">Your final score:</p>
        <p className="font-display text-5xl md:text-6xl font-bold text-primary neon-text-yellow mt-2">
          {score}
        </p>
      </div>

      {/* Nickname form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-muted-foreground mb-2">
            Enter your nickname to save score
          </label>
          <Input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Your nickname..."
            maxLength={20}
            className={cn(
              "h-12 md:h-14 px-4 text-base md:text-lg",
              "bg-card border-2 border-muted",
              "focus:border-primary focus:ring-primary/20",
              "placeholder:text-muted-foreground/50",
              (error || validationError) && "border-accent"
            )}
            disabled={isLoading}
            autoFocus
          />
          {(error || validationError) && (
            <p className="mt-2 text-sm text-accent">
              {validationError || error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !nickname.trim()}
          className={cn(
            "w-full h-12 md:h-14",
            "bg-secondary text-secondary-foreground",
            "hover:bg-secondary/90",
            "neon-border-green",
            "font-display font-semibold uppercase tracking-wider",
            "transition-all duration-200"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Score'
          )}
        </Button>
      </form>
    </div>
  );
};
