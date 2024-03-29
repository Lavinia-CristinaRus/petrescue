import { Pet } from "../models/pets.js";
import { Request } from "../models/requests.js";
//import { sendMail } from "../utils/sendMail.js";
import * as mindee from "mindee";
import cloudinary from "cloudinary";
import fs from "fs";

const mindeeClient = new mindee.Client({ apiKey: "5e7445b7a9bec0e8db2203520f3c315b" })
.addEndpoint({
    accountName: "lavirus",
    endpointName: "identity_card",
});

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
    });

    return res.status(200).json({ success: true, message: "Adoption announcment created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const updatePet = async (req, res) => {
  try {
    const { petId, petName, petDescription, animal, size, ageCategory, aggressionLevel, health, location} = req.body;
    const pet = await Pet.findById(petId);
    let characteristics = [];
    characteristics.push(animal);
    characteristics.push(size);
    characteristics.push(ageCategory);
    characteristics.push(aggressionLevel);
    characteristics.push(health);
    pet.name = petName;
    pet.description = petDescription;
    pet.characteristics = characteristics;
    pet.area = location;
    await pet.save();

    return res.status(200).json({ success: true, message: "The pet was updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
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
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.query.petId);
    await cloudinary.v2.uploader.destroy(pet.avatar.public_id);
    await Request.deleteMany({pet:req.query.petId});
    return res.status(200).json({ success: true, message: "The pet was deleted sucessfully" });  
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const ids = req.user.savedPets;
    const favourites = await Pet.find({_id: { $in: ids }, solved:false}).populate('owner',['name', 'avatar']);
    return res.status(200).send(favourites);  
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyFormerPets = async (req, res) => {
  try {
    const user = req.user._id;
    const pets = await Pet.find({solved: true, owner: user}).populate('owner',['name', 'avatar']);
    if(pets) {
      return res.status(200).send(pets);
    }
    else {
      return res.status(200).json({success: true, message: "You have no pets that were adopted through this app"});
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const requestPhoto = async (req, res) => {
  try {

    const pet = await Pet.findById(req.body.petId);

    pet.isPhotoRequested = true;

    await pet.save();

    res.status(200).json({ success: true, message: "Photo requested successfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendPhoto = async (req, res) => {
  try {
    const {petId} = req.body;
    const pet = await Pet.findById(petId);
    const image = req.files.petImage.tempFilePath;

    const avatar = await cloudinary.v2.uploader.upload(image);

    fs.rmSync("./tmp", { recursive: true });
    pet.isPhotoRequested = false;
    pet.requestedPhotos.push(avatar);

    await pet.save();

    return res.status(200).json({ success: true, message: "Photo sent successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const scannIds = async (req, res) => {
  try {
    const ownerImage = req.files.ownerImage.tempFilePath;
    const adopterImage = req.files.adopterImage.tempFilePath;
    console.log("adopterImage:",adopterImage, "\nownerImage:",ownerImage);
    if(!adopterImage||!ownerImage) {
      return res.status(500).json({ success: false, message: "Please upload both IDs" });
    }
    let ownerData = null;
    let adopterData = null;

    const apiResponse1 = await mindeeClient
    .docFromPath(ownerImage)
    .parse(mindee.CustomV1, { endpointName: "identity_card" });
    const ownerString = apiResponse1.document.toString();
    let domiciliu = ownerString.match(/domiciliu:\s*(.*)/);
    let nr_buletin = ownerString.match(/nr_buletin:\s*(.*)/);
    let nume = ownerString.match(/nume:\s*(.*)/);
    let prenume = ownerString.match(/prenume:\s*(.*)/);
    let serie_buletin = ownerString.match(/serie_buletin:\s*(.*)/);
    ownerData = {
      domiciliu: domiciliu[1],
      nr_buletin:nr_buletin[1],
      nume:nume[1],
      prenume:prenume[1],
      serie_buletin:serie_buletin[1]
    };

    const apiResponse2 = await mindeeClient
    .docFromPath(adopterImage)
    .parse(mindee.CustomV1, { endpointName: "identity_card" });
    const adopterString = apiResponse2.document.toString();
    domiciliu = adopterString.match(/domiciliu:\s*(.*)/);
    nr_buletin = adopterString.match(/nr_buletin:\s*(.*)/);
    nume = adopterString.match(/nume:\s*(.*)/);
    prenume = adopterString.match(/prenume:\s*(.*)/);
    serie_buletin = adopterString.match(/serie_buletin:\s*(.*)/);
    adopterData = {
      domiciliu: domiciliu[1],
      nr_buletin:nr_buletin[1],
      nume:nume[1],
      prenume:prenume[1],
      serie_buletin:serie_buletin[1]
    };

    return res.status(200).send({ownerData, adopterData});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};