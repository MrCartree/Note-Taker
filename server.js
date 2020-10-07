// global consts
const express = require("express");
const path = require("path");
const fs = require("fs");
let db = require("./db/db.json")

const app = express();
const PORT = process.env.PORT || 3000;

let noteData = [];

let nextId = 1;

// readfile function
fs.readFile("db/db.json", "utf8", (err, data) => {
    noteData = JSON.parse(data);
    nextId = Math.max(...noteData.map(function (note) {
        return note.id 
    })) + 1;
});

// thirdware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", function (req, res) {
    res.json(noteData)
    console.log(req.query)
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

app.delete("/api/notes/:id" , function(req, res) {
    console.log(req.params.id);
    let id = (req.params.id);
    console.log(id);
    let deleteData = db.filter(element => element.id != id);
    console.log(deleteData)

    fs.writeFile("./db/db.json", JSON.stringify(deleteData), (err) => {
        if (err) throw err
        Location.reload();
    });
    res.json(deleteData);
});


app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});
