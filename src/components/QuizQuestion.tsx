import { QuizQuestion as QuizQuestionType } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (label: string, traits: Record<string, number>) => void;
  questionNumber: number;
}

const QuizQuestion = ({ question, onAnswer, questionNumber }: QuizQuestionProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <Card className="w-full max-w-4xl p-6 md:p-8 bg-card/90 backdrop-blur-sm border-primary/50 shadow-deep">
        <div className="mb-6">
          <span className="text-sm text-primary font-semibold">Question {questionNumber}</span>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-foreground">
          {question.text}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option.label, option.traits)}
              variant="default"
              size="lg"
              className="h-auto py-6 text-lg md:text-xl font-semibold transition-bounce hover:scale-105 shadow-glow"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </Card>
      
      {/* Decorative bubbles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bubble-rise fixed w-4 h-4 rounded-full bg-primary/20 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-50px',
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default QuizQuestion;
