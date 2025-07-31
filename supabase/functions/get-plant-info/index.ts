import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { plantName } = await req.json()
    
    if (!plantName) {
      return new Response(
        JSON.stringify({ error: 'Plant name is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const prompt = `Please provide detailed information about the medicinal plant "${plantName}" in the following JSON format:

{
  "botanicalName": "Scientific name of the plant",
  "family": "Plant family name",
  "description": "Brief description of the plant and its significance",
  "uses": [
    "List of medicinal uses",
    "Each use should be specific and informative",
    "Include traditional and modern applications"
  ],
  "cultivation": "Detailed information about how to grow and care for this plant, including soil, climate, watering, and harvesting requirements",
  "properties": [
    "List of therapeutic properties",
    "Active compounds if known",
    "Pharmacological actions"
  ],
  "precautions": "Important safety information, contraindications, and precautions for use"
}

Please ensure the response is accurate, informative, and formatted as valid JSON. If the plant is not well-known or if you're unsure about any information, please indicate this clearly in the relevant fields.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API')
    }

    const generatedText = data.candidates[0].content.parts[0].text
    
    // Try to parse the JSON response
    let plantInfo
    try {
      // Extract JSON from the response (sometimes Gemini adds extra text)
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        plantInfo = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      // If parsing fails, return a structured fallback
      plantInfo = {
        botanicalName: `${plantName} sp.`,
        family: "Information not available",
        description: generatedText.substring(0, 200) + "...",
        uses: ["Please consult healthcare professionals for medicinal uses"],
        cultivation: "Cultivation information not available in structured format",
        properties: ["Information being processed"],
        precautions: "Always consult healthcare professionals before using any medicinal plant"
      }
    }

    return new Response(
      JSON.stringify(plantInfo),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in get-plant-info function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to get plant information',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})