import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/utils/color";
import { useTodoSlice } from "@/context/Slice";

const ViewWrapper = ({ children }: { children: React.ReactNode }) => {
  const { wrapper, dark, light } = styles;
  const theme = useTodoSlice((state) => state.theme);
  return (
    <View style={[wrapper, theme === "dark" ? dark : light]}>{children}</View>
  );
};

export default ViewWrapper;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 20,
  },
  dark: {
    backgroundColor: colors.darkBg,
  },
  light: {
    backgroundColor: colors.lightBg,
  },
});
