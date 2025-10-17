import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  description: string;
  images: string[]; // Array of image URLs
  date: Date;
  type?: string; // e.g., Sports, Academic, Cultural
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  date: { type: Date, required: true },
  type: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);