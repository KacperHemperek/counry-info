import { createContext } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Global.styled";
import { useDarkMode } from "./hooks/useDarkTheme";
import { lightTheme, darkTheme } from "./Theme.styled";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./interface/Context";

import Navbar from "./components/Navbar";
import Homepage from "./views/Homepage";
import CountryDetails from "./views/CountryDetails";

export const ThemeContext = createContext<Context>({} as Context);

function App() {
  const [theme, toggleTheme, mountedComponent] = useDarkMode();

  if (!mountedComponent) return <div />;

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <GlobalStyles />
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="country/:name" element={<CountryDetails />} />
          </Routes>
        </ThemeContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
