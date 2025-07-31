import { Link } from "react-router-dom";
import { Leaf, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <Leaf className="w-8 h-8" />
            <span>Herbal Garden</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/virtual-tour" className="text-foreground hover:text-primary transition-colors">
              Virtual Tour
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex">
              <Link to="/virtual-tour">
                <BookOpen className="w-4 h-4 mr-2" />
                Explore
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;