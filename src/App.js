import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Routing from "./Routing/Routing";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Layout/Header";
import { makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";

// Used to fix coloring bug in material ui theme //
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {},
  },
}));
// Used to fix coloring bug in material ui theme //

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <React.StrictMode>
        <BrowserRouter
          style={{ position: "relative" }}
          className={classes.root}
        >
          <Header />
          <Routing />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  );
}
