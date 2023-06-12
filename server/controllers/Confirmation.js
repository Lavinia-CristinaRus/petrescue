import { Confirmation } from "../models/confirmations.js";
import { Report } from "../models/reports.js";
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
    });
    res.status(200).json({ success: true, messageConf: "Confirmation request created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, messageConf: error.message });
  }
};

export const retractConfirmation = async (req, res) => {
  try {

    const confirmation = await Confirmation.findById(req.body.confirmationId);

    confirmation.valid = false;

    await confirmation.save();

    return res.status(200).json({ success: true, message: "Confirmation request retracted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const confirmRequest = async (req, res) => {
  try {

    const confirmation = await Confirmation.findById(req.body.confirmationId);

    confirmation.accepted = true;

    await confirmation.save();
    const confirmations = await Confirmation.find({Report:confirmation.report});
    for(let i=0; i<confirmations.length;i++) {
      if(!confirmations[i]._id.equals(confirmation._id)) {
        confirmations[i].accepted = false;
        await confirmations[i].save();
      }
    }
    const report  = await Report.findById(confirmation.report);
    report.solved = true;
    await report.save();
    return res.status(200).send(confirmation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const denyRequest = async (req, res) => {
  try {

    const confirmation = await Confirmation.findById(req.body.confirmationId);

    confirmation.accepted = false;

    await confirmation.save();

    res.status(200).json({ success: true, message: "Confirmation request rejected successfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getConfirmationsByUser = async (req, res) => {
  try {
    // const confirmation = await Confirmation.find({owner: req.user._id}).populate('report',['name', 'avatar', 'description','characteristics', 'area']);
    
    const confirmation = await Confirmation.find({owner: req.user._id})
      .populate({
        path: 'report',
        select: 'name avatar description characteristics area owner seen',
        populate: {
          path : 'owner',
          select: 'name avatar'
        }
      })
      .populate('owner',['name', 'avatar']);
      console.log(confirmation);
    return res.status(200).send(confirmation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReceivedConfirmations = async (req, res) => {
  try {
    const reports = await Report.find({owner: req.user._id}).populate('owner',['name', 'avatar']);
    let confirmations = [];
    for(let i=0;i<reports.length;i++){
      const confirmation = await Confirmation.find({report: reports[i]._id }).populate('owner',['name', 'avatar']);
      confirmations.push(confirmation);
    }
    return res.status(200).send({reports, confirmations});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
