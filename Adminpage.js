import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  const [id, setId] = useState("");
  const [err, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const uppercasedValue = value.toUpperCase(); // ✅ Convert input to uppercase

    if (name === "admin") setAdmin(uppercasedValue);
    if (name === "id") setId(uppercasedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //  Validation for hardcoded credentials
    if (admin !== "ADMIN" || id !== "VAIDYAKIYA-SAHAYAKA") {
      setError("Invalid credentials. Please try again.");
      return;
    }

    setError(""); //  Clear errors if login is correct
    navigate("/AdminSuccess"); //  Redirect if validation passes
  };
  const handleReset = () => {
    setAdmin(""); // Clears admin input
    setId(""); // Clears password input
    setError(""); // Clears error message (optional)
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <table>
          <tbody>
            <tr>
              <td>Admin:</td>
              <td>
                <input
                  type="text"
                  name="admin"
                  id="admin"
                  value={admin}
                  onChange={handleChange}
                  placeholder="Enter Admin Name"
                />
              </td>
            </tr>
            <tr>
              <td>ID:</td>
              <td>
                <input
                  type="password"
                  name="id"
                  id="id"
                  value={id}
                  onChange={handleChange}
                  placeholder="Enter Admin ID"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ color: "red", textAlign: "center" }}>{err && <p>{err}</p>}</td>
            </tr>
            <tr>
              <td><button type="button"  style={{width:140}} onClick={() => navigate('/')}>Cancel</button></td>
              <td><button type="submit" style={{width:140}}>Login</button>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button t style={{ width: 140 }} onClick={handleReset}>Reset</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}