import { FlatList, RefreshControl, View } from "react-native";
import React, { useState } from "react";
import TaskComp from "./TaskComp";
import { useTodoSlice } from "@/context/Slice";
import TaskInput from "./TaskInput";
import ViewWrapper from "./ViewWrapper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TaskWrapper = () => {
  const { todos, getTodos } = useTodoSlice((state) => state);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await getTodos();
    setRefreshing(false);
  };

  return (
    <ViewWrapper padding={0}>
      {/* <TaskInput /> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, width: 350 }}>
          <FlatList
            data={todos}
            keyExtractor={(todo) => todo.id}
            style={{
              height: "100%",
              width: "100%",
            }}
            ListHeaderComponent={() => <TaskInput />}
            renderItem={({ item }) => <TaskComp item={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </GestureHandlerRootView>
    </ViewWrapper>
  );
};

export default TaskWrapper;
