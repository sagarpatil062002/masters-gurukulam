import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  url: string; // YouTube link or MP4 URL
  type: 'youtube' | 'mp4';
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema = new Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['youtube', 'mp4'], required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);