const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//Express Server
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Database Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Risk Register Database Connection Established Successfully");
})

//Routes for the CRUD
const riskRouter = require('./routes/Risk');
const locationRouter = require('./routes/Location');
const likelihoodRouter = require('./routes/Likelihood');
const ownerRouter = require('./routes/Owner');
const impactRouter = require('./routes/Impact');
app.use('/risks', riskRouter);
app.use('/locations', locationRouter);
app.use('/likelihoods', likelihoodRouter);
app.use('/owners', ownerRouter);
app.use('/impacts', impactRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})