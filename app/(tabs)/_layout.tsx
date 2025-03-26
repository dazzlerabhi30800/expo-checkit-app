import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} name="house" size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} name="send" size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
