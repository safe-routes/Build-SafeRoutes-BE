const request = require('supertest');
const db = require('../../../data/dbConfig.js');
const server = require('../../server.js');

describe('register-router.js', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });
  describe('POST /api/register', () => {
    it('should respond with 201 Created', async () => {
      const testUser1 = {
        email: 'test@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const res = await request(server)
        .post('/api/register')
        .send(testUser1);
      expect(res.status).toBe(201);
    });
    it('should respond with 422 Unprocessable Entity if fields are incomplete', async () => {
      const testUser1 = {
        email: 'test@gmail.com',
        name: 'Test One',
        // missing username
        password: '1KDIjdf!asadfD594@@@%'
      };
      const res = await request(server)
        .post('/api/register')
        .send(testUser1);
      expect(res.status).toBe(422);
    });
    // TODO
    // it('should return code 405 Not Allowed if duplicate username', () => {});
    // it('should return the new user info/object', () => {});
  });
});
