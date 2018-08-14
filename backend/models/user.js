'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    nick: String,
    email: String,
    password: String,
    sex: Number,
    age: Number,
    height: Number,
    weight: Number,
    fat: Number,
    activity_level: Number,
    bmr: Number,
    image: String,
    formula: Number,

    //los valores por defecto aunque luego cada diario puede cambiarlos
    proteinTarget: Number,
    carbohydratesTarget: Number,
    kcalTarget: Number    
});

module.exports = mongoose.model('User', UserSchema);