const getAllData = async (req, res) => {
  res.send("get all data");
};

const getData = async (req, res) => {
  res.send("get single data");
};

const createData = async (req, res) => {
  res.json(req.user);
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
