import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

const colors = [
  'hsl(50, 100%, 50%)',   // Yellow
  'hsl(120, 60%, 45%)',   // Green
  'hsl(0, 80%, 55%)',     // Red
  'hsl(50, 100%, 70%)',   // Light yellow
  'hsl(120, 60%, 60%)',   // Light green
];

export const ConfettiEffect = ({ trigger, onComplete }: ConfettiEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
        size: Math.random() * 8 + 4,
      }));
      
      setParticles(newParticles);
      
      const timeout = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [trigger, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};
