import { useNavigate, useLocation } from "react-router-dom";
import { GameRound } from "@/components/game/GameRound";
import { useEffect, useState } from "react";

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [gameKey, setGameKey] = useState(0);

  // Reset game when navigating to this page
  useEffect(() => {
    setGameKey(prev => prev + 1);
  }, [location.key]);

  const handleScoreSaved = () => {
    navigate("/scoreboard");
  };

  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <div className="container mx-auto px-4 py-4 h-full">
        <GameRound key={gameKey} onScoreSaved={handleScoreSaved} />
      </div>
    </div>
  );
};

export default Game;
