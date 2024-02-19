import React from "react";
import VerificationCards from "./VerificationCards";

const Verification = () => {
  return (
    <div className="min-h-screen bg-[--bg-light] dark:bg-[--bg-dark] flex justify-center gap-6">
      <div className="border flex justify-center gap-2 border-[--border-dark] dark:border-[--border-light] min-h-screen md:w-[40%] w-full rounded-md p-2 ">
      <VerificationCards/>
      </div>
    </div>
  );
};

export default Verification;
