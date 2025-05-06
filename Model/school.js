import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  college_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  code: { type: String },
  affiliated_university: { type: String },
  type: {
    type: String,
    required: true,
    enum: ["Private", "Government", "Public", "Deemed"],
  },
  education: { type: String, required: true },
  established_year: { type: Number },
  accreditation: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  address: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String },
  status: { type: String, required: true, enum: ["active", "inactive"] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const College = mongoose.model("school", collegeSchema);
export default College;
