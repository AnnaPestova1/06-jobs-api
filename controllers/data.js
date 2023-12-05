const Data = require("../models/Data");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllData = async (req, res) => {
  res.send("get all data");
};

const getData = async (req, res) => {
  res.send("get data");
};

const createData = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const data = await Data.create(req.body);
  res.status(StatusCodes.CREATED).json({ data });
};

const updateData = async (req, res) => {
  res.send("update data");
};

const deleteData = async (req, res) => {
  res.send("delete data");
};

module.exports = {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData
};
