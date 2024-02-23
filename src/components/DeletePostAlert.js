import { AlertDialog, Flex, Button } from "@radix-ui/themes";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDeletePost } from "../utils/functions";

const DeletePostAlert = ({ postId }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch()
  const handleDeleteButtonClick = () => {
    handleDeletePost({ postId, token, dispatch });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className=" w-full">
        <button className="text-start">Delete</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete post</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure to delete this post?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleDeleteButtonClick}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeletePostAlert;
