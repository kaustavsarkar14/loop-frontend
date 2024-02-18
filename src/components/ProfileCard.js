import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({user}) => {
  return (
    <Link to={`/profile/${user._id}`} >
      <Card >
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            src={user.picturePath}
            radius="full"
            fallback={user.name[0]}
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {user.name}
            </Text>
            <Text as="div" size="2" color="gray">
              @{user.username}
            </Text>
          </Box>
        </Flex>
      </Card>
            </Link>
  );
};

export default ProfileCard;
