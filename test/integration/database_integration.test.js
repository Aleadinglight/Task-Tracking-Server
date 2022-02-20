const request = require('supertest');
const app = require('../../src/config/app');
const database = require('../../src/database/myMongoose');

describe('Test database open and close correctly', () => {
  beforeAll(async () => {
    connection = await database.connect();

    // Connection should not be null or undefined
    expect(connection).not.toBeNull();
    expect(connection).not.toBeUndefined();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  test('Test server work with database', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
  });
});
