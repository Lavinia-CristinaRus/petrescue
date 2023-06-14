import express from "express";
import {
  addPet,
  updatePet,
  deletePet,
  getAllPets
} from "../controllers/Pet.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.route("/addpet").post(isAuthenticated, addPet);
router.route("/getallpets").get(getAllPets);
router.route("/deletepet").delete(isAuthenticated, deletePet);
router.route("/modifypet").put(isAuthenticated, updatePet);

export default router;