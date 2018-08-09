'use strict'

var express = require('express');
var UserController = require('../controllers/user')

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

var md_auth = require('../middleware/authenticated');

router.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);
router.get('/users/:id', UserController.getUser);
router.get('/usersbyemail/:email', UserController.getUserByEmail);
router.put('/users/:id', md_auth.ensureAuth, UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.post('/users', UserController.addUser);
router.post('/login', UserController.loginUser);
router.get('/protegido', md_auth.ensureAuth, UserController.protegido);
router.post('/uploaduserimage/:id', /*md_auth.ensureAuth,*/ multipartMiddleware, UserController.uploadImage);
router.get('/getuserimage/:file', multipartMiddleware, UserController.getImage);
module.exports = router;