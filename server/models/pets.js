import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
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
    type: String,
    required: true,
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
});

export const Pet = mongoose.model("Pet", petSchema);
