const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Plant info endpoint - converted from Supabase Edge Function
app.post("/functions/v1/get-plant-info", async (req, res) => {
  try {
    const { plantName } = req.body;

    if (!plantName) {
      return res.status(400).json({
        error: "Plant name is required",
      });
    }

    const geminiApiKey = "AIzaSyCpXnqbXTFuKL7w0hvsxZ7X_QoNtFCx2V8";

    // Create a fallback response in case API fails
    const createFallbackResponse = (name) => ({
      botanicalName: `${name} sp.`,
      family: "Plant family information",
      description: `${name} is a medicinal plant with various traditional uses. For accurate information, please consult botanical references or healthcare professionals.`,
      uses: [
        "Traditional medicinal uses",
        "Please consult healthcare professionals for specific applications",
        "Used in traditional medicine systems",
      ],
      cultivation: `${name} cultivation requires specific soil, climate, and care conditions. Please consult agricultural or botanical guides for detailed growing instructions.`,
      properties: [
        "Various therapeutic compounds",
        "Active ingredients vary by species",
        "Please consult scientific literature for detailed phytochemistry",
      ],
      precautions:
        "Always consult healthcare professionals before using any medicinal plant. Individual reactions may vary.",
    });

    // Try Gemini API first
    if (geminiApiKey) {
      try {
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

Please ensure the response is accurate, informative, and formatted as valid JSON. If the plant is not well-known or if you're unsure about any information, please indicate this clearly in the relevant fields.`;

        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              topK: 32,
              topP: 1,
              maxOutputTokens: 2048,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000, // 10 second timeout
          }
        );

        if (
          !response.data.candidates ||
          !response.data.candidates[0] ||
          !response.data.candidates[0].content
        ) {
          throw new Error("Invalid response from Gemini API");
        }

        const generatedText = response.data.candidates[0].content.parts[0].text;

        // Try to parse the JSON response
        let plantInfo;
        try {
          // Extract JSON from the response (sometimes Gemini adds extra text)
          const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            plantInfo = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error("No JSON found in response");
          }
        } catch (parseError) {
          console.warn("Failed to parse Gemini response, using fallback");
          plantInfo = createFallbackResponse(plantName);
        }

        res.json(plantInfo);
      } catch (apiError) {
        console.warn("Gemini API failed, using fallback:", apiError.message);
        // Use fallback response if API fails
        res.json(createFallbackResponse(plantName));
      }
    } else {
      // No API key, use fallback
      res.json(createFallbackResponse(plantName));
    }
  } catch (error) {
    console.error("Error in get-plant-info endpoint:", error);

    res.status(500).json({
      error: "Failed to get plant information",
      details: error.message,
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

