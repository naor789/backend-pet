const port = 5000;
const fs = require("fs");
var express = require("express");
var app = express();
const multer = require("multer");
const path = require("path");
const filePath = "./pets.json";
let cors = require('cors')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const router = require('express').Router();



const storage = multer.diskStorage({
    destination: "./PetsImages",
    filename: (req, file, cb) => {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});
const upload = multer({ storage });
const db = require("./pets.json");
// const { type } = require("os");
//Add Pet API Admin
router.post("/", upload.single("picture"), (req, res) => {
    //   let parsedData = JSON.parse(req.body.data);
    //   console.log(parsedData);
    //   console.log(req.file);
    const imagePath = `./PetsImages${req.file.filename}`;
    const animal = {
        picture: imagePath,
        name: req.body.name,
        description: req.body.description,
        currentStatus: req.body.currentStatus,
        type: req.body.type,
        height: req.body.height,
        weight: req.body.weight,
        adoptionStatus: req.body.adoptionStatus,
        hypoallergenic: req.body.hypoallergenic,
        dietary: req.body.dietary,
        breed: req.body.breed,
    };
    db.push(animal);
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
    res.send(animal);
});
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = router;
// app.post("/signup", function (req, res) {
//   res.send("Signup Post");
//   console.log("Signup Post");
// });
// app.post("/login", function (req, res) {
//   res.send("Login Post");
//   console.log("Login Post");
// });

//Edit Pet API Admin
// app.put("/pet/id", upload.single("picture"), (req, res) => {
//     const imagePath = `./PetsImages${req.file.filename}`;
//     db.push({
//         picture: imagePath,
//         name: req.body.name,
//         description: req.body.description,
//         currentStatus: req.body.currentStatus,
//         type: req.body.type,
//         height: req.body.height,
//         weight: req.body.weight,
//         adoptionStatus: req.body.adoptionStatus,
//         hypoallergenic: req.body.hypoallergenic,
//         dietary: req.body.dietary,
//         breed: req.body.breed,
//     });
//     fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
//     res.send("Pet edited.");
// });
