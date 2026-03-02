import { defineStore } from "pinia";
import api from "../services/api";
import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || null);
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.isAdmin === true);

  const register = async (payload) => {
    try {
      const response = await api.post("/users/register", payload);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password });
      token.value = response.data.access;
      localStorage.setItem("token", token.value);
      const decoded = jwtDecode(token.value);

      user.value = {
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
        isAdmin: decoded.isAdmin,
      };
      localStorage.setItem("user", JSON.stringify(user.value));
      return true
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return { token, user, isAuthenticated, isAdmin, register, login, logout };
});
