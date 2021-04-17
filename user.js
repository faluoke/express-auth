const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 255 },
  lastName: { type: String, required: true, maxlength: 255 },
  email: { type: String, required: true, minlength: 6, maxlength: 255 },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", userSchema);