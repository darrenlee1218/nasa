import App, { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "utils/theme";

const queryClient = new QueryClient();

class MyApp extends App<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />

          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    );
  }
}

export default MyApp;
