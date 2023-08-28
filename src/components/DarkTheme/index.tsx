import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976D2", // Adjust this color to your preference
    },
    background: {
      default: "#121212", // Adjust this color to your preference
    },
  },
});

export default darkTheme;
