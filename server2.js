const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();

// Serve static files (Ensure CSS is inside 'public' or 'src')
app.use(express.static(path.join(__dirname, 'src')));

mongoose.connect('mongodb://127.0.0.1.27017/donors')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection succesful")
})

const userSchema=new mongoose.Schema({
    
})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/biodata.html'));
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
