import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  duration: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);