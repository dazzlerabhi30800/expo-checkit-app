import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTodoSlice } from "@/context/Slice";
import { colors } from "@/utils/color";

export default function TabLayout() {
  const theme = useTodoSlice((state) => state.theme);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            backgroundColor: theme === "dark" ? colors.darkBg : "white",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="task"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} name="home" size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} name="account-circle" size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
