const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2 },
  surname: { type: String, required: true, minLength: 2 },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    maxLength: 254,
    trim: true,
  },
  password: { type: String, minLength: 8 },
  phoneNumber: { type: String, required: true, unique: true, min: 7, max: 10 },
  favItems: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// adress

// SchemaTypes: required, default, select, validate, get, set, alias, immutabe, transform
// indexes: index, unique, sprase
// String: lowercase, uppercase, trim, match, enum, minLength, maxLength, populate
// Number: min, max, enum, populate
// Date: min, max, expires
// ObjectId: populate
