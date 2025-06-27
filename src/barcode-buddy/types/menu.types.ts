export interface IMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_spicy: boolean;
  allergens?: string[];
  available: boolean;
  is_discounted: boolean;
  discount_price?: number;
}

export interface IMenuCategories {
  id: string;
  name: string;
  description?: string;
  display_order: number;
  items: IMenuItem[];
}

export interface IMenu {
  id: string;
  name: string;
  description?: string;
  currency: string;
  is_active: boolean;
  sections: IMenuCategories[];
}
