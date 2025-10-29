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

    // Build the image generation prompt
    const prompt = `Create a unique SpongeBob SquarePants style character fusion with these specifications:

SHAPE (Body Structure & Silhouette): Based on ${shapeCharacter.name} - use their distinctive body shape, posture, and overall structural form.

COLOR (Main Color Scheme & Atmosphere): Based on ${colorCharacter.name} - apply their signature color palette, lighting mood, and tonal atmosphere.

PATTERN (Details & Textures): Based on ${patternCharacter.name} - incorporate their characteristic textures, patterns, and decorative elements.

This is "${userName}"'s unique personality hybrid. Create a cohesive, organically blended character that seamlessly merges these three elements. The character should:
- Have a clear, recognizable silhouette from ${shapeCharacter.name}
- Be colored in the style of ${colorCharacter.name}
- Feature surface details and patterns inspired by ${patternCharacter.name}
- Look like a natural, unified character design (not a collage)
- Maintain the playful, cartoon aesthetic of Bikini Bottom
- Be expressive and full of personality

Style: SpongeBob SquarePants cartoon art style, vibrant colors, clear outlines, professional character design.`;

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
