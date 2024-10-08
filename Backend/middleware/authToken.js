const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(" ")[1]; // Récupère le token
  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    // Vérifier et décoder le token avec la clé secrète
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Ajouter les informations du token (userId, role, etc.) dans la requête
    //req.user = decodedToken;
    req.auth = { userId: decodedToken.userId, role: decodedToken.role };
    // Passer à la prochaine étape
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};
