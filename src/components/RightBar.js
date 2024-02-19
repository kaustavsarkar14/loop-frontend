import React from "react";
import VerificationCards from "./VerificationCards";

const RightBar = () => {
  return (
    <div className="md:block hidden rounded-md h-fit  w-[20rem] sticky top-12 overflow-hidden">
      <VerificationCards />
    </div>
  );
};

export default RightBar;
