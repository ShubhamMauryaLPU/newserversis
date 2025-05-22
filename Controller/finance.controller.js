import Student from "../Model/finance.js";

export const createStudent = async (req, res) => {
  try {
    const { body, files = {} } = req;

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

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve student", error: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateFields = {};

    // Support both nested and flat keys
    if (data.fullName) updateFields.fullName = data.fullName;
    if (data.dateOfBirth) updateFields.dateOfBirth = data.dateOfBirth;
    if (data.gender) updateFields.gender = data.gender;
    if (data.email) updateFields.email = data.email;
    if (data.phone) updateFields.phone = data.phone;
    if (data.governmentId) updateFields.governmentId = data.governmentId;

    // Academic Info
    if (data.cgpa) updateFields["academicInfo.cgpa"] = data.cgpa;
    if (data.institution)
      updateFields["academicInfo.institution"] = data.institution;
    if (data.course) updateFields["academicInfo.course"] = data.course;
    if (data.year) updateFields["academicInfo.year"] = data.year;
    if (data.semester) updateFields["academicInfo.semester"] = data.semester;
    if (data.admissionType)
      updateFields["academicInfo.admissionType"] = data.admissionType;

    // Financial Info
    if (data.familyIncome)
      updateFields["financialInfo.familyIncome"] = data.familyIncome;
    if (data.guardianOccupation)
      updateFields["financialInfo.guardianOccupation"] =
        data.guardianOccupation;
    if (data.annualIncomeCertificate)
      updateFields["financialInfo.annualIncomeCertificate"] =
        data.annualIncomeCertificate;
    if (data.accountNumber)
      updateFields["financialInfo.bankAccount.accountNumber"] =
        data.accountNumber;
    if (data.bankName)
      updateFields["financialInfo.bankAccount.bankName"] = data.bankName;
    if (data.ifsc) updateFields["financialInfo.bankAccount.ifsc"] = data.ifsc;
    if (data.previousAid)
      updateFields["financialInfo.previousAid"] = data.previousAid;
    if (data.loanRequested)
      updateFields["financialInfo.loanRequested"] = data.loanRequested;
    if (data.loanPurpose)
      updateFields["financialInfo.loanPurpose"] = data.loanPurpose;
    if (data.repaymentCapacityEstimate)
      updateFields["financialInfo.repaymentCapacityEstimate"] =
        data.repaymentCapacityEstimate;

    // Documents
    if (data.incomeCertificate)
      updateFields["documents.incomeCertificate"] = data.incomeCertificate;
    if (data.feeStructure)
      updateFields["documents.feeStructure"] = data.feeStructure;
    if (data.bonafide) updateFields["documents.bonafide"] = data.bonafide;
    if (data.bankPassbook)
      updateFields["documents.bankPassbook"] = data.bankPassbook;
    if (data.photo) updateFields["documents.photo"] = data.photo;
    if (data.signature) updateFields["documents.signature"] = data.signature;
    if (Array.isArray(data.academicRecords))
      updateFields["documents.academicRecords"] = data.academicRecords;

    // Loan Application
    if (data.applicationId)
      updateFields["loanApplication.applicationId"] = data.applicationId;
    if (data.status) updateFields["loanApplication.status"] = data.status;
    if (data.dateOfApplication)
      updateFields["loanApplication.dateOfApplication"] =
        data.dateOfApplication;
    if (typeof data.approvedAmount !== "undefined")
      updateFields["loanApplication.approvedAmount"] = data.approvedAmount;
    if (Array.isArray(data.installmentPlan))
      updateFields["loanApplication.installmentPlan"] = data.installmentPlan;
    if (Array.isArray(data.disbursementStatus))
      updateFields["loanApplication.disbursementStatus"] =
        data.disbursementStatus;
    if (data.repaymentStatus)
      updateFields["loanApplication.repaymentStatus"] = data.repaymentStatus;
    if (data.adminRemarks)
      updateFields["loanApplication.adminRemarks"] = data.adminRemarks;
    if (data.reviewedBy)
      updateFields["loanApplication.reviewedBy"] = data.reviewedBy;

    // Verification
    if (typeof data.eligibilityScore !== "undefined")
      updateFields["verification.eligibilityScore"] = data.eligibilityScore;
    if (data.verificationStatus)
      updateFields["verification.verificationStatus"] = data.verificationStatus;

    const updated = await Student.findOneAndUpdate({ id }, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updated,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update student",
      error: err.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Student.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted", student: deleted });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete student",
      error: err.message,
    });
  }
};
