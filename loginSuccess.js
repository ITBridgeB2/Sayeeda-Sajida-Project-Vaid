import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success(){

    const navigate = useNavigate();
    return(
        <div className="container" >
            <h1>Welcome to User's Dashboard</h1>
            <h2>Logged In Successfully!!!</h2>
<div style={{display:"flex"}}> <div style={{padding:20}}><button style={{width : 200, height : 200}} onClick={()=>navigate('/hospitals')}>Check here for Matched hospitals for your registered Disease</button></div><div style={{padding:20}}>
<button style={{width : 200, height : 200}} onClick={()=>navigate('/profile')}>User Profile</button></div><div style={{padding:20}}><button style={{width : 200, height : 200}} onClick={()=>navigate('/profile1')}>Edit user profile</button> </div></div>  
<br/>    <br/>    <br/>  
              <br/>    <br/>
              <button style={{width : '10%'}}  onClick={()=>navigate('/login')}>Logout</button>
        </div>
    )
}