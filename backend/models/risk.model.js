const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const riskSchema = new Schema({
    reporter: {
        type: String, required: true,
    },
    date: {
        type: Date, required: true
    },
    riskLocation: {
        type: String, required: true
    },
    riskOwner: {
        type: String, required: true
    },
    riskDescription: {
        type: String, required: true
    },
    potentialRisk: {
        type: String, required: true
    },
    likelihood: {
        type: String, required: true
    },
    potentialImpact: {
        type: String, required: true
    },
    mitigatingMeasures: {
        type: String, required: true
    },
    residualRiskOption: {
        type: String, required: true
    },
    residualRisk: {
        type: String,
    }
}, {
    timestamps: true,
});



const Risk = mongoose.model('Risk', riskSchema);

module.exports = Risk;