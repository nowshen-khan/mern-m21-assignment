const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const studentRoutes = require('./routes/studentRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads')); // Serve static files from uploads

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
