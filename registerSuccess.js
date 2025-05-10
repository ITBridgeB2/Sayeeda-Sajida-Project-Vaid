import React from "react";
import { useNavigate } from "react-router-dom";

export default function Rsuccess(){
    const navigate = useNavigate();
    return(
        <div className="container">
            <h2> Registered Successfully!!!</h2>
            <br/>    <br/>    <br/>    <br/>    <br/>
            <div> <button onClick={()=>navigate('/hospitals')}>Check here for Matched hospitals for your registered Disease</button></div>
        </div>
    )
}