const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const noteData = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", function (req, res) {
    res.json(noteData)
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;

    noteData.push(newNote);
    console.log(req.body);

    res.json(newNote)
});







app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});
