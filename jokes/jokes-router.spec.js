let server = require('../api/server');
let supertest = require('supertest');

describe('jokes router runs',  () => {
    describe("GET /api/jokes", () => {
        it("should return 200 OK status", () => {
            return supertest(server)
                .get("/api/jokes")
                .then(res => {
                    expect(res.status).toBe(401);
                    expect(res.body).toEqual({ message: "Access Denied"})
                })
        })
        it("should return JSON", () => {
            return supertest(server)
                .get("/api/jokes")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });
    })

    // describe('Get Jokes after login', () => {
    //     let newUser;
    //     let cookie;
    //     let user = request.user(server)
    // })
    // describe("should successfully get dad jokes from /GET", () => {
    //     describe('POST /api/auth/login', () => {
    //         it('should register user > login > /GET dad jokes', async () => {
    //             let user = {
    //                 username: "rem",
    //                 password: "legacy"
    //             }
    
    //             await supertest(server)
    //                 .post('/api/auth/register')
    //                 .send(user)
    //                 .then(res => {
    //                     console.log(res.body)
    //                     expect(res.body.data.username).toBe(user.username)
    //                 })
    //             await supertest(server)
    //                 .post('/api/auth/login')
    //                 .send(user)
    //                 .then(res => {
    //                     expect(res.body.session.loggedIn).toBe(true)
    //                 })
    //             await supertest(server)
    //                 .get('/api/jokes')
    //                 .then(res => {
    //                     console.log(res.body, 'from dad jokes')
    //                     // expect.arrayContaining(res.body)
    //                     expect(res.status).toBe(200)
    //                 })
    //         })
    //     })
    // })
})