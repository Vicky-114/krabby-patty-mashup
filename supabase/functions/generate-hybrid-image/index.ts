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
    const { shapeCharacter, colorCharacter, patternCharacter, userName } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build the image generation prompt for a truly fused character
    const prompt = `Create a SINGLE, UNIFIED SpongeBob SquarePants style character that is a seamless fusion of THREE characters. This is NOT a collage or overlay - it's ONE completely new character that naturally combines elements from all three.

CHARACTER FUSION BLUEPRINT for "${userName}":

🏗️ BODY STRUCTURE (${shapeCharacter.percentage}% from ${shapeCharacter.name}):
- Use ${shapeCharacter.name}'s basic body shape and proportions as the foundation
- Adopt their distinctive posture and stance
- Keep their characteristic silhouette recognizable

🎨 COLOR PALETTE (${colorCharacter.percentage}% from ${colorCharacter.name}):
- Apply ${colorCharacter.name}'s signature colors across the ENTIRE body
- Use their lighting style and color mood
- Blend their color scheme into the base shape seamlessly

✨ SURFACE DETAILS (${patternCharacter.percentage}% from ${patternCharacter.name}):
- Add ${patternCharacter.name}'s characteristic patterns and textures
- Include their distinctive accessories or decorative elements
- Integrate their unique surface features naturally

CRITICAL REQUIREMENTS:
✓ Create ONE cohesive character (NOT separate images layered together)
✓ All three elements must be organically blended into a single unified design
✓ The character should look like it naturally belongs in Bikini Bottom
✓ Maintain the classic SpongeBob cartoon art style with bold outlines
✓ Make it expressive and full of personality
✓ The result should be a believable "what if these three characters combined" design

Style: Professional SpongeBob SquarePants character design, vibrant colors, clear black outlines, playful and cartoonish.`;

    console.log('Generating hybrid image with prompt:', prompt);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      throw new Error('No image generated');
    }

    console.log('Successfully generated hybrid image');

    return new Response(
      JSON.stringify({ 
        imageUrl,
        description: `Shape from ${shapeCharacter.name}, colors from ${colorCharacter.name}, patterns from ${patternCharacter.name}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-hybrid-image function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
