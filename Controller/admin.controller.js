import Admin from "../Model/admin.js";

export const createAdmin = async (req, res) => {
  try {
    const { id, name, mobile, role, image, email, password, professionLogin } =
      req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists with this email." });
    }
    const newAdmin = new Admin({
      id,
      name,
      mobile,
      role,
      image:image|| req.file?.filename || null,
      email,
      password,
      professionLogin,
    });
    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating admin", error: error.message });
  }
};
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch admins", error: error.message });
  }
};
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findOne({ id });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch admin", error: error.message });
  }
};
export const updateAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAdmin = await Admin.findOneAndUpdate(
      { id },
      {
        ...req.body,
        image: req.file?.filename || req.body.image, // in case image is uploaded
      },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating admin", error: error.message });
  }
};
export const loginAdmin = async (req, res) => {
  try {
    const { idOrEmail, password } = req.body;

    const admin = await Admin.findOne({
      $or: [{ email: idOrEmail }, { id: idOrEmail }],
    });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid ID/email or password" });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findOneAndDelete({ id });

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Admin deleted successfully", admin: deletedAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting admin", error: error.message });
  }
};
