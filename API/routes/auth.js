const router = require('express').Router();
const User = require('../model/User')
const Pet = require('../model/petsSchema')
const { registerValidation, loginValidation } = require("./validation");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body)
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
    try {
        const saveUser = await user.save();
        const token = jwt.sign(
            {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            process.env.TOKEN_SECRET
        );

        res.header('auth-token', token).send(user)
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
    const token = jwt.sign(
        {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        process.env.TOKEN_SECRET
    );
    res.setHeader("Access-Control-Allow-Headers", "token", token);
    res.header('auth-token', token).send(user)
});



router.put("/:id", async (req, res) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const UpdatedUser = {
        password: hashPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
    };

    try {
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
    }


});



router.get("/", async (req, res) => {
    const user = await User.find({});
    res.json(user);

});






module.exports = router;