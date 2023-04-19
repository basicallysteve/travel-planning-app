let request = require('supertest');
let express = require('express');
let expect = require('expect');
let app = express();
app.use(require('body-parser').json());
app.use(require("../../app/api/routers/TravelPlans/TravelPlanRouter"));

describe('Travel Plan Routes', ()=>{
    it("should create a planner with the travel plan", ()=>{
        request(app)
        .post('/travel-plans')
        .send({
            "travel_plan": {
                "name": "Honeymoon Trip",
                "country": {
                    "name": "Colombia"
                }
            },
            "planner": {
                "name": "Steven",
                "last_name": "Turner",
                "email": "sturner@email.com",
                "password": "password123" 
            }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)  
        .expect(200)
        .end((err, response)=>{
            expect(response.body.data).toHaveProperty('travel_plan_id');
            expect(response.body.data.name).toEqual("Honeymoon Trip");
        })
    })


    it("should fail validation for creating a travel plan", ()=>{
        request(app)
        .post('/travel-plans')
        .send({
            "travel_plan": {
                "country": {
                    "name": "Colombia"
                },
                'planner_id': 1,
            },
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)  
        .expect(200)
        .end((err, response)=>{
            expect(response.status).toEqual(400);
            expect(response.body.data.error_length).toEqual(1);
            expect(response.body.data.data).toContain('Name is required')
        })
    });


    it("should update a travel plan", ()=>{
        request(app)
        .put('/travel-plans/1')
        .send({
            "travel_plan": {
                'travel_plan_id': 1,
                "name": "Honeymoon Trip",
                "country": {
                    "name": "Colombia"
                },
                "description": "Planning our honeymoon"
            },
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.body.data).toHaveProperty('travel_plan_id');
            expect(response.body.data.name).toEqual("Honeymoon Trip");
            expect(response.body.data.description).toEqual("Planning our honeymoon");

        })
    })

    it("should fail validation for updating a travel plan", ()=>{
        request(app)
        .put('/travel-plans/1')
        .send({
            "travel_plan": {
                'travel_plan_id': 1,
                'planner_id': null,
            },
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.status).toEqual(400);
            expect(response.body.data.error_length).toEqual(1);
            expect(response.body.data.data).toContain('Planner is required')
        })
    })

    it("should get all travel plans", ()=>{
        request(app)
        .get('/travel-plans')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.body.data.length).toBeGreaterThanOrEqual(1);
        })
    })

    it("should get all travel plans", ()=>{
        request(app)
        .get('/travel-plans/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.body.data).toHaveProperty('travel_plan_id');

        })
    })

    it("should delete a travel plan", ()=>{
        request(app)
        .delete('/travel-plans/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.body.data).toHaveProperty('travel_plan_id');
            expect(response.body.data).toHaveProperty('deleted_at');
        })
    })
})