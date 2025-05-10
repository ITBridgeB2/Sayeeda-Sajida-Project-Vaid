import React from "react";
import { useNavigate } from "react-router-dom";
export default function Home(){

const navigate=useNavigate();

    return(
        <div className="container">
            <h1>Vaidyakiya Sahayaka</h1>
            <div style={{display: "flex"}}>
            <div>

<img src="./vaid.png" alt="Vaid Image" height={350} width={250} /></div><div>
            <p>This organization aims to make healthcare accessible and affordable by<br/>
 reducing out-of-pocket expenses for patients. It help's individuals assists finding a right hospital </p>
 <br/>   
        <h2>Features</h2>
           
                   <p>  🏥Helps in finding Hospitals<br/>
              
                   📞Provides Contact details of hospitals<br/>
              
                   🏷️Services provided by that Hospitals</p>
                  <br/>   <br/>   <br/>   <br/>
                     
                          
            
           <div style={{paddingLeft: 110}}><button onClick={()=>navigate("/login")}>Login</button> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          <button onClick={()=>navigate("/register")}>New User</button>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <button onClick={()=>navigate("/adminpage")}>Admin</button></div>
        </div></div></div>
    )
}