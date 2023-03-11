import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const confirmationSchema = new mongoose.Schema({
  avatar: {
    public_id: String,
    url: String,
  },

  owner: {
    type: String,
    required: true,
  },

  ownerPicture: {
    public_id: String,
    url: String,
  },

  reportId: {
    type: String,
    required: true,
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
    default: undefined,
  },

  otp_expiry: Date,
});


confirmationSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

confirmationSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const Confirmation = mongoose.model("Confirmation", confirmationSchema);
