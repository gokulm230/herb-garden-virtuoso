import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGemini } from "@/hooks/useGemini";
import Plant3DViewer from "@/components/plant/Plant3DViewer";
import PlantDetails from "@/components/plant/PlantDetails";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const PlantPage = () => {
  const { name } = useParams<{ name: string }>();
  const { getPlantInfo, loading, error } = useGemini();
  const [plantInfo, setPlantInfo] = useState<any>(null);
  const [modelUrl, setModelUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchPlantData = async () => {
      if (name) {
        const info = await getPlantInfo(decodeURIComponent(name));
        setPlantInfo(info);
        
        // Mock model URL for demo - in real app, this would come from your backend
        // setModelUrl(`https://your-backend.com/models/${name.toLowerCase()}.glb`);
      }
    };

    fetchPlantData();
  }, [name, getPlantInfo]);

  if (!name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Plant not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Link>
          </Button>
        </motion.div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Viewer */}
          <div className="space-y-4">
            <motion.h2 
              className="text-xl font-semibold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              3D Model
            </motion.h2>
            <Plant3DViewer 
              modelUrl={modelUrl} 
              plantName={decodeURIComponent(name)} 
            />
          </div>

          {/* Plant Details */}
          <div className="space-y-4">
            <motion.h2 
              className="text-xl font-semibold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Plant Information
            </motion.h2>
            <PlantDetails
              plantName={decodeURIComponent(name)}
              plantInfo={plantInfo || {}}
              loading={loading}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlantPage;