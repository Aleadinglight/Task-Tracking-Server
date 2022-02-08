const request = require('supertest');
const app = require('../../src/config/app');
const database = require('../../src/database/myMongoose');

describe('Test the root path', () => {
  test('It should response status code 200', () => {
    return request(app)
      .get('/')
      .expect(200);
  });
});

describe('Test the task api', () => {
  beforeAll((done) => {
    database.connect();
    done();
  });

  test('Get all task should return status code 200', () => {
    return request(app)
      .get('/tasks')
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  newTaskId = '';
  test('Create task should return status code 201', () => {
    return request(app)
      .post('/tasks')
      .send({
        name: 'Test create task',
        description: 'create task in test environment',
        status: '1',
        priority: '0',
        due: '2021-11-17T06:34:07.923Z',
      })
      .then((res) => {
        // Save this id so we can delete it later
        newTaskId = res.body._id;
        expect(res.statusCode).toBe(201);
      });
  });

  test('Get newly create task should return status code 200', () => {
    return request(app)
      .get('/tasks/' + newTaskId)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  test('Delete task should return status code 200', () => {
    return request(app)
      .delete('/tasks/' + newTaskId)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  test('Delete a task twice should return status code 404', () => {
    return request(app)
      .delete('/tasks/' + newTaskId)
      .then((res) => {
        expect(res.statusCode).toBe(404);
      });
  });

  afterAll((done) => {
    database.disconnect();
    done();
  });
});
