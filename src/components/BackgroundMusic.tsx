import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslation } from 'react-i18next';

const MUSIC_URL = `${import.meta.env.BASE_URL}music/Bubble Library Drift-2.mp3`;

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [volume, setVolume] = useState([0.3]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Expose play function to window for integration with other components
  useEffect(() => {
    (window as any).playBackgroundMusic = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    };
    return () => { delete (window as any).playBackgroundMusic; };
  }, []);
  const { t } = useTranslation();

  useEffect(() => {
    // Initialize audio
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = volume[0];
    audioRef.current = audio;

    // Attempt auto-play
    const playAttempt = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Auto-play blocked by browser. Music will start on user interaction.', err);
        setIsPlaying(false);
      });
    };

    // Try playing on mount
    playAttempt();

    // Also try playing on the first interaction if blocked
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        playAttempt();
        removeInteractionListeners();
      }
    };

    const interactionEvents = ['click', 'touchstart', 'keydown', 'wheel'];
    
    const addInteractionListeners = () => {
      interactionEvents.forEach(event => {
        document.addEventListener(event, handleInteraction);
      });
    };

    const removeInteractionListeners = () => {
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };

    addInteractionListeners();

    return () => {
      audio.pause();
      audioRef.current = null;
      removeInteractionListeners();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0];
    }
  }, [volume]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex items-center gap-2">
      <Popover onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className={`
              w-12 h-12 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center
              ${isPlaying && !isPopoverOpen ? 'animate-pulse' : ''}
              ${isPopoverOpen 
                ? 'bg-card border-primary/60 ring-0 stable-control' 
                : 'bg-card/80 backdrop-blur-sm border-primary/20 shadow-glow hover:scale-105 active:scale-95'
              }
            `}
            title={t('music.toggle')}
          >
            {isPlaying ? (
              <Volume2 className="h-5 w-5 text-primary" />
            ) : (
              <VolumeX className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          side="left" 
          align="center" 
          className="w-48 bg-card border-2 border-primary/20 shadow-deep p-4 mb-2"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary uppercase flex items-center gap-1">
                <Music className="h-3 w-3" />
                {t('music.volume')}
              </span>
              <span className="text-xs font-mono">{Math.round(volume[0] * 100)}%</span>
            </div>
            <Slider
              value={volume}
              max={1}
              step={0.01}
              onValueChange={(val) => setVolume(val)}
              className="cursor-pointer"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMusic}
              className="w-full text-xs font-bold mt-1 hover:bg-primary/10"
            >
              {isPlaying ? t('common.pause') : t('common.play')}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BackgroundMusic;
