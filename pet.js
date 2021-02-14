const Pet = require('./API/model/petsSchema')
const User = require("./API/model/User");
const { cloudinary } = require('./config/cloudinary');
const router = require('express').Router();


router.get('/search', async (req, res) => {
    try {
        let filter = {};
        if (req.query.adoptionStatus) filter.adoptionStatus = req.query.adoptionStatus;
        if (req.query.height) filter.height = parseInt(req.query.height);
        if (req.query.weight) filter.weight = parseInt(req.query.weight);
        if (req.query.type) filter.type = req.query.type;
        if (req.query.name) filter.name = req.query.name;
        let pets = await Pet.find(filter);
        if (pets.length === 0) {
            return res.status(404).send({ err: `No pets found, try again ` });
        }
        res.json(pets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



router.post("/", async (req, res) => {
    const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
        upload_preset: 'pets-images',
    });
    try {
        let newPet = new Pet({
            picture: uploadResponse.url,
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
        const savePet = await newPet.save();
        res.send("done");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});



router.get("/", async (req, res) => {
    try {
        let pets = await Pet.find({})
        res.send(pets);

    } catch (err) {
        console.error(err.massage);
        res.status(500).send('Server error')
    }

});

router.get("/:id", async (req, res) => {
    const petId = req.params.id;
    const pet = await Pet.findOne({ _id: petId });
    res.send(pet);
});







module.exports = router;
