import { HybridCharacter } from '@/types/quiz';
import { CHARACTERS } from '@/data/characters';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, Wand2, Box, Download, Image, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import bgImage from '@/assets/bg_bikini_bottom.jpg';

interface QuizResultProps {
  hybrid: HybridCharacter;
  onRestart: () => void;
}

const QuizResult = ({ hybrid, onRestart }: QuizResultProps) => {
  const { toast } = useToast();
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [printMode, setPrintMode] = useState<'regular' | '3d'>('regular');
  const [modelFormat, setModelFormat] = useState<'stl' | 'obj'>('stl');
  const [isGenerating3D, setIsGenerating3D] = useState(false);
  const [generated3DModel, setGenerated3DModel] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(true);
  const [show3DModel, setShow3DModel] = useState(true);
  
  const handleShare = () => {
    const componentText = hybrid.componentBreakdown 
      ? hybrid.componentBreakdown.map(c => `${c.name} (${c.percentage}%)`).join(', ')
      : hybrid.components.map(k => CHARACTERS[k]?.name).join(', ');
    
    const text = `I'm ${hybrid.name}!\nThis is a unique hybrid composed of ${componentText}.\n${hybrid.description}`;
    
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
  
  const generateHybridImage = async () => {
    if (!hybrid.componentBreakdown || hybrid.componentBreakdown.length < 3) {
      toast({
        title: "Not enough data",
        description: "Need at least 3 character components to generate image",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const top3 = hybrid.componentBreakdown.slice(0, 3);
      const shapeCharacter = CHARACTERS[top3[0].key];
      const colorCharacter = CHARACTERS[top3[1].key];
      const patternCharacter = CHARACTERS[top3[2].key];

      const { data, error } = await supabase.functions.invoke('generate-hybrid-image', {
        body: {
          shapeCharacter: { name: shapeCharacter.name, percentage: top3[0].percentage },
          colorCharacter: { name: colorCharacter.name, percentage: top3[1].percentage },
          patternCharacter: { name: patternCharacter.name, percentage: top3[2].percentage },
          userName: hybrid.name,
          printMode: printMode
        }
      });

      if (error) throw error;
      
      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast({
          title: "Image generated!",
          description: `Shape: ${shapeCharacter.name}, Color: ${colorCharacter.name}, Pattern: ${patternCharacter.name}`,
        });
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate hybrid image",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generate3DModel = async () => {
    if (!generatedImage) {
      toast({
        title: "Image required",
        description: "Please generate an AI image first before creating a 3D model",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating3D(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-3d-model', {
        body: {
          imageUrl: generatedImage,
          format: modelFormat,
          characterName: hybrid.name
        }
      });

      if (error) throw error;

      if (data?.modelUrl) {
        setGenerated3DModel(data.modelUrl);
        toast({
          title: "3D Model generated!",
          description: `Format: ${modelFormat.toUpperCase()}`,
        });
      } else if (data?.message) {
        toast({
          title: "3D Service Not Configured",
          description: data.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error generating 3D model:', error);
      toast({
        title: "3D Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate 3D model",
        variant: "destructive"
      });
    } finally {
      setIsGenerating3D(false);
    }
  };

  const download3DModel = () => {
    if (!generated3DModel) return;
    
    const link = document.createElement('a');
    link.href = generated3DModel;
    link.download = `${hybrid.name.replace(/\s+/g, '_')}_model.${modelFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            You're a Hybrid Character!
          </h1>
          
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
            {hybrid.name}
          </h2>
          
          {/* Generated Content Display - Both Image and 3D can be visible */}
          <div className="space-y-4 mb-6">
            {/* AI Generated Image Section */}
            {generatedImage && (
              <div className="w-full max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    AI Generated Image
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowImage(!showImage)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showImage ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showImage ? 'Hide' : 'Show'}
                  </Button>
                </div>
                {showImage && (
                  <>
                    <img 
                      src={generatedImage}
                      alt="AI Generated Hybrid Character"
                      className="w-full h-auto rounded-lg border-4 border-primary shadow-glow"
                    />
                    {hybrid.componentBreakdown && hybrid.componentBreakdown.length >= 3 && (
                      <div className="mt-3 p-3 bg-muted/70 rounded-lg text-sm">
                        <p className="font-semibold text-primary mb-1">Fusion Details:</p>
                        <p className="text-foreground">
                          <span className="font-medium">Shape Source:</span> {CHARACTERS[hybrid.componentBreakdown[0].key].name} ({hybrid.componentBreakdown[0].percentage}%)
                        </p>
                        <p className="text-foreground">
                          <span className="font-medium">Color Source:</span> {CHARACTERS[hybrid.componentBreakdown[1].key].name} ({hybrid.componentBreakdown[1].percentage}%)
                        </p>
                        <p className="text-foreground">
                          <span className="font-medium">Pattern Source:</span> {CHARACTERS[hybrid.componentBreakdown[2].key].name} ({hybrid.componentBreakdown[2].percentage}%)
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* 3D Model Section */}
            {generated3DModel && (
              <div className="w-full max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                    <Box className="w-5 h-5" />
                    3D Model
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShow3DModel(!show3DModel)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {show3DModel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {show3DModel ? 'Hide' : 'Show'}
                  </Button>
                </div>
                {show3DModel && (
                  <div className="p-6 bg-muted/70 rounded-lg border-2 border-primary/50">
                    <div className="flex flex-col items-center gap-4">
                      <Box className="w-16 h-16 text-primary animate-pulse" />
                      <p className="text-foreground font-medium">
                        {hybrid.name} 3D Model ({modelFormat.toUpperCase()})
                      </p>
                      <Button onClick={download3DModel} className="font-bold">
                        <Download className="mr-2 h-4 w-4" />
                        Download {modelFormat.toUpperCase()}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Default Character Visualization - only show if no generated image */}
            {!generatedImage && (
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
                {hybrid.components.slice(0, 3).map((charKey, idx) => (
                  <div key={charKey} className="absolute inset-0">
                    <img
                      src={CHARACTERS[charKey]?.image}
                      alt={CHARACTERS[charKey]?.name}
                      className="w-full h-full object-contain rounded-full border-4 border-primary shadow-glow transition-transform hover:scale-110"
                      style={{
                        opacity: idx === 0 ? 1 : 0.5,
                        transform: `translate(${idx * 15}px, ${idx * 15}px)`,
                        filter: idx > 0 ? `hue-rotate(${idx * 30}deg)` : 'none',
                      }}
                    />
                    {charKey === 'patrick' && idx === 0 && (
                      <img
                        src={CHARACTERS['gary']?.image}
                        alt="Gary"
                        className="absolute w-8 h-8 md:w-12 md:h-12 object-contain animate-bounce"
                        style={{
                          bottom: '25%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Image Generation Mode Selection */}
            {!generatedImage && (
              <div className="flex justify-center gap-4 items-center mb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
                  <input
                    type="radio"
                    name="printMode"
                    value="regular"
                    checked={printMode === 'regular'}
                    onChange={(e) => setPrintMode(e.target.value as 'regular' | '3d')}
                    className="w-4 h-4 cursor-pointer"
                  />
                  🎨 Regular Style
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
                  <input
                    type="radio"
                    name="printMode"
                    value="3d"
                    checked={printMode === '3d'}
                    onChange={(e) => setPrintMode(e.target.value as 'regular' | '3d')}
                    className="w-4 h-4 cursor-pointer"
                  />
                  🖨️ 3D Print Mode
                </label>
              </div>
            )}

            {/* 3D Model Format Selection */}
            {generatedImage && !generated3DModel && (
              <div className="flex justify-center gap-4 items-center mb-2">
                <span className="text-sm font-medium text-foreground">3D Format:</span>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
                  <input
                    type="radio"
                    name="modelFormat"
                    value="stl"
                    checked={modelFormat === 'stl'}
                    onChange={(e) => setModelFormat(e.target.value as 'stl' | 'obj')}
                    className="w-4 h-4 cursor-pointer"
                  />
                  STL (Default)
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
                  <input
                    type="radio"
                    name="modelFormat"
                    value="obj"
                    checked={modelFormat === 'obj'}
                    onChange={(e) => setModelFormat(e.target.value as 'stl' | 'obj')}
                    className="w-4 h-4 cursor-pointer"
                  />
                  OBJ
                </label>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              {/* Generate AI Image Button */}
              {!generatedImage && (
                <Button
                  onClick={generateHybridImage}
                  size="lg"
                  disabled={isGenerating}
                  className="font-bold shadow-glow"
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  {isGenerating ? 'Generating...' : `Generate ${printMode === '3d' ? '3D Print ' : ''}AI Image`}
                </Button>
              )}

              {/* Generate 3D Model Button */}
              {generatedImage && !generated3DModel && (
                <Button
                  onClick={generate3DModel}
                  size="lg"
                  disabled={isGenerating3D}
                  className="font-bold shadow-glow bg-gradient-to-r from-primary to-accent"
                >
                  <Box className="mr-2 h-5 w-5" />
                  {isGenerating3D ? 'Generating 3D...' : `Generate 3D Model (${modelFormat.toUpperCase()})`}
                </Button>
              )}

              <Button
                onClick={onRestart}
                size="lg"
                variant={generatedImage ? "secondary" : "secondary"}
                className="font-bold shadow-glow"
              >
                Retake Quiz
              </Button>
              <Button
                onClick={handleShare}
                variant="secondary"
                size="lg"
                className="font-bold"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-primary mb-3">Your Hybrid Personality</h3>
            <p className="text-foreground leading-relaxed mb-4">{hybrid.description}</p>
            
            {/* Detailed component breakdown */}
            {hybrid.componentBreakdown && hybrid.componentBreakdown.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="text-lg font-semibold text-primary">Character Composition Breakdown:</h4>
                {hybrid.componentBreakdown.map(component => {
                  const character = CHARACTERS[component.key];
                  const topTraits = Object.entries(character.weights)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 2)
                    .map(([trait]) => trait);
                  
                  return (
                    <div key={component.key} className="flex items-center gap-3 bg-background/50 rounded-lg p-3">
                      {character.image ? (
                        <img 
                          src={character.image} 
                          alt={character.name}
                          className="w-12 h-12 rounded-full border-2 border-primary object-contain bg-background"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">
                            {character.name.charAt(0)}
                          </span>
                        </div>
                      )}
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
                          Key traits: {topTraits.join(', ')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
        </div>
      </Card>
    </div>
  );
};

export default QuizResult;
