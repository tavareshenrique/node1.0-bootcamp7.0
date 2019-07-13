const express = require("express");

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  console.time("Request");

  console.log(`Método ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User not found on request body" });
  }

  return next();
}

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

function checkUserinArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserinArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
