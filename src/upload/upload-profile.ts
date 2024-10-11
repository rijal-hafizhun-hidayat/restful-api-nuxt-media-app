import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join("src", "storage", "profile");

// console.log(fs.existsSync(uploadDir));
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadProfile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("type file must png, jpg or jpeg"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

export { uploadProfile };
