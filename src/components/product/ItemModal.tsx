import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";
import { MenuItem } from "@/data/menuData";
import { useState } from "react";

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ItemModal = ({ item, isOpen, onClose }: ItemModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm h-4 w-4"
            onClick={onClose}
          >
            {/* <X className="h-4 w-4" /> */}
          </Button>
        </div>
        
        <div className="p-6 space-y-4">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <DialogTitle className="text-xl font-semibold">{item.name}</DialogTitle>
              <Badge variant="secondary" className="text-lg font-semibold">
                {item.price}
              </Badge>
            </div>
          </DialogHeader>

          <p className="text-muted-foreground">{item.description}</p>

          {item.ingredients && (
            <div className="space-y-2">
              <h4 className="font-medium">Ingredients</h4>
              <p className="text-sm text-muted-foreground">{item.ingredients}</p>
            </div>
          )}

          {item.calories && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Calories:</span>
              <Badge variant="outline">{item.calories} cal</Badge>
            </div>
          )}

          {/* <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium text-lg min-w-[2rem] text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button className="flex-1 ml-4" variant="hero">
              Add to Order
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;