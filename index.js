const express = require("express");

const server = express();

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

server.listen(3000);
