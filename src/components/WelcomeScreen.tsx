import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import bgImage from '@/assets/bg_bikini_bottom.jpg';
import UnderwaterLayer from './UnderwaterLayer';
import { useRipple } from '@/hooks/useRipple';
import { useTranslation } from 'react-i18next';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { createRipple } = useRipple();
  const { t } = useTranslation();

  const handleStart = () => {
    if (!name.trim()) {
      setError(t('welcome.inputError'));
      return;
    }
    // Attempt to play music when user clicks Start to bypass browser autoplay restrictions
    if ((window as any).playBackgroundMusic) {
      (window as any).playBackgroundMusic();
    }
    onStart(name.trim());
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <UnderwaterLayer />
      
      <Card className="relative w-full max-w-2xl p-8 md:p-12 bg-card/95 border-interactive shadow-deep underwater-sway" style={{ zIndex: 10 }}>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black text-primary mb-4 pulse-glow">
            {t('welcome.title')}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            {t('welcome.subtitle')}
          </h2>
          
          <p className="text-lg text-foreground/90 mb-8">
            {t('welcome.description')}
          </p>
          
          <div className="mb-8">
            <label htmlFor="name" className="block text-left text-lg font-semibold text-foreground mb-2">
              {t('welcome.inputLabel')}
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              placeholder={t('welcome.inputPlaceholder')}
              className="text-lg h-14 border-primary/50 focus:border-primary bg-background/80"
              maxLength={20}
            />
            {error && (
              <p className="text-destructive text-sm mt-2 text-left">{error}</p>
            )}
          </div>
          
          <Button
            onClick={(e) => {
              createRipple(e);
              handleStart();
            }}
            size="lg"
            className="ripple-container text-xl font-bold px-12 py-6 h-auto shadow-glow transition-bounce hover:scale-105"
          >
            {t('welcome.startButton')}
          </Button>
          
          <div className="mt-8 text-sm text-foreground/70">
            <p>{t('welcome.feature1')}</p>
            <p>{t('welcome.feature2')}</p>
            <p>{t('welcome.feature3')}</p>
          </div>
        </div>
      </Card>
      
      {/* Decorative bubbles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bubble-rise fixed w-4 h-4 rounded-full bg-primary/20 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-50px',
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
};

export default WelcomeScreen;
