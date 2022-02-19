const request = require('supertest');
const app = require('../../src/config/app');
const database = require('../../src/database/myMongoose');

describe('Test the root / path', () => {
  test('It should response status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test /api/tasks endpoint', () => {
  beforeAll(async () => {
    const connection = await database.connect();

    // Connection should not be null or undefined
    expect(connection).not.toBeNull();
    expect(connection).not.toBeUndefined();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  test('Get all task should return status code 200', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    // Returned type should be an array
    expect(Array.isArray(response.body)).toBe(true);
  });
});
