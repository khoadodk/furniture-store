import mongoose from 'mongoose';

const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String
    },
    email: {
      required: true,
      unique: true,
      type: String
    },
    password: {
      required: true,
      type: String,
      select: false
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['admin', 'user', 'root']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
