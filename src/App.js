import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { ThemeProvider } from "@mui/material/styles";
import useMUITheme from "./hooks/useMUITheme";
import useUserFromToken from "./hooks/useUserFromToken";
import Protected from "./components/utils/Protected";

function App() {
  const theme = useMUITheme();
  useUserFromToken()
  return (
    <ThemeProvider theme={theme}>
      <div className="dark:bg-[--bg-dark] bg-[--bg-light] min-h-screen" >
        <Routes>
          <Route path="/" element={<Protected><HomePage /></Protected>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
