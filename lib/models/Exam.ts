import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  title: string;
  description: string;
  banner?: string; // URL to banner image
  registrationStartDate: Date;
  registrationEndDate: Date;
  examFee: number;
  isRegistrationOpen: boolean;
  resultPublished: boolean;
  resultLink?: string; // URL or link to result
  answerBookLink?: string; // URL or link to answer book
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String },
  registrationStartDate: { type: Date, required: true },
  registrationEndDate: { type: Date, required: true },
  examFee: { type: Number, required: true },
  isRegistrationOpen: { type: Boolean, default: true },
  resultPublished: { type: Boolean, default: false },
  resultLink: { type: String },
  answerBookLink: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Exam || mongoose.model<IExam>('Exam', ExamSchema);