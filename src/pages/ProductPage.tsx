import { useEffect, useState } from "react";
import axios from "axios";

import RestaurantHeader from "@/components/product/RestaurantHeader";
import RestaurantCover from "@/components/product/RestaurantCover";
import MenuTabs from "@/components/product/MenuTabs";
import MenuSectionComponent from "@/components/product/MenuSectionComponent";
import OrderSummary from "@/components/product/OrderSummary";

const API_BASE = "https://kfc.ater-vpn.ru/api";
const BRANCH_ID = "branch-kfc-1";
const LOCALE = "AM";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};
const ProductPage = () => {
  const [tabs, setTabs] = useState([]);
  const [itemsByTab, setItemsByTab] = useState({});
  const [activeTabId, setActiveTabId] = useState("");

useEffect(() => {
  const fetchTabs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/menus/menu-tabs`, {
        params: { branchId: BRANCH_ID },
      });
      const tabList: string[] = res.data?.[LOCALE] || [];

      console.log("🚀 ~ fetchTabs ~ tabList:", tabList);

      const formattedTabs = tabList.map((id) => ({
        id,
        name: id, // or format for display
      }));

      setTabs(formattedTabs);
      if (formattedTabs.length > 0) setActiveTabId(formattedTabs[0].id);
    } catch (err) {
      console.error("Failed to fetch tabs:", err);
    }
  };

  fetchTabs();
}, []);


  useEffect(() => {
  if (tabs.length === 0) return;

  const fetchAllItems = async () => {
    try {
      const allItemsByTab: Record<string, MenuItem[]> = {};

      for (const tab of tabs) {
        const res = await axios.get(`${API_BASE}/items`, {
          params: { tab: tab.id, branchId: BRANCH_ID },
        });

        const items = res.data.map((item) => ({
          id: item._id,
          name: item.title?.[LOCALE] || item.name || "",
          description: item.description?.[LOCALE] || "",
          price: item.price + "֏",
          image: item.image || `https://kfc.ater-vpn.ru/${item.photoUrl}`,
        }));

        allItemsByTab[tab.id] = items;
      }

      console.log("✅ All items fetched", allItemsByTab);
      setItemsByTab(allItemsByTab);
    } catch (err) {
      console.error("❌ Failed to fetch all items:", err);
    }
  };

  fetchAllItems();
}, [tabs]);

useEffect(() => {
  const handleScroll = () => {
    const sections = tabs.map((tab) => {
      const element = document.getElementById(tab.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        return {
          id: tab.id,
          top: rect.top,
          height: rect.height,
        };
      }
      return null;
    }).filter(Boolean) as { id: string; top: number; height: number }[];

    const current = sections.find(
      (section) => section.top <= 200 && section.top + section.height > 200
    );

    if (current) {
      setActiveTabId(current.id);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [tabs]);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const scrollToSection = (tabId: string) => {
  const element = document.getElementById(tabId);
  if (element) {
    const offset = 180; // adjust for sticky header
    const top = element.offsetTop - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

  return (
    <div className="min-h-screen bg-background">
      <RestaurantHeader />
      <RestaurantCover />
      <MenuTabs
        sections={tabs}
        activeTab={activeTabId}
        onTabChange={handleTabChange}
        onScrollToSection={scrollToSection}
      />

      <main className="container mx-auto px-4 py-8 space-y-12">
        {tabs.map((tab) => (
          <MenuSectionComponent
            key={tab.id}
            section={{
              id: tab.id,
              name: tab.name,
              items: itemsByTab[tab.id] || [],
            }}
          />
        ))}
      </main>

      <OrderSummary />
    </div>
  );
};

export default ProductPage;
