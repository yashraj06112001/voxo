import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String, required: false },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);
