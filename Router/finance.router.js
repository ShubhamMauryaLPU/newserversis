import express from "express";
import {
  createStudent,
  getAllStudents,   
  getStudentById,
  updateStudent,    
  deleteStudent,
} from "../Controller/finance.controller.js";
import uploadDocument from "../Middleware/uploadDocument.js";
const router = express.Router();
 
const fileFields = uploadDocument.fields([
  { name: "incomeCertificate", maxCount: 1 },
  { name: "feeStructure", maxCount: 1 },
  { name: "bonafide", maxCount: 1 },
  { name: "bankPassbook", maxCount: 1 },
  { name: "photo", maxCount: 1 },
  { name: "signature", maxCount: 1 },
  { name: "academicRecords", maxCount: 10 },
]);

router.get("/test", (req, res) => {res.json({ message: "Test route is working" })});
router.post("/upload", fileFields, createStudent);

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
