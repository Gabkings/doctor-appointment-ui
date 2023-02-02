import React from 'react'
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alertsReducer';

export const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate()
    const onFinish = async(values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("api/user/login", values)
            dispatch(hideLoading());
            if (response.data.success) {
                localStorage.setItem("token", response.data.data)
                toast.success("Redirecting to home page")
                navigation("/")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error(error.message)
        }
    }

    return ( <
        div className = "authentication" >
        <
        div className = "authentication-form card p-3" >
        <
        h1 className = "card-title" > Welcome Back < /h1> <
        Form layout = "vertical"
        onFinish = { onFinish } >
        <
        Form.Item label = "Email"
        name = "email" >
        <
        Input placeholder = "Email" / >
        <
        /Form.Item> <
        Form.Item label = "Password"
        name = "password" >
        <
        Input placeholder = "Password"
        type = "password" / >
        <
        /Form.Item>


        <
        Button className = "primary-button my-2 full-width-button"
        htmlType = "submit" >
        LOGIN <
        /Button>

        <
        Link to = "/register"
        className = "anchor mt-2" >
        CLICK HERE TO REGISTER <
        /Link> 


        <
        /Form></div > < /div>
    )
}