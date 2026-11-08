const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Node.js and Express server lab!");
});

app.get("/about", (req, res) => {
  res.status(200).json({
    name: "SRIMURTHI ASHISH",
    registrationNumber: "252U1R1233",
    section: "S-016"
  });
});

app.get("/time", (req, res) => {
  res.status(200).send(new Date().toString());
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Express Server running on port ${PORT}`);
});
