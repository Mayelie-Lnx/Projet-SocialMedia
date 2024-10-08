const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const authMiddleware = require("../middleware/authToken");
const VerifyAuth = require("../middleware/verifyAuth");

// Route pour créer un commentaire (protégée par l'authentification)
router.post("/", authMiddleware, commentCtrl.createComment);

// Route pour mettre un jour une publication
router.put(
  "/:id",
  authMiddleware,
  VerifyAuth.VerifyAuthCommentUpdate,
  commentCtrl.updateComment
);

// Route pour supprimer une publication
router.delete(
  "/:id",
  authMiddleware,
  VerifyAuth.VerifyAuthCommentDelete,
  commentCtrl.deleteComment
);

module.exports = router;
