const multer = require("multer");
const path = require("path");
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/upload"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${Math.random()}.${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const types = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  if (types.includes(file.mimetype)) cb(null, true);
  else {
    cb(null, false);
    cb(new Error("file type is not supported"));
  }
};

module.exports = multer({ storage, fileFilter });
