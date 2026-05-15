// ===== Auth Service — Tất cả API liên quan đến auth =====
import httpClient from "./httpClient";
import type { LoginCredentials } from "../types";

interface LoginResponse {
  accessToken?: string;
  token?: string;
  [key: string]: unknown;
}

interface ProfileResponse {
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
  [key: string]: unknown;
}

const authService = {
  login: (credentials: LoginCredentials): Promise<LoginResponse> => {
    return httpClient.post<LoginResponse>("/auth/login", {
      username: credentials.username.trim(),
      password: credentials.password,
      expiresInMins: 30,
    });
  },

  getProfile: (token: string): Promise<ProfileResponse> => {
    return httpClient.get<ProfileResponse>("/auth/me", token);
  },
};

export default authService;
