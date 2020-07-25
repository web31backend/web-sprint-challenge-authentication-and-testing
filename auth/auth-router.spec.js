let server = require('../api/server');
let supertest = require('supertest');

let db = require("../database/dbConfig");

describe('auth router', () => {
    it('runs the test', () => {
        expect(true).toBe(true) // false checked
    })
    describe('POST /api/auth/register', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        it('should register user', async () => {
            let user = {
                username: "lega2cy",
                password: "rem"
            }

            return await supertest(server)
                .post('/api/auth/register')
                .send(user)
                .then(res => {
                    // console.log(res.body)
                    expect(res.body.data.username).toBe(user.username)
                })
        })
    })
    describe('POST /api/auth/login', () => {
        it('should register user > login > logout', async () => {
            let user = {
                username: "legacy",
                password: "rem"
            }

            await supertest(server)
                .post('/api/auth/register')
                .send(user)
                .then(res => {
                    // console.log(res.body)
                    expect(res.body.data.username).toBe(user.username)
                })
            await supertest(server)
            .post('/api/auth/login')
            .send(user)
            .then(res => {
                expect(res.body.session.loggedIn).toBe(true)
            })
            await supertest(server)
            .get('/api/auth/logout')
            .then(res => {
                // console.log(res.body, 'logout')
                expect(res.body).toEqual({})
            })
        })
    })
})