const port = 5000;
var express = require("express");
var app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./API/routes/auth');
const petsListRouter = require("./API/routes/petsList");
let cors = require('cors')

app.use(cors())


dotenv.config();
app.use(express.json())

mongoose.connect("mongodb+srv://naor:naor123456@cluster-petproject.c4qjc.mongodb.net/petproject?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('connected to db')
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


    
app.use('/api/user', authRoute);
// app.use('/api/petslist', petsListRouter)
    // const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const filePath = "./pets.json";
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
// const db = require("./pets.json");



// app.post("/pet", upload.single("picture"), (req, res) => {
//     const imagePath = `./PetsImages${req.file.filename}`;
//     db.push({
//         name: req.body.name,
//         adoptionStatus: req.body.adoptionStatus,
//         height: req.body.height,
//         weight: req.body.weight,
//         color: req.body.color,
//         bio: req.body.bio,
//         // hypoallergenic: req.body.hypoallergenic,
//         dietaryRestrictions: req.body.dietaryRestrictions,
//         breed: req.body.breed,
//         picture: imagePath,
//     });
//     fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
//     res.send("Pet added.");
// });



// app.get("/pet", (req, res) => {
//     res.json(db)
// })


// //Edit Pet API Admin
// // app.put("/pet/id", upload.single("picture"), (req, res) => {
//     //     const imagePath = `./PetsImages${req.file.filename}`;
//     //     db.push({
//         //         type: req.body.type,
//         //         name: req.body.name,
//         //         adoptionStatus: req.body.adoptionStatus,
//         //         height: req.body.height,
// //         weight: req.body.weight,
// //         color: req.body.color,
// //         bio: req.body.bio,
// //         hypoallergenic: req.body.hypoallergenic,
// //         dietaryRestrictions: req.body.dietaryRestrictions,
// //         breed: req.body.breed,
// //         picture: imagePath,
// //     });
// //     fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
// //     res.send("Pet edited.");
// // });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
