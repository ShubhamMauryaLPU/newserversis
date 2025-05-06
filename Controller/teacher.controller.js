import Teacher from "../Model/teacher.js";
// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const {
      id,
      fullName,
      college,
      subject,
      mobileNumber,
      email,
      qualification,
      professionLogin,
      image,
      password,
    } = req.body;

    // const hashedPassword = await bcrypt.hash(password, 12);

    const newTeacher = new Teacher({
      id,
      fullName,
      college,
      subject,
      mobileNumber,
      email,
      qualification,
      professionLogin,
      image: req.file?.filename || image || null,
      password: password,
    });

    await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher created successfully", newTeacher });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating teacher", error: err.message });
  }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching teachers", error: err.message });
  }
};

// Get a teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacherId = Number(req.params.id);
    const teacher = await Teacher.findOne({ id: teacherId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching teacher", error: err.message });
  }
};

// get tacher by college Name
export const getTeachersByCollege = async (req, res) => {
  try {
    const college = req.params.college;
    const teachers = await Teacher.find({ college: college });

    if (!teachers || teachers.length === 0) {
      return res
        .status(404)
        .json({ message: "No teachers found for this college" });
    }

    res.status(200).json(teachers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching teachers", error: err.message });
  }
};

// Update teacher details
export const updateTeacher = async (req, res) => {
  try {
    const teacherId = Number(req.params.id);

    const updatedTeacher = await Teacher.findOneAndUpdate(
      { id: teacherId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res
      .status(200)
      .json({
        message: "Teacher updated successfully",
        teacher: updatedTeacher,
      });
  } catch (err) {
    res.status(500).json({
      message: "Error updating teacher",
      error: err.message,
    });
  }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
  try {
    const teacherId = Number(req.params.id);

    const deletedTeacher = await Teacher.findOneAndDelete({ id: teacherId });

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting teacher",
      error: err.message,
    });
  }
};
