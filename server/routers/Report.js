import express from "express";
import {
  addReport,
  obsoleteReport,
  updateReport,
  seenBy,
  unseenBy,
  getAllReports,
} from "../controllers/Report.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/addreport").post(isAuthenticated, addReport);

router.route("/getallreports").get(getAllReports);

router.route("/seen/:_id").put(isAuthenticated, seenBy);

router.route("/unseen/:_id").put(isAuthenticated, unseenBy);

export default router;