import React, { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { createComment, getCommets } from "../../utils/commentFunctions";
import { useSelector } from "react-redux";
import { TextField } from "@radix-ui/themes";
import { SendHorizontal } from "lucide-react";

const CommentList = ({ comment }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [commentSendLoading, setCommentSendLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const replyInput = useRef();
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
      setComments: setReplies,
      setIsReplying, setShowReplies
    });
  };
  console.log("first", replies);
  return (
    <div>
      <div className="border mb-2 border-[--border-dark] dark:border-[--border-light] rounded-md">
        <Comment comment={comment} />
        {isReplying ? (
          <div className="relative p-3">
            <TextField.Input
              ref={replyInput}
              radius="full"
              placeholder="Enter your email"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button
              onClick={handleReply}
              className="absolute top-1/2 -translate-y-1/2 right-6"
            >
              <SendHorizontal opacity={commentSendLoading ? 0.5 : 1} />
            </button>
          </div>
        ) : (
          <div>
           {replies.length > 0 && <button
              className="text-xs ml-10 font-semibold mb-2"
              onClick={() => {
                setShowReplies(true);
              }}
            >
               <p>{replies.length} Replies</p>
            </button>}
            <button
              className="text-xs ml-10 font-semibold mb-2"
              onClick={() => {
                setIsReplying(true);
                setTimeout(() => {
                  replyInput.current.focus();
                }, 0);
              }}
            >
              Reply
            </button>
          </div>
        )}
      </div>
      {showReplies && (
        <div className="pl-3 border-l border-[--border-dark] dark:border-[--border-light]">
          {replies.length > 0 &&
            replies.map((reply) => (
              <CommentList key={reply._id} comment={reply} />
            ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
