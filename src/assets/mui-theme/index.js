import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5D93FF",
      complementary: "#2A71FF",
    },
    secondary: {
      main: "#F7A046",
      complementary: "#F58715",
    },
    error: {
      main: "#ff0052",
      complementary: "#FF5DE4",
    },
    success: {
      main: "#2AFF4D",
      complementary: "#5DFF78",
    },
  },
});

export default theme;
