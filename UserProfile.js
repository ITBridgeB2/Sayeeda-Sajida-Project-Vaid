import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // ✅ Get stored user ID

    if (!userId) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    // Fetch user profile using stored user ID
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/userprofile?userId=${userId}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="container">
     
      <form>
        <table >
          <tbody>
          <tr><td colSpan={2}> <h2 >Patient Details</h2></td></tr>
            {Object.keys(formData).map((field) => (
             
              <tr key={field}>
                <td style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </td>
                <td style={{ padding: "10px" }}>
                  {typeof formData[field] === "boolean" ? (
                    <input style={{width:50}} type="checkbox" name={field} checked={formData[field]} onChange={handleChange} />
                  ) : (
                    <input style={{width:500}} type="text" name={field} value={formData[field]} onChange={handleChange} disabled/>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={()=>navigate('/lsuccess')} >Back</button></div> 
      </form>
    </div>
  );
};

export default UserProfile;