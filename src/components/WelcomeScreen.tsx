import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import bgImage from '@/assets/bg_bikini_bottom.jpg';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!name.trim()) {
      setError('请输入您的名字');
      return;
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
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      
      <Card className="relative w-full max-w-2xl p-8 md:p-12 bg-card/95 backdrop-blur-md border-primary border-4 shadow-deep">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black text-primary mb-4 pulse-glow">
            比奇堡性格测试
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            发现你的海绵宝宝混合角色！
          </h2>
          
          <p className="text-lg text-foreground/90 mb-8">
            通过AI智能问题，我们会根据你的答案创建一个独特的混合角色。
            每个人的测试题目数量都不一样，直到找到最匹配你的角色组合！
          </p>
          
          <div className="mb-8">
            <label htmlFor="name" className="block text-left text-lg font-semibold text-foreground mb-2">
              请输入你的名字：
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
              placeholder="在这里输入你的名字..."
              className="text-lg h-14 border-primary/50 focus:border-primary bg-background/80"
              maxLength={20}
            />
            {error && (
              <p className="text-destructive text-sm mt-2 text-left">{error}</p>
            )}
          </div>
          
          <Button
            onClick={handleStart}
            size="lg"
            className="text-xl font-bold px-12 py-6 h-auto shadow-glow transition-bounce hover:scale-105"
          >
            开始测试
          </Button>
          
          <div className="mt-8 text-sm text-foreground/70">
            <p>✨ AI自适应问题</p>
            <p>🎨 独特的混合角色</p>
            <p>💾 自动保存你的创作</p>
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
