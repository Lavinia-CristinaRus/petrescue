import { Request } from "../models/requests.js";
//import { sendMail } from "../utils/sendMail.js";
//utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const addRequest = async (req, res) => {
  try {
    console.log(req.body)
    const { message, petId } = req.body;
    const owner = req.user;

    if (!owner.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Please verify your account first!" });
    }

    const request = await Request.create({
      message,
      owner:owner._id,
      pet: petId,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 10000),
    });

    res.status(200).json({ success: true, message: "Adoption request created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const retractRequest = async (req, res) => {
  try {

    const request = await Request.findById(req.request._id);

    request.valid = false;

    await request.save();

    sendToken(res, request, 200, "Request obsoleted successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {

    const request = await Request.findById(req.request._id);

    request.accepted = true;

    await request.save();

    sendToken(res, request, 200, "Request accepted successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectRequest = async (req, res) => {
  try {

    const request = await Request.findById(req.request._id);

    request.accepted = false;

    await request.save();

    sendToken(res, request, 200, "Request rejected successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRequestsByUser = async (req, res) => {
  try {
    const request = await Request.find({owner: req.user._id}).populate('pet',['name', 'avatar']);
    sendToken(res, request, 200);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getRequestsByPet = async (req, res) => {
  try {
    const request = await Request.find({pet: req.pet._id}).populate('owner',['name', 'avatar']);
    sendToken(res, request, 200);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
