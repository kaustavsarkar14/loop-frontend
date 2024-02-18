import React from "react";
import { calculateTime } from "../../utils/utilFunctions";
import { Avatar } from "@radix-ui/themes";

const Comment = ({ comment }) => {
  return (
    <div className=" flex gap-2 p-1 ">
       <Avatar src={comment.userId.picturePath} fallback={comment.userId.name[0]} radius="full" size="2" />
      
      <div className="flex flex-col">
        <div className="flex gap-2" >
          <h1 className="text-sm font-bold">{comment.userId.name}</h1>
          <p className="opacity-55 text-sm" >• {calculateTime(comment.creationDateAndTime)}</p>
        </div>
        <p className="text-sm">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
