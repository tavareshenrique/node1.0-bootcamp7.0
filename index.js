const express = require("express");

const server = express();

server.use(express.json());

server.get("/send", (req, res) => {
  return res.send("Hello World");
});

server.get("/json", (req, res) => {
  return res.json({ message: "Hello World" });
});

// Query Params = ?teste=1
server.get("/query", (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
});

// Route Params = /users/1
server.get("/routes/:id", (req, res) => {
  const { id } = req.params;

  return res.json({ message: `Buscando o usuário ${id}` });
});

// Request Body = { "name": "Henrique Tavares", "email": "ihenrits@gmail.com" }
const users = ["Diego", "Henrique"];

server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
