import { View, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/utils/color";
import { useTodoSlice } from "@/context/Slice";

const ViewWrapper = ({
  children,
  padding,
}: {
  children: React.ReactNode;
  padding?: number;
}) => {
  const { wrapper, dark, light } = styles;
  const theme = useTodoSlice((state) => state.theme);
  return (
    <View
      style={[
        wrapper,
        theme === "dark" ? dark : light,
        { paddingHorizontal: padding ?? 20 },
      ]}
    >
      {children}
    </View>
  );
};

export default ViewWrapper;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    width: "100%",
  },
  dark: {
    backgroundColor: colors.darkBg,
  },
  light: {
    backgroundColor: colors.lightBg,
  },
});
