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

const authToken = async () => {
  // Connexion pour obtenir un token
  const res = await request(app).post("/users/login").send({
    email: "lili@gmail.com",
    password: "123_let's_go",
  });

  return res.body.authToken; // Récupérer le token JWT
};

// test create comment
describe("POST /comments/", () => {
  it("cela devrait créer une publication", async () => {
    const token = await authToken(); // Récupère un token JWT valide
    const res = await request(app)
      .post("/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        postId: "6745b1a59891f2d200c7f71c",
        content: "Nouveau commentaire test unitaire",
      });
    console.log(res.body); // Regarde ce que retourne le serveur
    expect(res.statusCode).toBe(201);
  });
});

// test getAll comment
describe("GET /comments/", () => {
  it("cela devrais nous retourner tous les commentaires", async () => {
    const token = await authToken();
    const res = await request(app)
      .get("/comments/")
      .set("Authorization", `Bearer ${token}`)
      .populate("userId", "firstname lastname");
  });
  console.log(res.body);
  expect(res.statusCode).toBe(200);
});

// test update commentaire
describe("PUT /comments/:id", () => {
  it("cela devrait modifier une publication", async () => {
    const token = await authToken(); // Récupère un token JWT valide
    // Modifier le post
    const res = await request(app)
      .put(`/comments/6745c778ba606970adcd0832`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "Test unitaire modif 2",
      });
    console.log(res.body); // Regarde ce que retourne le serveur
    expect(res.statusCode).toBe(200);
  });
});

// test delete comment
describe("DELETE /comments/:id", () => {
  it("cela devrait supprimer un commentaire", async () => {
    const token = await authToken(); // Récupère un token JWT valide

    // Supprimer le commentaire
    const res = await request(app)
      .delete(`/comments/6717eda3b11303fcbd13a5d7`)
      .set("Authorization", `Bearer ${token}`);
    console.log(res.body); // Regarde ce que retourne le serveur
    expect(res.statusCode).toBe(200);
  });
});
