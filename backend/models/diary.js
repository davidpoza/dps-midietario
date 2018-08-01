'use strict'
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var DiarySchema = Schema({
    date: Date,
    meals: []
});

module.exports = mongoose.model('Diary', DiarySchema);