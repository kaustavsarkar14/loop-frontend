import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { ThemeProvider } from "@mui/material/styles";
import useMUITheme from "./hooks/useMUITheme";
import useUserFromToken from "./hooks/useUserFromToken";
import Protected from "./components/utils/Protected";
import useAllPosts from "./hooks/useAllPosts";
import Toast from "./components/utils/Toast";
import SearchPage from "./pages/SearchPage";
import VerificationPage from "./pages/VerificationPage";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  const theme = useMUITheme();
  useUserFromToken();
  useAllPosts()
  return (
    <ThemeProvider theme={theme}>
      <div className="dark:bg-[--bg-dark] bg-[--bg-light] min-h-screen text-[--text-dark] dark:text-[--text-light]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
        <Toast/>
      </div>
    </ThemeProvider>
  );
}

export default App;
