import { HybridCharacter } from '@/types/quiz';
import { CHARACTERS } from '@/data/characters';
import { useEffect, useState } from 'react';

interface FloatingHybridProps {
  hybrid: HybridCharacter;
  index: number;
}

const FloatingHybrid = ({ hybrid, index }: FloatingHybridProps) => {
  const [position, setPosition] = useState(hybrid.position || { x: 50, y: 50 });
  
  useEffect(() => {
    // Gradually drift around
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: Math.max(5, Math.min(95, prev.x + (Math.random() - 0.5) * 3)),
        y: Math.max(5, Math.min(95, prev.y + (Math.random() - 0.5) * 3)),
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Stagger animation delays
  const animationDelay = `${index * 1.2}s`;

  // Use generated image if available, otherwise fall back to primary character
  const hasGeneratedImage = !!hybrid.generatedImageUrl;
  const primaryChar = CHARACTERS[hybrid.components[0]];
  
  return (
    <div
      className="fixed pointer-events-none transition-all duration-[3000ms] ease-in-out z-10"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay,
      }}
    >
      <div className="float-animation opacity-70 hover:opacity-100 transition-opacity">
        <div className="relative group pointer-events-auto">
          {/* Character visualization */}
          <div className="relative w-20 h-20 md:w-28 md:h-28">
            {hasGeneratedImage ? (
              // Show generated hybrid image
              <img
                src={hybrid.generatedImageUrl}
                alt={hybrid.name}
                className="w-full h-full object-cover rounded-full border-4 border-primary shadow-glow bg-background"
              />
            ) : (
              // Fallback: show overlapping character images
              hybrid.components.slice(0, 3).map((charKey, idx) => (
                <img
                  key={charKey}
                  src={CHARACTERS[charKey]?.image}
                  alt={CHARACTERS[charKey]?.name}
                  className="absolute inset-0 w-full h-full object-contain rounded-full border-4 border-primary shadow-glow"
                  style={{
                    opacity: idx === 0 ? 1 : 0.4,
                    transform: `translate(${idx * 8}px, ${idx * 8}px)`,
                    filter: idx > 0 ? 'hue-rotate(30deg)' : 'none',
                  }}
                />
              ))
            )}
          </div>
          
          {/* Hover tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-card text-card-foreground p-3 rounded-lg shadow-deep min-w-[200px] border-2 border-primary">
              <h3 className="font-bold text-primary text-lg mb-1">{hybrid.name}</h3>
              <p className="text-xs mb-2">{hybrid.description}</p>
              <div className="text-xs opacity-75">
                Mix of: {hybrid.components.map(k => CHARACTERS[k]?.name).join(' + ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingHybrid;
