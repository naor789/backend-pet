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
//Add Pet API 



router.get('/search', async (req, res) => {
    try {
        let filter = {};
        if (req.query.adoptionStatus) filter.adoptionStatus = req.query.adoptionStatus;
        if (req.query.height) filter.height = parseInt(req.query.height);
        if (req.query.weight) filter.weight = parseInt(req.query.weight);
        if (req.query.type) filter.type = req.query.type;
        if (req.query.name) filter.name = req.query.name;
        console.log(filter);
        let pets = await Pet.find(filter);
        console.log('pet', pets);
        if (pets.length === 0) {
            return res.status(404).send({ err: `No pets found, try again ` });
        }
        res.json(pets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});





router.post("/", upload.single("picture"), async (req, res) => {
    // const imagePath = `${req.file.filename.Buffer}`;
    let newPet = new Pet({
        // picture: imagePath,
        name: req.body.name,
        type: req.body.type,
        height: req.body.height,
        weight: req.body.weight,
        color: req.body.color,
        adoptionStatus: req.body.adoptionStatus,
        hypoallergenic: req.body.hypoallergenic,
        dietaryRestrictions: req.body.dietaryRestrictions,
        breed: req.body.breed,
        bio: req.body.bio,
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

router.get("/:id", async (req, res) => {
    const petId = req.params.id;
    const pet = await Pet.findOne({ _id: petId });
    res.send(pet);
});



// router.get('/search', async (req, res) => {
//     try {
//         let filter = {};
//         if (req.query.adoptionStatus) filter.adoptionStatus = req.query.adoptionStatus;
//         if (req.query.height) filter.height = parseInt(req.query.height);
//         if (req.query.weight) filter.weight = parseInt(req.query.weight);
//         if (req.query.type) filter.type = req.query.type;
//         if (req.query.name) filter.name = req.query.name;
//         const pets = await Pet.find(filter);
//         if (pets.length === 0) {
//             return res.status(404).send({ err: `No pets found, try again ` });
//         }
//         res.json(pets);
//     } catch (err) {
//         console.error(err.massage);
//         res.status(500).send('Server Error');
//     }
// });





router.put("/foster/:id", async (req, res) => {
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



// router.post("/:id/save", async (req, res) => {
//     const petId = req.params.id;
//     const userId = req.body.userId;
//     const savePet = await Pet.findOne(
//         { _id: petId }, )
//     const user = await User.findOne(
//         { _id: userId },
//         {
//             $push: { userId: { petId } },
//         }
//     );
//     res.send("pet saved");
// });





router.put("/adopted/:id", async (req, res) => {
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




router.post("/:id/return", async (req, res) => {
    const petId = req.params.id;
    const userId = req.body.userId;
    const petToUpdate = await Pet.updateOne(
        { _id: petId },
        {
            $set: { adoptionStatus: "Available" },
        }
    );
    const user = await User.updateOne(
        { _id: userId },
        {
            $push: { adoptionStatus: { petId } },
        }
    );
    res.send("successfully put back to available");
});


router.put("/:id", async (req, res) => {
    console.log(req.body);
    // const imagePath = `${req.file.filename.Buffer}`;
    const UpdatedPet = {
        // picture: imagePath,
        name: req.body.name,
        type: req.body.type,
        height: req.body.height,
        weight: req.body.weight,
        color: req.body.color,
        adoptionStatus: req.body.adoptionStatus,
        hypoallergenic: req.body.hypoallergenic,
        dietaryRestrictions: req.body.dietaryRestrictions,
        breed: req.body.breed,
        bio: req.body.bio,
    };
    console.log('pet', UpdatedPet);
    try {
        console.log('id', req.params.id);
        const pet = await Pet.findOneAndUpdate(
            { _id: req.params.id },
            { $set: UpdatedPet  },
            { new: true },
            (err, UpdatedPet) => {
                if (err) {
                    return res.status(400).json('No found')
                }
                res.json(UpdatedPet);
            });
    } catch (err) {
        console.log(err);
        // res.status(400).send(err);
    }


});


    
    router.delete("/:id/save", async (req, res) => {
        const petId = req.params.id;
        const pet = await Pet.deleteOne({ _id: petId });
        res.send(pet);
    });



module.exports = router;
