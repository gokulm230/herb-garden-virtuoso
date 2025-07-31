import { motion } from "framer-motion";
import { Bookmark, Share2, Leaf, Sprout, Heart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface PlantInfo {
  botanicalName?: string;
  family?: string;
  uses?: string[];
  cultivation?: string;
  properties?: string[];
  precautions?: string;
  description?: string;
}

interface PlantDetailsProps {
  plantName: string;
  plantInfo: PlantInfo;
  loading?: boolean;
}

const PlantDetails = ({ plantName, plantInfo, loading }: PlantDetailsProps) => {
  const { toast } = useToast();

  const handleBookmark = () => {
    // Save to localStorage
    const bookmarks = JSON.parse(localStorage.getItem('herbal-bookmarks') || '[]');
    const newBookmark = { name: plantName, timestamp: Date.now() };
    const updatedBookmarks = [newBookmark, ...bookmarks.filter((b: any) => b.name !== plantName)];
    localStorage.setItem('herbal-bookmarks', JSON.stringify(updatedBookmarks));
    
    toast({
      title: "Bookmarked!",
      description: `${plantName} has been saved to your collection.`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${plantName} - Virtual Herbal Garden`,
          text: `Learn about ${plantName} and its medicinal properties`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Share link has been copied to clipboard.",
        });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="h-24 bg-muted rounded animate-pulse" />
        <div className="h-32 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{plantName}</h1>
            {plantInfo.botanicalName && (
              <p className="text-lg text-muted-foreground italic">
                {plantInfo.botanicalName}
              </p>
            )}
            {plantInfo.family && (
              <Badge variant="outline" className="mt-2">
                Family: {plantInfo.family}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleBookmark}>
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {plantInfo.description && (
          <p className="text-muted-foreground leading-relaxed">
            {plantInfo.description}
          </p>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="uses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="uses" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Uses
          </TabsTrigger>
          <TabsTrigger value="cultivation" className="flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            Growing
          </TabsTrigger>
          <TabsTrigger value="properties" className="flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            Properties
          </TabsTrigger>
        </TabsList>

        <TabsContent value="uses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Medicinal Uses
              </CardTitle>
              <CardDescription>
                Traditional and modern applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {plantInfo.uses && plantInfo.uses.length > 0 ? (
                <ul className="space-y-2">
                  {plantInfo.uses.map((use, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  Medicinal uses information will be loaded from our AI assistant...
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cultivation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-primary" />
                Growing Guide
              </CardTitle>
              <CardDescription>
                How to cultivate and care for this plant
              </CardDescription>
            </CardHeader>
            <CardContent>
              {plantInfo.cultivation ? (
                <p className="leading-relaxed">{plantInfo.cultivation}</p>
              ) : (
                <p className="text-muted-foreground">
                  Cultivation information will be loaded from our AI assistant...
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Properties & Compounds
              </CardTitle>
              <CardDescription>
                Active compounds and therapeutic properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              {plantInfo.properties && plantInfo.properties.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {plantInfo.properties.map((property, index) => (
                    <Badge key={index} variant="secondary">
                      {property}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Properties information will be loaded from our AI assistant...
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Precautions */}
      {plantInfo.precautions && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <AlertCircle className="w-5 h-5" />
              Important Precautions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 dark:text-orange-300">
              {plantInfo.precautions}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default PlantDetails;