import React from "react";
import Navbar from "../components/Navbar";
import { BadgeCheck } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div>
      <div className="flex flex-col relative">
        <Navbar />
        <div className="min-h-screen bg-[--bg-light] dark:bg-[--bg-dark] flex justify-center gap-8">
          <div className="border flex flex-col justify-start items-center gap-2 border-[--border-dark] dark:border-[--border-light] min-h-screen md:w-[40%] w-full rounded-md p-4 ">
            <div className="mt-10">
              <BadgeCheck size="60" />
            </div>
            <h1 className="font-semibold">Payment success!!</h1>
            <p>Congratulations !! you're a verified user</p>
            <Link className="mt-3" to={'/'}>
              <Button radius="full" variant="soft">
                Go back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
