import { Confirmation } from "../models/confirmations.js";
//import { sendMail } from "../utils/sendMail.js";
//utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const addConfirmation = async (req, res) => {
  try {
    const {confirmationDescription, reportId} = req.body;
    const owner = req.user;
    const avatar = req.files.confirmationImage.tempFilePath;

    if (!owner.verified) {
      console.log("cica userul nu e verified");
      return res
        .status(400)
        .json({ success: false, messageConf: "Please verify your account first!" });
    }

    const mycloud = await cloudinary.v2.uploader.upload(avatar);

    fs.rmSync("./tmp", { recursive: true });
    const confirmation = await Confirmation.create({
      description: confirmationDescription,
      avatar: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
      owner: owner._id,
      report: reportId,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 10000),
    });
    res.status(200).json({ success: true, messageConf: "Confirmation request created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, messageConf: error.message });
  }
};

export const retractConfirmation = async (req, res) => {
  try {

    const confirmation = await Confirmation.findById(req.confirmation._id);

    confirmation.valid = false;

    await confirmation.save();

    sendToken(res, confirmation, 200, "Confirmation request obsoleted successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const acceptConfirmation = async (req, res) => {
  try {

    const confirmation = await Confirmation.findById(req.confirmation._id);

    confirmation.accepted = true;

    await confirmation.save();

    sendToken(res, confirmation, 200, "Confirmation request accepted successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectConfirmation = async (req, res) => {
  try {

    const confirmation = await Confirmation.findById(req.confirmation._id);

    confirmation.accepted = false;

    await confirmation.save();

    sendToken(res, confirmation,  200, "Confirmation request rejected successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getConfirmationsByReport = async (req, res) => {
  try {
    const confirmation = await Confirmation.find({report: req.report._id}).populate('owner',['name', 'avatar']);
    sendToken(res, confirmation, 200);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getConfirmationsByUser = async (req, res) => {
  try {
    const confirmation = await Confirmation.find({owner: req.user._id}).populate('pet',['name', 'avatar']);
    sendToken(res, confirmation, 200);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
