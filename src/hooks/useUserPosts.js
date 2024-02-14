import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUserPosts, clearUserPosts } from "../state/ProfileSlice";

export default function useUserPosts(id, page){
    const dispatch = useDispatch()
    async function fetchPosts(){
        try {
            const posts = await axios.get(BASE_URL+`/post/get/${id}?page=${page}`)
            console.log(posts.data)
            dispatch(addUserPosts(posts.data))
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchPosts()
        return ()=>{
            dispatch(clearUserPosts())
        }
    },[])
}