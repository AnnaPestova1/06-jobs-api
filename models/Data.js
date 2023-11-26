const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      enum: [
        "Banana Republic",
        "Banana Republic Factory",
        "Gap",
        "Gap Factory",
        "JCrew",
        "JCrew Factory",
        "Wayfair"
      ]
    },
    code: {
      type: String,
      required: [true, "Please provide code"],
      maxlength: 30
    },
    expires: {
      type: Date,
      required: [false, "Please provide expiration date"]
    },
    description: {
      type: String,
      required: [false, "Please provide description"],
      maxlength: 250
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
