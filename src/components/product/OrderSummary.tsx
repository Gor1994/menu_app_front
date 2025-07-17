import { Button } from "@/components/ui/button";

const OrderSummary = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-40">
      {/* <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="font-medium">Your Order</p>
          <p className="text-sm text-muted-foreground">0 items</p>
        </div>
        <Button variant="hero" size="lg">
          View Cart • $0.00
        </Button>
      </div> */}
    </div>
  );
};

export default OrderSummary;