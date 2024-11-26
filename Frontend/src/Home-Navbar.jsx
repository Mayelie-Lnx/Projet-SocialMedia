import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleLogout = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        console.log("Déconnexion réussie");
        // Retirer le token du localStorage
        localStorage.removeItem("authToken");
        // Rediriger vers la page de login
        navigate("/login");
      } else {
        console.error("Échec de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur durant la déconnexion :", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="ml-auto d-flex align-items-center">
        <Link className="navbar-brand" to="/home">
          <img src="/Logo-SocialMedia.png" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} className="icon-burger" />
        </button>
      </div>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/home">
              Accueil <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              Événements
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link disabled"
              to="/contact"
              tabIndex="-1"
              aria-disabled="true"
            >
              Contact
            </Link>
          </li>
        </ul>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="button"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
