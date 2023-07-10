import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";  //due to jsconfig.json, we can use absolute path , we dont have to use relative path "./"
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import {useMemo} from "react"
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode); //this will help us grab the value we created in initial state, this will get light or dark
  // if we ever want to grab information from the store, we just have to use useSelector, grab the state in the correct reducer
  
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]) //this will set up our theme

  //setting up routes
  return (
    // :userId is a param we can set, if we got profile/1, then userId = 1 and we hit the route ProfilePage
    <div className="app">
     <BrowserRouter>
     <ThemeProvider theme={theme}> {/* this will configure our theme for material ui */}
        <CssBaseline> {/* this resets the css */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />  
        </Routes>
        </CssBaseline>
      </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
