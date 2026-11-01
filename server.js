const express = require("express");

const app = express();

app.get("/", (request, response) => {
    response.send("Welcome to Backend Development");
});
app.get("/about", (request, response) => {
    response.status(200).json({
        name: "Ashish",
        section: "S-016"
    });
});

app.get("/time", (request, response) => {
    response.status(200).json({
        currentDateTime: new Date()
    });
});

// Handle unknown routes
app.use((request, response) => {
    response.status(404).send("404 - Page Not Found");
});


app.listen(3000, () => {
    console.log("Express server running on port 3000");
});