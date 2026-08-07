const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({

    destination:(req, file, cb)=> {
        cb(null, 'public/uploads')
    },
    filename:(req,file,cb)=>{

    const uniqueName = Date.now() + path.extname(file.originalname)
    cb(null,uniqueName);

    },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },   // أقصى حجم 5 ميجا
});

// endpoint الرفع
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // رجّع المسار اللي الفرونت هيستخدمه
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;