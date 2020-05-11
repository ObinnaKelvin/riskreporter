const router = require('express').Router();

//Impact Table
let Impact = require('../models/impact.model');

//read
router.route('/').get((request, response) => {
    Impact.find()
    .then(impactData => response.json(impactData))
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