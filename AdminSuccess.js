import React from "react";
import { useNavigate } from "react-router-dom";

export default function Asuccess(){
    const navigate = useNavigate();
    return(
        <div className="container">
           <h1>Admin's Dashboard </h1>
            <h2>Admin Logged In Successfully!!!</h2>
            <br/>    <br/>    <br/>    <br/>    <br/>
            <div style={{display:"flex"}}>
            <div style={{padding:20}}> <button onClick={()=>navigate('/viewRecords')}><img src="./../viewrecords.png" alt="view" height="200" width= "200"/></button></div>
            <div style={{padding:20}}> <button onClick={()=>navigate('/updateRecords')}><img src="./../update.png" alt="update" height="200" width= "200"/></button></div>
            <div style={{padding:20}}> <button onClick={()=>navigate('/viewHospitalList')}><img src="./../hospitalList.png" alt="hospitalList" height="200" width= "200"/></button></div>
        </div> <button onClick={()=>navigate('/')}>Logout</button> </div>
    )
}