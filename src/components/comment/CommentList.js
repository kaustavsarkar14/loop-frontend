import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { createComment, getCommets } from "../../utils/commentFunctions";
import { useSelector } from "react-redux";

const CommentList = ({ comment }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [replies, setReplies] = useState([]);
  const [commentSendLoading, setCommentSendLoading] = useState(false);
  const [reply, setReply] = useState("");
  useEffect(() => {
    getCommets({ postId: comment._id, setComments: setReplies });
  }, []);

  const handleReply = () => {
    createComment({
      postId: comment._id,
      comment: reply,
      token,
      user,
      setCommentSendLoading,
    });
  };
  console.log("first", replies);
  return (
    <div>
      <Comment comment={comment} />
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="bg-transparent"
      />
      <button onClick={handleReply}>Reply</button>
      <div className="pl-3 border-l-2">
        {replies.length > 0 &&
          replies.map((reply) => (
            <CommentList key={reply._id} comment={reply} />
          ))}
      </div>
    </div>
  );
};

export default CommentList;
