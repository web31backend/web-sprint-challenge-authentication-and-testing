let server = require('./server');
let supertest = require('supertest');


describe('server runs', () => {
    it('runs the test', () => {
        expect(true).toBe(true) // false checked
    })
    
    it("should user the testing environment", () => {
        expect(process.env.DB_ENV).toBe("testing");
    });

    describe("GET /api", () => {
        it("should return 200 OK status", () => {
            return supertest(server)
                .get("/api")
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual({ api: "up" });
                })
        })
        it("should return JSON", () => {
            return supertest(server)
                .get("/api")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });
    })
})