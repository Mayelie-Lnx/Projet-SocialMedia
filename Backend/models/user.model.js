const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Limite les valeurs possibles à "user" ou "admin"
    default: "user",
  },
  authTokens: [
    {
      authToken: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign(
    { userId: this._id.toString(), role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "4h" }
  );
  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
