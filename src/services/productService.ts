import httpClient from "./httpClient";
import type { Product } from "../types";

interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const productService = {
  getAll: (): Promise<ProductListResponse> => {
    return httpClient.get<ProductListResponse>("/products");
  },

  getById: (id: number | string): Promise<Product> => {
    return httpClient.get<Product>(`/products/${id}`);
  },

  create: (product: Partial<Product>): Promise<Product> => {
    return httpClient.post<Product>(
      "/products/add",
      product as Record<string, unknown>,
    );
  },

  update: (id: number, product: Partial<Product>): Promise<Product> => {
    return httpClient.put<Product>(
      `/products/${id}`,
      product as Record<string, unknown>,
    );
  },

  delete: (id: number): Promise<Product> => {
    return httpClient.delete<Product>(`/products/${id}`);
  },
};

export default productService;
