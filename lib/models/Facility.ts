import mongoose, { Schema, Document } from 'mongoose';

export interface IFacility extends Document {
  name: string;
  description: string;
  image: string; // URL to image
  createdAt: Date;
  updatedAt: Date;
}

const FacilitySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Facility || mongoose.model<IFacility>('Facility', FacilitySchema);