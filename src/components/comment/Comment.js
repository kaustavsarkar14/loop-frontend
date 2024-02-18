import React from "react";
import { calculateTime } from "../../utils/utilFunctions";

const Comment = ({ comment }) => {
  return (
    <div className=" flex gap-2 p-1 ">
      <div className="h-6 w-6 rounded-full overflow-hidden">
        <img
          src={comment.userId.picturePath}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
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
