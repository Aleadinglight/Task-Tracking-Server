const database = require('../../src/database/myMongoose');
const Task = require('../../src/model/task');

timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

describe('Test database working correctly', () => {
  test('Test database open and close correctly', async () => {
    connection = await database.connect();

    // Connection should not be null or undefined
    expect(connection).not.toBeNull();
    expect(connection).not.toBeUndefined();

    await timeout(1000);
    await database.disconnect();
  });
});

describe('Test Task model', () => {
  beforeAll(async () => {
    const connection = await database.connect();

    // Connection should not be null or undefined
    expect(connection).not.toBeNull();
    expect(connection).not.toBeUndefined();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  test('Valid task should pass validation', async () => {
    const newTask = {
      name: 'Test task',
      description: 'This is a test task',
      priority: 0,
      status: 0,
      due: Date.now(),
    };

    await expect(new Task(newTask).validate()).resolves.toBeUndefined();
  });

  test('Invalid task should throw missing name error', async () => {
    const newTask = {
      description: 'This is a test task',
      priority: 0,
      status: 0,
      due: Date.now(),
    };
    await expect(new Task(newTask).validate()).rejects.toThrow();

    newTask.name = null;
    await expect(new Task(newTask).validate()).rejects.toThrow();
  });

  test('Invalid task should throw missing description error', async () => {
    const newTask = {
      name: 'Test task',
      priority: 0,
      status: 0,
      due: Date.now(),
    };
    await expect(new Task(newTask).validate()).rejects.toThrow();

    newTask.description = null;
    await expect(new Task(newTask).validate()).rejects.toThrow();
  });

  test('Invalid task should throw missing priority error', async () => {
    const newTask = {
      name: 'Test task',
      description: 'This is a test task',
      status: 0,
      due: Date.now(),
    };
    await expect(new Task(newTask).validate()).rejects.toThrow();

    newTask.priority = null;
    await expect(new Task(newTask).validate()).rejects.toThrow();

    newTask.priority = -1;
    await expect(new Task(newTask).validate()).rejects.toThrow();
  });

  test('Invalid task should throw missing priority error', async () => {
    const newTask = {
      name: 'Test task',
      description: 'This is a test task',
      priority: 0,
      due: Date.now(),
    };
    await expect(new Task(newTask).validate()).rejects.toThrow();

    newTask.status = null;
    await expect(new Task(newTask).validate()).rejects.toThrow();

    newTask.status = -1;
    await expect(new Task(newTask).validate()).rejects.toThrow();
  });
});
