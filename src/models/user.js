const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    default: "Annonymous",
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Your password must not contain the word 'password'");
      }
      if (value.length < 7) {
        throw new Error("Your password must have at least 6 characters");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

module.exports = User;
