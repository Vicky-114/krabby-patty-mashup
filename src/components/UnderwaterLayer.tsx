import { useEffect, useState, useRef } from 'react';

const UnderwaterLayer = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bubblesRef = useRef<HTMLDivElement[]>([]);
  const [burstBubbles, setBurstBubbles] = useState<Array<{ id: string; x: number; y: number; particles: Array<{ angle: number; distance: number; size: number }> }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // 让靠近鼠标的气泡加速上升
      bubblesRef.current.forEach((bubble) => {
        if (!bubble) return;
        const rect = bubble.getBoundingClientRect();
        const bubbleX = rect.left + rect.width / 2;
        const bubbleY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(bubbleX - e.clientX, 2) + Math.pow(bubbleY - e.clientY, 2)
        );
        
        if (distance < 150) {
          bubble.style.animationDuration = '2s';
          bubble.style.transform = `scale(${1.2 + (150 - distance) / 150})`;
        } else {
          bubble.style.animationDuration = '';
          bubble.style.transform = '';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBubbleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();
    const bubble = bubblesRef.current[index];
    if (!bubble) return;
    
    const rect = bubble.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // 创建爆裂粒子
    const particles = Array.from({ length: 8 }, (_, i) => ({
      angle: (i * 360) / 8,
      distance: 40 + Math.random() * 30,
      size: 4 + Math.random() * 8,
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
      {/* 增加气泡数量 */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`bubble-${i}`}
          ref={(el) => {
            if (el) bubblesRef.current[i] = el;
          }}
          onClick={(e) => handleBubbleClick(e, i)}
          className="bubble-rise fixed rounded-full bg-primary/40 cursor-pointer hover:bg-primary/60 border-2 border-primary/60 shadow-lg shadow-primary/20"
          style={{
            width: `${8 + Math.random() * 20}px`,
            height: `${8 + Math.random() * 20}px`,
            left: `${Math.random() * 100}%`,
            bottom: '-50px',
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            transition: 'transform 0.3s ease, animation-duration 0.3s ease',
          }}
        />
      ))}
      
      {/* 爆裂粒子效果 */}
      {burstBubbles.map((burst) => (
        <div key={burst.id}>
          {burst.particles.map((particle, pIndex) => (
            <div
              key={`${burst.id}-particle-${pIndex}`}
              className="fixed rounded-full bg-primary/70 border border-primary/90 animate-burst-particle pointer-events-none"
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
