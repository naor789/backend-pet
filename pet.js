const port = 5000;
const fs = require("fs");
var express = require("express");
var app = express();
const Buffer = require('buffer/').Buffer
const multer = require("multer");
const path = require("path");
const filePath = "./pets.json";
let cors = require('cors')
const bodyParser = require("body-parser");
const Pet = require('./API/model/petsSchema')
const petsPath = require("./pets.json");
const { petsValidation } = require("./API/routes/validation");
const User = require("./API/model/User");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const router = require('express').Router();
app.use(express.static("./PetsImages"));


let storage = multer.memoryStorage()

let upload = multer({ storage: storage })
// const storage = multer.diskStorage({
//     destination: "./PetsImages",
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//         );
//     },
// });

// const upload = multer({ storage });
const db = require("./pets.json");
const { now } = require("mongoose");
// const { type } = require("os");
//Add Pet API Admin
router.post("/", upload.single("picture"), async (req, res) => {
    //   let parsedData = JSON.parse(req.body.data);
    //   console.log(parsedData);
    // console.log(req.body)
    // const imagePath = `${req.file.filename.Buffer}`;
    let newPet = new Pet({
        // picture: imagePath,
        name: req.body.name,
        adoptionStatus: req.body.adoptionStatus,
        // currentStatus: req.body.currentStatus,
        // type: req.body.type,
        height: req.body.height,
        weight: req.body.weight,
        // hypoallergenic: req.body.hypoallergenic,
        dietaryRestrictions: req.body.dietaryRestrictions,
        breed: req.body.breed,
        color: req.body.color,
        bio: req.body.bio,
        // id: Date.now(),
    });

    try {
        const savePet = await newPet.save();
        res.send("done");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//     db.push(newPet);
//     await newPet.save()
//     fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
//     res.send(newPet);
//     // res.send('Server')
// });


router.get("/", async (req, res) => {
    try {
        // res.send(petsPath);
        let pets = await Pet.find({})
        res.send(pets);

    } catch (err) {
        console.error(err.massage);
        res.status(500).send('Server error')
    }

    // res.send(petsPath);
});

router.put("/:id", async (req, res) => {
    const petId = req.params.id;
    const userId = req.body.userId;
    const petToUpdate = await Pet.updateOne(
        { _id: petId },
        {
            $set: { adoptionStatus: "foster" },
        }
    );
    const user = await User.updateOne(
        { _id: userId },
        {
            $push: { adoptionStatus: { petId } },
        }
    );
    res.send("successfully fostered pet");
});


router.put("/:id", async (req, res) => {
    const petId = req.params.id;
    const userId = req.body.userId;
    const petToUpdate = await Pet.updateOne(
        { _id: petId },
        {
            $set: { adoptionStatus: "adopted" },
        }
    );
    const user = await User.updateOne(
        { _id: userId },
        {
            $push: { adoptionStatus: { petId } },
        }
    );
    res.send("successfully adopted pet");
});



router.put("/:id", async (req, res) => {
    //   let parsedData = JSON.parse(req.body.data);
    //   console.log(parsedData);
    // console.log(req.body)
    // const imagePath = `${req.file.filename.Buffer}`;
    let UpdatedPet = new Pet({
        // picture: imagePath,
        name: req.body.name,
        currentStatus: req.body.currentStatus,
        // type: req.body.type,
        height: req.body.height,
        weight: req.body.weight,
        adoptionStatus: req.body.adoptionStatus,
        hypoallergenic: req.body.hypoallergenic,
        dietaryRestrictions: req.body.dietaryRestrictions,
        breed: req.body.breed,
        bio: req.body.bio,
        // id: Date.now(),
    });
    try {
        const pet = await Pet.findOneAndUpdate(
            { _id: req.params.id },
            { $set: UpdatedPet },
            { new: true },
            (err, update) => {
                if (err) {
                    return res.status(400).json('No found')
                }
                res.json(update);
            });
    } catch (err) {
        console.log(err);
        // res.status(400).send(err);
    }


});



module.exports = router;
// const express = require("express");
// const User = require("../Model/User");
// var app = express();
// const router = require("express").Router();
// const verify = require("./verifyToken");
// const dbName = "pets";
// const fs = require("fs");
// const multer = require("multer");
// const path = require("path");
// const filePath = "./pets.json";
// let cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// }
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//     "mongodb+srv://naor:naor123456@cluster-petproject.c4qjc.mongodb.net/petproject?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//     const collection = client.db("pets").collection("pets");
//     // perform actions on the collection object
//     client.close();
// });
// let pets = [];


// app.use(cors());

// const storage = multer.diskStorage({
//     destination: "../PetsImages",
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//         );
//     },
// });
// router.post("/", verify, (req, res, next) => {
//     const imagePath = `${req.file.filename}`;
//     const pet = {
//         type: req.body.type,
//         name: req.body.name,
//         status: req.body.status,
//         picture: imagePath,
//         height: req.body.height,
//         weight: req.body.weight,
//         color: req.body.color,
//         bio: req.body.bio,
//         hypoAllergenic: req.body.hypoAllergenic,
//         restrictions: req.body.restrictions,
//         breed: req.body.breed,
//     };
//     pets.push(pet);
//     res.status(201).json();
// });
// router.get("/", verify, (req, res) => {
//     res.json(pets);
//     console.log(pets);
// });
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//         const db = client.db(dbName);
//         // Use the collection named "users"
//         const pets_collection = db.collection("pets");
//         newUserDB = await pets_collection.insertOne(petDocument);
//         console.log(newUserDB);
//     } catch (err) {
//         console.log(err.stack);
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);
// module.exports = router;