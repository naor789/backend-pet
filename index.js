
const rookout = require('rookout');

rookout.start({
    token: 'db0a26ed05664baebaa2c7960a31336c1417bb65ed967be59cbe8af938e3d346',
    labels: {
        env: 'dev'
    }
})

const port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./API/routes/auth');
const petRoute = require('./pet');

const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
dotenv.config();

mongoose.connect("mongodb+srv://naor:testpassword@cluster-petproject.c4qjc.mongodb.net/petproject?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db')
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


app.use('/api/user', authRoute);
app.use('/api/pet', petRoute)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


