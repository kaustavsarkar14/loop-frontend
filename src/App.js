import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { ThemeProvider } from "@mui/material/styles";
import useMUITheme from "./hooks/useMUITheme";

function App() {
  const theme = useMUITheme();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
