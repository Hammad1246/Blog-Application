import React from 'react'
import { useDispatch } from "react-redux";
import AppwriteAuth from '../appwrite/auth';
import {logout} from "../store/authSlice"
import {useNavigate} from "react-router-dom"

function LogoutBtn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handelLogout = ()=>{
        AppwriteAuth.logout().then(()=>{
            dispatch(logout())
            navigate("/")
        })
    }


    return (
        <button onClick={handelLogout} >Logout</button>
    )
}

export default LogoutBtn
