'use strict'
var mongoose = require('mongoose');

var MealSchema = require("../models/meal");

var Schema = mongoose.Schema;



var DiarySchema = Schema({
    date: Date,
    proteinTarget: Number, //g por kg de peso
    carbohydratesTarget: Number, //porcentaje
    kcalTarget: Number,
    meals: [{ type: MealSchema.MealSchema }]
});

module.exports = mongoose.model('Diary', DiarySchema);