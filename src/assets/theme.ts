import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
    secondary: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
    divider: "rgba(148, 163, 184, 0.1)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 20px",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1e293b",
          border: "1px solid rgba(148, 163, 184, 0.1)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
          boxShadow: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: "color 0.2s ease-in-out",
          "&:hover": {
            color: "#60a5fa",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          border: "1px solid rgba(148, 163, 184, 0.1)",
          backgroundColor: "rgba(30, 41, 59, 0.5)",
          backdropFilter: "blur(8px)",
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
