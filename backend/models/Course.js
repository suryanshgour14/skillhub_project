const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    students: { type: Number, required: true },
    category: { type: String, default: "General" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
