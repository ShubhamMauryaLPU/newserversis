import express from "express";
import upload from "../Middleware/upload.js"; 
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeachersByCollege
} from "../Controller/teacher.controller.js";
const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Hello from teacher route");
});
router.post("/register", upload.single("image"), createTeacher);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.get("/college/:college", getTeachersByCollege);
router.put("/:id", upload.single("image"), updateTeacher);
router.delete("/:id", deleteTeacher);
export default router;
 