import { useState, useEffect } from "react";
import { menuCategories, MenuItem, MenuCategory, SubCategory } from "@/data/menuData";
import RestaurantHeader from "@/components/product/RestaurantHeader";
import RestaurantCover from "@/components/product/RestaurantCover";
import StickyNavbar from "@/components/product/StickyNavbar";
import CategoryCard from "@/components/product/CategoryCard";
import SubCategoryCard from "@/components/product/SubCategoryCard";
import MenuItemsList from "@/components/product/MenuItemsList";
import ItemModal from "@/components/product/ItemModal";
import OrderSummary from "@/components/product/OrderSummary";
import axios from "axios";
import { useTranslation } from "react-i18next";
// import { useState, useEffect } from "react";
// import { MenuCategory } from "@/data/menuData"; // Adjust import path

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fabOpen, setFabOpen] = useState(false);
const { t, i18n } = useTranslation(); // get current language
// const LOCALE = i18n.language || "AM";
const BRANCH_ID = "branch-kfc-1"; // Should be dynamic if needed
const API_BASE = "https://kfc.ater-vpn.ru"
const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);


const fetchCategories = async () => {
  const currentLocale = i18n.resolvedLanguage || "AM";
  try {
    const res = await axios.get(`${API_BASE}/api/menus/menu-tabs`, {
      params: { branchId: BRANCH_ID },
    });

    const rawCategories = res.data?.categories || [];
    const formatted: MenuCategory[] = rawCategories.map((cat: any) => ({
      id: cat.AM, // Keep AM as identifier
      name: cat[currentLocale],
      names: cat, // store all languages
      image: cat.image ? `${API_BASE}/${cat.image}` : undefined,
      subcategories: (cat.subcategories || []).map((sub: any) => ({
        id: sub.AM, // Keep AM as identifier
        name: sub[currentLocale],
        names: sub, // store all languages
        image: sub.image ? `${API_BASE}/${sub.image}` : undefined,
        items: [],
      })),
    }));
    console.log("🚀 ~ constformatted:MenuCategory[]=rawCategories.map ~ formatted:", formatted)

    setMenuCategories(formatted);
  } catch (err) {
    console.error(t("failedToFetchCategories"), err);
  }
};

useEffect(() => {
  fetchCategories();
}, []);

const fetchItems = async () => {
  if (menuCategories.length === 0) return;

  try {
    const updatedCategories = await Promise.all(
      menuCategories.map(async (category) => {
        if (!category.subcategories.length) return category;

        const enrichedSubcategories = await Promise.all(
          category.subcategories.map(async (sub) => {
            const res = await axios.get(`${API_BASE}/api/items`, {
              params: {
                branchId: BRANCH_ID,
                tab: category.id,        // AM category
                subCategory: sub.id,     // AM subcategory
              },
            });

            const items = res.data.map((item: any) => ({
              id: item._id,
              title: item.title,
              description: item.description,
              price: item.price,
              photoUrl: `${API_BASE}/${item.photoUrl}`,
            }));

            return { ...sub, items };
          })
        );

        return { ...category, subcategories: enrichedSubcategories };
      })
    );

    setMenuCategories(updatedCategories);
  } catch (err) {
    console.error(t("failedToFetchItems"), err);
  }
};



useEffect(() => {
  if (menuCategories.length > 0) fetchItems();
}, [menuCategories]); 

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setExpandedCategory(categoryId);
      setSelectedSubcategory(null);
      
      // Smooth scroll to category
      setTimeout(() => {
        const element = document.getElementById(`category-${categoryId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleSubcategoryClick = (subcategory: SubCategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getVisibleCategories = () => {
    if (!expandedCategory) return menuCategories;
    
    const expandedIndex = menuCategories.findIndex(cat => cat.id === expandedCategory);
    return [
      ...menuCategories.slice(0, expandedIndex),
      menuCategories[expandedIndex],
      ...menuCategories.slice(expandedIndex + 1)
    ];
  };

  const handleTableAction = async (action: "call_waiter" | "request_check") => {
  try {
    const res = await fetch("http://localhost:5001/tables/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        branchId: "branch-kfc-1",  // replace with dynamic if needed
        tableId: "687d4c8af96d4e4d9ba52da7",         // replace with the actual table id
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Unknown error");

    alert(data.message);
  } catch (err: any) {
    alert("❌ Failed to send request: " + err.message);
  }
};

  const renderCategoryContent = (category: MenuCategory) => {
    if (expandedCategory !== category.id) return null;

    return (
      <div className="mt-4 space-y-4 animate-slide-up">
        {category.subcategories ? (
          <>
            <h3 className="text-lg font-semibold px-4">{t('chooseCategory')}</h3>
            <div className="grid grid-cols-2 gap-4 px-4">
              {category.subcategories.map((subcategory) => (
                <SubCategoryCard
                  key={subcategory.id}
                  subcategory={subcategory}
                  onClick={() => handleSubcategoryClick(subcategory)}
                />
              ))}
            </div>
          </>
        ) : (
          category.items && (
            <div className="px-4">
              <MenuItemsList
                items={category.items.map(item => ({
                  id: item.id,
                  title: item.title[i18n.language],        // <-- Use the correct language
                  description: item.description[i18n.language],
                  price: `${item.price}֏`,
                  image: item.photoUrl,
                }))}
                onItemClick={handleItemClick}
              />
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <RestaurantHeader />
      <RestaurantCover />
      {/* <StickyNavbar 
        categories={menuCategories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      /> */}
      <StickyNavbar 
        categories={menuCategories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      
      
      <main className="pb-8 pt-4">
        {selectedSubcategory ? (
          <div className="px-4 space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button 
                onClick={() => setSelectedSubcategory(null)}
                className="hover:text-foreground transition-colors"
              >
                ← {t('backToCategories')}
              </button>
            </div>
            <h2 className="text-xl font-bold">{selectedSubcategory.name}</h2>
            <MenuItemsList 
              items={selectedSubcategory.items} 
              onItemClick={handleItemClick}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {getVisibleCategories().map((category) => (
              <div key={category.id} id={`category-${category.id}`}>
                <div className="px-4">
                  <CategoryCard
                    category={category}
                    isExpanded={expandedCategory === category.id}
                    onClick={() => handleCategoryClick(category.id)}
                  />
                </div>
                {renderCategoryContent(category)}
              </div>
            ))}
          </div>
        )}
      </main>

      <ItemModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* <OrderSummary /> */}
      {/* Floating Action Button */}
{/* Floating Action Button */}
{/* Dimmed Background Overlay */}
{fabOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
    onClick={() => setFabOpen(false)}
  />
)}

<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
  {/* Action Buttons */}
  <div
    className={`flex flex-col items-end gap-4 mb-4 transition-all duration-300 ${
      fabOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
    }`}
  >
    {/* Call Waiter */}
    <div className="flex items-center gap-2">
      <span className="text-white text-sm font-semibold drop-shadow-md bg-black/30 px-2 py-1 rounded">
        {t('callWaiter')}
      </span>
      <button
      onClick={() => handleTableAction("call_waiter")}
      className="bg-red-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-red-600 transition"
      >
      🧑‍🍳
      </button>
    </div>

    {/* Check Please */}
    <div className="flex items-center gap-2">
      <span className="text-white text-sm font-semibold drop-shadow-md bg-black/30 px-2 py-1 rounded">
        {t('checkPlease')}
      </span>
      <button
        onClick={() => handleTableAction("request_check")}
        className="bg-yellow-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-yellow-600 transition"
      >
        💳
      </button>
    </div>
  </div>

  {/* Main FAB Toggle */}
  <button
  onClick={() => setFabOpen(!fabOpen)}
  className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
>
  {fabOpen ? "✕" : "🔔"}
</button>


</div>


    </div>
  );
};

export default ProductPage;
