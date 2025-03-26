import { create } from "zustand";

type slice = {
  theme: string;
  setTheme: () => void;
};

export const useTodoSlice = create<slice>((set, get) => ({
  theme: "dark",
  setTheme: () => {
    const theme = get().theme;
    set({ theme: theme === "dark" ? "light" : "dark" });
  },
}));
