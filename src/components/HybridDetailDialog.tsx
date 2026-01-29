import { HybridCharacter } from '@/types/quiz';
import { CHARACTERS } from '@/data/characters';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface HybridDetailDialogProps {
  hybrid: HybridCharacter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HybridDetailDialog = ({ hybrid, open, onOpenChange }: HybridDetailDialogProps) => {
  if (!hybrid) return null;

  const createdDate = new Date(hybrid.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get top traits sorted by score
  const topTraits = Object.entries(hybrid.traits)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card/95 backdrop-blur-md border-4 border-primary shadow-deep">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary text-center">
            {hybrid.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Character Image */}
          <div className="flex justify-center">
            {hybrid.generatedImageUrl ? (
              <img
                src={hybrid.generatedImageUrl}
                alt={hybrid.name}
                className="w-40 h-40 object-cover rounded-full border-4 border-primary shadow-glow"
              />
            ) : (
              <div className="relative w-40 h-40">
                {hybrid.components.slice(0, 3).map((charKey, idx) => (
                  <img
                    key={charKey}
                    src={CHARACTERS[charKey]?.image}
                    alt={CHARACTERS[charKey]?.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-full border-4 border-primary"
                    style={{
                      opacity: idx === 0 ? 1 : 0.5,
                      transform: `translate(${idx * 10}px, ${idx * 10}px)`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Description */}
          <p className="text-center text-foreground/90 text-sm leading-relaxed">
            {hybrid.description}
          </p>
          
          {/* Component Characters */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary">角色组成</h4>
            <div className="flex flex-wrap gap-2">
              {hybrid.componentBreakdown ? (
                hybrid.componentBreakdown.map((comp) => (
                  <Badge key={comp.key} variant="secondary" className="flex items-center gap-1">
                    <img
                      src={CHARACTERS[comp.key]?.image}
                      alt={comp.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{comp.name}</span>
                    <span className="text-primary font-bold">{comp.percentage}%</span>
                  </Badge>
                ))
              ) : (
                hybrid.components.map((charKey) => (
                  <Badge key={charKey} variant="secondary" className="flex items-center gap-1">
                    <img
                      src={CHARACTERS[charKey]?.image}
                      alt={CHARACTERS[charKey]?.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{CHARACTERS[charKey]?.name}</span>
                  </Badge>
                ))
              )}
            </div>
          </div>
          
          {/* Top Traits */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary">主要特质</h4>
            <div className="grid grid-cols-2 gap-2">
              {topTraits.map(([trait, score]) => (
                <div key={trait} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
                  <span className="text-xs capitalize">{trait}</span>
                  <span className="text-xs font-bold text-primary">{score}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Created Date */}
          <p className="text-center text-xs text-muted-foreground">
            创建于 {createdDate}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HybridDetailDialog;
