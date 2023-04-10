const router = require('express').Router();
const BaseRouter = require('../BaseRouter');
const DataGenerator = require("../../../models/index");
const Payload = require("../../../helpers/Payload");
let TravelPlanRouter = new BaseRouter({
    router,
    baseUrl: '/travel-plans',
    routingInfo: {
        getAll: {
            method: 'get',
            callback: (req, res) => {
                res.send(DataGenerator.get({record_type: 'travel_plan', size: 10}));
            }
        },
        getOne: {
            method: 'get',
            url: ':id',
            callback: (req, res) => {
                res.send(DataGenerator.get({record_type: 'travel_plan', size: 1}));
            }
        },
        create: {
            method: 'post',
            callback: (req, res) => {
                let Pipe = require("./Pipelines/TravelPlanCreatePipe");
                let travelPlannerPayload = new Payload(req.body, [
                    'travel_plan',
                    {key: 'planner', value: 'user'},
                ]
                )
                let response = Pipe.run(travelPlannerPayload);
                if(response.errorLength > 0){
                    res.status(400).send(response.getErrors());
                }else{
                    res.send(response.getResponse());
                }
            }
        },
        update: {
            method: 'put',
            url: ':id',
            callback: (req, res) => {
                let Pipe = require("./Pipelines/TravelPlanUpdatePipe");

                let travelPlannerPayload = new Payload(req.body, [
                    'travel_plan',
                ]
                )
                let response = Pipe.run(travelPlannerPayload);
                if(response.errorLength > 0){
                    res.status(400).send(response.getErrors());
                }else{
                    res.send(response.getResponse());
                }
            }
        },
        delete: {
            method: 'delete',
            url: ':id',
            callback: (req, res) => {
                let Pipe = require("./Pipelines/TravelPlanDeletePipe");
                let travelPlannerPayload = new Payload({
                    travel_plan_id: req.params.id
                },[
                    'travel_plan_id'
                ])
                let response = Pipe.run(travelPlannerPayload);
                if(response.errorLength > 0){
                    res.status(400).send(response.getErrors());
                }else{
                    res.send(response.getResponse());
                }
            }
        }
    }
})

module.exports = TravelPlanRouter.getRouter();