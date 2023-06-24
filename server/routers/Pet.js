import express from "express";
import {
  addPet,
  updatePet,
  deletePet,
  getAllPets,
  getFavourites,
  getMyFormerPets,
  requestPhoto,
  sendPhoto,
  scannIds
} from "../controllers/Pet.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.route("/addpet").post(isAuthenticated, addPet);
router.route("/getallpets").get(getAllPets);
router.route("/deletepet").delete(isAuthenticated, deletePet);
router.route("/modifypet").put(isAuthenticated, updatePet);
router.route("/getfavourites").get(isAuthenticated, getFavourites);
router.route("/getmyformerpets").get(isAuthenticated, getMyFormerPets);
router.route("/requestphoto/:_id").put(isAuthenticated, requestPhoto);
router.route("/sendphoto").put(isAuthenticated, sendPhoto);
router.route("/scannids").post(scannIds);

export default router;