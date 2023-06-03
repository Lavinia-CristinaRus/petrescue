import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

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
    location: { type: String, required: false},
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: String,
  }],

  otp_expiry: {
    type: Date,
    default: Date.now,
  },
});

export const Report = mongoose.model("Report", reportSchema);
