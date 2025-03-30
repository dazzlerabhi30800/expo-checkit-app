import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ViewWrapper from "@/components/ViewWrapper";
import { useTodoSlice } from "@/context/Slice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/utils/color";
import { supabase } from "@/utils/supabase/supabase";
import { router } from "expo-router";

const account = () => {
  const { user, theme } = useTodoSlice((state) => state);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <ViewWrapper>
      <View
        style={{
          borderRadius: "50%",
          backgroundColor: "#f73ea0",
          padding: 20,
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 50, color: "white", fontWeight: "600" }}>
          {user?.display_name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <Text
        style={{ color: theme === "dark" ? "white" : "black", fontSize: 25 }}
      >
        {user?.display_name}
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          width: 100,
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: theme === "dark" ? colors.lightBg : colors.darkBg,
        }}
      >
        <MaterialIcons
          size={30}
          name="logout"
          color={theme === "dark" ? colors.textlight : colors.textdark}
        />
      </TouchableOpacity>
    </ViewWrapper>
  );
};

export default account;
