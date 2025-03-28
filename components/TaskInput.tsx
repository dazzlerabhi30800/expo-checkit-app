import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors, inputColors } from "@/utils/color";
import { useTodoSlice } from "@/context/Slice";
import { theme } from "@/utils/type";
import { supabase } from "@/utils/supabase/supabase";

const TaskInput = () => {
  const { inputContainer, inputStyle, btnStyle } = styles;
  const [todoString, setTodoString] = useState("");
  const { theme, todos, user, setTodos } = useTodoSlice((state) => state);
  const { placeholder, inputColor, borderColor } = inputColors[theme as theme];

  const handleAddTodo = async () => {
    if (!todoString.length) {
      Alert.alert("task input cannot be empty");
      return;
    }
    const { data, error } = await supabase
      .from("Tasks")
      .insert([
        {
          position: todos.length + 1,
          task: todoString,
          completed: false,
          createdBy: user?.email,
        },
      ])
      .select("*");
    if (error) {
      Alert.alert(error.message);
    }
    if (!error && data) {
      setTodos([...todos, { ...data[0] }]);
    }
    setTodoString("");
  };

  return (
    <View style={inputContainer}>
      <TextInput
        style={[inputStyle, { color: inputColor, borderColor: borderColor }]}
        value={todoString}
        placeholder="Add your task"
        placeholderTextColor={placeholder}
        onChangeText={(text) => setTodoString(text)}
      />
      <TouchableOpacity onPress={handleAddTodo} style={btnStyle}>
        <FontAwesome5 name="telegram-plane" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    padding: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    fontSize: 20,
    borderWidth: 2,
    borderRightWidth: 0,
  },
  btnStyle: {
    backgroundColor: colors.cyan,
    padding: 15,
    borderEndStartRadius: 5,
    borderEndEndRadius: 5,
  },
});
