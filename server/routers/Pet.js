import express from "express";
import {
  addPet,
  obsoletePet,
  updatePet,
  getAllPets
} from "../controllers/Pet.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/addpet").post(isAuthenticated, addPet);

router.route("/getallpets").get(getAllPets);

export default router;