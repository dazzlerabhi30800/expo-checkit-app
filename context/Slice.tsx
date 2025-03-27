import { user } from "@/utils/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type slice = {
  theme: string;
  setTheme: () => void;
  user: user;
  setUser: (userInfo: user) => void;
};

export const useTodoSlice = create<slice>()(
  persist(
    (set, get) => ({
      theme: "dark",
      user: null,
      setTheme: () => {
        const theme = get().theme;
        set({ theme: theme === "dark" ? "light" : "dark" });
      },
      setUser: (userInfo) => {
        set({ user: userInfo });
      },
    }),
    {
      name: "check-it",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
