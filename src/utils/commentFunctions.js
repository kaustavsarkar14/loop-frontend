import axios from "axios";
import toast from "react-hot-toast"
import { BASE_URL } from "./constants";

export const createComment =async ({postId, comment, token, user, setCommentSendLoading}) => {
    setCommentSendLoading(true)
    try {
        const response = await axios.post(
            BASE_URL + "/comment/create",
            {
              parentId: postId,
              comment,
              userId : user._id
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data)
    }
    catch (error) {
        toast.error("Failed to send comment");
    }
    setCommentSendLoading(false)
}


export const getCommets = async({postId, setComments})=>{
    try {
        const response = await axios.get(
            BASE_URL + `/comment/get/${postId}`
        )
        setComments(response.data)
    } catch (error) {
        console.log(error)
    }
}