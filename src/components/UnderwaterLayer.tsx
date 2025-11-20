import { useState, useRef, useCallback } from 'react';

const UnderwaterLayer = () => {
  const bubblesRef = useRef<HTMLDivElement[]>([]);
  const [burstBubbles, setBurstBubbles] = useState<Array<{ id: string; x: number; y: number; particles: Array<{ angle: number; distance: number; size: number }> }>>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  // 创建气泡爆破音效
  const playBubblePopSound = useCallback((bubbleSize: number) => {
    try {
      // 懒加载 AudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // 根据气泡大小调整音调和音量
      const frequency = bubbleSize < 20 ? 800 : bubbleSize < 30 ? 600 : 400;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // 设置音效参数
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        frequency * 0.5,
        audioContext.currentTime + 0.1
      );
      
      // 音量包络：快速上升，快速下降
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      // 使用正弦波产生柔和的音效
      oscillator.type = 'sine';
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      console.log('Audio playback not supported:', error);
    }
  }, []);

  const handleBubbleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();
    const bubble = bubblesRef.current[index];
    if (!bubble) return;
    
    const rect = bubble.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const bubbleSize = rect.width;
    
    // 播放音效
    playBubblePopSound(bubbleSize);
    
    // 根据气泡大小调整粒子数量：小气泡6个，中气泡10个，大气泡14个
    const particleCount = bubbleSize < 20 ? 6 : bubbleSize < 30 ? 10 : 14;
    
    // 根据气泡大小调整扩散距离和粒子大小
    const baseDistance = bubbleSize < 20 ? 30 : bubbleSize < 30 ? 50 : 70;
    const particleBaseSize = bubbleSize < 20 ? 3 : bubbleSize < 30 ? 4 : 6;
    
    // 创建爆裂粒子
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      angle: (i * 360) / particleCount,
      distance: baseDistance + Math.random() * (baseDistance * 0.5),
      size: particleBaseSize + Math.random() * (particleBaseSize * 0.8),
    }));
    
    const burstId = `burst-${Date.now()}-${index}`;
    setBurstBubbles(prev => [...prev, { id: burstId, x, y, particles }]);
    
    // 隐藏被点击的气泡
    bubble.style.opacity = '0';
    
    // 清理爆裂效果和恢复气泡
    setTimeout(() => {
      setBurstBubbles(prev => prev.filter(b => b.id !== burstId));
      bubble.style.opacity = '';
    }, 1000);
  };

  return (
    <div className="underwater-layer">
      {/* 水波纹扰动层 */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, hsla(190 100% 70% / 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsla(190 80% 60% / 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, hsla(200 90% 65% / 0.02) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%, 250% 250%, 300% 300%',
          animation: 'water-wave 15s ease-in-out infinite, water-ripple 8s ease-in-out infinite',
        }}
      />
      
      {/* 增加气泡数量并优化大小分布 */}
      {[...Array(50)].map((_, i) => {
        // 50% 小气泡, 30% 中气泡, 20% 大气泡
        const rand = Math.random();
        let size;
        if (rand < 0.5) {
          size = 6 + Math.random() * 10; // 小气泡 6-16px
        } else if (rand < 0.8) {
          size = 16 + Math.random() * 12; // 中气泡 16-28px
        } else {
          size = 28 + Math.random() * 18; // 大气泡 28-46px
        }
        
        return (
          <div
            key={`bubble-${i}`}
            ref={(el) => {
              if (el) bubblesRef.current[i] = el;
            }}
            onClick={(e) => handleBubbleClick(e, i)}
            className="bubble-rise fixed rounded-full bg-bubble-blue/40 cursor-pointer hover:bg-bubble-glow/60 border-2 border-bubble-glow/50 animate-bubble-shimmer transition-all duration-300 pointer-events-auto"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 8}s`, // 8-16秒，更多变化
            }}
          />
        );
      })}
      
      {/* 爆裂粒子效果 */}
      {burstBubbles.map((burst) => (
        <div key={burst.id}>
          {burst.particles.map((particle, pIndex) => (
            <div
              key={`${burst.id}-particle-${pIndex}`}
              className="fixed rounded-full bg-bubble-glow/60 border-2 border-bubble-blue/70 animate-burst-particle pointer-events-none"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${burst.x}px`,
                top: `${burst.y}px`,
                '--burst-angle': `${particle.angle}deg`,
                '--burst-distance': `${particle.distance}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default UnderwaterLayer;
