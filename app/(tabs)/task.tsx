import React, { useEffect } from "react";
import { useTodoSlice } from "@/context/Slice";
import TaskWrapper from "@/components/TaskWrapper";
import { View } from "react-native";

const task = () => {
  const { getTodos } = useTodoSlice((state) => state);

  // NOTE: fetch todos
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <TaskWrapper />
    </View>
  );
};

export default task;
