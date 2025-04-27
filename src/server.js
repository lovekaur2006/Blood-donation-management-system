const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON data
app.use(express.json());
// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Default user in XAMPP
    password: "", // Default password (empty in XAMPP)
    database: "blood_donor_db",
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});
// app.get("/donors", (req, res) => {
//     const { state, district, blood_group } = req.query;

//     let sql = `SELECT name, blood_group, district, mobile_no FROM donors WHERE state = ? AND district = ?`;
//     let params = [state, district];

//     if (blood_group && blood_group !== "All Blood Groups") {
//         sql += ` AND blood_group = ?`;
//         params.push(blood_group);
//     }

//     db.query(sql, params, (err, results) => {
//         if (err) {
//             console.error("Error fetching data:", err);
//             return res.status(500).json({ message: "Database query failed" });
//         }

//         if (results.length === 0) {
//             return res.json({ message: "No matching donors found" });
//         }

//         res.json(results);
//     });
// });
app.get('/donors', (req, res) => {
    const state = req.query.state;
    const district = req.query.district;
    const bloodGroup = req.query.blood_group;
  
    let query = 'SELECT * FROM donors WHERE 1=1';
    const params = [];
  
    if (state) {
      query += ' AND state = ?';
      params.push(state);
    }
  
    if (district) {
      query += ' AND district = ?';
      params.push(district);
    }
  
    if (bloodGroup && bloodGroup !== 'All Blood Groups') {
      query += ' AND blood_group = ?';
      params.push(bloodGroup);
    }
  
    db.query(query, params, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching donors' });
      } else {
        res.json(results);
      }
    });
  });
  
// Route to insert data into MySQL
app.post("/submit", (req, res) => {
    const { name, email, bloodgp, district, dob, mobile_no, gender, state } = req.body;

    const sql = "INSERT INTO donors (name, email, blood_group, district, dob, mobile_no, gender, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [name, email, bloodgp, district, dob, mobile_no, gender, state], (err, result) => {
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
// Start server on port 3000
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
