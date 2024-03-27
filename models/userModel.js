const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  email: { type: String },
  country: { type: String },
  phoneNumber: { type: String },
  favItems: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// adres
