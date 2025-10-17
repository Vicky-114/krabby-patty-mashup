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
    const componentText = hybrid.componentBreakdown 
      ? hybrid.componentBreakdown.map(c => `${c.name}(${c.percentage}%)`).join('、')
      : hybrid.components.map(k => CHARACTERS[k]?.name).join('、');
    
    const text = `我是 ${hybrid.name}！\n这是一个由${componentText}组成的独特混合角色。\n${hybrid.description}`;
    
    if (navigator.share) {
      navigator.share({
        title: '我的比奇堡混合角色',
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
      title: "已复制到剪贴板！",
      description: "快去分享你的混合角色吧！",
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
            你是混合角色！
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
            <h3 className="text-xl font-bold text-primary mb-3">你的混合人格</h3>
            <p className="text-foreground leading-relaxed mb-4">{hybrid.description}</p>
            
            {/* Detailed component breakdown */}
            {hybrid.componentBreakdown && hybrid.componentBreakdown.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="text-lg font-semibold text-primary">角色组成详解：</h4>
                {hybrid.componentBreakdown.map(component => {
                  const character = CHARACTERS[component.key];
                  const topTraits = Object.entries(character.weights)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 2)
                    .map(([trait]) => trait);
                  
                  return (
                    <div key={component.key} className="flex items-center gap-3 bg-background/50 rounded-lg p-3">
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="w-12 h-12 rounded-full border-2 border-primary object-contain"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-foreground">{character.name}</span>
                          <span className="text-primary font-bold">{component.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${component.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          主要特质: {topTraits.join(', ')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onRestart}
              size="lg"
              className="font-bold shadow-glow"
            >
              重新测试
            </Button>
            
            <Button
              onClick={handleShare}
              variant="secondary"
              size="lg"
              className="font-bold"
            >
              <Share2 className="mr-2 h-5 w-5" />
              分享你的角色
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuizResult;
