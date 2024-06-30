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
  role: {
    type: String,
    enum: ["customer", "admin", "employee"],
    default: "customer",
    lowercase: true,
  },
  password: { type: String, minLength: 8 },
  phoneNumber: {
    type: String,
    required: true,
    unique: [true, "Phone number must be unique"],
    min: 7,
    max: 10,
  },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  favItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  passwordResetToken: { type: String },
  passwordResetTokenExpires: { type: Date },
  OTP: {
    code: { type: String },
    expiresAt: { type: Date },
  },
});

userSchema.methods.isExpired = function () {
  if (this.OTP.expiresAt < new Date()) {
    this.OTP.code = "";
    return false;
  } else {
    return true;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;

// adress

// SchemaTypes: required, default, select, validate, get, set, alias, immutabe, transform
// indexes: index, unique, sprase
// String: lowercase, uppercase, trim, match, enum, minLength, maxLength, populate
// Number: min, max, enum, populate
// Date: min, max, expires
// ObjectId: populate
