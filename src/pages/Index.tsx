import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { QuizQuestion as QuizQuestionType, Answer, TraitScores, HybridCharacter } from '@/types/quiz';
import { computeMatch, createHybridCharacter, saveHybrid, loadHybrids } from '@/utils/quizLogic';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';
import FloatingHybrid from '@/components/FloatingHybrid';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestionType | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [traitScores, setTraitScores] = useState<TraitScores>({});
  const [isLoading, setIsLoading] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [currentHybrid, setCurrentHybrid] = useState<HybridCharacter | null>(null);
  const [floatingHybrids, setFloatingHybrids] = useState<HybridCharacter[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved hybrids on mount
    const saved = loadHybrids();
    setFloatingHybrids(saved);
    
    // Start quiz with AI-generated question
    generateQuestion('initial');
  }, []);

  const generateQuestion = async (type: 'initial' | 'adaptive') => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-quiz-question', {
        body: {
          type,
          previousAnswers: type === 'adaptive' ? answers : undefined,
        },
      });

      if (error) throw error;

      setCurrentQuestion({
        id: `q${questionNumber}`,
        text: data.question,
        options: data.options,
      });
    } catch (error) {
      console.error('Error generating question:', error);
      toast({
        title: "Error",
        description: "Failed to generate question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (label: string, traits: TraitScores) => {
    if (!currentQuestion) return;

    // Record answer
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      answerLabel: label,
      traits,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // Update trait scores
    const newTraitScores = { ...traitScores };
    for (const [trait, score] of Object.entries(traits)) {
      newTraitScores[trait] = (newTraitScores[trait] || 0) + score;
    }
    setTraitScores(newTraitScores);

    // Check if we should end the quiz
    const matchResult = computeMatch(newTraitScores);
    
    if (questionNumber >= 3 || matchResult.topMatch.confidence >= 0.8) {
      // Create hybrid character
      const hybrid = createHybridCharacter(newTraitScores, newAnswers);
      setCurrentHybrid(hybrid);
      
      // Save to localStorage
      saveHybrid(hybrid);
      
      // Add to floating hybrids
      setFloatingHybrids(prev => [...prev, hybrid]);
      
      setQuizComplete(true);
    } else {
      // Generate next question (adaptive)
      setQuestionNumber(prev => prev + 1);
      generateQuestion('adaptive');
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(null);
    setQuestionNumber(1);
    setAnswers([]);
    setTraitScores({});
    setQuizComplete(false);
    setCurrentHybrid(null);
    generateQuestion('initial');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Floating hybrids in background */}
      {floatingHybrids.map((hybrid, index) => (
        <FloatingHybrid key={hybrid.id} hybrid={hybrid} index={index} />
      ))}

      {/* Quiz content */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="w-16 h-16 animate-spin text-primary mb-4" />
          <p className="text-xl text-foreground">Generating your question...</p>
        </div>
      )}

      {!isLoading && !quizComplete && currentQuestion && (
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          questionNumber={questionNumber}
        />
      )}

      {quizComplete && currentHybrid && (
        <QuizResult
          hybrid={currentHybrid}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
