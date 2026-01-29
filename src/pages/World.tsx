import { useState, useEffect } from 'react';
import { HybridCharacter } from '@/types/quiz';
import { loadHybrids } from '@/utils/quizLogic';
import FloatingHybrid from '@/components/FloatingHybrid';
import UnderwaterLayer from '@/components/UnderwaterLayer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bgImage from '@/assets/bg_bikini_bottom.jpg';

const World = () => {
  const [floatingHybrids, setFloatingHybrids] = useState<HybridCharacter[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = loadHybrids();
    setFloatingHybrids(saved);
  }, []);

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-background/30" />

      {/* Underwater effects */}
      <UnderwaterLayer />

      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => navigate('/')}
          variant="secondary"
          size="lg"
          className="font-bold shadow-glow backdrop-blur-sm bg-card/80"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Quiz
        </Button>
      </div>

      {/* Title */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <h1 className="text-3xl md:text-5xl font-black text-primary drop-shadow-lg pulse-glow">
          Bikini Bottom World
        </h1>
        <p className="text-center text-foreground/80 mt-2 text-sm md:text-base">
          {floatingHybrids.length} hybrid characters swimming around
        </p>
      </div>

      {/* Floating hybrids */}
      {floatingHybrids.map((hybrid, index) => (
        <FloatingHybrid key={hybrid.id} hybrid={hybrid} index={index} />
      ))}

      {/* Empty state */}
      {floatingHybrids.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
          <div className="bg-card/90 backdrop-blur-md p-8 rounded-lg border-4 border-primary shadow-deep text-center max-w-md">
            <h2 className="text-2xl font-bold text-primary mb-4">No Hybrids Yet!</h2>
            <p className="text-foreground mb-6">
              Complete the quiz to create your first hybrid character and watch them swim around here!
            </p>
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="font-bold shadow-glow"
            >
              Take the Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default World;
