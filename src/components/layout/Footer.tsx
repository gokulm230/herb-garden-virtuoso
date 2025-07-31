import { Leaf, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-semibold text-foreground">Virtual Herbal Garden</span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-current" />
            <span>for nature enthusiasts</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>Powered by AI • Educational purposes only • Consult healthcare professionals for medical advice</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;