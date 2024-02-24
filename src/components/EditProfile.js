import {
  AspectRatio,
  Avatar,
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PLACEHOLDER_BANNER } from "../utils/constants";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { editProfile } from "../utils/profileFunctions";
import Toast from "./utils/Toast";
import { SpinnerInfinity } from "spinners-react";

const EditProfile = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [newBanner, setNewBanner] = useState(null);
  const [newBannerFile, setNewBannerFile] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newProfileImageFile, setNewProfileImageFile] = useState(null);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newBio, setNewBio] = useState(user.bio);
  const [occupation, setOccupation] = useState(user.occupation);
  const [location, setLocation] = useState(user.location);
  const [isLoading, setIsLoading] = useState(false);

  const handleBannerImageInput = (e) => {
    setNewBanner(URL.createObjectURL(e.target.files[0]));
    setNewBannerFile(e.target.files[0]);
  };
  const handleProfileImageInput = (e) => {
    console.log(e.target.files[0]);
    setNewProfileImage(URL.createObjectURL(e.target.files[0]));
    setNewProfileImageFile(e.target.files[0]);
  };
  const handleSaveButtonClick = () => {
    editProfile({
      token,
      newName,
      newEmail,
      newUsername,
      newBio,
      occupation,
      location,
      newProfileImageFile,
      newBannerFile,
      setIsLoading,
    });
  };
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className="p-1 px-3 border rounded-full h-fit mt-12">
            Edit profile
          </button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Toast />
          <Dialog.Title>Edit profile</Dialog.Title>
          <Flex direction="column" gap="3">
            <AspectRatio ratio={16 / 4}>
              <label
                htmlFor="bannerPicture"
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
              >
                <div className="p-3 bg-black bg-opacity-40 rounded-full">
                  <AddPhotoAlternateOutlinedIcon />
                </div>
              </label>
              <input
                type="file"
                id="bannerPicture"
                className="hidden"
                onInput={handleBannerImageInput}
              />
              <img
                src={newBanner || user.bannerPath || PLACEHOLDER_BANNER}
                alt="A house in a forest"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "var(--radius-2)",
                }}
              />
            </AspectRatio>
            <div className="flex justify-center items-center relative">
              <label
                htmlFor="profilePicture"
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
              >
                <div className="p-3 bg-black bg-opacity-40 rounded-full z-10">
                  <AddPhotoAlternateOutlinedIcon />
                </div>
              </label>
              <input
                type="file"
                id="profilePicture"
                className="hidden"
                onInput={handleProfileImageInput}
              />
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                <img
                  className="wfull h-full object-cover"
                  src={newProfileImage || user.picturePath}
                />
              </div>
            </div>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                value={newName}
                placeholder="Enter your name"
                onChange={(e) => setNewName(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Username
              </Text>
              <TextField.Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </label>
            <div className="flex gap-4">
              <label className="w-1/2">
                <Text as="div" size="2" mb="1" weight="bold">
                  Location
                </Text>
                <TextField.Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                />
              </label>
              <label className="w-1/2">
                <Text as="div" size="2" mb="1" weight="bold">
                  Occupation
                </Text>
                <TextField.Input
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="Occupation"
                />
              </label>
            </div>
            <TextArea
              value={newBio}
              maxLength={280}
              onChange={(e) => setNewBio(e.target.value)}
              placeholder="Add bio"
            />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button variant="soft" onClick={handleSaveButtonClick} disabled={isLoading}>
              {isLoading ? (
                <SpinnerInfinity
                  color="white"
                  secondaryColor="#545454"
                  className="m-auto my-2"
                  speed={200}
                  size={30}
                />
              ) : (
                "Save"
              )}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default EditProfile;
