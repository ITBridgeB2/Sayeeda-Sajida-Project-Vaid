import {useState}from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';
import RegisterService from "./RegisterService";

export default function Register() {
    const navigate = useNavigate();
    const [err , setErr] = useState ('')
    const [patient, setPatient] = useState({
        name :'',
        gender : '',
        age :'',
        password :'',
        cpassword :'',
        bpl :'',
        email : '',
        contact :'',
        attendername :'',
        attendercontact :'',
        relation :'',
        diseaseName :'',
        otherDisease :'',
        duaration :'',
        diagonised :'',
        testDone :'',
        altDisease :''
    });
 const handleChange = (e) => {
        const { name, value } = e.target;
      setPatient((prev)=>({...prev, [name]:value}));
    }

    const handleRegister = async(eve)=>{
   eve.preventDefault();
   console.log("handleRegister is triggered");

   //send data to backend
   if(!isNaN(patient.name) )
   {
    setErr("Invalid Input! Patient Name cannot be a number")
   }
   else if (patient.name.length <3){
    setErr ("Name should be more than three characters!")
   }
   else if (patient.password.length <8){
    setErr ("password should be more atleast eight characters!")
   }
   else if (patient.password !==patient.cpassword){
    setErr ("confirm password should be same as password")
   }
   else if (patient.contact.length<10){
    setErr("phone number must be 10 digits")
   }
   else if (patient.attendername.length < 3){
    setErr("Attender Name should be atleast 3 characters")}
   else if (!isNaN(patient.attendername)){
    setErr("Invalid Input! Attender Name cannot be a Number.")}
    else if (patient.attendercontact.length<10){
        setErr("phone number must be 10 digits")
       }
   else{
        setErr("");
        try{
            console.log(patient)
        const response = await RegisterService(patient)
                console.log("Response from server :", response)
  alert("patient details saved successfully" +patient.name)
   navigate('/successregister')
        } 
        catch(err){
            console.error("Error saving reigter", err);
            setErr("An error occured while saving")
        }
    }
}
    return (<div className="container">
        <form >
            <h2>
                Register New User
            </h2>
            <table>
            <thead>
                <tr>
                    <th rowSpan={2}>
                    {err && <h3>{err}</h3>}
                    </th>
                   
                </tr>
            </thead>
            <tbody>
              
                <tr>
                    <td>
                        Patient Name :
                    </td>
                    <td>
                        <input type="text"  
                        name="name" 
                        id="name"
                        onChange={handleChange} 
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Gender :
                    </td>
                    <td>
                        <input type="radio"  
                        name="gender" 
                        value={"Male"}
                        required
                        onChange={handleChange}
                        /> Male
                          <input type="radio"  
                        name="gender" 
                       value={"Female"}
                       onChange={handleChange}
                        />Female
                          <input type="radio"  
                        name="gender" 
                        value={"Others"}
                        onChange={handleChange}
                    
                        />Others
                    </td>
                </tr>
                <tr>
                    <td>
                        Age :
                    </td>
                    <td>
                        <input type="number"  
                        name="age" 
                        id="age"
                        onChange={handleChange} 
                        required
                        maxLength={120}
                        />
                    </td>
                    </tr>
                    <tr>
                        <td>
                            password :
                        </td>
                        <td>
                            <input type="password" name="password" id="password" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Confirm password :
                        </td>
                        <td>
                            <input type="password" name="cpassword" id="cpassword" onChange={handleChange}/>
                        </td>
                    </tr>
                    <tr>
                    <td>
                        BPL :
                    </td>
                    <td>
                    <input type="radio" name="bpl" value="yes" onChange={handleChange} required/>Yes
                    <input type="radio" name="bpl" value="no" onChange={handleChange} />No
                    </td>
                    </tr>
                    <tr>
                    <td>
                        E-Mail Id :
                    </td>
                    <td>
                        <input type="email"  
                        name="email" 
                        id="email"
                        onChange={handleChange} 
                        required
                        />
                    </td>
                    
                    </tr>
                    <tr>
                    <td>
                       Contact :
                    </td>
                    <td>
                        <input type="number"  
                        name="contact" 
                        id="contact"
                        onChange={handleChange} 
                         />
                    </td>
                   
                    </tr>
                    <tr>
                    <td>
                       Attender Name :
                    </td>
                    <td>
                        <input type="text"  
                        name="attendername" 
                        id="attendername"
                        onChange={handleChange} 
                        
                        />
                    </td>
                   
                    </tr>
                    <tr>
                    <td>
                     AttenderContact :
                    </td>
                    <td>
                        <input type="number"  
                        name="attendercontact" 
                        id="attendercontact"
                        onChange={handleChange} 
                   
                        />
                    </td>
                   
                    </tr>
                    <tr>
                    <td>
                     Relation with patient:
                    </td>
                    <td>
                        <input type="text"  
                        name="relation" 
                        id="relation"
                        onChange={handleChange} 
                        required
                        />
                    </td>
                   
                    </tr>
           <tr>
            <td colSpan={2} align="center"> <h2>Patient's Illness</h2></td></tr>
           
           
            <tr>
                        <td>
                            Disease : 
                        </td>
                        <td>
                            <select id="diseaseName" name="diseaseName" multiple onChange={handleChange} required>
                                <option value={"Heart"}>Heart</option>
                                <option value={"Kidney"}>Kidney</option>
                                <option value={"Brain"}>Brain</option>
                                <option value={"ENT"}>ENT</option>
                                <option value={"Stomach"}>Stomach</option>
                                <option value={"Liver"}>Liver</option>
                                <option value={"Bones"}>Bones</option>
                                <option value={"Cancer"}>cancer</option>
                                <option value={"Diabetes"}>Diabetes</option>
                                <option value={"Respiratory"}>Respiratory</option>
                                <option value={"Skin"}>Skin</option>
                                <option value={"Eyes"}>Eyes</option>
                                <option value={"Dental"}>Dental</option>
                                <option value={"Pregnency"}>Pregnency</option>
                                <option value={"GereralMedicines"}>GereralMedicines</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Others :</td>
                        <td><input type="text" name="otherDisease" id="otherDisease"/></td>
                    </tr>
                    <tr>
                        <td>
                            Any concerns related to : 
                        </td>
                        <td>
                            <select id="altDisease" name="altDisease" multiple onChange={handleChange}>
                                <option value={"BP"}>BP</option>
                                <option value={"Sugar"}>Sugar</option>
                                <option value={"Thyroid"}>Thyroid</option>
                                <option value={"Kidney"}>Kidney</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Duration :
                        </td>
                        <td>
                            <input type="text"name="duration" id="duration" onChange={handleChange}/> 
                        </td>
                        </tr>
                        <tr>
                            <td>
                                If Diagonise : 
                            </td>
                            <td>
                            <input type="radio" name="diagonised" value="yes"  onChange={handleChange} required />Yes
                            <input type="radio" name="diagonised" value="no" onChange={handleChange}/>No
                    </td>
                        </tr>
                        <tr>
                            <td>
                                Test Done : 
                            </td>
                            <td>
                                <select id="testDone" name="testDone" multiple onChange={handleChange}>
                                    <option value={"Blood-test"}>Blood-test</option>
                                    <option value={"Urine-test"}>Urine-test</option>
                                    <option value={"Scans"}>Scans</option>
                                    <option value={"Sugar-test"}>Sugar</option>
                                    <option value={"X-rays"}>X-rays</option>
                                    <option value={"BP"}>BP</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
            <td><button onClick={()=>navigate('/')}>cancel</button></td>
                    <td >
                        <button type="submit" onClick={handleRegister} >Register</button>
                    </td>
                    </tr>
                       
                        </tbody>
            </table>
        </form>
    </div>
    ) 
}
