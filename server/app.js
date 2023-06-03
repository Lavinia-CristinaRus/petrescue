import express from "express";
import User from "./routers/User.js";
import Report from "./routers/Report.js";
import Pet from "./routers/Pet.js"
// import Request from "./routers/Request.js"
import Confirmation from "./routers/Confirmation.js"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

export const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);
app.use(cors());

app.use("/api/v1", User);
app.use("/api/v1", Report);
app.use("/api/v1", Pet);
// app.use("/api/v1", Request);
app.use("/api/v1", Confirmation);

app.get("/", (req, res) => {
  res.send("Server is working");
});
