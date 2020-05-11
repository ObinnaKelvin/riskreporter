const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likelihoodSchema = new Schema({
    likelihood: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const Likelihood = mongoose.model('Likelihood', likelihoodSchema);

module.exports = Likelihood;