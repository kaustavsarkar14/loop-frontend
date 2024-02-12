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
import { setUser } from "../state/AuthSlice";
import { Navigate, useNavigate } from "react-router-dom";
import {handleImageUpload} from "../utils/functions";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.auth.user)
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageName, setImageName] = useState(null);
  const [imagePath, setImagePath] = useState(null);


  const register = async () => {
    const data = {
      name,
      email,
      username,
      password,
      picturePath: imageName || "",
    };

    try {
      const response = await axios.post(BASE_URL + "/auth/register", data);
      console.log("this is res", response);
      toast.success("You're signed up!!");
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.error);
      toast.error("Some error occurred");
    }
  };
  const login = async () => {
    const data = { loginId: email, password };
    try {
      const response = await axios.post(BASE_URL + "/auth/login", data);
      console.log(response.data);
      toast.success("Logged in");
      dispatch(setUser(response.data));
      navigate('/')
    } catch (error) {
      toast.error("Some error occurred");
    }
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
  // if(user) return <Navigate to={"/"} />
  return (
    <div className="bg-[--bg-light] dark:bg-[--bg-dark] md:w-fit w-full mx-auto flex flex-col gap-3 px-3 h-screen items-center justify-center text-[--text-dark] dark:text-[--text-light]">
      <Toast />
      {!isLogin && (
        <div className="border border-[--border-light] flex justify-center items-center overflow-hidden h-32 w-32 rounded-full mb-5">
          {imagePath && (
            <img
              src={imagePath}
              className="h-full w-full object-cover"
              alt=""
            />
          )}
          <label htmlFor="picture" className="absolute">
            <AddPhotoAlternateOutlinedIcon />
          </label>
          <input
            type="file"
            id="picture"
            className="hidden"
            onInput={e=>handleImageUpload(e, setImagePath,setImageName)}
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
        {isLogin ? "Log in" : "Sign up"}
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
