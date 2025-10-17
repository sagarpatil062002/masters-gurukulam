import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  course: string;
  feedback: string;
  image?: string; // Optional URL to photo
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  feedback: { type: String, required: true },
  image: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);