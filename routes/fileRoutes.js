const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/upload', fileController.uploadFile);
router.get('/:filename', fileController.readFile);
router.delete('/:filename', fileController.deleteFile);

module.exports = router;
