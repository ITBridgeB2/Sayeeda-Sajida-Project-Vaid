import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ViewHospitalList = () => {
    const navigate = useNavigate();
  const [hospital, setHospital] = useState([]);

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/viewHospitalList");
        const data = await response.json();
        
        setHospital(Array.isArray(data) ? data : data.hospital || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>List of Govt Speciality Hospitals in Bangalore </h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Disease_Name</th>
            <th>Hospital_Name</th>
            <th>About</th>
            <th>Address</th>
            <th>Contact</th>
          
          </tr>
        </thead>
        <tbody>
          {hospital.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.diseaseName}</td>
              <td>{entry.hospitalName}</td>
              <td>{entry.about}</td>
              <td>{entry.address}</td>
              <td>{entry.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    <div style={{justifyContent:"center",textAlign:"center"}}><button onClick={()=>navigate('/AdminSuccess')}>Back</button></div> 
    </div>
  );
 
};

export default ViewHospitalList;