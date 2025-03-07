// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";
import App from "./App";

function Root() {
  // Keep track of the current theme using React state
  const [theme, setTheme] = React.useState(lightTheme);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Pass toggleTheme to App as a prop (optional) */}
      <App toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
