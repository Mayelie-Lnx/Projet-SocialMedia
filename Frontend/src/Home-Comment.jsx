import React, { useState, useEffect } from "react";

function AllComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchAllComments = async () => {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3000/comments/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error("Erreur lors de la récupération des commentaires");
      }
    };

    fetchAllComments();
  }, [postId]);

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      const authToken = localStorage.getItem("authToken"); // Récupérer le token du localStorage
      const response = await fetch("http://localhost:3000/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Inclure le token
        },
        body: JSON.stringify({ content, postId }), // Inclure les données du post en JSON
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la soumission du commentaire");
      }

      const newComment = await response.json();
      console.log("Nouveau commentaire depuis le backend :", newComment); // Vérifie que le backend retourne bien un post complet
      setComments((prevComments) => [...prevComments, newComment]);
      setContent(""); // Réinitialiser le champ de texte
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setError("Erreur lors de la récupération des données.");
    }
  };

  return (
    <div className="container-modal-comments">
      <div className="bg-white">
        <div className="d-flex flex-row fs-12 justify-content-center">
          <div className="div-comment p-2 cursor">
            {/* <FontAwesomeIcon icon={faCommentDots} className="icon-comment" /> */}
            <button
              className="btn btn-link btn-link-commenter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseComment-${postId}`}
              aria-expanded="false"
              aria-controls={`collapseComment-${postId}`}
            >
              Commenter
            </button>
            <div className="mt-3 one-comment">
              {comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <h1 className="d-block name">{comment.author}</h1>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id={`collapseComment-${postId}`} className="bg-light p-2 collapse">
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row align-items-start">
            <textarea
              className="form-control ml-1 shadow-none textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Écrire un commentaire..."
            ></textarea>
          </div>
          <div className="mt-2 text-right">
            <button
              className="btn btn-primary btn-sm shadow-none btn-publied-comment"
              type="submit"
            >
              Publier un commentaire
            </button>
            <button
              className="btn btn-outline-primary btn-sm ml-1 shadow-none btn-annuler-comment"
              type="button"
              onClick={() => setContent("")} // Réinitialiser le champ
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AllComments;
