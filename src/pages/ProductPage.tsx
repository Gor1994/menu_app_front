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
import { useParams } from "react-router-dom";
import { useRef } from "react";

// import { useState, useEffect } from "react";
// import { MenuCategory } from "@/data/menuData"; // Adjust import path

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsFetched, setItemsFetched] = useState(false);

  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});


  const [fabOpen, setFabOpen] = useState(false);
const { t, i18n } = useTranslation(); // get current language
// const LOCALE = i18n.language || "AM";
const API_BASE = "https://admin.nushx.com"
const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const { branchId, tableId } = useParams<{ branchId: string; tableId: string }>();

  useEffect(() => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // Adjust based on when you want to trigger
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const visibleId = Object.entries(categoryRefs.current).find(
          ([_, el]) => el === entry.target
        )?.[0];

        if (visibleId && visibleId !== activeCategory) {
          setActiveCategory(visibleId);
        }
      }
    });
  }, observerOptions);

  const elements = Object.values(categoryRefs.current).filter(Boolean) as Element[];
  elements.forEach((el) => observer.observe(el));

  return () => {
    elements.forEach((el) => observer.unobserve(el));
  };
}, [menuCategories]);


const fetchCategories = async () => {
  const currentLocale = i18n.resolvedLanguage || "AM";
  try {
    const res = await axios.get(`${API_BASE}/api/menus/menu-tabs`, {
      params: { branchId: branchId },
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
    // const updatedCategories = await Promise.all(
    //   menuCategories.map(async (category) => {
    //     if (!category.subcategories.length) return category;

    //     const enrichedSubcategories = await Promise.all(
    //       category.subcategories.map(async (sub) => {
    //         const res = await axios.get(`${API_BASE}/api/items`, {
    //           params: {
    //             branchId: branchId,
    //             tab: category.id,        // AM category
    //             subCategory: sub.id,     // AM subcategory
    //           },
    //         });

    //         const items = res.data.map((item: any) => ({
    //           id: item._id,
    //           title: item.title,
    //           description: item.description,
    //           price: item.price,
    //           image: `${API_BASE}/${item.photoUrl}`,
    //         }));

    //         return { ...sub, items };
    //       })
    //     );

    //     return { ...category, subcategories: enrichedSubcategories };
    //   })
    // );
    const updatedCategories = await Promise.all(
  menuCategories.map(async (category) => {
    if (category.subcategories.length === 0) {
      // Fetch items directly for category
      const res = await axios.get(`${API_BASE}/api/items`, {
        params: {
          branchId: branchId,
          tab: category.id, // AM category
        },
      });

      const items = res.data.map((item: any) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        price: item.price,
        image: `${API_BASE}/${item.photoUrl}`,
      }));

      return { ...category, items };
    }

    // Fetch items for each subcategory
    const enrichedSubcategories = await Promise.all(
      category.subcategories.map(async (sub) => {
        const res = await axios.get(`${API_BASE}/api/items`, {
          params: {
            branchId: branchId,
            tab: category.id,
            subCategory: sub.id,
          },
        });

        // const items = res.data.map((item: any) => ({
        //   id: item._id,
        //   title: item.title,
        //   description: item.description,
        //   price: item.price,
        //   image: `${API_BASE}/${item.photoUrl}`,
        // }));
        const items = res.data
          .filter((item: any) => item.subCategory === sub.id) // ← Filter only matching subcategory items
          .map((item: any) => ({
            id: item._id,
            title: item.title,
            description: item.description,
            price: item.price,
            image: `${API_BASE}/${item.photoUrl}`,
          }));

        return { ...sub, items };

        return { ...sub, items };
      })
    );

    return { ...category, subcategories: enrichedSubcategories };
  })
);


    setMenuCategories(updatedCategories);
    setItemsFetched(true)
  } catch (err) {
    console.error(t("failedToFetchItems"), err);
  }
};



useEffect(() => {
  if (menuCategories.length > 0 && !itemsFetched) {
    fetchItems();
  }
}, [menuCategories, itemsFetched]); 

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
    const res = await fetch("https://admin.nushx.com/api/tables/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        branchId: branchId,  // replace with dynamic if needed
        tableId: tableId,         // replace with the actual table id
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Unknown error");

    alert(data.message);
  } catch (err: any) {
    alert("❌ Failed to send request: " + err.message);
  }
};

//   const renderCategoryContent = (category: MenuCategory) => {
//     if (expandedCategory !== category.id) return null;

//     return (
//       <div className="mt-4 space-y-4 animate-slide-up">
//         {category.subcategories ? (
//           <>
//             <h3 className="text-lg font-semibold px-4">{t('chooseCategory')}</h3>
//             <div className="grid grid-cols-2 gap-4 px-4">
//               {category.subcategories.map((subcategory) => (
//                 <SubCategoryCard
//                   key={subcategory.id}
//                   subcategory={subcategory}
//                   onClick={() => handleSubcategoryClick(subcategory)}
//                 />
//               ))}
//             </div>
//           </>
//         ) : (
//           category.items && (
//             <div className="px-4">
//             <MenuItemsList 
//               items={selectedSubcategory.items.map(item => ({
//                 ...item,
//                 title: item.title?.[i18n.language] || item.title?.AM,
//                 description: item.description?.[i18n.language] || item.description?.AM,
//               }))}
//               onItemClick={handleItemClick}
//             />
//             </div>
//           )
//         )}
//       </div>
//     );
//   };

const renderCategoryContent = (category: MenuCategory) => {
  if (expandedCategory !== category.id) return null;

  return (
    <div className="mt-4 space-y-4 animate-slide-up">
      {category.subcategories?.length > 0 ? (
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
        category.items?.length > 0 && (
          <div className="px-4">
            <MenuItemsList
              items={category.items.map(item => ({
                ...item,
                title: item.title?.[i18n.language] || item.title?.AM,
                description: item.description?.[i18n.language] || item.description?.AM,
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
              items={selectedSubcategory.items.map(item => ({
                ...item,
                title: item.title?.[i18n.language] || item.title?.AM,
                description: item.description?.[i18n.language] || item.description?.AM,
              }))}
              onItemClick={handleItemClick}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {getVisibleCategories().map((category) => (
              <div key={category.id} id={`category-${category.id}`}
              ref={(el) => (categoryRefs.current[category.id] = el)}
              >
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
{/* FAB Overlay */}
{fabOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
    onClick={() => setFabOpen(false)}
  />
)}

<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
  {/* Action Buttons */}
  <div
    className={`flex flex-col items-end gap-3 mb-4 transform transition-all duration-300 ${
      fabOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
    }`}
  >
    {/* Call Waiter */}
    <button
      onClick={() => handleTableAction("call_waiter")}
      className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-black/30 shadow-lg hover:scale-105 transition-transform"
    >
      <img src="/icons/waiter.png" alt="Call Waiter" className="w-6 h-6" />
      <span className="text-white font-semibold text-sm">{t("callWaiter")}</span>
    </button>

    {/* Request Check */}
    <button
      onClick={() => handleTableAction("request_check")}
      className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-black/30 shadow-lg hover:scale-105 transition-transform"
    >
      <img src="/icons/card.png" alt="Request Check" className="w-6 h-6" />
      <span className="text-white font-semibold text-sm">{t("checkPlease")}</span>
    </button>
  </div>

  {/* Main FAB Toggle */}
  <button
    onClick={() => setFabOpen(!fabOpen)}
    className="bg-black/60 rounded-full w-12 h-12 flex items-center justify-center shadow-xxl hover:scale-110 transition-transform border-1 border-white"
  >
    <img
      src={fabOpen ? "/icons/close.png" : "/icons/bell.png"}
      alt="Toggle Actions"
      className="w-9 h-9"
    />
  </button>
</div>


    </div>
  );
};

export default ProductPage;
