import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/plant/${encodeURIComponent(query.trim())}`);
    }
  };

  const featuredPlants = ["Tulsi", "Neem", "Turmeric", "Ashwagandha", "Aloe Vera"];

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for medicinal plants... (e.g., Tulsi, Neem, Turmeric)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-primary/20 focus:border-primary shadow-natural"
          />
        </div>
        <Button 
          type="submit" 
          size="lg"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-herbal hover:shadow-glow transition-all duration-300"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Explore
        </Button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-3 text-center">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {featuredPlants.map((plant) => (
            <Button
              key={plant}
              variant="outline"
              size="sm"
              onClick={() => navigate(`/plant/${plant}`)}
              className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-200"
            >
              {plant}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;