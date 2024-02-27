import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import useAppTheme from "./hooks/useAppTheme";
import useUserFromToken from "./hooks/useUserFromToken";
import useAllPosts from "./hooks/useAllPosts";
import Toast from "./components/utils/Toast";
import SearchPage from "./pages/SearchPage";
import VerificationPage from "./pages/VerificationPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import SinglePostPage from "./pages/SinglePostPage";
import useFetchNewUser from "./hooks/useFetchNewUsers";

function App() {
  useAppTheme();
  useUserFromToken();
  useAllPosts();
  useFetchNewUser()
  return (
      <div className="dark:bg-[--bg-dark] bg-[--bg-light] min-h-screen text-[--text-dark] dark:text-[--text-light]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/post/:id" element={<SinglePostPage />} />
        </Routes>
        <Toast />
      </div>
  );
}

export default App;
