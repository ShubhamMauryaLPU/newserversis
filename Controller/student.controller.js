import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../Model/Student.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const registerStudent = async (req, res) => {
  try {
    const {
      id,
      name,
      mobile,
      password,
      professionLogin,
      children,
      student,
      class: parentClass,
    } = req.body;

    if (!id || !name || !mobile || !password) {
      return res.status(400).json({
        message: "ID, name, mobile, password are required.",
      });
    }

    const existingStudent = await Student.findOne({ mobile });
    if (existingStudent) {
      return res
        .status(409)
        .json({ message: "Student with this mobile number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newStudent = new Student({
      id,
      name,
      mobile,
      password: hashedPassword,
      professionLogin,
      image: req.file?.filename || null,
      class: parentClass,
      student,
      children,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to register student", error: error.message });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch student", error: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ id });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch student", error: error.message });
  }
};

export const getStudentBySchool = async (req, res) => {
  try {
    const { school } = req.params;

    // Find students where at least one child is in the specified school
    const students = await Student.find({ "currentCollege": school });

    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this school." });
    }

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students by school",
      error: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ id });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    if (req.body.name) student.name = req.body.name;
    if(req.body.password) student.password=req.body.password;
    if (req.body.mobile) student.mobile = req.body.mobile;
    if (req.body.class) student.class = req.body.class;
    if (req.body.professionLogin)
      student.professionLogin = req.body.professionLogin;
    if (req.body.student) student.student = req.body.student;
    if (req.body.children) student.children = req.body.children;

    if (req.files?.titleImg && req.files.titleImg.length > 0) {
      student.image = req.files.titleImg[0].filename;
    }

    await student.save();

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update student", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedParent = await Student.findOneAndDelete({ id });

    if (!deletedParent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete student", error: error.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ message: "ID and password are required." });
    }

    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ id: student.id, name: student.name }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      parentId: student.id,
      name: student.name,
      professionLogin: student.professionLogin,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to login student", error: error.message });
  }
};
