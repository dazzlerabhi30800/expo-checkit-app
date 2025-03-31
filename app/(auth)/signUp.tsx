import { View, Text, StyleSheet, Alert, AppState } from "react-native";
import React from "react";
import { useTodoSlice } from "@/context/Slice";
import { colors } from "@/utils/color";
import { useState } from "react";
import InputComp from "@/components/InputComp";
import SubmitBtnComp from "@/components/SubmitBtnComp";
import { Link, router } from "expo-router";
import { supabase } from "@/utils/supabase/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const index = () => {
  const { theme } = useTodoSlice((state) => state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { wrapper, text, dark, light } = styles;

  const handleAuth = async () => {
    setLoading(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name.length || !password.length) {
      Alert.alert("all fields are required");
      setLoading(false);
      return;
    }
    if (!email.match(emailRegex)) {
      Alert.alert("email is not valid");
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
      options: {
        data: {
          display_name: name,
        },
      },
    });
    if (error) {
      Alert.alert(error.message);
    }
    if (data && !error) {
      router.push("/confirm");
    }
    setLoading(false);
  };

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
        loading={loading}
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
