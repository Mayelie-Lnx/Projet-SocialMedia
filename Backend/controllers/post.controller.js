const Post = require("../models/post.model");

// Créer une publication
exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    // Pour vérifier la présence d'une image
    const imageGif = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null;

    const post = new Post({
      author: req.auth.userId, // ID de l'utilisateur connecté
      title: title,
      content: content,
      imageGif: imageGif,
    });
    await post.save();
    res.status(201).json({ message: "Publication crée avec succès !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Mettre à jour un post
exports.updatePost = async (req, res, next) => {
  try {
    //console.log("ID du post à mettre à jour:", req.params.id); // Log ID pour vérification

    const updatedFields = {
      title: req.body.title,
      content: req.body.content,
    };

    if (req.file) {
      updatedFields.imageGif = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {
        new: true, // Retourne la version de la publication mise à jour
      }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: "Impossible de modifier, publication introuvable" });
    }

    res.status(200).json(updatedPost); // Renvoie la publication mise à jour
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Supprimer un post
exports.deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ message: "Impossible de supprimer, publication introuvable" });
    }

    res.status(200).json({ message: "Publication supprimée" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la publication" });
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find().sort({ created: -1 }); // Récupère les posts par ordre décroissant de création
    res.status(200).json(allPosts); // Renvoie tous les posts sous forme de JSON
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des publications",
      error,
    });
  }
};
