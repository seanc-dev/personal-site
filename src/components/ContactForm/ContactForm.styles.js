import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    "&:hover": { color: theme.palette.primary.main, background: "none" },
  },
  clearButton: {
    "&:hover": { color: theme.palette.secondary.main, background: "none" },
  },
  confirmIcon: {
    color: theme.palette.success.main,
  },
  errorMessage: {
    color: theme.palette.error.main,
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 300,
  },
  spinner: {
    width: "10%",
  },
  sendConfirmationContainer: {
    "& div": {
      display: "flex",
      justifyContent: "center",
      "& h2": {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: "0.5rem",
      },
    },
  },
}));

export default useStyles;
