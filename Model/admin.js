import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  role: { type: String, default: "Admin", required: true },
  image: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  professionLogin: { type: String, default: "admin", required: true }
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
