import express from "express";
import {
  getAllColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
} from "../Controller/school.controller.js";

const router = express.Router();

router.get("/", getAllColleges);
router.get("/:id", getCollegeById);
router.post("/add", createCollege);
router.put("/:id", updateCollege);
router.delete("/:id", deleteCollege);

export default router;
