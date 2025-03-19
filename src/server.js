const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON data

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "", // Default user in XAMPP
    password:"" // Default password (empty in XAMPP)
    database: ""
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// Route to insert data into MySQL
app.post("/submit", (req, res) => {
    const { name, email, bloodgp, city, dob, mobile_no, gender, address } = req.body;

    const sql = "INSERT INTO donors (name, email, blood_group, city, dob, mobile_no, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [name, email, bloodgp, city, dob, mobile_no, gender, address], (err, result) => {
        if (err) {
            res.status(500).send("Database Error: " + err);
        } else {
            res.send("Data inserted successfully!");
        }
    });
});

// Route to fetch all donor data
app.get("/donors", (req, res) => {
    db.query("SELECT * FROM donors", (err, results) => {
        if (err) {
            res.status(500).send("Database Error: " + err);
        } else {
            res.json(results);
        }
    });
});
app.get("/donors", (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ message: "Location is required" });
    }

    const query = "SELECT * FROM donors WHERE city = ?";
    db.query(query, [location], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query error" });
        }

        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({ message: "No donors found in this location" });
        }
    });
});
// Start server on port 3000
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
