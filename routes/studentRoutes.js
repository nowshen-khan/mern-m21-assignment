const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');

router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);
router.get('/profile', auth, studentController.getProfile);
router.put('/profile', auth, studentController.updateProfile);

module.exports = router;
