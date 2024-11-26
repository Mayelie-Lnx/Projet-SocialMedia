import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
// import AllComments from "./Home-Comment";

function AllPosts({ post, deletePost, updatePost }) {
  const [authToken, setAuthToken] = useState(null);
  // Ajout de l'état pour le contenu modifié
  const [newContent, setNewContent] = useState("");
  // Ajout de l'état pour le post en cours
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    // Récupérer le token d'authentification depuis le localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Décoder le token pour obtenir userId et role (ajoute une fonction de décodage si nécessaire)
  const userId = authToken ? decodeToken(authToken).userId : null;
  const role = authToken ? decodeToken(authToken).role : null;
  // Vérification si l'utilisateur est l'auteur ou un admin
  const isAuthorOrAdmin = userId === post.author._id || role === "admin";

  const openEditModal = (post) => {
    setCurrentPost(post); // Définit le post en cours
    setNewContent(post.content); // Initialise newContent avec le contenu du post sélectionné
  };

  const handleEdit = () => {
    if (currentPost) {
      updatePost(currentPost._id, newContent);
      setCurrentPost(null); // Réinitialise l'état après l'édition
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center row">
        <div className="col-md-8-container">
          <div className="d-flex flex-column comment-section">
            <div className="p-2">
              <div className="d-flex flex-row user-info">
                <div className="d-flex flex-column justify-content-start ml-2">
                  <h1 className="d-block name">
                    {post.author.firstname} {post.author.lastname}
                  </h1>
                </div>

                {isAuthorOrAdmin && (
                  <div className="btn-update-delete">
                    <button
                      type="button"
                      className="btn btn-link"
                      data-bs-toggle="modal"
                      data-bs-target={`#modalModify-${post._id}`}
                      v
                      onClick={() => openEditModal(post)}
                    >
                      Modifier
                    </button>
                    <div
                      className="modal fade"
                      id={`modalModify-${post._id}`}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-dialog-update"
                        role="document"
                      >
                        <div className="modal-content ">
                          <div className="modal-body">
                            <textarea
                              value={newContent}
                              onChange={(e) => setNewContent(e.target.value)}
                              className="form-control"
                            ></textarea>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Annuler
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleEdit}
                              data-bs-dismiss="modal"
                            >
                              Modifier
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-link"
                      data-bs-toggle="modal"
                      data-bs-target={`#modalDelete-${post._id}`}
                    >
                      Supprimer
                    </button>
                    <div
                      className="modal fade"
                      id={`modalDelete-${post._id}`}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-body">
                            <p>
                              Êtes-vous sûr(e) de vouloir supprimer la
                              publication ?
                            </p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Annuler
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => deletePost(post._id)}
                              data-bs-dismiss="modal"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row no-gutters">
                  {post.imageGif && (
                    <div className="col-md-4 d-flex justify-content-center">
                      <img
                        src={post.imageGif}
                        className="card-img"
                        alt="Image du post"
                      />
                    </div>
                  )}
                  <div className="col-md-8">
                    <div className="card-body">
                      <p className="card-text">{post.content}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          Publié le {new Date(post.date).toLocaleDateString()}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white link-modal-comment">
                <div className="d-flex flex-row fs-12 p-2">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="icon-comment"
                  />
                  {/* <AllComments postId={post._id} /> */}
                  {/* <button
                    className="btn btn-link"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseComment-${post._id}`}
                    aria-expanded="false"
                    aria-controls={`collapseComment-${post._id}`}
                  >
                    Commentaires
                  </button> */}
                  {/* <Comments
                    // show={showCommentModal}
                    // handleClose={handleCloseCommentModal}
                    addNewComment={addNewComment}
                    postId={post._id}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fonction pour décoder le token JWT
function decodeToken(token) {
  const payload = token.split(".")[1]; // Récupérer la partie payload du JWT
  const decoded = JSON.parse(atob(payload)); // Décoder le payload en base64
  return decoded;
}

export default AllPosts;
