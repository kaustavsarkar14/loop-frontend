import axios from "axios"
import { BASE_URL } from "./constants"

export const follow=async({followingUserId, token})=>{
    try {
        const response = await axios.post(BASE_URL+"/follow/follow-user", {followingUserId}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(response.data)
    } catch (error) {
        
    }
}
export const unFollow=async({followingUserId, token})=>{
    try {
        const response = await axios.post(BASE_URL+"/follow/unfollow-user", {followingUserId}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log(response.data)
    } catch (error) {
        
    }
}