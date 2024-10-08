const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

exports.VerifyAuthPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Publication introuvable" });
    }

    // Vérifie si l'utilisateur est le créateur ou un admin
    if (
      post.author.toString() === req.auth.userId.toString() ||
      req.auth.role === "admin"
    ) {
      next(); // Passe à la suite si l'utilisateur est autorisé
    } else {
      return res.status(403).json({
        message:
          "Erreur, seul l'admin ou l'utilisateur ayant fait cette publication peuvent la modifier et/ou supprimé",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur server" });
  }
};

exports.VerifyAuthCommentUpdate = async (req, res, next) => {
  try {
    console.log("ID du commentaire :", req.params.id); // Ajoute ceci
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire introuvable" });
    }
    console.log("Commentaire trouvé :", comment); // Ajoute ceci

    // Vérifie si l'utilisateur est le l'auteur du commentaire ou un admin
    if (comment.userId.toString() === req.auth.userId.toString()) {
      next(); // Passe à la suite si l'utilisateur est autorisé
    } else {
      return res.status(403).json({
        message:
          "Erreur, seul l'utilisateur ayant fait ce commentaire peut le modifier",
      });
    }
  } catch (error) {
    console.error("Erreur middleware Update :", error);
    res.status(500).json({ message: "Erreur server" });
  }
};

exports.VerifyAuthCommentDelete = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire introuvable" });
    }

    // Vérifie si l'utilisateur est le l'auteur du commentaire ou un admin
    if (
      comment.userId.toString() === req.auth.userId.toString() ||
      req.auth.role === "admin"
    ) {
      next(); // Passe à la suite si l'utilisateur est autorisé
    } else {
      return res.status(403).json({
        message:
          "Erreur, seul un admin ou l'utilisateur ayant fait ce commentaire peut le supprimer",
      });
    }
  } catch (error) {
    console.error("Erreur middleware Delete :", error);
    res.status(500).json({ message: "Erreur server" });
  }
};
