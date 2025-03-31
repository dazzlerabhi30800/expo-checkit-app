import { StyleSheet, Text } from "react-native";
import React from "react";
import ViewWrapper from "@/components/ViewWrapper";
import { useTodoSlice } from "@/context/Slice";
import { Link } from "expo-router";

const confirm = () => {
  const theme = useTodoSlice((state) => state.theme);
  return (
    <ViewWrapper>
      <Text
        style={{
          fontSize: 25,
          color: theme === "dark" ? "white" : "#000",
          textAlign: "center",
        }}
      >
        You are registered, add your tasks.
      </Text>
      <Link style={styles.link} href={"/task"}>
        Task Page
      </Link>
    </ViewWrapper>
  );
};

export default confirm;
const styles = StyleSheet.create({
  link: {
    backgroundColor: "#48ffdb",
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlign: "center",
    width: 300,
    borderRadius: 5,
    fontSize: 20,
    fontFamily: "SpaceMono",
  },
});
