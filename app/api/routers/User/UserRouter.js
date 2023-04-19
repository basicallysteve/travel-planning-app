const router = require('express').Router();
const BaseRouter = require('../BaseRouter');
const DataGenerator = require("../../../models/index");
const Payload = require("../../../helpers/Payload");
let UserRouter = new BaseRouter({
    baseUrl: '/users',
    router: router,
    routingInfo: {
        getAll: {
            method: 'get',
            callback: (req, res, next)=>{
                let repo = require("./UserRepository");
                res.send(repo.getAllUsers());
            }
        },
        getSingle: {
            method: 'get',
            url: ':id',
            callback: (req, res, next)=>{
                let repo = require("./UserRepository");
                res.send(repo.getUserById(req.params.id));
            }
        },
        create: {
            method: 'post',
            callback: (req, res, next)=>{
                let pipe = require("./Pipelines/UserCreatePipe");
                let payload = new Payload(req.body, [
                    'user',
                ]);
                payload = pipe.run(payload);
                if(payload.checkErrorStatus()){
                    res.status(400).send(payload.getErrors());
                }else{
                    res.send(payload.getResponse());
                }
            }
        },
        update: {
            method: 'put',
            url: ':id',
            callback: (req, res, next)=>{
                let pipe = require("./Pipelines/UserUpdatePipe");
                let payload = new Payload(req.body, [
                    'user',
                ]);
                payload = pipe.run(payload);
                if(payload.checkErrorStatus()){
                    res.status(400).send(payload.getErrors());
                }else{
                    res.send(payload.getResponse());
                }
            }
        },
        delete: {
            method: 'delete',
            url: ':id',
            callback: (req, res, next)=>{
                let pipe = require("./Pipelines/UserDeletePipe");
                let payload = new Payload({
                    user_id: req.params.id,
                }, [
                    'user_id',
                ]);
                payload = pipe.run(payload);
                if(payload.checkErrorStatus()){
                    res.status(400).send(payload.getErrors());
                }else{
                    res.send(payload.getResponse());
                }
            }
        },
    }
});


module.exports = UserRouter.getRouter();