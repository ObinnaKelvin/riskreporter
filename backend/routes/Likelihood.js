const router = require('express').Router();

//Location Table
let Likelihood = require('../models/likelihood.model');

//read
router.route('/').get((request, response) => {
    Likelihood.find()
    .then(likelihoodData => response.json(likelihoodData))
    .catch(error => response.status(400).json("Error has occured!!: " + error));
})

//create
// router.route('/add').post((request, response) => {
//     const riskLocation = request.body.location;
//     const newLocation = new Location({
//         riskLocation
//     })

//     newLocation.save()
//     .then(() => console.log("New Location Added!"))
//     .catch(error => response.status(400).json("Error has occured!!: " + error));
// })
module.exports = router;