import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { useTodoSlice } from "@/context/Slice";
import { colors } from "@/utils/color";
import { useState } from "react";
import InputComp from "@/components/InputComp";
import SubmitBtnComp from "@/components/SubmitBtnComp";
import { Link } from "expo-router";

const index = () => {
  const handleAuth = () => {
    Alert.alert("You are signed in using Google");
  };

  const { theme } = useTodoSlice((state) => state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { wrapper, text, dark, light } = styles;

  return (
    <View style={[wrapper, theme === "dark" ? dark : light]}>
      <Text style={[text, theme === "light" && { color: colors.textlight }]}>
        First time? sign up
      </Text>
      <InputComp
        setState={setName}
        type="text"
        value={name}
        placeholderText="Enter your name"
      />
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
        title="Sign Up"
        theme={theme as "light" | "dark"}
      />
      <View style={{ flexDirection: "row", gap: 2 }}>
        <Text
          style={{ color: theme === "dark" ? "white" : "black", fontSize: 15 }}
        >
          Already Registered?
        </Text>
        <Link
          style={{
            color: theme === "dark" ? colors.cyan : colors.cyanDark,
            fontWeight: "700",
            fontSize: 15,
            textDecorationLine: "underline",
          }}
          href={"/login"}
        >
          Login
        </Link>
      </View>
    </View>
  );
};

export default index;

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
