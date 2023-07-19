const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const async = require("async");
const User = require("../models/users");

const router = new express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const path = req.file.path;
    const workbook = xlsx.readFile(path);

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    let rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    rows = rows.slice(1);
    async.eachSeries(rows, async (row) => {
      if (row.length > 0) {
        const [
          name,
          email,
          MobileNo,
          DateofBirth,
          WorkExperience,
          ResumeTitle,
          CurrentLocation,
          PostalAddress,
          CurrentEmployer,
          CurrentDesignation,
        ] = row;
        const user = {
          name: name,
          email: email,
          MobileNo: MobileNo,
          DateofBirth: DateofBirth,
          WorkExperience: WorkExperience,
          ResumeTitle: ResumeTitle,
          CurrentLocation: CurrentLocation,
          PostalAddress: PostalAddress,
          CurrentEmployer: CurrentEmployer,
          CurrentDesignation: CurrentDesignation,
        };
        const newUser = new User(user);
        try {
          await newUser.save();
        } catch (e) {
          console.log(e);
        }
      }
    });
    res.status(200).send("File Uploaded Successfully");
  } catch (e) {
    res.status(400).send("File doesn't Uploaded");
  }
});

module.exports = router;
