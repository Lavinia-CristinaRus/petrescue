import express from "express";
import {
  addRequest,
  getRequestsByUser,
  retractRequest,
  getReceivedRequests,
  acceptRequest,
  rejectRequest,
  getAdoptedPets
} from "../controllers/Request.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/addrequest").post(isAuthenticated, addRequest);
router.route("/getsentrequests").get(isAuthenticated, getRequestsByUser);
router.route("/retractrequest/:_id").put(isAuthenticated, retractRequest);
router.route("/acceptrequest/:_id").put(isAuthenticated, acceptRequest);
router.route("/rejectrequest/:_id").put(isAuthenticated, rejectRequest);
router.route("/getreceivedrequests").get(isAuthenticated, getReceivedRequests);
router.route("/getadoptedpets").get(isAuthenticated, getAdoptedPets);

export default router;