
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-2xl px-4 py-8 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">Archival Research Portal</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Explore historical collections and access detailed finding aids for archival research
        </p>
        <Link to="/finding-aid">
          <Button size="lg" className="px-8 py-6 text-lg">
            View Finding Aid
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
