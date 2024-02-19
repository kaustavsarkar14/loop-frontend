import { Button, Card } from "@radix-ui/themes";
import axios from "axios";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const VerificationCards = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [isMailSent, setIsMailSent] = useState(false);
  const handleCheckout = async (amount) => {
    try {
        const {
            data: { order },
          } = await axios.post(BASE_URL+"/payment/checkout", {
            amount:600,
          });
          const {
            data: { key },
          } = await axios.get(BASE_URL+"/key");
      
          var options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "LOOP",
            description: "LOOP - monthly subscription",
            image: "https://ih1.redbubble.net/image.463317902.1696/raf,360x360,075,t,fafafa:ca443f4786.jpg",
            order_id: order.id,
            callback_url: BASE_URL +"/payment/verify/"+user._id,
            prefill: {
              name: "test user",
              email: "pubggamer9762@gmail.com",
              contact: "9000090000",
            },
            notes: {
              address: "Metaverse",
            },
            theme: {
              color: "#000000",
            },
            method: "upi",
          };
      
          const razor = new window.Razorpay(options);
          razor.open();
    } catch (error) {
        toast.error("Payment failed")
    }
  };
  const handleEmailVerify = async () => {
    try {
      await axios.post(
        BASE_URL + "/user/verifyemail",
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsMailSent(true);
      toast.success(
        "A verification email has been sent to your registered email"
      );
    } catch (error) {
      toast.error("There was some problem. Please try again later.");
    }
  };
  return (
    <div className="border p-2 rounded-md h-fit border-[--border-dark] dark:border-[--border-light] w-full sticky top-12 overflow-hidden">
      {!user && (
        <div className="bg-gray-600 bg-opacity-30 absolute h-full w-full top-0 left-0 flex justify-center items-center backdrop-blur-sm z-20">
          <Link to={"/login"}>
            <button className="text-white dark:text-black bg-white dark:bg-white font-semibold py-1 px-5 rounded-full">
              Login
            </button>
          </Link>
        </div>
      )}
      {user ? (
        <div className="flex flex-col gap-2">
          <Card>
            <div className="flex flex-col gap-6">
              <h1 className="text-center">
                {user.isEmailVerified
                  ? "Your email is verified"
                  : "Your email is not verified"}
              </h1>
              {user.isEmailVerified ? (
                <ShieldCheck className="m-auto" size="3rem" />
              ) : (
                <Button
                  radius="full"
                  variant="soft"
                  onClick={handleEmailVerify}
                  color={isMailSent && "cyan"}
                >
                  {isMailSent ? "Mail sent" : "Verify Email"}
                </Button>
              )}
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-6">
              <h1 className="text-center">
                {user.isVerified
                  ? "You're a verified user!!"
                  : "Get verification badge to enjoy premium benefits"}
              </h1>
              {user.isVerified ? (
                <BadgeCheck className="m-auto" size="3rem" />
              ) : (
                <Button radius="full" variant="soft" onClick={handleCheckout}>
                  Get verification badge
                </Button>
              )}
            </div>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Card>
            <h1>Your email is not verified</h1>
            <button>Verify email</button>
          </Card>
          <Card>
            <h1>Get verification badge to enjoy premium benefits</h1>
            <button>Get verified now</button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VerificationCards;
