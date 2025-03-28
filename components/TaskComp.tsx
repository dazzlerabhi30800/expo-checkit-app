import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { task } from "@/utils/type";
import { useTodoSlice } from "@/context/Slice";

const TaskComp = ({ item }: { item: task }) => {
  const theme = useTodoSlice((state) => state.theme);
  return (
    <View>
      <Text
        style={{
          color: theme === "dark" ? "white" : "black",
          fontSize: 15,
        }}
      >
        {item.task}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({});

export default TaskComp;
