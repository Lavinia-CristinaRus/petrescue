import { Request } from "../models/requests.js";
import { Pet } from "../models/pets.js";
//import { sendMail } from "../utils/sendMail.js";

export const addRequest = async (req, res) => {
  try {
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
    });

    res.status(200).json({ success: true, message: "Adoption request created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const retractRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.body.requestId);
    request.valid = false;

    await request.save();

    return res.status(200).json({ success: true, message: "Adoption request retracted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {

    const request = await Request.findById(req.body.requestId);

    request.accepted = true;

    await request.save();
    const requests = await Request.find({pet:request.pet});
    for(let i=0; i<requests.length;i++) {
      if(!requests[i]._id.equals(request._id)) {
        requests[i].accepted = false;
        await requests[i].save();
      }
    }
    const pet  = await Pet.findById(request.pet);
    pet.solved = true;
    await pet.save();
    return res.status(200).send(request);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.body.requestId);
    request.accepted = false;

    await request.save();

    return res.status(200).send(request);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRequestsByUser = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const unfilteredRequest = await Request.find({owner: req.user._id})
      .populate({
        path: 'pet',
        select: 'name avatar description characteristics area owner',
        populate: {
          path : 'owner',
          select: 'name avatar'
        }
      })
      .populate('owner',['name', 'avatar']);
    const request = unfilteredRequest.filter(req => req.pet.name.includes(keyword));
    return res.status(200).send(request);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReceivedRequests = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const pets = await Pet.find({owner: req.user._id, name:{$regex: keyword, $options: 'i'}}).populate('owner',['name', 'avatar']);
    let requests = [];
    for(let i=0;i<pets.length;i++){
      const request = await Request.find({pet: pets[i]._id }).populate('owner',['name', 'avatar']);
      requests.push(request);
    }
    return res.status(200).send({pets, requests});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getAdoptedPets = async (req, res) => {
  try {
    const user = req.user._id;
    const pets = await Request.find({accepted: true, owner: user},{id_:0,owner:0,createdAt:0,valid:0,accepted:0})
      .populate({
        path: 'pet',
        select: 'name avatar description characteristics area owner isPhotoRequested requestedPhotos',
        populate: {
          path : 'owner',
          select: 'name avatar'
        }
      });
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
