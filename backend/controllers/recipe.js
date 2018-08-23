'use strict'
var Recipe = require('../models/recipe')
var Food = require('../models/food')
var User = require('../models/user')
var fs = require('fs');
var path = require('path');
var config = require('../config');

var controller = {

    addRecipe: function(req,res){
        var recipe = new Recipe();
        var params = req.body;
        recipe.name = params.name;
        recipe.description = params.description;

        recipe.save((err, recipeStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar receta.'});
            if(!recipeStored) return res.status(404).send({message: 'No se ha podido guardar la receta.'});
            return res.status(200).send({recipe: recipeStored});    
        })
        
        
    },        

    addIngredientToRecipe: function(req,res){
        var recipe = new Recipe();
        var params = req.body;
        var recipeId = params.recipe;
        var quantity = params.quantity;
        var ingredientId = params.ingredient;

        if(!quantity) return res.status(500).send({message: 'Error, debe indicar la cantidad de ingrediente.'});

        //comprobamos si existe la receta
        Recipe.findOne({_id: recipeId}).exec((err, recipe) => {
            
            if(err) return res.status(500).send({message: 'Error al devolver la receta.'});
            if(!recipe) {
                return res.status(404).send({message: 'La receta no existe.'});
            }
            else{
                // comprobamos si existe el ingrediente
                Food.findOne({_id: ingredientId}).exec((err, food) => {
            
                    if(err) return res.status(500).send({message: 'Error al consultar ingrediente.'});
                    if(!food) {
                        return res.status(404).send({message: 'El ingrediente no existe.'});
                    }
                    
                    var ingredient = {quantity: quantity, refFood: ingredientId};
                    recipe.ingredients.push(ingredient); 

                    //actualizamos la receta con el nuevo array de ingredientes
                    Recipe.findByIdAndUpdate(recipe._id, recipe, {new:true}, (err, recipeUpdated) => {
                        if(err) return res.status(500).send({message: 'Error al actualizar la receta.'});
                        if(!recipeUpdated) return res.status(404).send({message: 'No existe la receta a actualizar'});
                        return res.status(200).send({recipe: recipeUpdated})
                    });    
                });
            }            
        })
    },

    getRecipes: function(req,res){
        var recipeId = req.params.id;

        Recipe.find().exec((err, recipes) => {
            if(err) return res.status(500).send({message: 'Error al devolver recetas.'});
            if(!recipes) return res.status(404).send({message: 'No existen recetas.'});
            return res.status(200).send({recipes});
        })
    },

    getRecipe: function(req,res){
        var recipeId = req.params.id;

        Recipe.findOne({_id: recipeId}).populate('ingredients.refFood').exec((err, recipe) => {
            if(err) return res.status(500).send({message: 'Error al devolver receta.'});
            if(!recipe) return res.status(404).send({message: 'La receta no existe.'});
            return res.status(200).send({recipe});
        })
    },

    updateRecipe: function(req,res){
        var recipeId = req.params.id;
        var update = req.body;
        
        Recipe.findByIdAndUpdate(recipeId, update, {new:true}, (err, recipeUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar receta.'});
            if(!recipeUpdated) return res.status(404).send({message: 'No existe la receta a actualizar'});
            return res.status(200).send({recipe: recipeUpdated})
        });  
    },

    deleteIngredientFromRecipe: function(req,res){
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
}

module.exports = controller;

