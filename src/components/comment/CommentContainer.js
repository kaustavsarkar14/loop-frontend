import { Flex, TextField } from "@radix-ui/themes";
import { SendHorizontal } from "lucide-react";
import { createComment, getCommets } from "../../utils/commentFunctions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentList from "./CommentList";
import toast from "react-hot-toast";

const CommentContainer = ({ post }) => {
  const [comment, setComment] = useState("");
  const { user, token } = useSelector((state) => state.auth);
  const [commentSendLoading, setCommentSendLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const handleSendComment = () => {
    if(!user) return toast.error("Please login first");
    createComment({
      postId: post._id,
      comment,
      token,
      user,
      setCommentSendLoading, setComments, setComment
    });
  };
  useEffect(() => {
    getCommets({ postId: post._id, setComments });
  }, []);
  return (
    <div className="border relative flex flex-col gap-2 p-2 mt-2 mb-3 dark:border-[--border-light] rounded-md  ">
      <TextField.Input
      radius="full"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={commentSendLoading || comment==''}
        className="absolute right-4  px-1 mt-1 opacity-90 disabled:opacity-40"
        onClick={handleSendComment}
      >
        <SendHorizontal opacity={commentSendLoading ? 0.5 : 1} />
      </button>
      {comments.map((comment) => (
        <CommentList key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentContainer;
