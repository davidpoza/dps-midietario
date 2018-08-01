'use strict'
var Food = require('../models/food')
var Meal = require('../models/meal')
var fs = require('fs');
var path = require('path');

var mongoosePaginate = require('mongoose-pagination');

var controller = {

    addFood: function(req,res){
        var food = new Food();
        var params = req.body;
        food.name = params.name;
        food.soldin = params.soldin;
        food.brand = params.brand;
        food.kgprice = params.kgprice;
        food.kcal = params.kcal;
        food.sodium = params.sodium;
        food.protein = params.protein;
        food.carbohydrates = params.carbohydrates;           
        food.fat = params.fat; 

        food.save((err, foodStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar alimento.'});
            if(!foodStored) return res.status(404).send({message: 'No se ha podido guardar el alimento.'});
            return res.status(200).send({food: foodStored});    
        })
    },        


    addFoodToMeal: function(req,res){
        var food = new Food();
        var params = req.body;
        var mealId = params.meal;
        var foodId = params.food;

        //obtenemos el meal
        Meal.findOne({_id: mealId}).exec((err, meal) => {
            if(err) return res.status(500).send({message: 'Error al obtener meal'});
            if(!meal) return res.status(404).send({message: 'No existe el meal.'});
            //console.log(meal);
            // obtenemos el alimento
            Food.findOne({_id: foodId}).exec((err, food) => {
                if(err) return res.status(500).send({message: 'Error al obtener el alimento'});
                if(!food) return res.status(404).send({message: 'No existe el alimento.'});
                meal.foods.push(food);

                //actualizamos el meal añadiendo el array foods modificado
                Meal.findByIdAndUpdate(mealId, meal, {new:true}, (err, mealUpdated) => {
                    if(err) return res.status(500).send({message: 'Error al actualizar meal.'});
                    if(!mealUpdated) return res.status(404).send({message: 'No existe el meal a actualizar'});
                    return res.status(200).send({diary: mealUpdated})
                });
            })
        })

    },
    
    getFoods: function(req,res){
        Food.find({}).exec((err, foods) => {
            if(err) return res.status(500).send({message: 'Error al devolver alimentos.'});
            if(!foods) return res.status(404).send({message: 'No hay alimentos que mostrar.'});
            return res.status(200).send({foods});
        })
    },

    getFood: function(req,res){
        var foodId = req.params.id;
        if(foodId == null) return res.status(404).send({message: 'El alimento no existe.'});

        Food.findById(foodId).exec((err, food) => {
            if(err) return res.status(500).send({message: 'Error al devolver alimento.'});
            if(!food) return res.status(404).send({message: 'El alimento no existe.'});
            return res.status(200).send({food});
        })
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