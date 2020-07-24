let server = require('../api/server');
let supertest = require('supertest');

let db = require("../database/dbConfig");

describe('auth router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('POST /auth/register', () => {
        it('should register user', () => {
            let user = {
                username: "legacy",
                password: "rem"
            }

            return supertest(server)
                .post('/api/auth/register')
                .send(user)
                .then(res => {
                    expect(res.body.username).toBe(user.username)
                })
        })
    })
})