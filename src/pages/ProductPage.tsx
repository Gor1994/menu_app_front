// import { useEffect, useState } from "react";
// import axios from "axios";

// import RestaurantHeader from "@/components/product/RestaurantHeader";
// import RestaurantCover from "@/components/product/RestaurantCover";
// import MenuTabs from "@/components/product/MenuTabs";
// import MenuSectionComponent from "@/components/product/MenuSectionComponent";
// import OrderSummary from "@/components/product/OrderSummary";

// const API_BASE = "https://kfc.ater-vpn.ru/api";
// const BRANCH_ID = "branch-kfc-1";
// const LOCALE = "AM";

// type MenuItem = {
//   id: string;
//   name: string;
//   description: string;
//   price: string;
//   image: string;
// };
// const ProductPage = () => {
//   const [tabs, setTabs] = useState([]);
//   const [itemsByTab, setItemsByTab] = useState({});
//   const [activeTabId, setActiveTabId] = useState("");

// useEffect(() => {
//   const fetchTabs = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/menus/menu-tabs`, {
//         params: { branchId: BRANCH_ID },
//       });
//       const tabList: string[] = res.data?.[LOCALE] || [];

//       console.log("🚀 ~ fetchTabs ~ tabList:", tabList);

//       const formattedTabs = tabList.map((id) => ({
//         id,
//         name: id, // or format for display
//       }));

//       setTabs(formattedTabs);
//       if (formattedTabs.length > 0) setActiveTabId(formattedTabs[0].id);
//     } catch (err) {
//       console.error("Failed to fetch tabs:", err);
//     }
//   };

//   fetchTabs();
// }, []);


//   useEffect(() => {
//   if (tabs.length === 0) return;

//   const fetchAllItems = async () => {
//     try {
//       const allItemsByTab: Record<string, MenuItem[]> = {};

//       for (const tab of tabs) {
//         const res = await axios.get(`${API_BASE}/items`, {
//           params: { tab: tab.id, branchId: BRANCH_ID },
//         });

//         const items = res.data.map((item) => ({
//           id: item._id,
//           name: item.title?.[LOCALE] || item.name || "",
//           description: item.description?.[LOCALE] || "",
//           price: item.price + "֏",
//           image: item.image || `https://kfc.ater-vpn.ru/${item.photoUrl}`,
//         }));

//         allItemsByTab[tab.id] = items;
//       }

//       console.log("✅ All items fetched", allItemsByTab);
//       setItemsByTab(allItemsByTab);
//     } catch (err) {
//       console.error("❌ Failed to fetch all items:", err);
//     }
//   };

//   fetchAllItems();
// }, [tabs]);

// useEffect(() => {
//   const handleScroll = () => {
//     const sections = tabs.map((tab) => {
//       const element = document.getElementById(tab.id);
//       if (element) {
//         const rect = element.getBoundingClientRect();
//         return {
//           id: tab.id,
//           top: rect.top,
//           height: rect.height,
//         };
//       }
//       return null;
//     }).filter(Boolean) as { id: string; top: number; height: number }[];

//     const current = sections.find(
//       (section) => section.top <= 200 && section.top + section.height > 200
//     );

//     if (current) {
//       setActiveTabId(current.id);
//     }
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, [tabs]);

//   const handleTabChange = (tabId: string) => {
//     setActiveTabId(tabId);
//   };

//   const scrollToSection = (tabId: string) => {
//   const element = document.getElementById(tabId);
//   if (element) {
//     const offset = 180; // adjust for sticky header
//     const top = element.offsetTop - offset;
//     window.scrollTo({ top, behavior: "smooth" });
//   }
// };

//   return (
//     <div className="min-h-screen bg-background">
//       <RestaurantHeader />
//       <RestaurantCover />
//       <MenuTabs
//         sections={tabs}
//         activeTab={activeTabId}
//         onTabChange={handleTabChange}
//         onScrollToSection={scrollToSection}
//       />

//       <main className="container mx-auto px-4 py-8 space-y-12">
//         {tabs.map((tab) => (
//           <MenuSectionComponent
//             key={tab.id}
//             section={{
//               id: tab.id,
//               name: tab.name,
//               items: itemsByTab[tab.id] || [],
//             }}
//           />
//         ))}
//       </main>

//       <OrderSummary />
//     </div>
//   );
// };

// export default ProductPage;

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

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fabOpen, setFabOpen] = useState(false);

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

  const renderCategoryContent = (category: MenuCategory) => {
    if (expandedCategory !== category.id) return null;

    return (
      <div className="mt-4 space-y-4 animate-slide-up">
        {category.subcategories ? (
          <>
            <h3 className="text-lg font-semibold px-4">Choose a category</h3>
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
                items={category.items} 
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
                ← Back to categories
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
        Call Waiter
      </span>
      <button
        onClick={() => alert("Waiter has been called")}
        className="bg-red-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-red-600 transition"
      >
        🧑‍🍳
      </button>
    </div>

    {/* Check Please */}
    <div className="flex items-center gap-2">
      <span className="text-white text-sm font-semibold drop-shadow-md bg-black/30 px-2 py-1 rounded">
        Check Please
      </span>
      <button
        onClick={() => alert("Check requested")}
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
