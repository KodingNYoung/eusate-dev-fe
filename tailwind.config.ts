import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      app: ["var(--font-app)"],
    },
    fontSize: {
      // weight- 400
      "regular-xxs": ["10px", { lineHeight: "11px", fontWeight: "400" }],
      "regular-xs": ["12px", { lineHeight: "15px", fontWeight: "400" }],
      "regular-sm": ["14px", { lineHeight: "17.5px", fontWeight: "400" }],
      "regular-base": ["16px", { lineHeight: "24px", fontWeight: "400" }],
      "regular-lg": ["18px", { lineHeight: "27px", fontWeight: "400" }],
      "regular-xl": ["20px", { lineHeight: "30px", fontWeight: "400" }],
      "regular-2xl": ["24px", { lineHeight: "36px", fontWeight: "400" }],
      "regular-3xl": ["30px", { lineHeight: "37.5px", fontWeight: "400" }],
      "regular-4xl": ["36px", { lineHeight: "45px", fontWeight: "400" }],
      "regular-5xl": ["48px", { lineHeight: "48px", fontWeight: "400" }],
      // weight- 500
      "medium-xxs": ["10px", { lineHeight: "11px", fontWeight: "500" }],
      "medium-xs": ["12px", { lineHeight: "15px", fontWeight: "500" }],
      "medium-sm": ["14px", { lineHeight: "17.5px", fontWeight: "500" }],
      "medium-base": ["16px", { lineHeight: "24px", fontWeight: "500" }],
      "medium-lg": ["18px", { lineHeight: "27px", fontWeight: "500" }],
      "medium-xl": ["20px", { lineHeight: "30px", fontWeight: "500" }],
      "medium-2xl": ["24px", { lineHeight: "36px", fontWeight: "500" }],
      "medium-3xl": ["30px", { lineHeight: "37.5px", fontWeight: "500" }],
      "medium-4xl": ["36px", { lineHeight: "45px", fontWeight: "500" }],
      "medium-5xl": ["48px", { lineHeight: "48px", fontWeight: "500" }],
      // weight- 600
      "semibold-xxs": ["10px", { lineHeight: "11px", fontWeight: "600" }],
      "semibold-xs": ["12px", { lineHeight: "15px", fontWeight: "600" }],
      "semibold-sm": ["14px", { lineHeight: "17.5px", fontWeight: "600" }],
      "semibold-base": ["16px", { lineHeight: "24px", fontWeight: "600" }],
      "semibold-lg": ["18px", { lineHeight: "27px", fontWeight: "600" }],
      "semibold-xl": ["20px", { lineHeight: "30px", fontWeight: "600" }],
      "semibold-2xl": ["24px", { lineHeight: "36px", fontWeight: "600" }],
      "semibold-3xl": ["30px", { lineHeight: "37.5px", fontWeight: "600" }],
      "semibold-4xl": ["36px", { lineHeight: "45px", fontWeight: "600" }],
      "semibold-5xl": ["48px", { lineHeight: "48px", fontWeight: "600" }],
      // weight- 700
      "bold-xxs": ["10px", { lineHeight: "11px", fontWeight: "700" }],
      "bold-xs": ["12px", { lineHeight: "15px", fontWeight: "700" }],
      "bold-sm": ["14px", { lineHeight: "17.5px", fontWeight: "700" }],
      "bold-base": ["16px", { lineHeight: "24px", fontWeight: "700" }],
      "bold-lg": ["18px", { lineHeight: "27px", fontWeight: "700" }],
      "bold-xl": ["20px", { lineHeight: "30px", fontWeight: "700" }],
      "bold-2xl": ["24px", { lineHeight: "36px", fontWeight: "700" }],
      "bold-3xl": ["30px", { lineHeight: "37.5px", fontWeight: "700" }],
      "bold-4xl": ["36px", { lineHeight: "45px", fontWeight: "700" }],
      "bold-5xl": ["48px", { lineHeight: "48px", fontWeight: "700" }],
      "bold-6xl": ["60px", { lineHeight: "60px", fontWeight: "700" }],
      "bold-7xl": ["72px", { lineHeight: "72px", fontWeight: "700" }],
      "bold-8xl": ["96px", { lineHeight: "96px", fontWeight: "700" }],
      "bold-9xl": ["128px", { lineHeight: "128px", fontWeight: "700" }],
    },
    backgroundImage: {
      "brand-gradient": "linear-gradient(90deg, #D7AB07 0%, #E86555 100%)",
    },
    colors: {
      red: {
        50: "#FDF0EE",
        100: "#F8CFCA",
        200: "#F4B8B1",
        300: "#F0988D",
        400: "#ED8477",
        500: "#E86555",
        600: "#D35C4D",
        700: "#A5483C",
        800: "#80382F",
        900: "#612A24",
      },
      gold: {
        50: "#FBF7E6",
        100: "#F3E5B2",
        200: "#EDD88D",
        300: "#E4C759",
        400: "#DFBC39",
        500: "#D7AB07",
        600: "#C49C06",
        700: "#997905",
        800: "#765E04",
        900: "#5A4803",
      },
      white: {
        5: "#FFFFFF0D",
        10: "#FFFFFF1A",
        15: "#FFFFFF26",
        20: "#FFFFFF33",
        30: "#FFFFFF4D",
        40: "#FFFFFF66",
        50: "#FFFFFF80",
        60: "#FFFFFF99",
        70: "#FFFFFFB2",
        80: "#FFFFFFCC",
        90: "#FFFFFFE5",
        100: "#FFFFFF",
      },
      black: {
        5: "#0A0A0A0D",
        10: "#0A0A0A1A",
        15: "#0A0A0A26",
        20: "#0A0A0A33",
        30: "#0A0A0A4D",
        40: "#0A0A0A66",
        50: "#0A0A0A80",
        60: "#0A0A0A99",
        70: "#0A0A0AB2",
        80: "#0A0A0ACC",
        90: "#0A0A0AE5",
        100: "#0A0A0A",
      },
      gray: {
        50: "#F0F1F3",
        100: "#D0D3D9",
        200: "#B9BDC7",
        300: "#989FAD",
        400: "#858D9D",
        500: "#667085",
        600: "#5D6679",
        700: "#48505E",
        800: "#383E49",
        900: "#2B2F38",
      },
      info: {
        50: "#EAF4FF",
        100: "#BEDDFD",
        200: "#9FCCFD",
        300: "#73B5FC",
        400: "#58A6FB",
        500: "#2E90FA",
        600: "#2A83E4",
        700: "#2166B2",
        800: "#194F8A",
        900: "#133C69",
      },
      error: {
        50: "#FEECEB",
        100: "#FAC5C1",
        200: "#F8A9A3",
        300: "#F5827A",
        400: "#F36960",
        500: "#F04438",
        600: "#DA3E33",
        700: "#AA3028",
        800: "#84251F",
        900: "#651D18",
      },
      warning: {
        50: "#FEF4E6",
        100: "#FDDDB3",
        200: "#FBCC8E",
        300: "#FAB55A",
        400: "#F9A63A",
        500: "#F79009",
        600: "#E18308",
        700: "#AF6606",
        800: "#884F05",
        900: "#683C04",
      },
      success: {
        50: "#E7F8F0",
        100: "#B6E9D1",
        200: "#92DEBA",
        300: "#60CF9B",
        400: "#41C588",
        500: "#12B76A",
        600: "#10A760",
        700: "#0D824B",
        800: "#0A653A",
        900: "#084D2D",
      },
      transparent: "transparent",
    },
    padding: {
      0: "0rem", // 0px
      0.5: "0.125rem", //2px
      1: "0.25rem", // 4px
      1.5: "0.375rem", // 6px
      2: "0.5rem", // 8px
      2.5: "0.625rem", // 10px
      3: "0.75rem", // 12px
      3.5: "0.875rem", // 12px
      4: "1rem", // 16px
      5: "1.25rem", // 20px
      6: "1.5rem", // 24px
      8: "2rem", // 32px
      10: "2.5rem", // 40px
      12: "3rem", // 48px
      16: "4rem", // 64px
      20: "5rem", // 80px
      24: "6rem", // 96px
      32: "8rem", // 128px
      40: "10rem", // 160px
      48: "12rem", // 192px
      56: "14rem", // 224px
      64: "16rem", // 256px
    },
    margin: {
      0: "0rem", // 0px
      0.5: "0.125rem", //2px
      1: "0.25rem", // 4px
      1.5: "0.375rem", // 6px
      2: "0.5rem", // 8px
      2.5: "0.625rem", // 10px
      3: "0.75rem", // 12px
      3.5: "0.875rem", // 12px
      4: "1rem", // 16px
      5: "1.25rem", // 20px
      6: "1.5rem", // 24px
      8: "2rem", // 32px
      10: "2.5rem", // 40px
      12: "3rem", // 48px
      16: "4rem", // 64px
      20: "5rem", // 80px
      24: "6rem", // 96px
      32: "8rem", // 128px
      40: "10rem", // 160px
      48: "12rem", // 192px
      56: "14rem", // 224px
      64: "16rem", // 256px
    },
    space: {
      0: "0rem", // 0px
      0.5: "0.125rem", //2px
      1: "0.25rem", // 4px
      1.5: "0.375rem", // 6px
      2: "0.5rem", // 8px
      2.5: "0.625rem", // 10px
      3: "0.75rem", // 12px
      3.5: "0.875rem", // 12px
      4: "1rem", // 16px
      5: "1.25rem", // 20px
      6: "1.5rem", // 24px
      8: "2rem", // 32px
      10: "2.5rem", // 40px
      12: "3rem", // 48px
      16: "4rem", // 64px
      20: "5rem", // 80px
      24: "6rem", // 96px
      32: "8rem", // 128px
      40: "10rem", // 160px
      48: "12rem", // 192px
      56: "14rem", // 224px
      64: "16rem", // 256px
    },
    gap: {
      0: "0rem", // 0px
      0.5: "0.125rem", //2px
      1: "0.25rem", // 4px
      1.5: "0.375rem", // 6px
      2: "0.5rem", // 8px
      2.5: "0.625rem", // 10px
      3: "0.75rem", // 12px
      3.5: "0.875rem", // 12px
      4: "1rem", // 16px
      5: "1.25rem", // 20px
      6: "1.5rem", // 24px
      8: "2rem", // 32px
      10: "2.5rem", // 40px
      12: "3rem", // 48px
      16: "4rem", // 64px
      20: "5rem", // 80px
      24: "6rem", // 96px
      32: "8rem", // 128px
      40: "10rem", // 160px
      48: "12rem", // 192px
      56: "14rem", // 224px
      64: "16rem", // 256px
    },
    inset: {
      0: "0rem", // 0px
      0.5: "0.125rem", //2px
      1: "0.25rem", // 4px
      1.5: "0.375rem", // 6px
      2: "0.5rem", // 8px
      2.5: "0.625rem", // 10px
      3: "0.75rem", // 12px
      3.5: "0.875rem", // 12px
      4: "1rem", // 16px
      5: "1.25rem", // 20px
      6: "1.5rem", // 24px
      8: "2rem", // 32px
      10: "2.5rem", // 40px
      12: "3rem", // 48px
      16: "4rem", // 64px
      20: "5rem", // 80px
      24: "6rem", // 96px
      32: "8rem", // 128px
      40: "10rem", // 160px
      48: "12rem", // 192px
      56: "14rem", // 224px
      64: "16rem", // 256px
    },
    boxShadow: {
      "soft-xxsmall": "0px 1.5px 4px -1px rgba(16, 25, 40, 0.07)",
      "soft-xsmall":
        "0px 5px 13px -5px rgba(16, 25, 40, 0.05), 0px 2px 4px -1px rgba(16, 25, 40, 0.02)",
      "soft-small": "0px 10px 18px -2px rgba(16, 25, 40, 0.07)",
      "soft-medium":
        "0px 14px 22px -9px rgba(16, 25, 40, 0.14), 0px 0px 3px -1px rgba(16, 25, 40, 0.04)",
      "soft-large":
        "0px 16px 24px -4px rgba(16, 25, 40, 0.08), 0px 4px 6px -2px rgba(16, 25, 40, 0.03)",
      "soft-xlarge":
        "0px 24px 32px -4px rgba(16, 25, 40, 0.08), 0px 8px 8px -4px rgba(16, 25, 40, 0.03)",
      "soft-xxlarge": "0px 32px 54px -12px rgba(16, 25, 40, 0.18)",
      "soft-xxxlarge": "0px 40px 72px -12px rgba(16, 25, 40, 0.14)",
      "hard-xxsmall":
        "0px 2px 5px -2px rgba(16, 25, 40, 0.06), 0px 2px 7px 0px rgba(16, 25, 40, 0.05), 0px 0px 0px 1px rgba(16, 25, 40, 0.05)",
      "hard-xsmall":
        "0px 2px 12px -1px rgba(16, 25, 40, 0.10), 0px 2px 2px -1px rgba(16, 25, 40, 0.04), 0px 0px 0px 1px rgba(16, 25, 40, 0.05)",
      "hard-small":
        "0px 6px 16px 0px rgba(16, 25, 40, 0.08), 0px 0px 0px 1px rgba(16, 25, 40, 0.05)",
      "hard-medium":
        "0px 16px 24px -6px rgba(16, 25, 40, 0.08), 0px 0px 3px -1px rgba(16, 25, 40, 0.04), 0px 0px 0px 1px rgba(16, 25, 40, 0.05)",
    },
    blur: {
      none: "",
      xsmall: "1px",
      small: "2px",
      medium: "4px",
      large: "8px",
      xlarge: "10px",
    },
    extend: {
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      },
    },
  },
  plugins: [],
}
export default config
