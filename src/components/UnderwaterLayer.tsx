import { useEffect, useState } from 'react';

const UnderwaterLayer = () => {
  const [lightRays] = useState(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: `${i * 20 + 10}%`,
      delay: `${i * 1.5}s`,
    }))
  );

  return (
    <div className="underwater-layer">
      {/* Light rays from surface */}
      {lightRays.map((ray) => (
        <div
          key={ray.id}
          className="light-ray"
          style={{
            left: ray.left,
            animationDelay: ray.delay,
          }}
        />
      ))}

      {/* Extra floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="bubble-rise fixed w-2 h-2 rounded-full bg-primary/10 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-50px',
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default UnderwaterLayer;
