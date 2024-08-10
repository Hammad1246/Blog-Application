import React,{useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import AppwriteConfig from "../appwrite/config"
import {useNavigate} from "react-router-dom"
import {PostForm} from "../components/index"

function EditPost() {
    let {slug}=  useParams()
    const [Post, setPost] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        
    AppwriteConfig.getPost(slug).then((response) => {
        if (response) {
            setPost(response)
        }
        else{
            navigate("/your-post")
        }
    }).catch((error) => {
        console.error(error)
    })
    }, []);


    return Post?  (
        <PostForm post={Post}/>
    ): null
}

export default EditPost
