const request = require('supertest');
const db = require('../../data/dbConfig.js');
const server = require('../../api/server.js');

describe('register-router.js', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('POST /api/auth/register', () => {
    it('should respond with 201 Created', async () => {
      const testUser1 = {
        email: 'testA@gmail.com',
        name: 'Test A',
        username: 'testA',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const res = await request(server)
        .post('/api/auth/register')
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
        .post('/api/auth/register')
        .send(testUser1);
      expect(res.status).toBe(422);
    });

    it('should return code 405 Not Allowed if duplicate username and email with proper message', async () => {
      const testUser1 = {
        email: 'test1@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const testUser2 = {
        email: 'test1@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const res1 = await request(server)
        .post('/api/auth/register')
        .send(testUser1);
      const res2 = await request(server)
        .post('/api/auth/register')
        .send(testUser2);

      expect(res2.status).toBe(405);
      expect(res2.body).toEqual({
        message: 'Username and email are already taken, try another.'
      });
    });

    it('should return code 405 Not Allowed if duplicate username with proper message', async () => {
      const testUser1 = {
        email: 'test@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const testUser2 = {
        email: 'test2@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const res1 = await request(server)
        .post('/api/auth/register')
        .send(testUser1);
      const res2 = await request(server)
        .post('/api/auth/register')
        .send(testUser2);

      expect(res2.status).toBe(405);
      expect(res2.body).toEqual({
        message: 'Username is already taken, try another.'
      });
    });

    it('should return code 405 Not Allowed if duplicate email with proper message', async () => {
      const testUser1 = {
        email: 'test2@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const testUser2 = {
        email: 'test2@gmail.com',
        name: 'Test One',
        username: 'testTwo',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const res1 = await request(server)
        .post('/api/auth/register')
        .send(testUser1);
      const res2 = await request(server)
        .post('/api/auth/register')
        .send(testUser2);

      expect(res2.status).toBe(405);
      expect(res2.body).toEqual({
        message: 'Email is already taken, try another.'
      });
    });

    it('should return the new user object, specifically username', async () => {
      const testUser1 = {
        email: 'test2@gmail.com',
        name: 'Test Two',
        username: 'testTwo',
        password: '1KDIjdf!asadfD594@@@%'
      };

      const res1 = await request(server)
        .post('/api/auth/register')
        .send(testUser1);

      expect(res1.body.username).toEqual('testTwo');
    });
  });
});
