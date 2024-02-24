import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { SpinnerInfinity } from "spinners-react";

const Payment = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(99);
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const {
        data: { order },
      } = await axios.post(BASE_URL + "/payment/checkout", {
        amount,
      });
      const {
        data: { key },
      } = await axios.get(BASE_URL + "/key");

      var options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "LOOP",
        description: "LOOP - monthly subscription",
        image:
          "https://ih1.redbubble.net/image.463317902.1696/raf,360x360,075,t,fafafa:ca443f4786.jpg",
        order_id: order.id,
        callback_url: BASE_URL + "/payment/verify/" + user._id,
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
      toast.error("Payment failed");
    }
    setLoading(false);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button radius="full" variant="soft">
          Get verification badge
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Get verified</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Choose the right subscription for you:
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <div className="flex justify-between">
            <Card
              style={{
                width: "32%",
                backgroundColor: amount == 99 && "#1D2A51",
              }}
              onClick={() => setAmount(99)}
            >
              <Box>
                <Text as="div" size="2" weight="bold">
                  30 days
                </Text>
                <Text as="div" size="2" color="gray">
                  ₹99
                </Text>
              </Box>
            </Card>
            <Card
              style={{
                width: "32%",
                backgroundColor: amount == 149 && "#1D2A51",
              }}
              onClick={() => setAmount(149)}
            >
              <Box>
                <Text as="div" size="2" weight="bold">
                  75 days
                </Text>
                <Text as="div" size="2" color="gray">
                  ₹149
                </Text>
              </Box>
            </Card>
            <Card
              style={{
                width: "32%",
                backgroundColor: amount == 999 && "#1D2A51",
              }}
              onClick={() => setAmount(999)}
            >
              <Box>
                <Text as="div" size="2" weight="bold">
                  1 Year
                </Text>
                <Text as="div" size="2" color="gray">
                  ₹999
                </Text>
              </Box>
            </Card>
          </div>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          {/* <Dialog.Close> */}
          <Button variant="soft" onClick={handleCheckout}>
            {loading ? (
              <SpinnerInfinity
                color="white"
                secondaryColor="#545454"
                className="m-auto my-2"
                speed={200}
                size={30}
              />
            ) : (
              "Pay"
            )}
          </Button>
          {/* </Dialog.Close> */}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Payment;
