const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const commentRoutes = require("./routes/comment.route");
const path = require("path");

//on appelle les services de mongoose
const MONGO_ACCESS = process.env.MONGOLAB_URI;
mongoose
  .connect(MONGO_ACCESS, {})
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Middleware pour les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH,OPTIONS"
  );
  next();
});

app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
