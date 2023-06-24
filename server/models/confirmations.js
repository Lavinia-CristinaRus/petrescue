import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const confirmationSchema = new mongoose.Schema({
  description: {
    type: String,
    default: true,
  },

  avatar: {
    public_id: String,
    url: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  valid: {
    type: Boolean,
    default: true,
  },

  accepted: {
    type: Boolean,
    required:false,
  },
});


confirmationSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

export const Confirmation = mongoose.model("Confirmation", confirmationSchema);
