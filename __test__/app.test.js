const app = require('../server/app')
const request = require('supertest')
const db = require('../db/index')
const seed = require('../db/seed')
const data = require('../db/data/test-data/index')

beforeEach(() => {
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
                expect(body.treasures).toHaveLength(26)
                body.treasures.forEach((treasure) => {
                    expect(typeof (treasure.treasure_name)).toBe('string')
                    expect(typeof (treasure.colour)).toBe('string')
                    expect(typeof (treasure.treasure_id)).toBe('number')
                    expect(typeof (treasure.age)).toBe('number')
                    expect(typeof (treasure.cost_at_auction)).toBe('number')
                    expect(typeof (treasure.shop_name)).toBe('string')
                });
            });
    })
    test('return 200 code and treasures should be sorted by age asc as a default', () => {
        return request(app)
            .get('/api/treasures')
            .expect(200)
            .then(({ body }) => {
                const treasures = body.treasures
                expect(treasures).toBeSorted({ key: 'age' })

            })
    })
    test('sortby query returns treasures sorted by cost', () => {
        return request(app)
            .get('/api/treasures?sort_by=cost')
            .expect(200)
            .then(({ body }) => {
                const treasures = body.treasures
                expect(treasures).toBeSorted({ key: 'cost_at_auction', coerce: true })

            })
    })
    test('sortby query returns treasures sorted by name', () => {
        return request(app)
            .get('/api/treasures?sort_by=name')
            .expect(200)
            .then(({ body }) => {
                const treasures = body.treasures
                expect(treasures).toBeSorted({ key: 'treasure_name' })

            })
    })
    test('returns 400 and error message when passed invalid sort_by', () => {
        return request(app)
            .get('/api/treasures?sort_by=invalidquery')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Invalid sort_by query')

            })
    })

    test("return 404 and message when passed an incorrext paths", () => {
        return request(app)
            .get('/api/invalidpath')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found')
            })
    })
})




