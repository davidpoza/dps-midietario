'use strict'

var mongoose = require('mongoose');
var Food = require('../models/food');
var Schema = mongoose.Schema;

var MealSchema = Schema({
    name: String,
    hour: String,
    foods: [{ type: Schema.ObjectId, ref:'Food' }]
});

module.exports = mongoose.model('Meal', MealSchema);