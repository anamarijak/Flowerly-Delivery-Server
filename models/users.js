const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    mass: {
        type: mongoose.Schema.Types.Double,
        default: undefined
    },
    volume: {
        type: mongoose.Schema.Types.Double,
        default: undefined
    },
    address: {
        type: String,
        default: undefined
    },
    longitude: { type: mongoose.Schema.Types.Double },
    latitude: { type: mongoose.Schema.Types.Double }
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);