'use strict'
var mongoose = require('mongoose');

var MealSchema = require("../models/meal");

var Schema = mongoose.Schema;



var DiarySchema = Schema({
    date: Date,
    meals: [{ type: MealSchema.MealSchema }]
});

module.exports = mongoose.model('Diary', DiarySchema);