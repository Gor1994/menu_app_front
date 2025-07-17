export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface MenuSection {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    items: [
      {
        id: 1,
        name: "Truffle Arancini",
        description: "Crispy risotto balls with truffle oil and parmesan",
        price: "$14",
        image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        name: "Burrata Caprese",
        description: "Fresh burrata with heirloom tomatoes and basil",
        price: "$16",
        image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        name: "Tuna Tartare",
        description: "Fresh tuna with avocado and citrus dressing",
        price: "$18",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    id: "mains",
    name: "Main Courses",
    items: [
      {
        id: 4,
        name: "Grilled Salmon",
        description: "Atlantic salmon with lemon herb butter and seasonal vegetables",
        price: "$28",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
      },
      {
        id: 5,
        name: "Ribeye Steak",
        description: "28-day aged ribeye with roasted potatoes and red wine jus",
        price: "$42",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
      },
      {
        id: 6,
        name: "Mushroom Risotto",
        description: "Creamy arborio rice with wild mushrooms and truffle oil",
        price: "$24",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop"
      },
      {
        id: 7,
        name: "Duck Confit",
        description: "Slow-cooked duck leg with cherry sauce and mashed potatoes",
        price: "$32",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      {
        id: 8,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center and vanilla ice cream",
        price: "$12",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop"
      },
      {
        id: 9,
        name: "Tiramisu",
        description: "Classic Italian dessert with espresso and mascarpone",
        price: "$10",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      {
        id: 10,
        name: "House Wine",
        description: "Red or white wine selection",
        price: "$8",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop"
      },
      {
        id: 11,
        name: "Craft Beer",
        description: "Local brewery selection",
        price: "$6",
        image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop"
      },
      {
        id: 12,
        name: "Fresh Juice",
        description: "Orange, apple, or mixed berry",
        price: "$4",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop"
      }
    ]
  }
];