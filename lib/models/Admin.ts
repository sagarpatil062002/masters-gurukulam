import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  password: string;
  email: string;
  role: 'superadmin' | 'admin' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'moderator'],
    default: 'admin'
  }
}, {
  timestamps: true
});

// Index for better performance
AdminSchema.index({ username: 1 });
AdminSchema.index({ email: 1 });

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);