const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middleware/authToken.js");
const VerifyAuth = require("../middleware/verifyAuth.js");
const multer = require("../middleware/multer.js");

// Route pour la création d'une publication
router.post("/", authMiddleware, multer, postController.createPost);

// Route pour récupérer toutes les publications
router.get("/", authMiddleware, postController.getAllPosts);

// Route pour mettre un jour une publication
router.put(
  "/:id",
  authMiddleware,
  VerifyAuth.VerifyAuthPost,
  multer,
  postController.updatePost
);

// Route pour supprimer une publication
router.delete(
  "/:id",
  authMiddleware,
  VerifyAuth.VerifyAuthPost,
  postController.deletePost
);

module.exports = router;
