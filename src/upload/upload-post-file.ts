import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join("src", "storage", "post");

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

const uploadPostFile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4" && ext !== ".mkv") {
      return cb(new Error("type file must mp4 or mkv"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export { uploadPostFile };
