import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./InscriptionForm.css";

function InscriptionForm() {
  // Gérer les états pour les champs du formulaire
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // État pour gérer l'affichage de l'alerte de succès
  const [isSuccess, setIsSuccess] = useState(false);

  // Fonction de soumission du formulaire de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    try {
      const response = await fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // Gérer la réponse, par exemple, stocker le token
        console.log("Inscription réussi:", data);
        setIsSuccess(true); // Mise à jour de l'état en cas de succès
      } else {
        console.error("Echec inscription");
      }
    } catch (error) {
      console.error("Erreur durant l'inscription:", error);
    }
  };

  return (
    <div className="container-inscription">
      <img
        src="../public/Logo-SocialMedia(black).png"
        alt="Logo du site de réseau social d'entreprise SocialMédia"
      />
      <h1>Inscrivez-vous</h1>

      {isSuccess && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Utilisateur créé avec succès !</h4>
          <Link to="/login">Retour à la page connexion</Link>
        </div>
      )}

      <div className="div-form">
        <form className="form-inscription" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="InputFirstname"
              aria-describedby="emailHelp"
              placeholder="Nom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="InputLastname"
              aria-describedby="emailHelp"
              placeholder="Prénom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Mot de passe"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Valider l'inscription
          </button>
        </form>
      </div>
    </div>
  );
}
export default InscriptionForm;
