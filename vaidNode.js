import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const vaidApp = express();
vaidApp.use(cors());
vaidApp.use(express.json());
vaidApp.use(express.urlencoded({ extended: true }));

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "root123",
    database: "vaid",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);


vaidApp.post("/login", async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ success: false, message: "Missing login credentials" });
    }

    try {
        const query = "SELECT id, name FROM register WHERE name = ? AND password = ? LIMIT 1"; 
        const [rows] = await pool.execute(query, [name, password]);

        if (rows.length > 0) {
            res.json({ success: true, user: rows[0] });  // ✅ Fixed duplicate response
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

 vaidApp.get("/userprofile", async (req, res) => {
    const userId = req.query.userId; //  Get user ID from query params

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID required" });
    }

    try {
        const query = "SELECT * FROM register WHERE id = ? LIMIT 1"; 
        const [rows] = await pool.execute(query, [userId]);

        if (rows.length > 0) {
            res.json(rows[0]); //  Return the specific user's profile
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


// Registration Route
vaidApp.post('/register', async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);

        const {
            name, gender, age, email, contact, password, bpl, attenderName,
            attenderContact, relation, diseaseName, otherDisease, duration,
            diagonised, testDone, altDisease
        } = req.body;

        // Validate required fields
        if (!name || !email || !contact || !password || !diseaseName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Insert the patient record into `register`
        const insertQuery = `
            INSERT INTO register 
            (name, gender, age, email, contact, password, bpl, attenderName, attenderContact, relation, diseaseName, otherDisease, duration, diagonised, testDone, altDisease, suggestedHospitals)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                    (SELECT COALESCE(GROUP_CONCAT(hospitalName SEPARATOR ', '), 'No hospitals found') FROM hospitals WHERE diseaseName = ?));
        `;

        const values = [
            name, gender, age, email, contact, password, bpl, attenderName, attenderContact, relation,
            diseaseName, otherDisease || null, duration || null, diagonised || null, testDone || null, altDisease || null, diseaseName
        ];

        const [insertResult] = await pool.execute(insertQuery, values);

        // After successful insertion, fetch all hospitals matching diseaseName
        const hospitalQuery = `SELECT * FROM hospitals WHERE diseaseName = ?`;
        const [hospitalResults] = await pool.execute(hospitalQuery, [diseaseName]);

        res.status(201).json({
            message: 'Patient registered successfully',
            id: insertResult.insertId,
            name : name,
            suggestedHospitals: hospitalResults // Returns full hospital rows
        });

    } catch (error) {
        console.error("Error registering patient:", error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});
// Hospital Lookup Route
vaidApp.get("/getData", async (req, res) => {
    try {
        const query = `
            SELECT r.*, 
                   COALESCE(GROUP_CONCAT(h.hospitalName SEPARATOR ', '), 'No hospitals found') AS suggestedHospitals
            FROM register r
            LEFT JOIN hospitals h ON r.diseaseName = h.diseaseName
            GROUP BY r.id;
        `;

        const [results] = await pool.execute(query);
        res.json(results);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Failed to retrieve patient data", error: error.message });
    }

});

vaidApp.get("/hospitals/user", async (req, res) => {
    const userId = req.query.userId;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required to fetch hospitals" });
    }
  
    try {
      const query = `SELECT h.* FROM hospitals h JOIN register r ON h.diseaseName = r.diseaseName WHERE r.id = ?`;
      const [hospitalResults] = await pool.execute(query, [userId]);
  
      if (hospitalResults.length === 0) {
        return res.status(404).json({ message: "No hospitals found for this user" });
      }
  
      res.json(hospitalResults);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      res.status(500).json({ message: "Failed to retrieve hospital data", error: error.message });
    }
  });
  
vaidApp.get("/viewHospitalList", async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT * FROM hospitals");
        res.json(results);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("Error fetching hospital data");
    }
});



vaidApp.put("/updateSuggestedHospitals", async (req, res) => {
    const { id, suggestedHospitals } = req.body;
    console.log("Received body:", req.body);
  
    if (!id || !suggestedHospitals) {
      return res.status(400).json({ message: "ID and suggestedHospitals are required" });
    }
  
    try {
      const query = "UPDATE register SET suggestedHospitals = ? WHERE id = ?";
      await pool.execute(query, [suggestedHospitals, id]);
  
      res.json({ message: "Suggested hospitals updated successfully" });
    } catch (error) {
      console.error("Error updating suggested hospitals:", error);
      res.status(500).json({ message: "Failed to update", error: error.message });
    }
  });


  vaidApp.post("/reset-password", async (req, res) => {
    const { userName, email, password } = req.body;

    // Validation
    if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user exists
        const [results] = await pool.execute("SELECT * FROM register WHERE name = ? AND email = ?", [userName, email]);

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update password
        await pool.execute("UPDATE register SET password = ? WHERE name = ? AND email = ?", [password, userName, email]);

        res.status(200).json({ message: "Password updated successfully!" });

    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

// Update User Profile
vaidApp.put("/update-profile", async (req, res) => {
    const userId = req.body.id;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required to update profile" });
    }
    try {
        const updateFields = { ...req.body };
        delete updateFields.suggestedHospitals;

        // Ensure fields to update exist
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        // Generate dynamic update query
        const updateQuery = `UPDATE register SET ${Object.keys(updateFields)
            .map((key) => `${key} = ?`)
            .join(", ")} WHERE id = ?`;

        await pool.execute(updateQuery, [...Object.values(updateFields), userId]);

        res.json({ message: "Profile updated successfully!" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile", error: error.message });
    }
});




vaidApp.listen(9000, () => console.log("Server running on port 9000"));
// *Start Server**
vaidApp.listen(9000, () => {
    console.log("Server started on port 9000");
});