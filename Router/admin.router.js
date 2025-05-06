import express from "express";
import upload from "../Middleware/upload.js";
import {
  createAdmin,
  loginAdmin,
  getAdminById,
  getAllAdmins,
  updateAdminById,
  deleteAdminById,
} from "../Controller/admin.controller.js";

const router = express.Router();

router.post("/add", upload.single("image"), createAdmin);
router.post("/login", loginAdmin);
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", upload.single("image"), updateAdminById);
router.delete("/:id", deleteAdminById);

export default router;
