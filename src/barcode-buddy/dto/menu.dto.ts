export interface MenuDto {
  name?: string;
  venueId?: string;
  categoryId?: string;
  tags?: string[];
  price?: number;
  variants?: string[];
  description?: string;
  currency?: string;
  image?: string;
  popular?: boolean;
  isAvailable?: boolean;
  preparationTime?: string;
  ingredients?: string[];
  allergens?: string[];
  calories?: number;
  discount?: number;
  dietary?: {
    vegan?: boolean;
    vegetarian?: boolean;
    glutenFree?: boolean;
  };
  rating?: number;
  reviewsCount?: number;
  comboDetails?: string[];
  internalNotes?: string;
  status?: string;
}
