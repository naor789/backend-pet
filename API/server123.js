// const express = require("express")
// const fs = require("fs")
// const multer = require("multer")
// // const cors = require("cors")
// const path = require("path")
// const filePath = './pets.json'
// const port = 5000;

// const storage = multer.diskStorage({
//     destination: "./PetsImages",
//     filename: (req, file, cb) => {
//         cb(null,
//             `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//             )
//         }
//     })
    
//     const app = express()
    
//     // app.use(cors())
//     const upload = multer({ storage })
//     app.use(express.static("public"))
    
//     const db = require('./pets.json')
    
//     // app.get("/", (req, res) => {
//     //     res.json(db)
//     // })
    
//     // app.post('/signup', function (req, res) {
//         //     res.send('signup')
//         // })
        
//         // app.post('/login', function (req, res) {
//             //     res.send('signup')
//             // })
            
            
//             app.post("/pets", upload.single("picture"), (req, res) => {
//                 // let parsedData = JSON.parse(req.body.data)
//                 // console.log(parsedData)
//                 // console.log(req.file)
//                 const imagePath = `images/${req.file.filename}`
//                 db.push({
//                     ...req.body,
//                     picture: imagePath,
//                     type: req.body.type,
//                     name: req.body.name,
//         adoptionStatus: req.body.adoptionStatus,
//         height: req.body.height,
//         weight: req.body.weight,
//         color: req.body.color,
//         bio: req.body.bio,
//         hypoallergenic: req.body.hypoallergenic,
//         dietaryRestrictions: req.body.dietaryRestrictions,
//         breed: req.body.breed,
//     })
//     fs.writeFileSync(filePath,JSON.stringify(db,null,2))
//     res.send('Pet added')
// })

// // app.post('/pet', function (req, res) {
// //     res.send('signup')
// // })


// // app.get('/pet/: id', (req, res) => {
// //     res.send("Hello")
// // })

// // app.put('/pet/: id', (req, res) => {
// //     res.send("Hello")
// // })

// // app.get("/pet", (req, res) => {
// //     res.send("Hello")
// // })

// // app.post('/pet/:id/adopt', function (req, res) {
// //     res.send('signup')
// // })

// // app.post('/pet/:id/return', function (req, res) {
// //     res.send('signup')
// // })

// // app.post('/pet/:id/save', function (req, res) {
// //     res.send('signup')
// // })

// // app.delete('/pet/:id/save', function (req, res) {
// //     res.send('signup')
// // })

// app.listen(port, () => {
//     console.log(`listening on http://localhost:${port}`)
// })

// // const port = 5000;
// // const fs = require("fs");
// // var express = require("express");
// // var app = express();
// // const multer = require("multer");
// // const path = require("path");
// // const filePath = "./pets.json";
// // const storage = multer.diskStorage({
// //     destination: "./PetsImages",
// //     filename: (req, file, cb) => {
// //         cb(
// //             null,
// //             `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
// //         );
// //     },
// // });
// // const upload = multer({ storage });
// // const db = require("./pets.json");
// // // const { type } = require("os");
// // //Add Pet API Admin
// // app.post("/pet", upload.single("picture"), (req, res) => {
// //     //   let parsedData = JSON.parse(req.body.data);
// //     //   console.log(parsedData);
// //     //   console.log(req.file);
// //     const imagePath = `./PetsImages${req.file.filename}`;
// //     db.push({
// //         picture: imagePath,
// //         name: req.body.name,
// //         description: req.body.description,
// //         currentStatus: req.body.currentStatus,
// //         type: req.body.type,
// //         height: req.body.height,
// //         weight: req.body.weight,
// //         adoptionStatus: req.body.adoptionStatus,
// //         hypoallergenic: req.body.hypoallergenic,
// //         dietary: req.body.dietary,
// //         breed: req.body.breed,
// //     });
// //     fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
// //     res.send("Pet added.");
// // });
// // //Edit Pet API Admin
// // app.put("/pet/id", upload.single("picture"), (req, res) => {
// //     const imagePath = `./PetsImages${req.file.filename}`;
// //     db.push({
// //         picture: imagePath,
// //         name: req.body.name,
// //         description: req.body.description,
// //         currentStatus: req.body.currentStatus,
// //         type: req.body.type,
// //         height: req.body.height,
// //         weight: req.body.weight,
// //         adoptionStatus: req.body.adoptionStatus,
// //         hypoallergenic: req.body.hypoallergenic,
// //         dietary: req.body.dietary,
// //         breed: req.body.breed,
// //     });
// //     fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
// //     res.send("Pet edited.");
// // });
// // app.listen(port, () => {
// //     console.log(`Example app listening at http://localhost:${port}`);
// // });
// // // app.post("/signup", function (req, res) {
// // //   res.send("Signup Post");
// // //   console.log("Signup Post");
// // // });
// // // app.post("/login", function (req, res) {
// // //   res.send("Login Post");
// // //   console.log("Login Post");
// // // });