import { Text, GestureResponderEvent, TouchableOpacity } from "react-native";
import React from "react";
import { submitButtonColors } from "@/utils/color";

type btnProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  theme: "dark" | "light";
  loading: boolean;
};

const SubmitBtnComp = ({ onPress, title, theme, loading }: btnProps) => {
  const { background, color } = submitButtonColors[theme];
  return (
    <TouchableOpacity
      style={{
        backgroundColor: background,
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: 300,
        alignItems: "center",
        borderRadius: 5,
        opacity: loading ? 0.7 : 1,
      }}
      disabled={loading}
      onPress={onPress}
    >
      <Text style={{ color: color, fontSize: 20, fontWeight: "600" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitBtnComp;
