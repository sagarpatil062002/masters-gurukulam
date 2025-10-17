import mongoose, { Schema, Document } from 'mongoose';

export interface IFaculty extends Document {
  name: string;
  subject: string;
  qualification: string;
  bio: string;
  photo: string; // URL to photo
  createdAt: Date;
  updatedAt: Date;
}

const FacultySchema: Schema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  qualification: { type: String, required: true },
  bio: { type: String, required: true },
  photo: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema);