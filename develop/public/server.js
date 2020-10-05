const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const noteData = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"))
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"))
});

app.get("/api/notes", function (req, res) {
    res.json(noteData)
});

app.post("/notes", function (req, res) {
    console.log(req.body);
});







app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});
