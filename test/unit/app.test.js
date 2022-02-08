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

describe('Test valid task api', () => {
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

  fakeTaskId = '';
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

  updateTaskName = 'Test update task';
  test('Update newly create task should return status code 200', () => {
    return request(app)
      .patch('/tasks/' + newTaskId)
      .send({
        name: updateTaskName,
        description: 'update task',
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(updateTaskName);
      });
  });

  test('Delete task should return status code 200', () => {
    return request(app)
      .delete('/tasks/' + newTaskId)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  afterAll((done) => {
    database.disconnect();
    done();
  });
});

/*
describe('Test invalid task api', () => {
  beforeAll((done) => {
    database.connect();
    done();
  });

  fakeTaskId = '6201b753e38df7ad277c6e81';

  test('Get fake create task should return status code 404', () => {
    return request(app)
      .get('/tasks/' + fakeTaskId)
      .then((res) => {
        expect(res.statusCode).toBe(404);
      });
  });

  updateTaskName = 'Test update task';
  test('Update fake create task should return status code 404', () => {
    return request(app)
      .patch('/tasks/' + fakeTaskId)
      .send({
        name: updateTaskName,
        description: 'update task',
      })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.name).toBe(updateTaskName);
      });
  });

  test('Delete fake task should return status code 404', () => {
    return request(app)
      .delete('/tasks/' + fakeTaskId)
      .then((res) => {
        expect(res.statusCode).toBe(404);
      });
  });

  afterAll((done) => {
    database.disconnect();
    done();
  });
});
*/
