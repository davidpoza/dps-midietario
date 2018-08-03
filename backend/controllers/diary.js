'use strict'
var Diary = require('../models/diary')
var Meal = require('../models/meal')
var fs = require('fs');
var path = require('path');
var config = require('../config');

var mongoosePaginate = require('mongoose-pagination');

var controller = {

    addDiary: function(req,res){
        var diary = new Diary();
        var params = req.body;
        var day = params.day;
        var month = params.month-1;
        var year = params.year;
        diary.date = new Date(year,month,day);

        diary.meals = Array();
        
        for(var i=0;i<config.mealsnumber;i++){
            var meal = new Meal()
            meal.name = config.meals[i];
            diary.meals.push(meal);
        }
        
        diary.save((err, diaryStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar diario.'});
            if(!diaryStored) return res.status(404).send({message: 'No se ha podido guardar el diario.'});
            return res.status(200).send({diary: diaryStored});    
        })
    },        

    /*
    getItems: function(req,res){
        Food.find({}).populate({path: 'list',populate : {path : 'user'}}).exec((err, items) => {
            if(err) return res.status(500).send({message: 'Error al devolver items.'});
            if(!items) return res.status(404).send({message: 'No hay items que mostrar.'});
            return res.status(200).send({items});
        })
    },
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