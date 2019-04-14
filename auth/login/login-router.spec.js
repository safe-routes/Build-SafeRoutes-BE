const request = require('supertest');
const db = require('../../data/dbConfig.js');
const server = require('../../api/server.js');

describe('login-router.js', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('POST /api/auth/login', () => {
    it('should respond with 200 Success', async () => {
      const testUserRegister = {
        email: 'test@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };

      await request(server)
        .post('/api/auth/register')
        .send(testUserRegister);

      const testUserLogin1 = {
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };
      const res = await request(server)
        .post('/api/auth/login')
        .send(testUserLogin1);

      expect(res.status).toBe(200);
    });

    it('should respond with a message', async () => {
      const testUserToken = {
        email: 'testToken@gmail.com',
        name: 'Test Token',
        username: 'testToken',
        password: '1KDIjdf!asadfD594@@@%'
      };

      await request(server)
        .post('/api/auth/register')
        .send(testUserToken);

      const testUserTokenLogin1 = {
        username: 'testToken',
        password: '1KDIjdf!asadfD594@@@%'
      };

      const res = await request(server)
        .post('/api/auth/login')
        .send(testUserTokenLogin1);

      expect(res.body.message).toEqual('Welcome, testToken');
      // expect(Object.keys(res).sort()).toEqual(['message', 'token'].sort());
    });

    it('should return a token', async () => {
      const testUserRegister = {
        email: 'test@gmail.com',
        name: 'Test One',
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };

      await request(server)
        .post('/api/auth/register')
        .send(testUserRegister);

      const testUserLogin1 = {
        username: 'testOne',
        password: '1KDIjdf!asadfD594@@@%'
      };

      const res = await request(server)
        .post('/api/auth/login')
        .send(testUserLogin1);

      expect(res.body.token).not.toBeNull();
    });

    // could add more tests here: field validation...
  });
});

//cross-env DB_ENV=testing add to pkg .json
