import { Report } from "../models/reports.js";
// import { sendMail } from "../utils/sendMail.js";
// import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";
// to check addReport info

export const addReport = async (req, res) => {
  try {
    const { reportName, reportDescription, animal, size, ageCategory, aggressionLevel, health, location, latitude, longitude } = req.body;
    const user = req.user;
    const owner = user._id;
    const avatar = req.files.reportImage.tempFilePath;
    var characteristics = [];
    characteristics.push(animal);
    characteristics.push(size);
    characteristics.push(ageCategory);
    characteristics.push(aggressionLevel);
    characteristics.push(health);

    if (!user.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Please verify your account first!" });
    }

    const mycloud = await cloudinary.v2.uploader.upload(avatar);

    fs.rmSync("./tmp", { recursive: true });

    const report = await Report.create({
      name: reportName,
      description: reportDescription,
      characteristics: characteristics,
      avatar: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
      area: {
        location: location,
        latitude: latitude,
        longitude: longitude
      },
      owner: owner,
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

    // sendToken(res, report, 200, "Report obsoleted successfully");
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

export const seenBy = async (req,res) => {
  try {
    const user = req.user._id;
    const reportId = req.body.reportId;
    const report = await Report.findById(reportId);
    report.seen.push(user);
    await report.save();

    res.status(200).json({ success: true, message: "Number of users updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
export const unseenBy = async (req,res) => {
  try {
    const user = req.user._id;
    const reportId = req.body.reportId;
    const report = await Report.findById(reportId);
    report.seen.pop(user);
    await report.save();

    res.status(200).json({ success: true, message: "Number of users updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({solved: false, valid: true}).populate('owner',['name', 'avatar']);
    if(reports) {
      return res.status(200).send(reports);
    }
    else {
      return res.status(200).json({success: true, message: "No reports yet"});
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}