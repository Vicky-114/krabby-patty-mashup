import { useState, useRef } from 'react';

const UnderwaterLayer = () => {
  const bubblesRef = useRef<HTMLDivElement[]>([]);
  const [burstBubbles, setBurstBubbles] = useState<Array<{ id: string; x: number; y: number; particles: Array<{ angle: number; distance: number; size: number }> }>>([]);

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
      {/* 增加气泡数量并优化大小分布 */}
      {[...Array(50)].map((_, i) => {
        // 80% 小气泡, 15% 中气泡, 5% 大气泡
        const rand = Math.random();
        let size;
        if (rand < 0.8) {
          size = 4 + Math.random() * 8; // 小气泡 4-12px
        } else if (rand < 0.95) {
          size = 12 + Math.random() * 10; // 中气泡 12-22px
        } else {
          size = 22 + Math.random() * 12; // 大气泡 22-34px
        }
        
        return (
          <div
            key={`bubble-${i}`}
            ref={(el) => {
              if (el) bubblesRef.current[i] = el;
            }}
            onClick={(e) => handleBubbleClick(e, i)}
            className="bubble-rise fixed rounded-full bg-primary/15 cursor-pointer hover:bg-primary/25 border border-primary/30"
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
              className="fixed rounded-full bg-primary/30 border border-primary/40 animate-burst-particle pointer-events-none"
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
