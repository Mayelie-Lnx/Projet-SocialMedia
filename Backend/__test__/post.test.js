const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

// Connection à la base de données
beforeAll(async () => {
  await mongoose.connect(process.env.MONGOLAB_URI);
});

// On efface la DB et on ferme la connection after each test
afterAll(async () => {
  //await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// Test des API endpoints

const getToken = async () => {
  // Connexion pour obtenir un token
  const res = await request(app).post("/users/login").send({
    email: "lili@gmail.com",
    password: "123_let's_go",
  });

  return res.body.authToken; // Récupérer le token JWT
};

// test create post
describe("POST /posts/", () => {
  it("cela devrait créer une publication", async () => {
    const token = await getToken(); // Récupère un token JWT valide
    const res = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Bonjour post test!",
        content: "Je vous souhaite une belle journée post test.",
      });
    console.log(res.body); // Regarde ce que retourne le serveur
    expect(res.statusCode).toBe(201);
  });
});

// test update post
describe("PUT /posts/:id", () => {
  it("cela devrait modifier une publication", async () => {
    const token = await getToken(); // Récupère un token JWT valide
    // Créer un post avant de le modifier
    const newPost = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Bonjour !",
        content: "Bonjour, je vous souhaite une belle journée.",
      });

    // Modifier le post
    const res = await request(app)
      .put(`/posts/${newPost.body._id}`)
      .set("Authorization", `Bearer ${token}`) // Token de l'utilisateur auteur ou admin
      .send({
        title: "Bonjour, bonjour !",
        content:
          "Bonjour ou bonsoir, je vous souhaite une belle journée et/ou une bonne soirée.",
      });
    console.log(res.body); // Regarde ce que retourne le serveur
    expect(res.statusCode).toBe(200);
    //expect(res.body.title).toBe("Bonjour, bonjour !"); // Vérifie que le titre a bien été modifié
  });
});

// // test delete post
// describe("DELETE /posts/:id", () => {
//   it("cela devrait supprimer une publication", async () => {
//     const token = await getToken(); // Récupère un token JWT valide
//     // Créer un post avant de le supprimer
//     const newPost = await request(app)
//       .post("/posts")
//       .set("Authorization", `Bearer ${token}`) // Token de l'utilisateur ou admin
//       .send({
//         title: "Bonjour, bonjour !",
//         content:
//           "Bonjour ou bonsoir, je vous souhaite une belle journée et/ou une bonne soirée.",
//       });

//     // Supprimer le post
//     const res = await request(app)
//       .delete(`/posts/${newPost.body._id}`)
//       .set("Authorization", `Bearer ${token}`); // Token de l'utilisateur auteur ou admin
//     console.log(res.body); // Regarde ce que retourne le serveur
//     expect(res.statusCode).toBe(200);

//     // const findPost = await request(app)
//     //   .get(`/posts/${newPost.body._id}`)
//     //   .set("Authorization", `Bearer ${token}`);
//     // expect(findPost.statusCode).toBe(404); // Le post ne devrait plus exister
//   });
// });
