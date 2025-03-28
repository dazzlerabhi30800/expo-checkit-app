import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ViewWrapper from "@/components/ViewWrapper";
import TaskInput from "@/components/TaskInput";
import { useTodoSlice } from "@/context/Slice";
import TaskWrapper from "@/components/TaskWrapper";

const task = () => {
  const { getTodos, todos } = useTodoSlice((state) => state);

  // NOTE: fetch todos
  useEffect(() => {
    getTodos();
  }, []);
  console.log(todos);
  return (
    <ViewWrapper>
      <TaskInput />
      <TaskWrapper />
    </ViewWrapper>
  );
};

export default task;
