// const router = require('express').Router();

// router.get('/', (req, res) => {
//     res.json({
//         petsList: {
// name: Joi.string().required(),
//     adoptionStatus: Joi.string().min(3).required(),
//         height: Joi.string(),
//             weight: Joi.string(),
//                 color: Joi.string().min(3),
//                     bio: Joi.string().min(3),
//                         dietaryRestrictions: Joi.string().min(3),
//                             breed: Joi.string().min(3),
//         }
//     });

// });


// router.post('/register', async (req, res) => {
//     const { error } = registerValidation(req.body)
//     res.send(error.details[0].message);
//     if (error) return res.status(400).send(error.details[0].message);


//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashPassword,
//     });
//     console.log(user);
//     try {
//         const saveUser = await user.save();
//         res.send({ user: user._id });
//     } catch (err) {
//         console.log(err);
//         res.status(400).send(err);
//     }
// });



// router.post('/addpet', async (req, res) => {
//     res.json({
//         petsList: {
//             username: "Naor",
//         }
//     });

// });













// module.exports = router;