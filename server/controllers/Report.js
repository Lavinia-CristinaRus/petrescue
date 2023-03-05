import { Report } from "../models/reports.js";
//import { sendMail } from "../utils/sendMail.js";
//utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const addReport = async (req, res) => {
  try {
    const { name, characteristics, area } = req.body;
    const owner = req.user._id;
    const avatar = req.files.avatar.tempFilePath;

    if (!user.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Please verify your account first!" });
    }

    const mycloud = await cloudinary.v2.uploader.upload(avatar);

    fs.rmSync("./tmp", { recursive: true });

    report = await Report.create({
      name,
      characteristics,
      avatar: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
      area,
      owner,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 10000),
    });

    res.status(200).json({ success: true, message: "The stray animal was reported successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obsoleteReport = async (req, res) => {
  try {

    const report = await Report.findById(req.report._id);

    report.valid = false;

    await report.save();

    sendToken(res, report, 200, "Report obsoleted successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.report._id);
    const { name, characteristics, area } = req.body;
    const owner = req.user._id;
    const avatar = req.files.avatar.tempFilePath;

    report.name = name;
    report.characteristics = characteristics;
    report.area = area;
    report.owner = owner;
    if(!(report.avatar === avatar)) {
      const mycloud = await cloudinary.v2.uploader.upload(avatar);
      fs.rmSync("./tmp", { recursive: true });
    }

    await report.save();

    res.status(200).json({ success: true, message: "The report was updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const SeenBy = async (req,res) => {
  try {
    const user = req.user._id;
    const report = req.report._id;
    report.seen.push({
      user
    });
    await report.save();

    res.status(200).json({ success: true, message: "Number of users updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}