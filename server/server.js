const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once("open", () => 
    console.log("MongoAtles connection successfully!!")
);

const novelsRouter = require("./routes/novels");
app.use("/novels", novelsRouter);

app.listen(port, () => console.log(`Port!: ${port}`));