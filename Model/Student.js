import mongoose, { Mongoose } from "mongoose";

// Subject Schema
const SubjectSchema = new mongoose.Schema({
  subject: { type: String },
  marks: { type: Number },
});

// Child Schema
const ChildSchema = new mongoose.Schema({
  class: { type: Number },
  course: { type: String },
  school: { type: String },
  behavior: { type: String },
  gpa: { type: Number },
  attendance: { type: String },
  collegeName: { type: String },
  subjects: [SubjectSchema],
});
const parent = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String },
});

const StudentSchema = new mongoose.Schema({
  id: { type: Number, required: true,unique:true },
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  class: { type: String },
  password: { type: String, required: true },
  image: { type: String, required: false },
  currentIncome: { type: String },
  currentCollege: { type: String },
  currentCourse: { type: String },
  parent,
  children: [ChildSchema],
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
