import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { useTodoSlice } from "@/context/Slice";
import { colors } from "@/utils/color";

const Header = () => {
  const { header, image, headerDark, headerLight } = styles;
  const { theme, setTheme } = useTodoSlice((state) => state);
  return (
    <View style={[header, theme === "dark" ? headerDark : headerLight]}>
      <View>
        <Image
          source={
            theme === "dark"
              ? require("../assets/images/logo-dark.png")
              : require("../assets/images/logo-light.png")
          }
          alt="Check it"
          style={[image, { objectFit: "cover" }]}
        />
      </View>
      <TouchableOpacity onPress={setTheme}>
        <Feather
          name={theme === "dark" ? "sun" : "moon"}
          color={theme === "dark" ? "white" : "black"}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight
      ? StatusBar?.currentHeight + 20
      : StatusBar.currentHeight,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerDark: {
    backgroundColor: colors.darkBg,
  },
  headerLight: {
    backgroundColor: colors.lightBg,
  },
  headerText: {
    fontSize: 20,
    color: colors.textdark,
  },
  headerTextDark: {
    fontSize: 20,
    color: colors.textlight,
  },
  image: {
    width: 30,
    height: 30,
    objectFit: "cover",
  },
});
