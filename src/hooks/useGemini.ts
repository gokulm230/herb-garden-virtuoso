import { useState, useCallback } from 'react';

// Mock data for demo purposes - replace with actual Gemini API call
const mockPlantData: Record<string, any> = {
  tulsi: {
    botanicalName: "Ocimum tenuiflorum",
    family: "Lamiaceae",
    description: "Tulsi, also known as Holy Basil, is a sacred plant in Hindu culture and a powerful adaptogenic herb with numerous medicinal properties.",
    uses: [
      "Respiratory health - helps with coughs, colds, and bronchitis",
      "Stress relief and anxiety management",
      "Immune system support",
      "Blood sugar regulation",
      "Anti-inflammatory properties",
      "Digestive health improvement"
    ],
    cultivation: "Tulsi thrives in warm, humid climates with well-drained soil. Plant seeds in spring after the last frost. Requires 6-8 hours of sunlight daily. Water regularly but avoid waterlogging. Pinch flowers to encourage leaf growth. Can be grown indoors in pots or outdoors in gardens.",
    properties: ["Adaptogenic", "Antimicrobial", "Anti-inflammatory", "Antioxidant", "Immunomodulatory"],
    precautions: "Generally safe for most people. Pregnant and breastfeeding women should consult healthcare providers. May interact with blood-thinning medications."
  },
  neem: {
    botanicalName: "Azadirachta indica",
    family: "Meliaceae",
    description: "Neem is often called the 'village pharmacy' for its extensive medicinal properties and has been used in traditional medicine for thousands of years.",
    uses: [
      "Skin conditions like acne, eczema, and psoriasis",
      "Dental health and oral hygiene",
      "Natural pesticide and insect repellent",
      "Blood purification",
      "Antifungal and antibacterial applications",
      "Diabetes management support"
    ],
    cultivation: "Neem is drought-resistant and grows well in arid and semi-arid regions. Prefers sandy, well-drained soil. Can tolerate high temperatures and low rainfall. Propagated through seeds or saplings. Requires minimal maintenance once established.",
    properties: ["Antibacterial", "Antifungal", "Antiviral", "Anti-inflammatory", "Antioxidant"],
    precautions: "Avoid during pregnancy and breastfeeding. Can be toxic in large doses. Not recommended for children under 12 years."
  },
  turmeric: {
    botanicalName: "Curcuma longa",
    family: "Zingiberaceae",
    description: "Turmeric is a golden spice with powerful anti-inflammatory and antioxidant properties, widely used in cooking and traditional medicine.",
    uses: [
      "Anti-inflammatory support for joints and muscles",
      "Digestive health and liver support",
      "Wound healing and skin health",
      "Antioxidant protection",
      "Heart health support",
      "Brain health and cognitive function"
    ],
    cultivation: "Turmeric requires warm, humid conditions with well-drained, fertile soil. Plant rhizomes during monsoon season. Needs regular watering and partial shade. Harvest after 7-10 months when leaves turn yellow.",
    properties: ["Anti-inflammatory", "Antioxidant", "Antimicrobial", "Hepatoprotective"],
    precautions: "May increase bleeding risk. Can interact with blood thinners and diabetes medications. High doses may cause stomach upset."
  }
};

interface PlantInfo {
  botanicalName: string;
  family: string;
  description: string;
  uses: string[];
  cultivation: string;
  properties: string[];
  precautions: string;
}

interface UseGeminiReturn {
  loading: boolean;
  error: string | null;
  getPlantInfo: (plantName: string) => Promise<PlantInfo | null>;
}

export const useGemini = (): UseGeminiReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPlantInfo = useCallback(async (plantName: string): Promise<PlantInfo | null> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const normalizedName = plantName.toLowerCase().trim();
      const plantData = mockPlantData[normalizedName];

      if (plantData) {
        return plantData;
      } else {
        // Return a generic response for unknown plants
        return {
          botanicalName: `${plantName} sp.`,
          family: "Unknown",
          description: `${plantName} is a medicinal plant with various traditional uses. More detailed information will be available soon through our AI assistant.`,
          uses: [
            "Traditional medicinal applications",
            "Consult healthcare professionals for specific uses",
            "More information being researched"
          ],
          cultivation: `${plantName} cultivation information will be provided by our AI assistant. Please consult agricultural experts for specific growing conditions.`,
          properties: ["Under research", "Traditional medicine"],
          precautions: "Always consult healthcare professionals before using any medicinal plant. Some plants may have contraindications."
        };
      }
    } catch (err) {
      setError('Failed to fetch plant information. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getPlantInfo };
};