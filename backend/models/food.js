'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = Schema({
    name: String,
    image: String,
    quantity: Number,
    minimum: Number,
    unit: String,
    notes: String,
    list: { type: Schema.ObjectId, ref:'List' }
});

module.exports = mongoose.model('Food', FoodSchema);