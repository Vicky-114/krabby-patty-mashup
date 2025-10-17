import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, previousAnswers } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'initial') {
      systemPrompt = `You are a SpongeBob personality quiz expert. Generate ONE creative personality question that helps identify which SpongeBob character someone is most like. 

The question should be engaging, fun, and reveal personality traits like: playful, optimistic, loyal, industrious, relaxed, artistic, serious, cynical, brave, logical, cautious, ambitious, cunning, social, etc.

Return ONLY a JSON object with this exact structure:
{
  "question": "Your question here?",
  "options": [
    {"label": "Option 1", "traits": {"trait1": 2, "trait2": 1}},
    {"label": "Option 2", "traits": {"trait3": 2, "trait4": 1}},
    {"label": "Option 3", "traits": {"trait5": 2, "trait6": 1}},
    {"label": "Option 4", "traits": {"trait7": 2, "trait8": 1}}
  ]
}`;
      userPrompt = 'Generate a creative personality question for a SpongeBob quiz.';
    } else if (type === 'adaptive' && previousAnswers) {
      const traitsFromPreviousAnswers = previousAnswers.map((a: any) => a.traits).flat();
      systemPrompt = `You are generating adaptive follow-up questions for a SpongeBob personality quiz. Based on the user's previous answers, create a question that has ~80% overlap with traits they've already shown, plus 20% new traits to explore.

Previous answers and their traits: ${JSON.stringify(previousAnswers)}

Create a question that builds on these patterns while exploring slightly new territory. Return ONLY a JSON object with this structure:
{
  "question": "Your adaptive question here?",
  "options": [
    {"label": "Option 1", "traits": {"trait1": 2, "trait2": 1}},
    {"label": "Option 2", "traits": {"trait3": 2, "trait4": 1}},
    {"label": "Option 3", "traits": {"trait5": 2, "trait6": 1}},
    {"label": "Option 4", "traits": {"trait7": 2, "trait8": 1}}
  ]
}`;
      userPrompt = 'Generate an adaptive follow-up question that matches the user\'s personality pattern.';
    }

    console.log('Calling AI with type:', type);
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('AI response:', content);
    
    // Parse the JSON from the response
    const questionData = JSON.parse(content);

    return new Response(JSON.stringify(questionData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-quiz-question:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
