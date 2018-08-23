'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IngredientSchema = Schema({
    quantity: Number,
    refFood: { type: Schema.ObjectId, ref:'Food' }
});

var RecipeSchema = Schema({
    name: String,
    description: String,
    image: String,
    ingredients: [{ type: IngredientSchema }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);