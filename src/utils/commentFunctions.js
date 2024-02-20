import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "./constants";

export const createComment = async ({
  postId,
  comment,
  token,
  user,
  setCommentSendLoading,
  setComments,
  setIsReplying,
  setShowReplies,setComment
}) => {
  setCommentSendLoading(true);
  try {
    const response = await axios.post(
      BASE_URL + "/comment/create",
      {
        parentId: postId,
        comment,
        userId: user._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setComment('')
    setComments((comments) => [response.data, ...comments]);
    if (setIsReplying) setIsReplying(false);
    if (setShowReplies) setShowReplies(true);
    toast.success("Comment sent");
  } catch (error) {
    toast.error("Failed to send comment");
  }
  setCommentSendLoading(false);
};

export const getCommets = async ({ postId, setComments }) => {
  try {
    const response = await axios.get(BASE_URL + `/comment/get/${postId}`);
    setComments(response.data);
  } catch (error) {
    console.log(error);
  }
};


export const fetchCommentCount = async ({ postId, setCommentCount }) => {
  try {
    const response = await axios.get(BASE_URL + `/comment/count/${postId}`);
    setCommentCount(response.data.commentCount);
  } catch (error) {
    console.log(error);
  }
};
