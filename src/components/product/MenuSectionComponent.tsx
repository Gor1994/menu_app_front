import { MenuSection } from "@/data/menuData";
import MenuItemCard from "./MenuItemCard";

interface MenuSectionProps {
  section: MenuSection;
}

const MenuSectionComponent = ({ section }: MenuSectionProps) => {
  return (
    <section id={section.id} className="scroll-mt-32">
      <h2 className="text-3xl font-bold mb-8">{section.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MenuSectionComponent;