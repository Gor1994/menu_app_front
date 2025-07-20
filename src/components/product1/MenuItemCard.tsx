import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/data/menuData";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover-scale">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <Badge variant="secondary" className="text-base font-semibold">
            {item.price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4">{item.description}</p>
        {/* <Button className="w-full" variant="hero">
          Add to Order
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;