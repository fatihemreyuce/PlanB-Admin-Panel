import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        planb: {
          main: "var(--planb-main)",
          chocolate: "var(--planb-chocolate)",
          orange: "var(--planb-orange)",
          cream: "var(--planb-cream)",
          green: "var(--planb-green)",
          red: "var(--planb-red)",
          background: "var(--planb-background)",
          white: "var(--planb-white)",
          "grey-1": "var(--planb-grey-1)",
          "grey-2": "var(--planb-grey-2)",
          "grey-3": "var(--planb-grey-3)",
          "white-50": "var(--planb-white-50)",
          "white-25": "var(--planb-white-25)",
          "white-10": "var(--planb-white-10)",
          "main-5": "var(--planb-main-5)",
        },
        sidebar: {
          "dark-blue": "var(--sidebar-dark-blue)",
          orange: "var(--sidebar-orange)",
          inactive: "var(--sidebar-inactive)",
          "bg-top": "var(--sidebar-bg-top)",
          "bg-bottom": "var(--sidebar-bg-bottom)",
        },
        dashboard: {
          primary: "var(--dashboard-primary)",
          accent: "var(--dashboard-accent)",
          text: "var(--dashboard-text)",
          "bg-main": "var(--dashboard-bg-main)",
          "bg-card": "var(--dashboard-bg-card)",
          input: "var(--dashboard-input)",
          logout: "var(--dashboard-logout)",
        },
        chart: {
          orange: "var(--chart-orange)",
          "dark-orange": "var(--chart-dark-orange)",
          brown: "var(--chart-brown)",
          "light-grey": "var(--chart-light-grey)",
          "muted-brown": "var(--chart-muted-brown)",
        },
      },
      backgroundImage: {
        "gradient-linear-1": "var(--gradient-linear-1)",
        "gradient-linear-2": "var(--gradient-linear-2)",
        "gradient-linear-3": "var(--gradient-linear-3)",
        "gradient-linear-4": "var(--gradient-linear-4)",
        "gradient-linear-5": "var(--gradient-linear-5)",
        "gradient-linear-6": "var(--gradient-linear-6)",
        "gradient-linear-7": "var(--gradient-linear-7)",
        "sidebar-gradient":
          "linear-gradient(180deg, var(--sidebar-bg-top) 0%, var(--sidebar-bg-bottom) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
