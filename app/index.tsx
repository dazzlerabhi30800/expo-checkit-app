import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/utils/color";
import { useTodoSlice } from "@/context/Slice";
import { Link, Redirect } from "expo-router";

const index = () => {
  const { theme, user } = useTodoSlice((state) => state);
  if (user) return <Redirect href={"/task"} />;
  return (
    <View
      style={[styles.wrapper, theme === "dark" ? styles.dark : styles.light]}
    >
      <Text
        style={[styles.text, theme === "light" && { color: colors.textlight }]}
      >
        Welcome to Check It, the true minimalism
      </Text>
      <Link href={"/login"} style={styles.link}>
        Login Page
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
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

  text: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
    textAlign: 'center',
  },
  link: {
    backgroundColor: "#48ffdb",
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlign: "center",
    width: 300,
    borderRadius: 5,
    fontSize: 20,
  },
});
