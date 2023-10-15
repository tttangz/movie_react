import React from "react";
import { useLocation } from "react-router-dom";
export default function Detail(){
    const location = useLocation();
    const { simpleData,detailData } = location.state;
    return <div>
        <p>{simpleData.name}</p>
        <p>{detailData.introduction}</p>
    </div>
}