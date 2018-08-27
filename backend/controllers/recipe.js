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
        var recipe = params.recipe;       
        var ingredientIndex = params.ingredient; // el indice del array de ingredientes que vamos a borrar
        
        if(!recipe) return res.status(404).send({message: 'No ha indicado la receta'});
        if(!ingredientIndex) return res.status(404).send({message: 'No ha indicado ingrediente a borrar'});
       
        Recipe.findOne({_id:recipe}).exec((err, recipe) => {
            if(err) return res.status(500).send({message: 'Error al seleccionar receta.'});
            if(!recipe) return res.status(404).send({message: 'No existe la receta.'});
            
            // borramos el ingrediente correcto
            recipe.ingredients.splice(ingredientIndex, 1);
  
            // actualizamos la receta
            Recipe.findByIdAndUpdate(recipe._id, recipe, {new:true}, (err, recipeUpdated) => {
                if(err) return res.status(500).send({message: 'Error al actualizar receta.'});
                if(!recipeUpdated) return res.status(404).send({message: 'No existe la receta a actualizar'});
                return res.status(200).send({diary: recipeUpdated})
            });  
        });

        
    },
}

module.exports = controller;

