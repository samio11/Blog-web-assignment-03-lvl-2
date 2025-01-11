import { Schema, model, connect } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

const User = model<TUser>('User', userSchema);

export default User;
