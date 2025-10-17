import { HybridCharacter } from '@/types/quiz';
import { CHARACTERS } from '@/data/characters';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import bgImage from '@/assets/bg_bikini_bottom.jpg';

interface QuizResultProps {
  hybrid: HybridCharacter;
  onRestart: () => void;
}

const QuizResult = ({ hybrid, onRestart }: QuizResultProps) => {
  const { toast } = useToast();
  
  const handleShare = () => {
    const text = `I'm ${hybrid.name} - a hybrid of ${hybrid.components.map(k => CHARACTERS[k]?.name).join(', ')}! ${hybrid.description}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Bikini Bottom Hybrid Character',
        text,
      }).catch(() => {
        copyToClipboard(text);
      });
    } else {
      copyToClipboard(text);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Share your hybrid character with friends!",
    });
  };
  
  const primaryChar = CHARACTERS[hybrid.components[0]];
  
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      
      <Card className="relative w-full max-w-3xl p-8 md:p-12 bg-card/95 backdrop-blur-md border-primary border-4 shadow-deep">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 pulse-glow">
            You're a Hybrid!
          </h1>
          
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
            {hybrid.name}
          </h2>
          
          {/* Hybrid character visualization */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">
            {hybrid.components.slice(0, 3).map((charKey, idx) => (
              <img
                key={charKey}
                src={CHARACTERS[charKey]?.image}
                alt={CHARACTERS[charKey]?.name}
                className="absolute inset-0 w-full h-full object-contain rounded-full border-4 border-primary shadow-glow transition-transform hover:scale-110"
                style={{
                  opacity: idx === 0 ? 1 : 0.5,
                  transform: `translate(${idx * 15}px, ${idx * 15}px)`,
                  filter: idx > 0 ? `hue-rotate(${idx * 30}deg)` : 'none',
                }}
              />
            ))}
          </div>
          
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-primary mb-3">Your Hybrid Personality</h3>
            <p className="text-foreground leading-relaxed">{hybrid.description}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-primary mb-2">Made from:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {hybrid.components.map(charKey => (
                <span
                  key={charKey}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-semibold text-sm"
                >
                  {CHARACTERS[charKey]?.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onRestart}
              size="lg"
              className="font-bold shadow-glow"
            >
              Create Another Hybrid
            </Button>
            
            <Button
              onClick={handleShare}
              variant="secondary"
              size="lg"
              className="font-bold"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share Your Hybrid
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuizResult;
