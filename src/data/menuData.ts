export interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  ingredients?: string;
  calories?: number;
  photoUrl?:string;
}

export interface SubCategory {
  id: string;
  name: string;
  image?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  name: string;
  image: string;
  subcategories?: SubCategory[];
  items?: MenuItem[];
}

// Legacy types and exports for backward compatibility
export interface MenuSection {
  id: string;
  name: string;
  items: MenuItem[];
}