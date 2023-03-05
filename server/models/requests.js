import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const requestSchema = new mongoose.Schema({
  avatar: {
    public_id: String,
    url: String,
  },

  message: {
    type: String,
    required: false,
  },

  owner: {
    type: String,
    required: true,
  },

  petId: {
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


requestSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

requestSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const Request = mongoose.model("Request", requestSchema);
