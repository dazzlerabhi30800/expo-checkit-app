import { supabase } from "@/utils/supabase/supabase";
import { task, user } from "@/utils/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type slice = {
  theme: string;
  setTheme: () => void;
  user: user;
  setUser: (userInfo: user) => void;
  getTodos: () => Promise<void>;
  setTodos: (todos: task[]) => void;
  todos: task[];
};

export const useTodoSlice = create<slice>()(
  persist(
    (set, get) => ({
      theme: "dark",
      todos: [],
      user: null,
      setTheme: () => {
        const theme = get().theme;
        set({ theme: theme === "dark" ? "light" : "dark" });
      },
      setUser: (userInfo) => {
        set({ user: userInfo });
      },
      setTodos: (todos) => {
        set({ todos });
      },
      getTodos: async () => {
        const { data, error } = await supabase
          .from("Tasks")
          .select("*")
          .eq("createdBy", get()?.user?.email);
        if (error) {
          Alert.alert(error.message);
        }
        if (!error && data) {
          set({ todos: data.sort((a, b) => a.position - b.position) });
        }
      },
    }),
    {
      name: "check-it",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        todos: state.todos,
      }),
    },
  ),
);
