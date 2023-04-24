let request = require('supertest');
let express = require('express');
let expect = require('expect');
let app = express();
app.use(require('body-parser').json());
app.use(require("../../app/api/routers/User/UserRouter"));

describe('User Routes', ()=>{
    it("should create a user", ()=>{
        request(app)
        .post('/api/users')
        .send({
            "user": {
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
            expect(response.body.data).toHaveProperty('user_id');
            expect(response.body.data.name).toEqual("Steven");
        })
    })


    it("should fail validation for creating a user", ()=>{
        request(app)
        .post('/api/users')
        .send({
            "user": {
                "name": null,
                "last_name": "Turner",
                "email": "sturner@email.com",
                "password": "password123" 
            }
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


    it("should update a user", ()=>{
        request(app)
        .put('/api/users/1')
        .send({
            "user": {
                'user_id': 1,
                "name": "Stephen",
                "last_name": "Turner",
                "email": "sturner@email.com",
                "password": "password123" 
            }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.body.data).toHaveProperty('user_id');
            expect(response.body.data.name).toEqual("Stephen");

        })
    })

    it("should fail validation for updating a user", ()=>{
        request(app)
        .put('/api/users/1')
        .send({
            "user": {
                "name": null,
                "last_name": "Turner",
                "email": "sturner@email.com",
                "password": "password123" 
            }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.status).toEqual(400)
            expect(response.body.data.error_length).toEqual(1);
            expect(response.body.data.data).toContain('Name is required')
        })
    })

    it("should get all users", ()=>{
        request(app)
        .get('/api/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.body.data.length).toBeGreaterThanOrEqual(1);
        })
    })

    it("should get all users", ()=>{
        request(app)
        .get('/api/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.body.data).toHaveProperty('user_id');

        })
    })

    it("should delete a user", ()=>{
        request(app)
        .delete('/api/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, response)=>{
            expect(response.body.data).toHaveProperty('user_id');
            expect(response.body.data).toHaveProperty('deleted_at');
        })
    })
})