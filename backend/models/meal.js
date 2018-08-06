'use strict'

var mongoose = require('mongoose');
var Food = require('../models/food');
var Schema = mongoose.Schema;

var FoodEntrySchema = Schema({
    quantity: Number,
    refFood: { type: Schema.ObjectId, ref:'Food' }
});

var MealSchema = Schema({
    name: String,
    hour: String,
    foods: [{ type: FoodEntrySchema }]
});

module.exports = {
    Meal: mongoose.model('Meal', MealSchema),
    MealSchema: MealSchema
}