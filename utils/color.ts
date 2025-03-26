export const colors = {
  darkBg: "#131218",
  lightBg: "white",
  textdark: "white",
  textlight: "#131218",
  googleBtnBg: "#4295fa",
  googleLogoColor: "#F4B400",
  cyan: "#48ffdb",
  cyanDark: "#04c6a0",
};

type inputColorObj = {
  placeholder: string;
  inputColor: string;
  borderColor: string;
  borderColorFocus: string;
};

interface modeColors<T> {
  dark: T;
  light: T;
}

export const inputColors: modeColors<inputColorObj> = {
  dark: {
    placeholder: "#d0cfce",
    inputColor: "white",
    borderColor: "#b2b0b0",
    borderColorFocus: "#befb90",
  },
  light: {
    placeholder: "#4f4e4d",
    inputColor: "black",
    borderColor: "#737373",
    borderColorFocus: "#91f943",
  },
};

interface buttoncolors {
  background: string;
  color: string;
}

export const submitButtonColors: modeColors<buttoncolors> = {
  dark: {
    background: "white",
    color: "black",
  },
  light: {
    background: "black",
    color: "white",
  },
};
