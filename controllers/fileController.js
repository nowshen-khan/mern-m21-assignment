const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer Setup for File Upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).single('avatar');

// Upload File
exports.uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ msg: 'File upload failed' });
    }
    res.json({ msg: 'File uploaded successfully', filePath: req.file.path });
  });
};

// Read File
exports.readFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads/', filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).json({ msg: 'File not found' });
    }
    res.send(data);
  });
};

// Delete File
exports.deleteFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads/', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ msg: 'File not found' });
    }
    res.json({ msg: 'File deleted successfully' });
  });
};
