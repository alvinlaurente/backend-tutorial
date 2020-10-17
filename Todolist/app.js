const express = require("express");
const port = 3000;

// Make router modular
const todoController = require("./controllers/todoController");

const app = express();

// Template engine using EJS
app.set("view engine", "ejs");

// Static files
app.use(express.static("./public"));

todoController(app);

// Listen to port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
