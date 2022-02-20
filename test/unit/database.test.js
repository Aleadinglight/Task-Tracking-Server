const database = require('../../src/database/myMongoose');

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


timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
