const router = require('express').Router();

//Location Table
let Location = require('../models/location.model');

//read
router.route('/').get((request, response) => {
    Location.find()
    .then(locationData => response.json(locationData))
    .catch(error => response.status(400).json("Error has occured!!: " + error));
})

//create
router.route('/add').post((request, response) => {
    const riskLocation = request.body.location;
    const newLocation = new Location({
        riskLocation
    })

    newLocation.save()
    .then(() => console.log("New Location Added!"))
    .catch(error => response.status(400).json("Error has occured!!: " + error));
})
module.exports = router;