import { AlertDialog, Button, Flex, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { CLIENT_BASE_URL } from "../utils/constants";
import { Copy, CopyCheck } from "lucide-react";
import toast from "react-hot-toast";
import Toast from "./utils/Toast";

const ShareCard = ({ postId }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(`${CLIENT_BASE_URL}/post/${postId}`);
    toast.success("Link copied");
  }
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className=" w-full">
        <button className="text-start">Share</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <Toast/>
        <AlertDialog.Title>Share with friends</AlertDialog.Title>
        <AlertDialog.Description
          size="2"
          className="flex gap-2 w-full flex-col"
        >
          <div className="flex justify-between">
            <h1>Copy link : </h1>
            {!isCopied ? <Copy onClick={handleCopy} /> : <CopyCheck />}
          </div>
          <Flex direction="column" gap="3" className="w-full">
            <TextField.Input
              value={`${CLIENT_BASE_URL}/post/${postId}`}
              size="2"
              placeholder="Search the docs…"
            />
          </Flex>
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ShareCard;
