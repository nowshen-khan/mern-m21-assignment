const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Register Student
exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let student = await Student.findOne({ email });

    if (student) {
      return res.status(400).json({ msg: 'Student already exists' });
    }

    student = new Student({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);

    await student.save();

    const payload = { studentId: student.id };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Student Login
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { studentId: student.id };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Student Profile
exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId).select('-password');
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Student Profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    let student = await Student.findById(req.studentId);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    student.name = name || student.name;
    student.email = email || student.email;

    await student.save();
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
