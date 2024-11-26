import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Navbar from "./Home-Navbar";
import AllPosts from "./Home-AllPosts";
import Post from "./Home-Post";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === null) return;

    const authToken = localStorage.getItem("authToken");

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const sortedData = data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setPosts(sortedData);
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

    fetchPosts();
  }, [isAuthenticated, navigate]);

  // Fonction pour ajouter un nouveau post en haut de la liste
  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Fonction pour supprimer une publication
  const deletePost = async (postId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        // Filtre la liste pour retirer le post supprimé
        setPosts(posts.filter((post) => post._id != postId));
      } else {
        console.error(
          "Erreur lors de la suppression de post",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête de suppression", error);
    }
  };

  // Fonction pour modifier une publication
  const updatePost = async (postId, updatedContent) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ content: updatedContent }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(
          posts.map((post) => (post._id === postId ? updatedPost : post))
        );
      } else {
        console.error(
          "Erreur lors de la mise à jour du post",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête pour la mise à jour", error);
    }
  };

  // // Fonction pour ajouter un nouveau post en haut de la liste
  // const addNewComment = async (postId, commentContent) => {
  //   // setComments([postId, ...comments]);
  //   try {
  //     const authToken = localStorage.getItem("authToken");
  //     const response = await fetch(
  //       `http://localhost:3000/posts/${postId}/comments`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //         body: JSON.stringify({ content: commentContent }),
  //       }
  //     );

  //     if (response.ok) {
  //       const newComment = await response.json();
  //       setPosts(
  //         posts.map((post) =>
  //           post._id === postId
  //             ? { ...post, comments: [...post.comments, newComment] }
  //             : post
  //         )
  //       );
  //     } else {
  //       console.error(
  //         "Erreur lors de l'ajout du commentaire",
  //         response.statusText
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la requête d'ajout de commentaire", error);
  //   }
  // };

  return (
    <div className="content">
      {isAuthenticated === null ? (
        <p>Chargement...</p>
      ) : (
        <>
          {isAuthenticated && <Navbar />}
          <div className="home-main">
            <div className="content-posts">
              {isAuthenticated && (
                <Post post={{ content: "" }} addNewPost={addNewPost} />
              )}
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <AllPosts
                    key={index}
                    post={post}
                    deletePost={deletePost}
                    updatePost={updatePost}
                  />
                ))
              ) : (
                <p>Aucun post à afficher</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
