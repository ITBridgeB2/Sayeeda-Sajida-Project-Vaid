import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "userName") setUserName(value);
        if (name === "password") setPassword(value);
        if (name === "cPassword") setCPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!userName || !email || !password || !cPassword) {
            setError("All fields are required");
            return;
        }
        if (password !== cPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        // Backend request to update password
        try {
            const response = await fetch("http://localhost:9000/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setError("Password updated successfully!");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container">
            <table>
                <tbody>
                    <tr><td colSpan={2} align="center"><h2>Reset Password</h2></td></tr>
                    <tr>
                        <td>Enter Username:</td>
                        <td><input type="text" name="userName" required onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Enter Registered Email:</td>
                        <td><input type="email" name="email" required onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Enter New Password:</td>
                        <td><input type="password" name="password" required onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Confirm Password:</td>
                        <td><input type="password" name="cPassword" required onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td><button onClick={() => navigate('/login')}>Back</button></td>
                        <td><button onClick={handleSubmit}>Update Password</button></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center">{error && <h3 style={{ color: "green" }}>{error}</h3>}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}