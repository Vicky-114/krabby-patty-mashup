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
    const { shapeCharacter, colorCharacter, patternCharacter, userName, printMode } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build the image generation prompt for a truly fused character
    const base3DRequirements = printMode === '3d' ? `

🖨️ 3D PRINTING SPECIFICATIONS:
- Design with SOLID, PRINTABLE geometry (no floating parts)
- Use SIMPLE, CHUNKY shapes that can be 3D printed easily
- Ensure all parts are CONNECTED and structurally sound
- Add a FLAT BASE for stability when printed
- Avoid thin, delicate features that might break
- Design should work as a SINGLE PIECE 3D model
- Think about wall thickness (minimum 2mm for small details)
- Include clear separation between body parts for painting
- Style should be SIMPLIFIED but recognizable

COLOR MODE: Design in grayscale/single-tone suitable for painting after printing. Focus on FORM and STRUCTURE rather than complex colors.` : `

COLOR MODE: Use vibrant SpongeBob colors with bold outlines, full cartoon color palette.`;

    const prompt = `Create a COMPLETELY NEW SpongeBob SquarePants style character named "${userName}". This is a UNIQUE, ORIGINAL character inspired by a fusion of character elements, but should NOT look like any specific existing character.

🎯 PRIMARY CHARACTER FOUNDATION (${shapeCharacter.percentage}% - ${shapeCharacter.name}):
As the DOMINANT influence, use ${shapeCharacter.name}'s essence to define:
- Overall personality vibe and body language (60-70% of the design)
- General proportions and build
- Facial expression style and mood
- Core character energy and attitude

🌊 SUBTLE INFLUENCES TO BLEND IN:
- ${colorCharacter.percentage}% from ${colorCharacter.name}: Gently incorporate some color tones or lighting style, but adapt them into something new
- ${patternCharacter.percentage}% from ${patternCharacter.name}: Add hints of texture or small detail elements, but transform them into unique features
${base3DRequirements}

⚠️ CRITICAL DESIGN RULES - FOLLOW STRICTLY:
✓ This is a BRAND NEW CHARACTER - not a mix of recognizable parts
✓ DO NOT use any character's signature features (no SpongeBob's square pants, no Patrick's star shape, no Squidward's tentacles, etc.)
✓ Create an ORIGINAL design that captures the personality essence but looks completely different
✓ The character should be UNRECOGNIZABLE as any specific character - it's a new Bikini Bottom resident
✓ Avoid obvious accessories or clothing that would identify the source characters
✓ Use the percentages as INSPIRATION WEIGHTS, not as assembly instructions
✓ Make it look like a character that could naturally exist in SpongeBob's universe but is entirely new
✓ Focus on creating a cohesive, original personality rather than combining recognizable features

DESIGN APPROACH:
Imagine designing a new character for the show who has a similar personality energy to ${shapeCharacter.name}, with subtle nods to the other characters' vibes. The result should be so original that viewers would say "Who's that new character?" not "Oh that's X mixed with Y".

Style: Professional SpongeBob SquarePants character design${printMode === '3d' ? ', optimized for 3D printing with solid geometry' : ', vibrant colors, clear black outlines, playful and cartoonish'}. The character should feel authentic to the SpongeBob universe but be completely original and fresh.`;

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
