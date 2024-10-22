import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate pour rediriger
import { AuthContext } from "./AuthContext";
import Navbar from "./Home-Navbar";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    // Attendre que l'état d'authentification soit déterminé
    if (isAuthenticated === null) return;
    // Récupérer le token depuis localStorage
    const authToken = localStorage.getItem("authToken");

    if (!isAuthenticated) {
      navigate("/login"); // Rediriger vers la page de login si non authentifié
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "GET", // S'il s'agit d'une récupération de données, la méthode GET est plus appropriée
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Envoyer le token dans les headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data); // Mets à jour l'état avec les posts récupérés
          //console.log("Données récupérées:", data);
        } else {
          console.error(
            "Erreur lors de la récupération des posts",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    };

    fetchPosts(); // Appeler la fonction pour récupérer les posts
  }, [isAuthenticated, navigate]); // Recalculer à chaque changement d'authentification

  return (
    <div className="home-main">
      {isAuthenticated === null ? ( // Attendre la détermination de l'authentification
        <p>Chargement...</p>
      ) : (
        <>
          {isAuthenticated && <Navbar />}
          <div className="content">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={index}>
                  <h3>{post.title}</h3>
                  <img src={post.imageGif} alt={post.title} />
                  <p>{post.content}</p>
                  {/* <p>{post.date}</p> */}
                </div>
              ))
            ) : (
              <p>Aucun post à afficher</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
