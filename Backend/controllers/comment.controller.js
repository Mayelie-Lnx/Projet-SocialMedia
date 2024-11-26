const Comment = require("../models/comment.model");

// Créer un commentaire
exports.createComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      userId: req.auth.userId,
      postId: req.body.postId,
      content: req.body.content,
    });
    await comment.save();
    res.status(201).json({ message: "Commentaire effectué avec succès !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Mettre à jour un commentaire
exports.updateComment = async (req, res, next) => {
  try {
    console.log("ID du commentaire à mettre à jour :", req.params.id); // Vérification
    const updatedFields = {
      content: req.body.content,
    };

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {
        new: true,
      }
    );
    if (!updatedComment) {
      return res
        .status(404)
        .json({ message: "Impossible de modifier, commentaire introuvable" });
    }
    console.log("Commentaire mis à jour :", updatedComment);
    res.status(200).json(updatedComment);
  } catch (error) {
    //res.status(400).json({ error });
    console.error("Erreur lors de la mise à jour du commentaire :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res, next) => {
  try {
    console.log("ID du commentaire à supprimer :", req.params.id); // Vérification
    const deleteComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deleteComment) {
      return res
        .status(404)
        .json({ message: "Suppression impossible, commentaire introuvable" });
    }

    console.log("Commentaire supprimé :", deleteComment);
    res.status(200).json({ message: "Commentaire supprimée" });
  } catch (error) {
    //res
    //.status(500)
    //.json({ message: "Erreur lors de la suppression de ce commentaire" });
    console.error("Erreur lors de la suppression du commentaire :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const allComments = await Comment.find().populate(
      "userId",
      "firstname lastname"
    ); // Peupler seulement le pseudonyme de l'auteur
    res.status(200).json(allComments); // Renvoie tous les posts sous forme de JSON
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des commentaires",
      error,
    });
  }
};
