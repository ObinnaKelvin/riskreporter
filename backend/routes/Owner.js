const router = require('express').Router();

//Owner Table
let Owner = require('../models/owner.model');

//read
router.route('/').get((request, response) => {
    Owner.find()
    .then(ownerData => response.json(ownerData))
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