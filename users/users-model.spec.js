const db = require('../data/dbConfig.js');
const Users = require('./users-model.js');

describe('users-model.js', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('addUser()', () => {
    it('should insert the provided users', async () => {
      const testUser1 = {
        email: 'test@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const testUser2 = {
        email: 'test2@gmail.com',
        name: 'Test Two',
        username: 'testTwo',
        password: '2KDIjdf!asadfD594@@@%'
      };
      const testUser3 = {
        email: 'test3@gmail.com',
        name: 'Test Three',
        username: 'testThree',
        password: '3KDIjdf!asadfD594@@@%'
      };
      await Users.addUser(testUser1);
      await Users.addUser(testUser2);
      await Users.addUser(testUser3);
      const users = await db('users'); //REPLACE with helper later
      expect(users).toHaveLength(3);
    });
  });

  describe('getUserById()', () => {
    it('should return the user by id', async () => {
      const testUser1 = {
        email: 'test@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const addedTestUser = await Users.addUser(testUser1);
      const testUserById = await Users.getUserById(addedTestUser.id);
      expect(testUserById.username).toBe('testOne');
    });
  });

  describe('getUserByUsername()', () => {
    it('should return the user by username', async () => {
      const testUser1 = {
        email: 'test@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const addedTestUser = await Users.addUser(testUser1);
      const testUserByUsername = await Users.getUserByUsername(
        addedTestUser.username
      );
      expect(testUserByUsername.username).toBe('testOne');
    });
  });

  describe('getUserByEmail()', () => {
    it('should return the user by email', async () => {
      const testUser1 = {
        email: 'test@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const addedTestUser = await Users.addUser(testUser1);
      const testUserByEmail = await Users.getUserByEmail(addedTestUser.email);
      expect(testUserByEmail.email).toBe('test@gmail.com');
    });
  });
});
