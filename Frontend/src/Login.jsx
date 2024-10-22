import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

function LoginForm() {
  // Gérer les états pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction de soumission du formulaire de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Stocker le token dans le localStorage
        localStorage.setItem("authToken", data.authToken);
        console.log("Connexion réussi:", data);
        // Rediriger vers /home si la connexion est réussie
        navigate("/home");
      } else {
        console.error("Echec connexion");
      }
    } catch (error) {
      console.error("Erreur durant la connexion:", error);
    }
  };

  return (
    <div className="container-login">
      <img
        src="../public/Logo-SocialMedia(black).png"
        alt="Logo du site de réseau social d'entreprise SocialMédia"
      />
      <h1>Connectez-vous</h1>
      <div className="forms">
        <form className="form-login" onSubmit={handleSubmit}>
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
            S'identifier
          </button>
        </form>
        <hr />
        <div className="div-link">
          <Link to="/inscription">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
