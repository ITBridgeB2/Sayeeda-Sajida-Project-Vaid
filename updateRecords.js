import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateSuggestedHospitals = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState([]);
  const [editedHospitals, setEditedHospitals] = useState({}); // Store edits per user

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

  const handleChange = (id, value) => {
    setEditedHospitals({ ...editedHospitals, [id]: value });
  };

  const handleUpdate = async (id) => {
    const updatedHospital = editedHospitals[id];
    if (!updatedHospital) return;

    try {
      const response = await fetch("http://localhost:9000/updateSuggestedHospitals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, suggestedHospitals: updatedHospital }),
      });

      const result = await response.json();
      alert(result.message);

      // Refresh data after update
      setRegister(register.map(entry =>
        entry.id === id ? { ...entry, suggestedHospitals: updatedHospital } : entry
      ));
    } catch (error) {
      console.error("Error updating hospitals:", error);
    }
  };

  return (
    <div >
      <h2>Patients</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Disease Name</th>
            <th>Suggested Hospitals</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {register.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.diseaseName}</td>
              <td  style={{ width: "500px" }}>
                <input
                  type="text"
                  value={editedHospitals[entry.id] ?? entry.suggestedHospitals}
                  onChange={(e) => handleChange(entry.id, e.target.value)}
                  style={{ width: "500px" }}
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(entry.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>navigate('/AdminSuccess')}> back</button>
    </div>
  );
};

export default UpdateSuggestedHospitals;