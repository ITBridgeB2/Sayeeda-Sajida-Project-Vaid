import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataDisplayComponent1 = () => {
  const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const userId = localStorage.getItem("userId"); // ✅ Ensure stored `userId` matches backend

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                if (!userId) return;

                // ✅ Send userId via query params instead of headers
                const response = await fetch(`http://localhost:9000/hospitals/user?userId=${userId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await response.json();
                setHospitals(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching hospitals:", error);
            }
        };

        fetchHospitals();
    }, [userId]);

    return (
        <div className="container">
            <h2 style={{ textAlign: "center" }}>Suggested Hospitals</h2>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left",  }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Disease Name</th>
                        <th>Hospital Name</th>
                        <th>About</th>
                        <th>Contact</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {hospitals.length > 0 ? (
                        hospitals.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.id}</td>
                                <td>{entry.diseaseName}</td>
                                <td>{entry.hospitalName}</td>
                                <td>{entry.about}</td>
                                <td style={{ whiteSpace: "nowrap", width: "auto", padding: "5px" }}>{entry.contact}</td>
                                <td>{entry.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>No suggested hospitals available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button style={{width:"300"}} onClick={()=>navigate('/lsuccess')} >Back</button></div> 
            <div style={{ textAlign: "center", marginTop: "20px" }}><h4> We sincerely appreciate your trust in our service!<br/>
             We value your trust and look forward to serving you again.
            </h4></div>
        </div>
    );
};

export default DataDisplayComponent1;