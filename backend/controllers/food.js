'use strict'
var Food = require('../models/food')
var Meal = require('../models/meal')
var Diary = require('../models/diary')
var User = require('../models/user')

var fs = require('fs');
var path = require('path');
const sharp = require('sharp');
var config = require('../config');

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
        food.fiber = params.fiber; 
        food.save((err, foodStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar alimento.'});
            if(!foodStored) return res.status(404).send({message: 'No se ha podido guardar el alimento.'});
            return res.status(200).send({food: foodStored});    
        })
    },        
    insertFoodInMeal: function(req, res, diary, foodId, mealIndex, quantity){
        // buscamos el alimento para insertar su referencia en el meal correspondiente
        Food.findOne({_id: foodId}).exec((err, food) => {
            if(err) return res.status(500).send({message: 'Error al obtener el alimento'});
            if(!food) return res.status(404).send({message: 'No existe el alimento.'});
            var foodentry = {quantity: quantity, refFood: food._id}
            diary.meals[mealIndex].foods.push(foodentry);
    
            //actualizamos el diario con el nuevo array de meals
            Diary.findByIdAndUpdate(diary._id, diary, {new:true}, (err, diaryUpdated) => {
                if(err) return res.status(500).send({message: 'Error al actualizar diario.'});
                if(!diaryUpdated) return res.status(404).send({message: 'No existe el diario a actualizar'});
                return res.status(200).send({diary: diaryUpdated})
            });
        })
    },

    addFoodToDiary: function(req,res){
        var food = new Food();
        var params = req.body;
        var quantity = params.quantity;
        var foodId = params.food;
        var mealIndex = params.meal; // el indice del array de meals donde vamos a insertar

        if(!quantity) return res.status(500).send({message: 'Error, debe indicar la cantidad de alimento.'});

        //obtenemos el diario a partir de la fecha
        var diaryDate = new Date(params.date);

        Diary.findOne({date: diaryDate}).exec((err, diary) => {
            
            if(err) return res.status(500).send({message: 'Error al devolver diario.'});
            if(!diary) {
                return res.status(404).send({message: 'El diario no existe.'});
            }
            else{ //si el diario existe                
                controller.insertFoodInMeal(req, res, diary, foodId, mealIndex, quantity);  
            }            
        })
    },
    
    


    deleteFoodFromDiary: function(req,res){
        var params = req.body;       
        var foodId = params.food;
        var mealIndex = params.meal; // el indice del array de meals donde vamos a borrar
        //obtenemos el diario a partir de la fecha
        var diaryDate = new Date(params.date);
        if(!foodId) return res.status(404).send({message: 'No ha indicado alimento a borrar'});
        if(!diaryDate) return res.status(404).send({message: 'No ha indicado diario'});
        if(mealIndex==='') return res.status(404).send({message: 'No ha indicado meal'});

        Diary.findOne({date:diaryDate}).exec((err, diary) => {
            if(err) return res.status(500).send({message: 'Error al seleccionar diario.'});
            if(!diary) return res.status(404).send({message: 'No existe el diario.'});
            
            // borramos el id del alimento correcto   
            console.log(diary.meals[mealIndex].foods.length);         
            for (let i = 0; i < diary.meals[mealIndex].foods.length; i++) {  
                if(diary.meals[mealIndex].foods[i].refFood == foodId){                    
                    diary.meals[mealIndex].foods.splice(i, 1);   
                    console.log("borramos comida del diario");
                }
                            
            }
  
            // actualizamos el diario
            Diary.findByIdAndUpdate(diary._id, diary, {new:true}, (err, diaryUpdated) => {
                if(err) return res.status(500).send({message: 'Error al actualizar diario.'});
                if(!diaryUpdated) return res.status(404).send({message: 'No existe el diario a actualizar'});
                return res.status(200).send({diary: diaryUpdated})
            });  
        });

        
    },

    getFoods: function(req,res){
        Food.find({}).exec((err, foods) => {
            if(err) return res.status(500).send({message: 'Error al devolver alimentos.'});
            if(!foods) return res.status(404).send({message: 'No hay alimentos que mostrar.'});
            console.log("comidas");
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

    updateFood: function(req,res){
        var foodId = req.params.id;
        var update = req.body;
        
        Food.findByIdAndUpdate(foodId, update, {new:true}, (err, foodUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar alimento.'});
            if(!foodUpdated) return res.status(404).send({message: 'No existe el alimento a actualizar'});
            return res.status(200).send({item: foodUpdated})
        });  
    },

    deleteFood: function(req,res){
        var foodId = req.params.id;
        Food.findByIdAndRemove(foodId, (err, foodDeleted) => {
            if(err) return res.status(500).send({message: 'Error al borrar alimento.'});
            if(!foodDeleted) return res.status(404).send({message: 'No existe el alimento a borrar'});            
            return res.status(200).send({food: foodDeleted});
        });
    },

    
    /*la imagen se sube con el middleware multiparty*/
    uploadImage: function(req,res){
        var foodId = req.params.id;
        var fileName = "Imagen no subida";

        if(req.files){
            var filePath = req.files.image.path;
            //var fileSplit = filePath.split("/");
            var fileSplit = filePath.split("\\");
            var fileName = fileSplit[1];

            //redimensionamos la imagen
            sharp(req.files.image.path)
            .resize(1024) //1024px
            .toBuffer()
            .then( data => {
                fs.writeFileSync(req.files.image.path, data);
                Food.findByIdAndUpdate(foodId, {image: fileName},{new:true}, (err, foodUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido.'});
                    if(!foodUpdated) return res.status(404).send({message: 'El alimento no existe.'});
                    return res.status(200).send({
                        item: foodUpdated
                    });
                })
            })
            .catch( err => {
                console.log(err);
            });            
        }
        else{
            return res.status(500).send({
                message: fileName
            });
        }
    },

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
    
}

module.exports = controller;