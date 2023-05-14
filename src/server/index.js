const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://shahzebraheel61:shahzaib1044@cluster0.luve38r.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for the Profile
const profileSchema = new mongoose.Schema({
  name: String,
  age: String,
  degree: String,
  skills: String,
  experience: String,
  resume: String,
});

const Profile = mongoose.model('Profile', profileSchema);

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Handle the POST request to create a profile
app.post('/api/profile', upload.single('resume'), async (req, res) => {
  try {
    const { name, age, degree, skills, experience } = req.body;
    const resume = req.file ? req.file.filename : null;

    // Create a new profile document
    const profile = new Profile({
      name,
      age,
      degree,
      skills,
      experience,
      resume,
    });

    // Save the profile to the database
    await profile.save();

    res.send('Profile created successfully.');
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
