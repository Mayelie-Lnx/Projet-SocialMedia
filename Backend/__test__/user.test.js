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
//       pseudonyme: "Test-1",
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
//     expect(res.body).toHaveProperty("authToken"); // Vérifie que le token est présent dans la réponse
//     //expect(res.body.message).toBe("Connexion réussie"); // Vérifie que le message est correct

//     // Stocker le token pour le test de déconnexion
//     authToken = res.body.authToken;
//   });
// });

// // Test de la déconnexion utilisateur
// describe("POST users/logout", () => {
//   it("cela devrait déconnecter l'utilisateur", async () => {
//     const res = await request(app)
//       .post("/users/logout")
//       .set("Authorization", `Bearer ${authToken}`); // Ajouter le token dans les headers
//     console.log(res.body); // Voir ce que retourne le serveur
//     expect(res.statusCode).toBe(200); // Vérifier que la déconnexion réussit
//     expect(res.body.message).toBe("Déconnexion réussie");
//   });
// });

// =============================================================
// ==================== PAS BESOIN (profil) ====================
// =============================================================

// // Test de récupération du profil utilisateur
// describe("GET /profile", () => {
//   it("cela devrait nous retourner le profil", async () => {
//     const loginRes = (await request(app).post("/users/login")).send({
//       email: "test444@gmail.com",
//       password: "testpassword444",
//     });
//     const token = loginRes.body.token;

//     // Utiliser le token pour accéder au profil
//     const res = await request(app)
//       .get("/profile")
//       // Ajouter le token dans l'en-tête
//       .set("Authorization", `Bearer ${token}`);

//     console.log(res.body);
//     expect(res.statusCode).toBe(200);
//   });
// });

// =============================================================
// ======================== PUBLICATION ========================
// =============================================================

// // test update user
// describe("PUT /users/:id", () => {
//   it("cela devrait mettre un jour un utilisateur", async () => {
//     const res = await request(app).put("/users/66e89f3b527e8d2be96c6a26").send({
//       email: "test002@gmail.com",
//       password: "$2b$10$.xsDKZB03nzPWwFU1WZtf.E7mfvXd3dnUYy1IxC0qR2H4gIdgARDS",
//       pseudonyme: "Test-002",
//       firstname: "Loi002",
//       lastname: "Superphryge002",
//       role: "admin",
//     });
//     console.log(res.body); // Regarde ce que retourne le serveur
//     expect(res.statusCode).toBe(200);
//     //expect(res.body.pseudonyme).toBe("Test-004");
//   });
// });

// // test delete user
// describe("DELETE /users/:id", () => {
//   it("cela devrait supprimer un utilisateur", async () => {
//     const res = await request(app).delete("/users/66e9aa64b93716dc847028da");
//     console.log(res.body); // Regarde ce que retourne le serveur
//     expect(res.statusCode).toBe(200);
//   });
// });
