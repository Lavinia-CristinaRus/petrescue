import { Report } from "../models/reports.js";
import { Confirmation } from "../models/confirmations.js";
// import { sendMail } from "../utils/sendMail.js";
// import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";
// to check addReport info

export const addReport = async (req, res) => {
  try {
    const { reportName, reportDescription, animal, size, ageCategory, aggressionLevel, health, location, latitude, longitude } = req.body;
    const user = req.user;
    const owner = user._id;
    const avatar = req.files.reportImage.tempFilePath;
    var characteristics = [];
    characteristics.push(animal);
    characteristics.push(size);
    characteristics.push(ageCategory);
    characteristics.push(aggressionLevel);
    characteristics.push(health);

    if (!user.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Please verify your account first!" });
    }

    const mycloud = await cloudinary.v2.uploader.upload(avatar);

    fs.rmSync("./tmp", { recursive: true });

    const report = await Report.create({
      name: reportName,
      description: reportDescription,
      characteristics: characteristics,
      avatar: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
      area: {
        location: location,
        latitude: latitude,
        longitude: longitude
      },
      owner: owner,
    });

    return res.status(200).json({ success: true, message: "The stray animal was reported successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    await Report.deleteOne({_id:req.query.reportId});
    await Confirmation.deleteMany({report:req.query.reportId});
    return res.status(200).json({ success: true, message: "The report was deleted sucessfully" });  
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { reportId, reportName, reportDescription, animal, size, ageCategory, aggressionLevel, health, location, latitude, longitude } = req.body;
    const report = await Report.findById(reportId);
    let characteristics = [];
    characteristics.push(animal);
    characteristics.push(size);
    characteristics.push(ageCategory);
    characteristics.push(aggressionLevel);
    characteristics.push(health);
    report.name = reportName;
    report.description = reportDescription;
    report.characteristics = characteristics;
    report.area.location = location;
    report.area.longitude = longitude;
    report.area.latitude = latitude;
    await report.save();

    return res.status(200).json({ success: true, message: "The report was updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const seenBy = async (req,res) => {
  try {
    const user = req.user._id;
    const reportId = req.body.reportId;
    const report = await Report.findById(reportId);
    if(!report.seen.includes(user)) {
      report.seen.push(user);
      await report.save();
    }

    return res.status(200).json({ success: true, message: "Number of users updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
export const unseenBy = async (req,res) => {
  try {
    const user = req.user._id;
    const reportId = req.body.reportId;
    const report = await Report.findById(reportId);
    report.seen.pop(user);
    await report.save();

    return res.status(200).json({ success: true, message: "Number of users updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const getAllReports = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const animal = req.query.animal;
    const ageCategory= req.query.ageCategory;
    const aggressionLevel = req.query.aggressionLevel;
    const size = req.query.size;
    const health = req.query.health;
    const reports = await Report.find(
      {solved: false, name:{$regex: keyword, $options: 'i'}, 
        $expr: {
          $and: [
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 0] }, regex: animal, options: 'i'} },
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 1] }, regex: size, options: 'i'} },
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 2] }, regex: ageCategory, options: 'i'} },
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 3] }, regex: aggressionLevel, options: 'i'} },
            { $regexMatch: {input: { $arrayElemAt: ['$characteristics', 4] }, regex: health, options: 'i'} },
          ],
        }
      }).populate('owner',['name', 'avatar']);
    if(reports) {
      return res.status(200).send(reports);
    }
    else {
      return res.status(200).json({success: true, message: "No reports yet"});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}