import { Pet } from "../models/pets.js";
//import { sendMail } from "../utils/sendMail.js";
//utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";
//to check addPet info

export const addPet = async (req, res) => {
  try {
    const { petName, petDescription, animal, size, ageCategory, aggressionLevel, health,location} = req.body;
    const owner = req.user;
    const avatar = req.files.petImage.tempFilePath;
    var characteristics = [];
    characteristics.push(animal);
    characteristics.push(size);
    characteristics.push(ageCategory);
    characteristics.push(aggressionLevel);
    characteristics.push(health);

    if (!owner.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Please verify your account first!" });
    }

    const mycloud = await cloudinary.v2.uploader.upload(avatar);

    fs.rmSync("./tmp", { recursive: true });

    let pet = await Pet.create({
      name: petName,
      description: petDescription,
      characteristics: characteristics,
      avatar: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
      area: location,
      owner: owner._id,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 10000),
    });

    res.status(200).json({ success: true, message: "Adoption announcment created successfully" });
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

export const getAllPets = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const animal = req.query.animal;
    const ageCategory= req.query.ageCategory;
    const aggressionLevel = req.query.aggressionLevel;
    const size = req.query.size;
    const health = req.query.health;
    const pets = await Pet.find(
      {solved: false, name:{$regex: keyword, $options: 'i'},
        $expr: {
          $and: [
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 0] }, regex: animal, options: 'i'} },
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 1] }, regex: size, options: 'i'} },
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 2] }, regex: ageCategory, options: 'i'} },
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 3] }, regex: aggressionLevel, options: 'i'} },
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 4] }, regex: health, options: 'i'} },
          ],
        }
      }).populate('owner',['name', 'avatar']);
    if(pets) {
      return res.status(200).send(pets);
    }
    else {
      return res.status(200).json({success: true, message: "No pets available for adoption yet"});
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}