const express = require("express");

const server = express();

server.get("/send", (req, res) => {
  return res.send("Hello World");
});

server.get("/json", (req, res) => {
  return res.json({ message: "Hello World" });
});

server.listen(3000);
