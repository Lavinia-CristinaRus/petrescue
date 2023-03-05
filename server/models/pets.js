import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  characteristics: [{
    type: String,
    required: false,
  }],

  avatar: {
    public_id: String,
    url: String,
  },

  area: {
    type: String,
    required: true,
  },

  owner: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  solved: {
    type: Boolean,
    default: false,
  },

  valid: {
    type: Boolean,
    default: true,
  },

  otp_expiry: Date,
});


petSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

petSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const Pet = mongoose.model("Pet", petSchema);
