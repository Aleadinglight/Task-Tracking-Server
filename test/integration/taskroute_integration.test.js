const request = require('supertest');
const app = require('../../src/config/app');
const database = require('../../src/database/myMongoose');

describe('Test /tasks CRUD operation', () => {
  beforeAll(async () => {
    const connection = await database.connect();

    // Connection should not be null or undefined
    expect(connection).not.toBeNull();
    expect(connection).not.toBeUndefined();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  let newTaskId = null;
  const newTask = {
    name: 'Test create task',
    description: 'create task in test environment',
    status: '1',
    priority: '0',
    due: '2021-11-17T06:34:07.923Z',
  };

  test('Create task should return status code 201', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send(newTask);

    expect(res.statusCode).toBe(201);

    // Save this id so we can delete it later
    newTaskId = res.body._id;
    // Because res.body contains _id and _v also
    const result = {
      name: res.body.name,
      description: res.body.description,
      priority: res.body.priority,
      status: res.body.status,
      due: res.body.due,
    };
    expect(result).toStrictEqual(newTask);
  });

  test('Find newly create task should return status code 200', async () => {
    const res = await request(app)
      .get('/api/tasks/' + newTaskId);

    expect(res.statusCode).toBe(200);

    const result = {
      name: res.body.name,
      description: res.body.description,
      priority: res.body.priority,
      status: res.body.status,
      due: res.body.due,
    };
    expect(result).toStrictEqual(newTask);
  });

  updateTaskName = 'Test update task';
  test('Update newly create task should return status code 200', async () => {
    const res = await request(app)
      .patch('/api/tasks/' + newTaskId)
      .send({
        name: updateTaskName,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toMatch(updateTaskName);
  });

  test('Delete task should return status code 200', async () => {
    const res = await request(app)
      .delete('/api/tasks/' + newTaskId);

    expect(res.statusCode).toBe(200);
  });
});

/*
describe('Test invalid task api', () => {
  beforeAll((done) => {
    database.connect();
    done();
  });

  test('Get fake create task should return status code 404', () => {
    return request(app)
      .get('/
      .then((res) => {
        expet(res.statusCode).toBe(404);
      });
  });

  updateTaskName = 'Test update task';
  test('Update fake create task should return status code 404', () => {
    return request(app)
      .patch('/
      .send({
        name: pdateTaskName,
        description: 'update task',
      })
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.name).toBe(updateTaskName);
      });
  });

  test('Delete fake task should return status code 404', () => {
    return request(app)
      .delete('/
      .then((res) => {
        expect(es.statusCode).toBe(404);
      });
  });

  afterAll((done) => {
    database.disconnect();
    done();
  });
});
*/
