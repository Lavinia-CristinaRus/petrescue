import express from "express";
import {
  addConfirmation
} from "../controllers/Confirmation.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/addconfirmation").post(isAuthenticated, addConfirmation);


export default router;