import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import InputComp from "@/components/InputComp";
import SubmitBtnComp from "@/components/SubmitBtnComp";
import { useTodoSlice } from "@/context/Slice";
import { colors } from "@/utils/color";
import { Link } from "expo-router";

const explorer = () => {
  const handleAuth = () => {
    Alert.alert("You are logged In!");
  };

  const { theme } = useTodoSlice((state) => state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { wrapper, text, dark, light } = styles;
  return (
    <View style={[wrapper, theme === "dark" ? dark : light]}>
      <Text style={[text, theme === "light" && { color: colors.textlight }]}>
        Login
      </Text>
      <InputComp
        setState={setEmail}
        type="email"
        value={email}
        placeholderText="Enter your email"
      />
      <InputComp
        setState={setPassword}
        type="password"
        value={password}
        placeholderText="Enter your password"
      />
      <SubmitBtnComp
        onPress={handleAuth}
        title="Login"
        theme={theme as "light" | "dark"}
      />
      <View style={{ flexDirection: "row", gap: 2 }}>
        <Text
          style={{ color: theme === "dark" ? "white" : "black", fontSize: 15 }}
        >
          Not Registered?
        </Text>
        <Link
          style={{
            color: theme === "dark" ? colors.cyan : colors.cyanDark,
            fontWeight: "700",
            fontSize: 15,
            textDecorationLine: "underline",
          }}
          href={"/signUp"}
        >
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default explorer;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 20,
  },
  dark: {
    backgroundColor: colors.darkBg,
  },
  light: {
    backgroundColor: colors.lightBg,
  },
  text: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
  },
  formWrapper: {
    gap: 15,
  },
});
