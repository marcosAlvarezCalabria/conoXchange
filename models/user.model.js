const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "password needs at least 6 characters"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minLength: [3, "Username needs at least 6 characters"],
    maxLength: [10, "Username should have less than 10 characters "],
  },
  description: {
    type: String,
    minLength: [6, "Description needs at least 6 characters"],
    require: false,
  },
  interests: {
    type: [String],
    required: false,
    enum:  ['crafts', 'cooking', 'gardening and horticulture', 'everyday life skills', 'music', 'sports', 'technology', 'languages and culture','others'],
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
},
  { timestamps: true });

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
