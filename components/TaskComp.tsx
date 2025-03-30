import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { task } from "@/utils/type";
import { useTodoSlice } from "@/context/Slice";
import { supabase } from "@/utils/supabase/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import TaskEdit from "./TaskEdit";

interface taskComp {
  item: task;
}

const TaskComp = ({ item }: taskComp) => {
  const { theme, todos, setTodos } = useTodoSlice((state) => state);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const scaleValue = useSharedValue(0.95);

  const config = {
    duration: 300,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scaleValue.value, config) }],
    };
  });

  const handleCheck = async () => {
    setLoading(true);
    setTodos(
      todos.map((todo) => {
        if (todo.id === item.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    );
    await supabase
      .from("Tasks")
      .update({
        completed: !item.completed,
      })
      .eq("id", item.id);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setTodos(todos.filter((todo) => todo.id !== id));
    await supabase.from("Tasks").delete().eq("id", id);
    setLoading(false);
  };

  useEffect(() => {
    if (item.completed) {
      scaleValue.value = 0.8;
    } else {
      scaleValue.value = 0.95;
    }
  }, [item.completed]);

  return (
    <Animated.View
      style={[
        styles.taskContainer,
        style,
        {
          opacity: item.completed ? 0.6 : 1,
          justifyContent: "space-between",
          marginBottom: 20,
          borderBottomWidth: 2,
          borderBottomColor: theme === "dark" ? "white" : "black",
          paddingBottom: 10,
          flex: 1,
        },
      ]}
    >
      {edit && <TaskEdit setEdit={setEdit} task={item.task} id={item.id} />}
      {!edit && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            onPress={handleCheck}
            disabled={loading}
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: "transparent",
              borderWidth: 2.3,
              borderColor: theme === "dark" ? "white" : "black",
              padding: 3,
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                opacity: item.completed ? 1 : 0,
                backgroundColor: theme === "dark" ? "white" : "black",
              }}
            ></View>
          </TouchableOpacity>
          <Text
            style={{
              color: theme === "dark" ? "white" : "black",
              fontSize: 20,
              textDecorationLine: item.completed ? "line-through" : "none",
            }}
          >
            {item.task}
          </Text>
        </View>
      )}
      {!edit && (
        <View style={styles.taskContainer}>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <AntDesign
              name="delete"
              size={24}
              color={"red"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEdit(true)}>
            <Feather name="edit" size={24} color="green" />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default TaskComp;
