import { useEffect, useState, useRef } from 'react';

const UnderwaterLayer = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bubblesRef = useRef<HTMLDivElement[]>([]);

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

  return (
    <div className="underwater-layer">
      {/* 增加气泡数量 */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`bubble-${i}`}
          ref={(el) => {
            if (el) bubblesRef.current[i] = el;
          }}
          className="bubble-rise fixed rounded-full bg-primary/40 pointer-events-none border-2 border-primary/60 shadow-lg shadow-primary/20"
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
    </div>
  );
};

export default UnderwaterLayer;
