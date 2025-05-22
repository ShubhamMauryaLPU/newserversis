import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  id: { type: String ,required:true},
  fullName: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  email: { type: String },
  phone: { type: String },
  governmentId: { type: String },

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
