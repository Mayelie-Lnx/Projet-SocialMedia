import React, { useState } from "react";

function Post({ post, addNewPost }) {
  const [error, setError] = useState(null);
  const [content, setContent] = useState(post.content || ""); // Initialise avec le contenu du post

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Inclure le token
        },
        body: JSON.stringify({ content }), // Inclure les données du post en JSON
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }

      const newPost = await response.json();
      console.log("Nouveau post depuis le backend :", newPost); // Vérifie que le backend retourne bien un post complet
      addNewPost(newPost); // Appelle la fonction avec le nouveau post
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError("Erreur lors de la récupération des données.");
    }
  };

  return (
    <div className="container-modal">
      <button
        type="button"
        className="btn btn-publier"
        data-bs-toggle="collapse"
        data-bs-target="#collapsePosts"
        aria-expanded="false"
        aria-controls="collapsePosts"
      >
        Post
      </button>
      <div className="collapse" id="collapsePosts">
        <div className="card card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)} // Mettre à jour le contenu
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <input
                type="file"
                className="form-control"
                id="fileInput"
                accept="image/*" // Accepter uniquement les images
                onChange={(e) => setImage(e.target.files[0])} // Mettre à jour l'image sélectionnée
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Publier
            </button>
          </form>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Post;
