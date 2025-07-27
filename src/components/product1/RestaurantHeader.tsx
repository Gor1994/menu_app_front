import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RestaurantHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button> */}
        <h1 className="text-xl font-bold text-primary">Bella Vista Restaurant</h1>
      </div>
    </header>
  );
};

export default RestaurantHeader;