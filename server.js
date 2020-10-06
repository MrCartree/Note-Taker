const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

let noteData = []

let readStuff = fs.readFile("db/db.json", "utf8", (err, data) => {
    console.log(err, data)
    noteData = JSON.parse(data);
});
console.log("Check this out", readStuff);

let nextId = 1;

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
    newNote.id = nextId;
    noteData.push(newNote);
    nextId++;

    let newData = JSON.stringify(noteData);
    fs.writeFile("db/db.json", newData, (err) => {
        console.log(err);
    });

    res.json(newNote)
});







app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});
