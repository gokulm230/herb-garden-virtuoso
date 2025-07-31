import { useState, useCallback } from 'react';

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
      const response = await fetch('/functions/v1/get-plant-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plantName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch plant information';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, getPlantInfo };
};