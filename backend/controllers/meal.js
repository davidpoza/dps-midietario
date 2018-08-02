'use strict'
var Meal = require('../models/meal');
var Diary = require('../models/diary');
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

var mongoosePaginate = require('mongoose-pagination');

var controller = {

    addMeal: function(req,res){
        var meal = new Meal();
        var params = req.body;
        var diaryId = req.params.id;
        meal.name = params.name;
        meal.hour = params.hour;


        meal.save((err, mealStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar meal.'});
            if(!mealStored) return res.status(404).send({message: 'No se ha podido guardar el meal.'});
            
            Diary.findOne({_id:diaryId}).exec((err, diary) => {
                if(err) return res.status(500).send({message: 'Error al consultar diario.'});
                if(!diary) return res.status(404).send({message: 'No hay diario en el que añadir el meal.'});
                diary.meals.push(mealStored);
                Diary.findByIdAndUpdate(diaryId, diary, {new:true}, (err, diaryUpdated) => {
                    if(err) return res.status(500).send({message: 'Error al actualizar diario.'});
                    if(!diaryUpdated) return res.status(404).send({message: 'No existe el diario a actualizar'});
                }); 
               
                
            })
            return res.status(200).send({meal: mealStored});    
        })
    },        

    deleteMeal: function(req,res){
        var mealId = req.params.id;

        //buscamos el diario que contiene el meal
        Diary.findOne({ meals: { $in: mealId }}, (err, diary) => {
            if(err) return res.status(500).send({message: 'Error al devolver diario.'});
            if(!diary) return res.status(404).send({message: 'No existe un diario con ese meal'});
            // eliminamos su referencia en el array meals
            var index = diary.meals.indexOf(mealId); 
            if (index !== -1) diary.meals.splice(index, 1);
           
            //actualizamos el diario con el nuevo array de referencias.
            Diary.findByIdAndUpdate(diary._id, diary, {new:true}, (err, diaryUpdated) => {
                if(err) return res.status(500).send({message: 'Error al actualizar diario.'});
                if(!diaryUpdated) return res.status(404).send({message: 'No existe el diario a actualizar'});
                
                // por ultimo vamos a borrar el meal
                Meal.findByIdAndRemove(mealId, (err, mealDeleted) => {
                    if(err) return res.status(500).send({message: 'Error al borrar meal.'});
                    if(!mealDeleted) return res.status(404).send({message: 'No existe el meal a borrar'});
                    return res.status(200).send({meal: mealDeleted});
                });
                
            });
        });

        
    },

    /*
    getListItems: function(req,res){
        var listId = req.params.id;
        Item.find({list: listId}).sort('name').exec((err, items) => {
            if(err) return res.status(500).send({message: 'Error al devolver items.'});
            if(!items) return res.status(404).send({message: 'No hay items que mostrar.'});
            return res.status(200).send({items});
        })
    },
    getItem: function(req,res){
        var itemId = req.params.id;
        if(itemId == null) return res.status(404).send({message: 'El item no existe.'});

        Item.findById(itemId).populate({path: 'list',populate : {path : 'user'}}).exec((err, item) => {
            if(err) return res.status(500).send({message: 'Error al devolver item.'});
            if(!item) return res.status(404).send({message: 'El item no existe.'});
            return res.status(200).send({item});
        })
    },
    updateItem: function(req,res){
        var itemId = req.params.id;
        var update = req.body;
        
        Item.findByIdAndUpdate(itemId, update, {new:true}, (err, itemUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar item.'});
            if(!itemUpdated) return res.status(404).send({message: 'No existe el item a actualizar'});
            return res.status(200).send({item: itemUpdated})
        });  
    },
    */
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
    /*
    getImage: function(req, res){
        var file = req.params.file;
        var filepath = './uploads/'+file;
        
        fs.exists(filepath, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(filepath));
            }
            else{
                return res.status(200).send({
                    message: 'No existe la imagen'
                })
            }
        })
    },

    deleteItem: function(req,res){
        var itemId = req.params.id;
        Item.findByIdAndRemove(itemId, (err, itemDeleted) => {
            if(err) return res.status(500).send({message: 'Error al borrar item.'});
            if(!itemDeleted) return res.status(404).send({message: 'No existe el item a borrar'});
            
            var update = {$inc : {'elements' : -1}};
            var itemDeleted = itemDeleted; //hacemos global la variable para que esté disponible en el callback a continuacion
            List.findByIdAndUpdate({_id:itemDeleted.list}, update, {new:true}, (err, listUpdated) => {
                if(err) return res.status(500).send({message: 'Error al actualizar lista.'});
                if(!listUpdated) return res.status(404).send({message: 'No existe la lista a actualizar'});
                return res.status(200).send({item: itemDeleted});
            });
        });
    },
    addItem: function(req,res){
        var item = new Item();
        var params = req.body;
        item.name = params.name;
        item.quantity = params.quantity;
        item.minimum = params.minimum;
        item.unit = params.unit;
        item.notes = params.notes;
        item.list = params.list;
        */
       
        /*Comprobamos que existe la lista a la que añadimos el item*/
        /*
        List.findById(params.list, (err, list) => {
            if(err) return res.status(500).send({message: 'Error al comprobar lista.'});
            if(!list) return res.status(404).send({message: 'No existe la lista donde estamos guardando el item.'});
            item.save((err, itemStored) => {
                if(err) return res.status(500).send({message: 'Error al guardar item.'});
                if(!itemStored) return res.status(404).send({message: 'No se ha podido guardar el item.'});
                var update = {$inc : {'elements' : 1}};
                var itemStored = itemStored; //hacemos global la variable para que esté disponible en el callback a continuacion
                List.findByIdAndUpdate({_id:itemStored.list}, update, {new:true}, (err, listUpdated) => {
                    if(err) return res.status(500).send({message: 'Error al actualizar lista.'});
                    if(!listUpdated) return res.status(404).send({message: 'No existe la lista a actualizar'});
                    return res.status(200).send({item: itemStored});
                 });
                
            });
        })        
    },
    */
}

module.exports = controller;