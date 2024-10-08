const AdminAndUser = (req, res, next) => {
  if (req.auth.role === "admin" || req.auth.userId === req.params.id) {
    next(); // Si l'utilisateur est admin, on passe à la suite
  } else {
    return res.status(403).json({ message: "Accès refusé" });
  }
};

module.exports = AdminAndUser;
