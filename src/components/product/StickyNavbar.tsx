import { Button } from "@/components/ui/button";
import { MenuCategory } from "@/data/menuData";
import { useEffect, useRef } from "react";

interface StickyNavbarProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const StickyNavbar = ({ categories, activeCategory, onCategoryClick }: StickyNavbarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const button = activeButtonRef.current;
      const container = scrollContainerRef.current;
      
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      
      const targetScroll = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-2 p-4 min-w-max">
          {categories.map((category) => (
            <Button
              key={category.id}
              ref={activeCategory === category.id ? activeButtonRef : null}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryClick(category.id)}
              className="whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyNavbar;