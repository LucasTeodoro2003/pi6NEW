/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Jakarta: ['"Jakarta Sans"', "sans-serif"],
      },
    //   colors: {
    //     light: {
    //       background: {
    //         primary: "#F6F8FA",
    //         secondary: "#fafeff",
    //         100: "#eeeeee",
    //       },
          colors: {
            primary: "#0286FF",
          },
    //       text: {
    //         primary: "#121212",
    //         100: "#0d0db7",
    //         200: "#9ca3af",
    //         300: "#171717",
    //       },
    //       focus: {
    //         primary: "#EEEEEE",
    //         100: "#0286FF",
    //         200: "#0C1C67",
    //       },
    //       border: {
    //         prymary: "#303030",
    //       },
    //       shadows: {
    //         100: "#c9c9d3",
    //       },
    //     },
    //     dark: {
    //       background: {
    //         primary: "#1e1e1e",
    //         secondary: "#303030",
    //       },
    //       button: {
    //         primary: "#0C1C67",
    //       },
    //       text: {
    //         primary: "#fafafa",
    //         100: "#1e1aff",
    //         200: "#9ca3af",
    //       },
    //       focus: {
    //         primary: "#5A5A5A",
    //         100: "#0C1C67",
    //       },
    //       border: {
    //         prymary: "#303030",
    //       },
    //       shadows: {
    //         100: "#050425",
    //       },
    //     },
    //     success: {
    //       100: "#F0FFF4",
    //       200: "#C6F6D5",
    //       300: "#9AE6B4",
    //       400: "#68D391",
    //       500: "#38A169",
    //       600: "#2F855A",
    //       700: "#276749",
    //       800: "#22543D",
    //       900: "#1C4532",
    //     },
    //     danger: {
    //       100: "#FFF5F5",
    //       200: "#FED7D7",
    //       300: "#FEB2B2",
    //       400: "#FC8181",
    //       500: "#F56565",
    //       600: "#E53E3E",
    //       700: "#C53030",
    //       800: "#9B2C2C",
    //       900: "#742A2A",
    //     },
    //     warning: {
    //       100: "#FFFBEB",
    //       200: "#FEF3C7",
    //       300: "#FDE68A",
    //       400: "#FACC15",
    //       500: "#EAB308",
    //       600: "#CA8A04",
    //       700: "#A16207",
    //       800: "#854D0E",
    //       900: "#713F12",
    //     },
    //     general: {
    //       100: "#CED1DD",
    //       200: "#858585",
    //       300: "#EEEEEE",
    //       400: "#5a5a5a",
    //       500: "#F6F8FA",
    //       600: "#E6F3FF",
    //       700: "#EBEBEB",
    //       800: "#ADADAD",
    //     },
    //   },
    },
  },
  darkMode: "selector",
  plugins: [],
  extends: ["@feature-sliced"],
};
