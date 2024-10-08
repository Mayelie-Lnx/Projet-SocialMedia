import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function LoginForm() {
  // Gérer les états pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        // Gérer la réponse, par exemple, stocker le token
        console.log("Login successful:", data);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Ici, tu peux ajouter la logique de validation ou d'authentification
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  // };

  return (
    <div className="container">
      <h1>Connectez-vous</h1>
      <div className="forms">
        <form className="form" onSubmit={handleSubmit}>
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
