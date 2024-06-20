const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../public/upload");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;

    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  const types = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

module.exports = multer({ storage, fileFilter });
