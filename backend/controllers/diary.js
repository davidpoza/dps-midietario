'use strict'
var Diary = require('../models/diary')
var Meal = require('../models/meal')
var User = require('../models/user')
var fs = require('fs');
var path = require('path');
var config = require('../config');

var mongoosePaginate = require('mongoose-pagination');

var controller = {

    addDiary: function(req,res){
        var diary = new Diary();
        var params = req.body;
        var date = params.date;

        User.findOne({_id: req.user.sub}).exec((err, user) => {
            if(err) return res.status(500).send({message: 'Error al consultar usuario'});
            if(!user) return res.status(404).send({message: 'No existe el usuario.'});
            
            diary = new Diary();
            diary.proteinTarget = 1*user.weight; // por defecto ponemos 1g por kilo de peso
            diary.carbohydratesTarget = 50; // por defecto ponemos 50% de carbohidratos
            diary.kcalTarget = user.bmr; //por defecto ponemos calorias de mantenimiento
            diary.date = new Date(date);
            diary.meals = Array();

            for(var i=0;i<config.mealsnumber;i++){
                var meal = new Meal.Meal()
                meal.name = config.meals[i];
                diary.meals.push(meal);
            }
            
            diary.save((err, diaryStored) => {
                if(err) return res.status(500).send({message: 'Error al guardar diario.'});
                if(!diaryStored) return res.status(404).send({message: 'No se ha podido guardar el diario.'});
                return res.status(200).send({diary: diaryStored});    
            })
           
        })
    },        

    getDiary: function(req,res){
        var dateString = req.params.date;
        var date = new Date(dateString);
        console.log(date);
        if(dateString == null) return res.status(404).send({message: 'El diario no existe.'});

        Diary.findOne({date: date}).populate('meals.foods.refFood').exec((err, diary) => {
            if(err) return res.status(500).send({message: 'Error al devolver diario.'});
            if(!diary) return res.status(404).send({message: 'El diario no existe.'});
            return res.status(200).send({diary});
        })
    },
    updateDiary: function(req,res){
        var diaryId = req.params.id;
        var update = req.body;
        
        Diary.findByIdAndUpdate(diaryId, update, {new:true}, (err, diaryUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar diario.'});
            if(!diaryUpdated) return res.status(404).send({message: 'No existe el diario a actualizar'});
            return res.status(200).send({item: diaryUpdated})
        });  
    },
    
    /*la imagen se sube con el middleware multiparty*/
    uploadImage: function(req,res){
        var itemId = req.params.id;
        var fileName = "Imagen no subida";

        if(req.files){
            var filePath = req.files.image.path;
            //var fileSplit = filePath.split("/");
            var fileSplit = filePath.split("\\");
            var fileName = fileSplit[1];
            Item.findByIdAndUpdate(itemId, {image: fileName},{new:true}, (err, itemUpdated) => {
                if(err) return res.status(500).send({message: 'La imagen no se ha subido.'});
                if(!itemUpdated) return res.status(404).send({message: 'El item no existe.'});
                return res.status(200).send({
                    item: itemUpdated
                });
            })
        }
        else{
            return res.status(500).send({
                massage: fileName
            });
        }
    },
    
}

module.exports = controller;