const { URL } = require("../Models/models");

let getData = async (req, res) => {
  try {
    const data = await URL.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Occured" });
  }
};

// add data from the database
const addData = async (req, res) => {
  try {
    // get data from the body
    const data = req.body;

    // create a new URL
    const newUrl = new URL(data);

    // save the new URL
    const savedData = await newUrl.save();
    res.json({ message: "Data Added Successfully" });
    console.log(savedData);
  } catch (err) {
    console.log(err);
    res.json({ message: "Error Occured" });
  }
};

// get data from the database
let getDataByID = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await URL.findById(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Occured" });
  }
};

// update data from the database
const UpdateById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await URL.findByIdAndUpdate(id, data, { new: true });
    if (updatedData) {
      res.json(updatedData);
      console.log("Data Fetched");
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Occured" });
  }
};

// delete data from the database
const DeleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData = await URL.findOneAndDelete(id);
    if (deletedData) {
      res.json({ message: "Data Deleted Successfully" });
      console.log("Data Deleted");
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "Error from delete" });
  }
};
module.exports = { getData, addData, getDataByID, UpdateById, DeleteById };
