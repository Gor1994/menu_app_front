import { Card, CardContent } from "@/components/ui/card";
import { SubCategory } from "@/data/menuData";
import { useTranslation } from "react-i18next";

interface SubCategoryCardProps {
  subcategory: SubCategory;
  onClick: () => void;
}

const SubCategoryCard = ({ subcategory, onClick }: SubCategoryCardProps) => {
  const { t, i18n } = useTranslation();
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      onClick={onClick}
    >
      {subcategory.image && (
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
          <img 
            src={subcategory.image} 
            alt={subcategory.names[i18n.language.toUpperCase()]}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-4">
        <h4 className="font-semibold">{subcategory.names[i18n.language.toUpperCase()]}</h4>
        <p className="text-sm text-muted-foreground mt-1">
          {subcategory.items.length} {t('items')}
        </p>
      </CardContent>
    </Card>
  );
};

export default SubCategoryCard;