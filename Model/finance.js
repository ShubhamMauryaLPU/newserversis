import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  governmentId: { type: String, required: true },

  academicInfo: {
    institution: String,
    course: String,
    year: Number,
    semester: Number,
    cgpa: Number,
    admissionType: String,
  },

  financialInfo: {
    familyIncome: Number,
    guardianOccupation: String,
    annualIncomeCertificate: String,
    bankAccount: {
      accountNumber: String,
      bankName: String,
      ifsc: String,
    },
    previousAid: String,
    loanRequested: Number,
    loanPurpose: String,
    repaymentCapacityEstimate: Number,
  },
       
  documents: {
    incomeCertificate: String,
    feeStructure: String,
    bonafide: String,
    bankPassbook: String,
    photo: String,
    signature: String,
    academicRecords: [String],
  },

  loanApplication: {
    applicationId: String,
    status: String,
    dateOfApplication: Date,
    approvedAmount: Number,
    installmentPlan: [String],
    disbursementStatus: [String],
    repaymentStatus: String,
    adminRemarks: String,
    reviewedBy: String,
  },

  verification: {
    eligibilityScore: Number,
    verificationStatus: String,
  },
});

export default mongoose.model("finance", StudentSchema);
