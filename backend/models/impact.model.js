const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const impactSchema = new Schema({
    potentialImpact: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const Impact = mongoose.model('Impact', impactSchema);

module.exports = Impact;