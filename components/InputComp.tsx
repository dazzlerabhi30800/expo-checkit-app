import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useTodoSlice } from "@/context/Slice";
import { inputColors } from "@/utils/color";
import Feather from "@expo/vector-icons/Feather";

interface inputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  value: string;
  placeholderText: string;
}

const InputComp = ({ setState, value, type, placeholderText }: inputProps) => {
  const [focus, setFocus] = useState(false);
  const { theme } = useTodoSlice((state) => state);

  const { placeholder, inputColor, borderColor, borderColorFocus } =
    theme === "dark" ? inputColors.dark : inputColors.light;

  const [showPass, setShowPass] = useState(false);
  return (
    <View style={{ position: "relative" }}>
      <TextInput
        placeholder={placeholderText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholderTextColor={placeholder}
        keyboardType={type === "email" ? "email-address" : "default"}
        secureTextEntry={type === "password" && !showPass}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderWidth: 2,
          borderColor: focus ? borderColorFocus : borderColor,
          width: 300,
          borderRadius: 5,
          fontSize: 15,
          color: inputColor,
        }}
        value={value}
        onChangeText={(e) => setState(type === "email" ? e.toLowerCase() : e)}
        autoCapitalize={type === "email" ? "none" : "words"}
      />
      {type === "password" && (
        <TouchableOpacity
          onPress={() => setShowPass((prev) => !prev)}
          style={{ position: "absolute", top: 15, right: 10 }}
        >
          <Feather
            name={showPass ? "eye-off" : "eye"}
            size={18}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputComp;
