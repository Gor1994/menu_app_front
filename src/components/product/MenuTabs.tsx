import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuSection } from "@/data/menuData";

interface MenuTabsProps {
  sections: MenuSection[];
  activeTab: string;
  onTabChange: (value: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

const MenuTabs = ({ sections, activeTab, onTabChange, onScrollToSection }: MenuTabsProps) => {
  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-14">
            {sections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                onClick={() => onScrollToSection(section.id)}
                className="text-sm font-medium"
              >
                {section.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default MenuTabs;