import React from "react";
import ReactDOM from "react-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import RTL from "./components/RTL";
import theme from "./theme";
const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {" "}
      <ThemeProvider theme={theme}>
        <RTL>
          <CssBaseline />
          {/* <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
          /> */}
          <App />
        </RTL>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
