'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = Schema({
    name: String,
    image: String,
    brand: String,
    soldin: Array,
    kgprice: Number,
    kcal: Number,
    sodium: Number,
    fiber: Number,
    sugar: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number,
    sat_fat: Number,
    mono_fat: Number,
    poli_fat: Number,
    omega3: Number,
    omega6: Number,
    omega9: Number,
    //list: { type: Schema.ObjectId, ref:'List' }
});

module.exports = mongoose.model('Food', FoodSchema);