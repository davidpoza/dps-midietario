'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    nick: String,
    email: String,
    password: String,
    sex: String,
    age: Number,
    height: Number,
    weight: Number,
    activity_level: Number,
    tmb: Number    
});

module.exports = mongoose.model('User', UserSchema);