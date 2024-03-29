import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const requestSchema = new mongoose.Schema({
  message: {
    type: String,
    required: false,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
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
});

requestSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

export const Request = mongoose.model("Request", requestSchema);
