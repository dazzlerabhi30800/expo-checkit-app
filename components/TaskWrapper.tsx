import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import TaskComp from "./TaskComp";
import { useTodoSlice } from "@/context/Slice";

const TaskWrapper = () => {
  const { todos, getTodos } = useTodoSlice((state) => state);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await getTodos();
    setRefreshing(false);
  };

  return (
    <View style={styles.taskWrapper}>
      <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id}
        renderItem={({ item }) => <TaskComp item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 10,
            }}
          ></View>
        )}
      />
    </View>
  );
};

export default TaskWrapper;

const styles = StyleSheet.create({
  taskWrapper: {
    marginTop: 10,
    gap: 10,
    width: 300,
  },
});
