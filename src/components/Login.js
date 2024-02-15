import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  validateLoginData,
  validateSignUpData,
} from "../utils/validateFormData";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Toast from "./utils/Toast";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthLoading, setUser } from "../state/AuthSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { clearPosts, setLoading } from "../state/PostSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isButtonLoading, setButtonLoading] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageInput = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const register = async () => {
    setButtonLoading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "loop-profile-images");
      data.append("cloud_name", "dujoneujx");
      const cld = await axios.post(
        "https://api.cloudinary.com/v1_1/dujoneujx/upload",
        data
      );
      const body = {
        name,
        email,
        username,
        password,
        picturePath: cld.data.secure_url || "",
      };
      const response = await axios.post(BASE_URL + "/auth/register", body);
      console.log("this is res", response);
      toast.success("You're signed up!!");
      setIsLogin(true);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.error);
      toast.error("Some error occurred");
    }
    setButtonLoading(false);
  };
  const login = async () => {
    setButtonLoading(true);
    const data = { loginId: email, password };
    try {
      const response = await axios.post(BASE_URL + "/auth/login", data);
      console.log(response.data);
      toast.success("Logged in");
      dispatch(setUser(response.data));
      dispatch(clearPosts());
      dispatch(setAuthLoading(false));
      dispatch(setLoading(true));
      navigate("/");
    } catch (error) {
      toast.error("Some error occurred");
    }
    setButtonLoading(false);
  };
  const handleLoginAndSignUp = () => {
    if (isLogin) {
      const error = validateLoginData({ loginId: email, password });
      if (error) return setError(error);
      setError(null);
      login();
    } else {
      const error = validateSignUpData({
        name,
        email,
        password,
        username,
        confirmPassword,
      });
      if (error) return setError(error);
      setError(null);
      register();
    }
  };
  if (user) return <Navigate to={"/"} />;
  return (
    <div className="bg-[--bg-light] dark:bg-[--bg-dark] md:w-fit w-full mx-auto flex flex-col gap-3 px-3 h-screen items-center justify-center text-[--text-dark] dark:text-[--text-light]">
      <Toast />
      {!isLogin && (
        <div className="border border-[--border-light] flex justify-center items-center overflow-hidden h-32 w-32 rounded-full mb-5">
          {image && (
            <img src={image} className="h-full w-full object-cover" alt="" />
          )}
          <label htmlFor="picture" className="absolute">
            <AddPhotoAlternateOutlinedIcon />
          </label>
          <input
            type="file"
            id="picture"
            className="hidden"
            onInput={handleImageInput}
          />
        </div>
      )}
      {!isLogin && (
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            label="Name"
            id="fullWidth"
          />
        </Box>
      )}
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label={isLogin ? "Email / Username" : "Email"}
          id="fullWidth"
        />
      </Box>
      {!isLogin && (
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            label="Username"
            id="fullWidth"
          />
        </Box>
      )}
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          label="Password"
          type="password"
          id="fullWidth"
        />
      </Box>
      {!isLogin && (
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            type="password"
            label="Password"
            id="fullWidth"
          />
        </Box>
      )}
      <p className="text-red-500">{error}</p>
      <button
        onClick={handleLoginAndSignUp}
        className="font-semibold w-full text-[--text-dark] dark:text-[--text-light] border border-[--border-dark] dark:border-[--border-light] py-3 px-4 rounded-md mt-3"
      >
        {isButtonLoading ? "loading..." : isLogin ? "Log in" : "Sign up"}
      </button>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Log in"}
        </span>
      </p>
    </div>
  );
};

export default Login;
