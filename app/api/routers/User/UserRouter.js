const router = require('express').Router();
const BaseRouter = require('../BaseRouter');
const DataGenerator = require("../../../models/index");

let UserRouter = new BaseRouter({
    baseUrl: '/users',
    router: router,
    routingInfo: {
        getAll: {
            method: 'get',
            callback: (req, res, next)=>{
                res.send(DataGenerator.get({record_type: 'user', size: 10}));
            }
        },
        getSingle: {
            method: 'get',
            url: ':id',
            callback: (req, res, next)=>{
                res.send(DataGenerator.get({record_type: 'user', size: 1}));
            }
        },
        create: {
            method: 'post',
            callback: (req, res, next)=>{
                let validator = require("./Validator").createValidator;
                let errors = validator(req.body.user);
                if(errors.length > 0){
                    res.status(400).send(errors);
                }else{
                    let primaryKey = DataGenerator.get({record_type: 'id', size: 1});
                    res.send({user_id: primaryKey, ...req.body.user});
                }
            }
        },
        update: {
            method: 'put',
            url: ':id',
            callback: (req, res, next)=>{
                let validator = require("./Validator").updateValidator;

                let errors = validator(req.body.user);
                if(errors.length > 0){
                    res.status(400).send(errors);
                }else{
                    res.send(req.body.user);
                }
            }
        },
        delete: {
            method: 'delete',
            url: ':id',
            callback: (req, res, next)=>{
                res.send({message: "User deleted"});
            }
        },
    }
});


module.exports = UserRouter.getRouter();