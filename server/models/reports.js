import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const reportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
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
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true},
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

  seen: [{
    user_id: "String",
    default: null,
  }],

  otp_expiry: {
    type: Date,
    default: Date.now,
  },
});


reportSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

reportSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const Report = mongoose.model("Report", reportSchema);
