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
  pseudonyme: {
    type: String,
    required: true,
    unique: true,
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
    //Array, crée un validateur qui vérifie si la valeur est dans le tableau donné.
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
    // { _id: this.id.toString() },
    { userId: this._id.toString(), role: this.role },
    process.env.JWT_SECRET, // Utilisation de la clé secrète définie dans le fichier .env
    { expiresIn: "4h" } // Durée de la validation du token
  );
  this.authTokens.push({ authToken });
  await this.save();
  return authToken;
};

userSchema.plugin(uniqueValidator);

// const userSchema = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
