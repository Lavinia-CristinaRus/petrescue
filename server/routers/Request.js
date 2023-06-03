import express from "express";
import {
  addRequest
} from "../controllers/Request.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/addrequest").post(isAuthenticated, addRequest);


export default router;