import { Confirmation } from "../models/confirmations.js";
import { Report } from "../models/reports.js";
import { User } from "../models/users.js";
import { sendMail } from "../utils/sendMail.js";
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
    const user = await User.findById(owner._id);
    await sendMail(user.email, "Pet care instructions", `Hello,\n\n\nYou've just completed a form for an animal you picked up from the street. Please take a look at the instructions below.\n\nInstructions for dog registration: https://greenvetcare.ro/microcip-si-inregistrare-cadrul-legal-pentru-caini/ \nInstructions for pet care: https://www.pethope.ro/ro/informatii-utile/intrebari-frecvente.html \n\n\nPlease take care of that pet, but also of yourself,\nPetRescue`);
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
    const keyword = req.query.keyword;
    const unfilteredConfirmation = await Confirmation.find({owner: req.user._id})
      .populate({
        path: 'report',
        select: 'name avatar description characteristics area owner seen',
        populate: {
          path : 'owner',
          select: 'name avatar'
        }
      })
      .populate('owner',['name', 'avatar']);
    const confirmation = unfilteredConfirmation.filter(conf => conf.report.name.includes(keyword));
    return res.status(200).send(confirmation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReceivedConfirmations = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const reports = await Report.find({owner: req.user._id, name:{$regex: keyword, $options: 'i'}}).populate('owner',['name', 'avatar']);
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
