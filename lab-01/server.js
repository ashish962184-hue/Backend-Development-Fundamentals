const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Node.js and Express server lab!");
});

app.get("/about", (req, res) => {
  res.status(200).json({
    name: "Your Name",
    section: "Your Section"
  });
});

app.get("/time", (req, res) => {
  res.status(200).send(new Date().toString());
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3000, () => {
  console.log("Express Server running on port 3000");
});
