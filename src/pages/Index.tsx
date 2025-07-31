import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search/SearchBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-nature">
      <Navbar />
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Plant Knowledge
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Virtual
            <span className="text-primary"> Herbal Garden</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Explore the world of medicinal plants with interactive 3D models and AI-generated insights. 
            Discover traditional uses, cultivation methods, and therapeutic properties.
          </p>
          
          <div className="mb-12">
            <SearchBar />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="bg-gradient-herbal hover:shadow-glow">
              <Link to="/virtual-tour">
                <BookOpen className="w-5 h-5 mr-2" />
                Virtual Tour
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            {
              title: "3D Plant Models",
              description: "Interact with detailed 3D representations of medicinal plants",
              icon: "🌿"
            },
            {
              title: "AI-Generated Info",
              description: "Get comprehensive plant information powered by advanced AI",
              icon: "🧠"
            },
            {
              title: "Traditional Knowledge",
              description: "Learn about time-tested uses and cultivation methods",
              icon: "📚"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 bg-card rounded-lg shadow-natural hover:shadow-elevated transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
