import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState, CartItem, Product } from "../types";
import type { RootState } from "./store";

const CART_STORAGE_KEY = "ecommerce_cart";

const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCart = (cartList: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartList));
};

const initialState: CartState = {
  cartList: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; color: string }>) => {
      const { product, color } = action.payload;
      const existing = state.cartList.find(
        (item) => item.id === product.id && item.selectedColor === color
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartList.push({ ...product, selectedColor: color, quantity: 1 });
      }
      saveCart(state.cartList);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; color: string; newQuantity: number }>
    ) => {
      const { productId, color, newQuantity } = action.payload;
      if (newQuantity < 1) {
        state.cartList = state.cartList.filter(
          (item) => !(item.id === productId && item.selectedColor === color)
        );
      } else {
        const item = state.cartList.find(
          (item) => item.id === productId && item.selectedColor === color
        );
        if (item) item.quantity = newQuantity;
      }
      saveCart(state.cartList);
    },
    removeFromCart: (state, action: PayloadAction<{ productId: number; color: string }>) => {
      const { productId, color } = action.payload;
      state.cartList = state.cartList.filter(
        (item) => !(item.id === productId && item.selectedColor === color)
      );
      saveCart(state.cartList);
    },
    clearCart: (state) => {
      state.cartList = [];
      saveCart([]);
    },
  },
});

// Selectors
export const selectCartList = (state: RootState) => state.cart.cartList;
export const selectTotalItems = (state: RootState) =>
  state.cart.cartList.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotals = (state: RootState) => {
  const subTotal = state.cart.cartList.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const tax = Math.round(subTotal * 0.1);
  return { subTotal, tax, total: subTotal + tax };
};

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
