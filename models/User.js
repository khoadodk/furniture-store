import mongoose from 'mongoose';
const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin', 'root']
    }
  },
  {
    timestamps: true
  }
);

//use the existing model or create a new one (ERROR: 'Cannot overwrite `User` model once compiled.',)
export default mongoose.models.User || mongoose.model('User', UserSchema);
