const bcrypt = require("bcrypt");
const User = require("../models/user.model");
require("dotenv").config();

// Créer un utilisateur
exports.createUser = async (req, res, next) => {
  try {
    // Hasher le mot de passe
    const hashPassword = await bcrypt.hash(req.body.password, 10); // 10 ...

    const user = new User({
      email: req.body.email,
      password: hashPassword,
      pseudonyme: req.body.pseudonyme,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      role: req.body.role,
    });
    await user.save();
    res.status(201).json({ message: "Utilisateur crée avec succès !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Connexion de l'utilisateur
exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Comparer les mots de passe
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    ); // Compare le mot de passe haché
    if (!passwordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Token
    const authToken = await user.generateAuthTokenAndSaveUser();
    // Réponse unique contenant l'utilisateur, le token, et un message de succès
    return res
      .status(200)
      .json({ user, authToken, message: "Connexion réussie" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.userId);
    // Filtrer les tokens pour retirer celui de la déconnexion
    user.authTokens = user.authTokens.filter(
      (tokenObj) =>
        tokenObj.authToken !== req.headers.authorization.split(" ")[1]
    );
    await user.save();
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la déconnexion" });
  }
};

// =============================================================
// ==================== PAS BESOIN (profil) ====================
// =============================================================

// // Récupérer le profil de l'utilisateur
// exports.getProfile = async (req, res, next) => {
//   try {
//     // Récupérer l'utilisateur via l'ID stocké dans req.user (décodé depuis le JWT)
//     const user = await User.findById(req.user.userId).select("-password"); // Ne pas inclure le mot de passe dans la réponse

//     if (!user) {
//       return res.status(404).json({ message: "Utilisateur non trouvé" });
//     }

//     // Retourner les informations du profil
//     res.status(200).json({
//       email: user.email,
//       pseudonyme: user.pseudonyme,
//       firstname: user.firstname,
//       lastname: user.lastname,
//       role: user.role,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Echec connexion" });
//   }
// };
