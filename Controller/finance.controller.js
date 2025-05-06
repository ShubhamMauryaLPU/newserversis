import Student from "../Model/finance.js";

export const createStudent = async (req, res) => {
  try {
    const { body, files } = req;

    const documents = {
      incomeCertificate: files.incomeCertificate?.[0]?.filename || "",
      feeStructure: files.feeStructure?.[0]?.filename || "",
      bonafide: files.bonafide?.[0]?.filename || "",
      bankPassbook: files.bankPassbook?.[0]?.filename || "",
      photo: files.photo?.[0]?.filename || "",
      signature: files.signature?.[0]?.filename || "",
      academicRecords:
        files.academicRecords?.map((file) => file.filename) || [],
    };

    const newStudent = new Student({
      ...body,
      documents,
    });
 
    await newStudent.save();

    res.status(201).json({
      message: "Student with documents created successfully",
      student: newStudent,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to create student",
      error: err.message,
    });
  }
};

// GET All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve students", error: err.message });
  }
};

// GET Student by studentId
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve student", error: err.message });
  }
};

// UPDATE Student
export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { studentId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated", student: updated });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update student", error: err.message });
  }
};

// DELETE Student
export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({
      studentId: req.params.id,
    });
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted", student: deleted });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete student", error: err.message });
  }
};
