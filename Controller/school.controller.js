import College from "../Model/school.js";

export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching colleges", error: err.message });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
    res.status(200).json(college);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching college", error: err.message });
  }
};

export const createCollege = async (req, res) => {
  try {
    const newCollege = new College(req.body);
    await newCollege.save();
    res.status(201).json(newCollege);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating college", error: err.message });
  }
};

export const updateCollege = async (req, res) => {
  try {
    const updatedCollege = await College.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: new Date() },
      { new: true, runValidators: true }
    );
    if (!updatedCollege)
      return res.status(404).json({ message: "College not found" });
    res.status(200).json(updatedCollege);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating college", error: err.message });
  }
};

export const deleteCollege = async (req, res) => {
  try {
    const deletedCollege = await College.findByIdAndDelete(req.params.id);
    if (!deletedCollege)
      return res.status(404).json({ message: "College not found" });
    res.status(200).json({ message: "College deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting college", error: err.message });
  }
};
