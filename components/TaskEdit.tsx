import { View, TouchableOpacity } from "react-native";
import React, { SetStateAction, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/utils/color";
import { supabase } from "@/utils/supabase/supabase";
import { useTodoSlice } from "@/context/Slice";

interface edit {
  task: string;
  id: string;
  setEdit: React.Dispatch<SetStateAction<boolean>>;
}

const TaskEdit = ({ task, id, setEdit }: edit) => {
  const [taskString, setTaskString] = useState(task);
  const { todos, setTodos, theme } = useTodoSlice((state) => state);
  const handleEdit = async () => {
    if (!id) return;
    if (task === taskString) {
      setEdit(false);
    } else {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, task: taskString };
          }
          return todo;
        }),
      );
      await supabase
        .from("Tasks")
        .update({
          task: taskString,
        })
        .eq("id", id);
      setEdit(false);
    }
  };
  return (
    <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
      <TextInput
        style={{ flex: 1, color: theme === "dark" ? "white" : "black", fontSize: 20 }}
        value={taskString}
        onChangeText={(text) => setTaskString(text)}
      />
      <TouchableOpacity
        onPress={handleEdit}
        style={{
          backgroundColor: colors.cyanDark,
          paddingVertical: 3,
          paddingHorizontal: 10,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign name="check" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskEdit;
