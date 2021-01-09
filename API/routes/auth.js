const router = require('express').Router();
const User = require('../model/User')
const Pet = require('../model/petsSchema')

const { registerValidation, loginValidation, petsValidation } = require("./validation");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body)
    // res.send(error.details[0].message);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists')


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashPassword,
        confirmPassword: hashPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
    });
    console.log(user);
    try {
        const saveUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email is not found')

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password')


    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)

    // res.send('Logged in');
});



router.put("/:id", async (req, res) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const UpdatedUser = {
        password: hashPassword,
        // confirmPassword: hashPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,

    };

    try {
        console.log("email", req.body.email);
        console.log('id', req.params.id);
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: UpdatedUser },
            { new: true },
            (err, UpdatedUser) => {
                if (err) {
                    return res.status(400).json(err)
                }
                res.json(UpdatedUser);
            });
    } catch (err) {
        console.log(err);
        // res.status(400).send(err);
    }


});

router.get("/:id/full", async (req, res) => {
    const UserID = req.params.id;
    const user = await User.findOne({ _id: UserID });
    res.send(user);
});


router.get("/", async (req, res) => {
    const user = await User.find({});
    res.send(user);
});



// router.get("/:id", async (req, res) => {
//     const UserID = req.params.id;
//     const user = await User.findOne({ _id: UserID });
//     res.send(user);
// });
// router.get('/search', async (req, res) => {
//     try {
//         let filter = {};
//         if (req.query.adoptionStatus) filter.adoptionStatus = req.query.adoptionStatus;
//         if (req.query.height) filter.height = parseInt(req.query.height);
//         if (req.query.weight) filter.weight = parseInt(req.query.weight);
//         if (req.query.type) filter.type = req.query.type;
//         if (req.query.name) filter.name = req.query.name;
//         console.log(filter);
//         let pets = await Pet.find(filter);
//         console.log('pet', pets);
//         if (pets.length === 0) {
//             return res.status(404).send({ err: `No pets found, try again ` });
//         }
//         res.json(pets);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;