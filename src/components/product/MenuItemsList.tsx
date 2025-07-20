import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/data/menuData";

interface MenuItemsListProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

const MenuItemsList = ({ items, onItemClick }: MenuItemsListProps) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card 
          key={item.id}
          className="cursor-pointer transition-all duration-300 hover:shadow-lg"
          onClick={() => onItemClick(item)}
        >
          <CardContent className="p-0">
            <div className="flex">
              <div className="w-20 h-20 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
              <div className="flex-1 p-4 flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {item.description}
                  </p>
                  {item.calories && (
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {item.calories} cal
                    </span>
                  )}
                </div>
                <Badge variant="secondary" className="ml-3 flex-shrink-0">
                  {item.price}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuItemsList;