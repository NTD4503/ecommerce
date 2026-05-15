// ===== Type definitions for the app =====

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  image: string;
  gender: string;
  birthDate?: string;
  address?: { address: string };
  company?: { address?: { address: string } };
  // Formatted fields
  name: string;
  avatar: string;
  dob: string;
  companyAddress: string;
  homeAddress: string;
}

export interface AuthState {
  userData: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginLoading: boolean;
  loginError: string;
}

export interface CartItem {
  id: number;
  title: string;
  name?: string;
  price: number;
  description?: string;
  thumbnail?: string;
  image?: string;
  images?: string[];
  rating?: number;
  colors?: string[];
  selectedColor: string;
  quantity: number;
}

export interface CartState {
  cartList: CartItem[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
  colors?: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  layout: React.ComponentType<{ children: React.ReactNode }> | null;
  category: string;
}
