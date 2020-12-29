const router = require('express').Router();
const User = require('../model/User')
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
        firstName: req.body.firstName ,
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






module.exports = router;