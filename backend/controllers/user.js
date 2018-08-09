'use strict'
var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user')
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

var controller = {
    getUsers: function(req,res){
        var identity_user_id = req.user.sub;
        var page = 1;
        
        if(req.params.page){
            page = req.params.page;
        }
        var itemsPerPage = 5;

        User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
            if(err) return res.status(500).send({message: 'Error al devolver usuarios.'});
            if(!users) return res.status(404).send({message: 'No hay usuarios que mostrar.'});
            return res.status(200).send({
                users,
                total,
                pages: Math.ceil(total/itemsPerPage)
            });
        })
    },
    getUser: function(req,res){
        var userId = req.params.id;
        if(userId == null) return res.status(404).send({message: 'El usuario no existe.'});

        User.findById(userId, (err, user) => {
            if(err) return res.status(500).send({message: 'Error al devolver usuario.'});
            if(!user) return res.status(404).send({message: 'El usuario no existe.'});
            return res.status(200).send({user});
        })
    },
    getUserByEmail: function(req,res){
        var email = req.params.email; /* buscamos usando un objeto usuario */

        User.findOne({email: email}, (err, user) => {
            if(err) return res.status(500).send({message: 'Error al devolver usuario.'});
            if(!user) return res.status(404).send({message: 'El usuario no existe.'});
            return res.status(200).send({user});
        })
    },
    updateUser: function(req,res){
        var userId = req.params.id;
        var update = req.body;

        /*borramos la password de los campos enviados en el body, para cambiarla 
        crearemos un metodo por separado.*/
        delete update.password;

        /*solo dejamos que el propio usuario sea quien modifique sus datos*/
        if(userId != req.user.sub){
            return res.status(500).send({message:'No tienes permiso para actualizar los datos de usuario.'});
        }

        User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar usuario.'});
            if(!userUpdated) return res.status(404).send({message: 'No existe el usuario a actualizar'});
            return res.status(200).send({user: userUpdated})
        });
    },
    deleteUser: function(req,res){
        var userId = req.params.id;
        User.findByIdAndRemove(userId, (err, userDeleted) => {
            if(err) return res.status(500).send({message: 'Error al borrar usuario.'});
            if(!userDeleted) return res.status(404).send({message: 'No existe el usuario a borrar'});
            return res.status(200).send({user: userDeleted})
        });
    },
    addUser: function(req,res){
        var user = new User();
        var params = req.body;       

        if(params.name && params.nick && params.email && params.password){
            user.name = params.name;
            user.nick = params.nick;
            user.email = params.email;
            
            //comprobamos si el usuario ya existe previamente
            User.find({ $or: [
                {email: user.email.toLowerCase()},
                {nick: user.nick.toLowerCase()}
            ]}).exec((err,users) => {
                if(err) return res.status(500).send({message: 'Error en la petición de usuarios.'})
                if(users && users.length >= 1){
                    return res.status(500).send({message: 'El usuario ya existe.'}) 
                }
                else{
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                        user.save((err, userStored) => {
                            if(err) return res.status(500).send({message: 'Error al guardar usuario.'});
                            if(!userStored) return res.status(404).send({message: 'No se ha podido guardar el usuario.'});
                            return res.status(200).send({user: userStored});
                        });
                    });
                }
            });

            
        }
        else{
            res.status(500).send({
                message: 'Es necesario enviar todos los campos.'
            })
        }
        
    },
    loginUser: function(req,res){
        var params = req.body;
        var email = params.email;
        var password = params.password;

        User.findOne({email: email}, (err, user) => {
            if(err) return res.status(500).send({message:'Error en la petición'});
            if(user){
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){ //comparación correcta
                        if(params.gettoken == "true"){ //si queremos el token en vez de la entidad usuario
                            return res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }
                        else{
                            user.password = undefined; //quitamos la password de la respuesta
                            return res.status(200).send({user})
                        }
                    }
                    else{
                        return res.status(404).send({message: 'El usuario no se ha podido identificar.'})
                    }
                })
            }
            else{
                return res.status(404).send({message: 'El usuario no se ha podido identificar.'})
            }
        });
    },
    protegido: function(req,res){
        return res.status(200).send({
            user: req.user,
            message:'ruta protegida'
        })
    },

    /*la imagen se sube con el middleware multiparty*/
    uploadImage: function(req,res){
        var userId = req.params.id;
        var fileName = "Imagen no subida";

        if(req.files){
            var filePath = req.files.image.path;
            //var fileSplit = filePath.split("/");
            var fileSplit = filePath.split("\\");
            var fileName = fileSplit[1];
            User.findByIdAndUpdate(userId, {image: fileName},{new:true}, (err, userUpdated) => {
                if(err) return res.status(500).send({message: 'La imagen no se ha subido.'});
                if(!userUpdated) return res.status(404).send({message: 'El usuario no existe.'});
                return res.status(200).send({
                    user: userUpdated
                });
            })
        }
        else{
            return res.status(500).send({
                massage: fileName
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