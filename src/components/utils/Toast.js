import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const Toast = () => {
    const theme = useSelector(state=>state.app.theme)
  return (
    <Toaster
      toastOptions={{
        className: "",
        style: {
          border: "1px solid #3B82F6",
          padding: "10px 16px",
          color: "white",
          backgroundColor:theme==="dark"?"black":"white",
        },
        iconTheme: {
            primary: '#3B82F6',
            secondary: 'white',
          },
      }}
    />
  );
};

export default Toast;
