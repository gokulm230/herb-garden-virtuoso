import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, Heart, Brain, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const VirtualTour = () => {
  const collections = [
    {
      title: "Immunity Boosters",
      description: "Plants that strengthen your immune system",
      icon: Shield,
      plants: ["Tulsi", "Neem", "Turmeric", "Ginger"],
      color: "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    },
    {
      title: "Digestive Health",
      description: "Traditional remedies for digestive wellness",
      icon: Leaf,
      plants: ["Mint", "Fennel", "Ginger", "Ajwain"],
      color: "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    },
    {
      title: "Stress Relief",
      description: "Natural adaptogens for mental wellness",
      icon: Brain,
      plants: ["Ashwagandha", "Brahmi", "Jatamansi", "Tulsi"],
      color: "bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
    },
    {
      title: "Skin & Beauty",
      description: "Plants for natural skincare and beauty",
      icon: Heart,
      plants: ["Aloe Vera", "Neem", "Turmeric", "Rose"],
      color: "bg-pink-100 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Virtual Herbal Garden Tour
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore curated collections of medicinal plants organized by their therapeutic benefits
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full ${collection.color} hover:shadow-elevated transition-all duration-300 cursor-pointer group`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <collection.icon className="w-6 h-6 text-primary" />
                    {collection.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {collection.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Featured Plants:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {collection.plants.map((plant) => (
                        <Button
                          key={plant}
                          variant="outline"
                          size="sm"
                          asChild
                          className="justify-start group-hover:border-primary/50 transition-colors"
                        >
                          <Link to={`/plant/${plant}`}>
                            <Leaf className="w-3 h-3 mr-2" />
                            {plant}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16 p-8 bg-gradient-herbal rounded-lg text-primary-foreground"
        >
          <h2 className="text-2xl font-bold mb-4">
            Discover More Plants
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-md mx-auto">
            Can't find what you're looking for? Search our comprehensive database of medicinal plants.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/">
              Start Exploring
            </Link>
          </Button>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VirtualTour;