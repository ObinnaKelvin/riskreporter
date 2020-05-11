const router = require('express').Router();

//Risk Table
let Risk = require('../models/risk.model');

//read
router.route('/').get((request, response) => {
    Risk.find()
    .sort({"createdAt": -1})//This arranges records in order of the date the data was created
    .then(riskdata => response.json(riskdata))
    .catch(error => response.status(400).json('Error: '+ error));
});

//Read by ID
router.route('/:id').get((request, response) => {
    Risk.findById(request.params.id)
    .then(riskdata => response.json(riskdata))
    .catch(error => response.status(400).json('Error: ' + error));
})

//create
router.route('/add').post((request, response) => {
    const reporter = request.body.reporter;
    const date = Date.parse(request.body.date);
    const riskLocation = request.body.location;
    const riskOwner = request.body.owner;
    const riskDescription = request.body.description;
    const potentialRisk = request.body.potentialRisk;
    const likelihood = request.body.likelihood;
    const potentialImpact = request.body.potential;
    const mitigatingMeasures = request.body.mitigate;
    const residualRiskOption = request.body.residualOption;
    const residualRisk = request.body.residual;

    const newRisk = new Risk({
        reporter,date,riskLocation,riskOwner,riskDescription,
        potentialRisk,likelihood,potentialImpact,mitigatingMeasures,
        residualRiskOption,residualRisk
    });

    newRisk.save()
        .then(() => console.log('Risk Added!'))
        .catch(error => response.status(400).json('Error: ' + error));
})

//update
router.route('/update/:id').post((request, response) => {
    Risk.findById(request.params.id)
    .then(riskdata => {
        console.log("Risk Data: ", riskdata);
        riskdata.reporter = request.body.reporter;
        riskdata.date = Date.parse(request.body.date);
        riskdata.riskLocation = request.body.location;
        riskdata.riskOwner = request.body.owner;
        riskdata.riskDescription = request.body.description;
        riskdata.potentialRisk = request.body.potentialRisk;
        riskdata.likelihood = request.body.likelihood;
        riskdata.potentialImpact = request.body.potential;
        riskdata.mitigatingMeasures = request.body.mitigate;
        riskdata.residualRiskOption = request.body.residualOption;
        riskdata.residualRisk = request.body.residual;

        riskdata.save()
            .then(() => response.json("Risk Data Updated!"))
            .catch(error => response.status(400).json('Error: ' + error))
    })
})

//delete
router.route('/:id').delete((request, response) => {
    Risk.findByIdAndDelete(request.params.id)
    .then(() => response.json('Risk data Deleted'))
    .catch(error => response.status(400).json('Error: ' + error));
});

module.exports = router;


