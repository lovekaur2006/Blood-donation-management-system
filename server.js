// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = 'mongodb+srv://Lovepreet06:4Rd23JIbRoKSOqcs@cluster1.d13s0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

// Donor schema and model
const donorSchema = new mongoose.Schema({
  name: String,
  email: String,
  blood_group: String,
  city: String,
  dob: Date,
  mobile_no: String,
  gender: String,
  address: String,
});

const Donor = mongoose.model('Donor', donorSchema);

// Endpoint to save donor information
app.post('/save-donor', (req, res) => {
  const { name, email, blood_gp, city, dob, mobile_no, gender, address } = req.body;

  const newDonor = new Donor({
    name,
    email,
    blood_group: blood_gp,
    city,
    dob,
    mobile_no,
    gender,
    address,
  });

  newDonor.save()
    .then((result) => {
      res.status(200).send('Donor information saved successfully');
    })
    .catch((err) => {
      console.error('Error saving donor information:', err);
      res.status(500).send('Error saving donor information');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
