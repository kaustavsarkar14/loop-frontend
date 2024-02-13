import { AlertDialog, Flex, Button } from "@radix-ui/themes";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../state/AuthSlice";
import { useNavigate } from "react-router-dom";
import { clearPosts, setLoading } from "../state/PostSlice";

const LogoutAlert = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearPosts());
    dispatch(setLoading(true));
    navigate("/");
  };
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button>Logout</button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Log out</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This application will no longer be accessible and any
            existing sessions will be expired.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleLogout}>
                Log out
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default LogoutAlert;
