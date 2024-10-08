const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authToken");
// Route pour la création d'un utilisateur
router.post("/", userController.createUser);

// Route pour connecter un utilisateur
router.post("/login", userController.loginUser);

// Route pour se déconnecter
router.post("/logout", authMiddleware, userController.logoutUser);

module.exports = router;
