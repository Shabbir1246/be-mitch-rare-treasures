const app = require('../server/app')
const request = require('supertest')
const db = require('../db/index')
const seed = require('../db/seed')
const data = require('../db/data/test-data/index')

beforeEach(()=>{
    return seed(data)
})

afterAll(() => {
    return db.end()
})

describe("GET /api/healthcheck", () => {
    test("return 200 code", () => {
        return request(app)
            .get('/api/healthcheck')
            .expect(200)

    })
})
describe("GET /api/treasures", () => {
    test("return 200 code and a treasures object listing all treasures", () => {
        return request(app)
            .get('/api/treasures')
            .expect(200)
            .then(({ body }) => {
                expect(body.treasures).toHaveLength(4)
                body.treasures.forEach((treasure) => {
                    expect(typeof (treasure_name)).toBe('string')
                    expect(typeof (treasure_id)).toBe('number')
                
                    expect(typeof (treasure.age)).toBe('number')
                });

            });


    })
})
