import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Žaidimas', icon: Gamepad2 },
    { to: '/scoreboard', label: 'Rezultatų lentelė', icon: Trophy },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:relative md:bottom-auto">
      <div className="bg-card/95 backdrop-blur-lg border-t md:border-b md:border-t-0 border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 h-16 md:h-14">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-lg",
                  "font-display text-sm uppercase tracking-wider",
                  "transition-all duration-200",
                  location.pathname === to
                    ? "bg-primary/10 text-primary neon-text-yellow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
