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
//   //await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
// });

// // Test des API endpoints

// const authToken = async () => {
//   // Connexion pour obtenir un token
//   const res = await request(app).post("/users/login").send({
//     email: "lili@gmail.com",
//     password: "123_let's_go",
//   });

//   return res.body.authToken; // Récupérer le token JWT
// };

// // test create post
// describe("POST /posts/", () => {
//   it("cela devrait créer une publication", async () => {
//     const token = await authToken(); // Récupère un token JWT valide
//     const res = await request(app)
//       .post("/posts")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         content: "Nouveau post test unitaire",
//       });
//     console.log(res.body); // Regarde ce que retourne le serveur
//     expect(res.statusCode).toBe(201);
//   });
// });

// // test update post
// describe("PUT /posts/:id", () => {
//   it("cela devrait modifier une publication", async () => {
//     const token = await authToken(); // Récupère un token JWT valide
//     // Modifier le post
//     const res = await request(app)
//       .put(`/posts/6745b1a59891f2d200c7f71c`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         content: "Test unitaire modif",
//       });
//     console.log(res.body); // Regarde ce que retourne le serveur
//     expect(res.statusCode).toBe(200);
//   });
// });

// // test delete post
// describe("DELETE /posts/:id", () => {
//   it("cela devrait supprimer une publication", async () => {
//     const token = await authToken(); // Récupère un token JWT valide

//     // Supprimer le post
//     const res = await request(app)
//       .delete(`/posts/6745af2f77ba776566bb4f19`)
//       .set("Authorization", `Bearer ${token}`);
//     console.log(res.body); // Regarde ce que retourne le serveur
//     expect(res.statusCode).toBe(200);
//   });
// });
