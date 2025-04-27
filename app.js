const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
// Redirect "/" and "/login" to login page
app.get('/', (req, res) => res.sendFile(__dirname + '/public/login.html'));
app.get('/login', (req, res) => res.sendFile(__dirname + '/public/login.html'));

// Signup page
app.get('/signup', (req, res) => res.sendFile(__dirname + '/public/signup.html'));

// Blogs page
app.get('/blogs', (req, res) => res.sendFile(__dirname + '/public/blogs.html'));

// Admin dashboard page
app.get('/admin', (req, res) => res.sendFile(__dirname + '/public/admin.html'));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
