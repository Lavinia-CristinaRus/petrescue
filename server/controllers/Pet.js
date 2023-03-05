import { Pet } from "../models/pets.js";
//import { sendMail } from "../utils/sendMail.js";
//utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";

export const addPet = async (req, res) => {
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

    let pet = await Pet.create({
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

    res.status(200).json({ success: true, message: "Adoption announcment created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obsoletePet = async (req, res) => {
  try {

    const pet = await Pet.findById(req.pet._id);

    pet.valid = false;

    await pet.save();

    sendToken(res, report, 200, "Adoption announcment obsoleted successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.pet._id);
    const { name, characteristics, area } = req.body;
    const owner = req.user._id;
    const avatar = req.files.avatar.tempFilePath;

    pet.name = name;
    pet.characteristics = characteristics;
    pet.area = area;
    pet.owner = owner;
    if(!(pet.avatar === avatar)) { //de editat conditia
      const mycloud = await cloudinary.v2.uploader.upload(avatar);
      fs.rmSync("./tmp", { recursive: true });
    }

    await pet.save();

    res.status(200).json({ success: true, message: "Adoption announcement updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adoptPet = async () => {
  try {

    const pet = await Pet.findById(req.pet._id);

    pet.solved = true;

    await pet.save();

    sendToken(res, report, 200, "Adoption announcment closed successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};