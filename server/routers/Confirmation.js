import express from "express";
import {
  addConfirmation,
  getConfirmationsByUser,
  getReceivedConfirmations,
  retractConfirmation,
  confirmRequest,
  denyRequest,
} from "../controllers/Confirmation.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/addconfirmation").post(isAuthenticated, addConfirmation);
router.route("/getsentconfirmations").get(isAuthenticated, getConfirmationsByUser);
router.route("/getreceivedconfirmations").get(isAuthenticated, getReceivedConfirmations);
router.route("/retractconfirmation/:_id").put(isAuthenticated, retractConfirmation);
router.route("/confirmrequest/:_id").put(isAuthenticated, confirmRequest);
router.route("/denyrequest/:_id").put(isAuthenticated, denyRequest);



export default router;