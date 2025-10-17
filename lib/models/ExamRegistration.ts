import mongoose, { Schema, Document } from 'mongoose';

export interface IExamRegistration extends Document {
  examId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  mobile: string;
  dob: Date;
  examCentre: string;
  languagePreference: string;
  idProof: string; // URL to uploaded file
  optionalDocuments?: string[]; // Array of URLs
  paymentStatus: 'pending' | 'successful' | 'failed';
  paymentAmount?: number;
  hallTicketGenerated: boolean;
  hallTicketLink?: string; // URL to generated hall ticket
  grievance?: string; // Grievance description
  grievanceProof?: string; // URL to proof file
  grievanceStatus: 'pending' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const ExamRegistrationSchema: Schema = new Schema({
  examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  dob: { type: Date, required: true },
  examCentre: { type: String, required: true },
  languagePreference: { type: String, required: true },
  idProof: { type: String, required: true },
  optionalDocuments: [{ type: String }],
  paymentStatus: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' },
  paymentAmount: { type: Number },
  hallTicketGenerated: { type: Boolean, default: false },
  hallTicketLink: { type: String },
  grievance: { type: String },
  grievanceProof: { type: String },
  grievanceStatus: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
}, {
  timestamps: true,
});

export default mongoose.models.ExamRegistration || mongoose.model<IExamRegistration>('ExamRegistration', ExamRegistrationSchema);