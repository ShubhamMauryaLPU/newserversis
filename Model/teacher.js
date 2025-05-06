import mongoose from "mongoose";

const { Schema } = mongoose;

const teacherSchema = new Schema({
  id: { 
    type: Number,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  qualification: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  professionLogin:{
    type: String,
    default:"teacher"
  }
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
