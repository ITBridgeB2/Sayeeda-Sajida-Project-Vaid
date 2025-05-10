import React, { useEffect, useState } from "react";



const DataDisplayComponent = () => {
  const [register, setRegister] = useState([]);

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/getData");
        const data = await response.json();
        
        setRegister(Array.isArray(data) ? data : data.register || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: 2000 }}>
      <h2>Patients</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Bpl</th>
            <th>Attender Name</th>
            <th>Attender Contact</th>
            <th>Relation</th>
            <th>Disease Name</th>
            <th>Other Diseases</th>
            <th>Alternative Disease</th>
            <th>Duration</th>
            <th>Diagnosed</th>
            <th>Test Done</th>
            <th>Suggested Hospitals</th>
          </tr>
        </thead>
        <tbody>
          {register.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.age}</td>
              <td>{entry.email}</td>
              <td>{entry.contact}</td>
              <td>{entry.bpl ? "Yes" : "No"}</td>
              <td>{entry.attenderName}</td>
              <td>{entry.attenderContact}</td>
              <td>{entry.relation}</td>
              <td>{entry.diseaseName}</td>
              <td>{entry.otherDisease}</td>
              <td>{entry.altDisease}</td>
              <td>{entry.duration}</td>
              <td>{entry.diagonised}</td>
              <td>{entry.testDone}</td>
              <td>
                {Array.isArray(entry.suggestedHospitals) 
                  ? entry.suggestedHospitals.join(", ") 
                  : entry.suggestedHospitals}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
 
};

export default DataDisplayComponent;