'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiarySchema = Schema({
    name: String,
    hour: String,
    meals: [Meal]
});

module.exports = mongoose.model('Diary', DiarySchema);