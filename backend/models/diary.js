'use strict'
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var DiarySchema = Schema({
    date: Date,
    meals: [{ type: Schema.ObjectId, ref:'Meal' }]
});

module.exports = mongoose.model('Diary', DiarySchema);