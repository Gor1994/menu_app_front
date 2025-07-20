import { Card, CardContent } from "@/components/ui/card";
import { MenuCategory } from "@/data/menuData";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  category: MenuCategory;
  isExpanded: boolean;
  onClick: () => void;
}

const CategoryCard = ({ category, isExpanded, onClick }: CategoryCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isExpanded ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{category.name}</h3>
          <ChevronRight 
            className={`h-5 w-5 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`} 
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {category.subcategories 
            ? `${category.subcategories.length} categories` 
            : `${category.items?.length || 0} items`
          }
        </p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;