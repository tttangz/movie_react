import React from "react";
import { useLocation } from "react-router-dom";

export default function Movie(){
    const location = useLocation();
    const { id4url } = location.state;
    console.log(id4url)
    return <div>
        <video src={id4url.url} controls="controls">
            您的浏览器不支持 video 标签。
        </video>
    </div>
}