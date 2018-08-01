'use strict'

var express = require('express');
var FoodController = require('../controllers/food')

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

var md_auth = require('../middleware/authenticated');

router.post('/foods', /*md_auth.ensureAuth,*/ FoodController.addFood);
router.post('/addfoodtomeal', /*md_auth.ensureAuth,*/ FoodController.addFoodToMeal);
router.get('/foods', /*md_auth.ensureAuth,*/ FoodController.getFoods);
/*router.get('/listitems/:id', md_auth.ensureAuth, ItemController.getListItems);
router.get('/items/:id', md_auth.ensureAuth, ItemController.getItem);
router.put('/items/:id', md_auth.ensureAuth, ItemController.updateItem);
router.delete('/items/:id', md_auth.ensureAuth, ItemController.deleteItem);
router.get('/items', md_auth.ensureAuth, ItemController.getItems);
router.post('/uploaditemimage/:id', md_auth.ensureAuth, multipartMiddleware, ItemController.uploadImage);
router.get('/getitemimage/:file', multipartMiddleware, ItemController.getImage);
*/
module.exports = router;