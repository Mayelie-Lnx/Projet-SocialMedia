// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require("../app");
// require("dotenv").config();

// // Connection à la base de données
// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGOLAB_URI);
// });

// // On efface la DB et on ferme la connection after each test
// afterAll(async () => {
//   // await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
// });

// // Test des API endpoints

// // test create user
// describe("POST /users/", () => {
//   it("cela devrait créer un utilisateur", async () => {
//     const res = await request(app).post("/users").send({
//       email: "test1@gmail.com",
//       password: "testpassword1",
//       firstname: "Loi1",
//       lastname: "Superphryge1",
//       role: "user",
//     });
//     console.log(res.body); // Regarde ce que retourne le serveur
//     expect(res.statusCode).toBe(201);
//   });
// });

// // Test de la connexion utilisateur
// describe("POST /login", () => {
//   it("cela devrait nous retourner un seul utilisateur", async () => {
//     const res = await request(app).post("/users/login").send({
//       email: "test1@gmail.com",
//       password: "testpassword1",
//     });
//     console.log(res.body); // Regarde ce que retourne le serveur
//     expect(res.statusCode).toBe(200);
//     // Vérifie que le token est présent dans la réponse
//     expect(res.body).toHaveProperty("authToken");
//     // Stocker le token pour le test de déconnexion
//     authToken = res.body.authToken;
//   });
// });

// // Test de la déconnexion utilisateur
// describe("POST users/logout", () => {
//   it("cela devrait déconnecter l'utilisateur", async () => {
//     const res = await request(app)
//       .post("/users/logout")
//       // Ajouter le token dans les headers
//       .set("Authorization", `Bearer ${authToken}`);
//     console.log(res.body); // Voir ce que retourne le serveur
//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe("Déconnexion réussie");
//   });
// });
