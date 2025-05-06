import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "uploads/documents";
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const uniqueName = `${name}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const uploadDocuments = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExt = [".pdf", ".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExt.includes(ext)) {
      return cb(new Error("Only PDF and image files are allowed"), false);
    }
    cb(null, true);
  },
});  

export default uploadDocuments;
