import { useNavigate } from 'react-router-dom';
import { GameRound } from '@/components/game/GameRound';

const Game = () => {
  const navigate = useNavigate();

  const handleScoreSaved = () => {
    navigate('/scoreboard');
  };

  return (
    <div className="min-h-screen gradient-bg animated-gradient">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <GameRound onScoreSaved={handleScoreSaved} />
      </div>
    </div>
  );
};

export default Game;
