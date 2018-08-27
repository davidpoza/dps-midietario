'use strict'

var express = require('express');
var RecipeController = require('../controllers/recipe')

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

var md_auth = require('../middleware/authenticated');

router.post('/recipes', /*md_auth.ensureAuth,*/ RecipeController.addRecipe);
router.post('/addingredienttorecipe', /*md_auth.ensureAuth,*/ RecipeController.addIngredientToRecipe);
router.get('/recipes/:id', /*md_auth.ensureAuth,*/ RecipeController.getRecipe);
router.get('/recipes', /*md_auth.ensureAuth,*/ RecipeController.getRecipes);
router.put('/recipes/:id', /*md_auth.ensureAuth,*/ RecipeController.updateRecipe);
router.post('/deleteingredientfromrecipe', /*md_auth.ensureAuth,*/ RecipeController.deleteIngredientFromRecipe);
module.exports = router;