import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

// SpongeBob-style Hawaiian steel guitar / ukulele background music
const MUSIC_URL = 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio playback failed:', error);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleMusic}
        variant="secondary"
        size="icon"
        className={`
          w-12 h-12 rounded-full shadow-glow backdrop-blur-sm bg-card/80
          ${isPlaying ? 'animate-pulse' : ''}
          ${!hasInteracted ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
        `}
        title={isPlaying ? '静音' : '播放音乐'}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </Button>
      
      {/* First-time hint */}
      {!hasInteracted && (
        <div className="absolute bottom-full right-0 mb-2 bg-card text-card-foreground px-3 py-2 rounded-lg shadow-deep border-2 border-primary text-sm whitespace-nowrap animate-bounce">
          🎵 点击播放音乐
        </div>
      )}
    </div>
  );
};

export default BackgroundMusic;
