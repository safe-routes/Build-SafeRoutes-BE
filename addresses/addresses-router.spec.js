const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

describe('address-router.js', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('GET /api/addresses', () => {
    it('should validate the token (i.e. it has not expired or is incorrect) and return success.', async () => {
      const testUserRegister = {
        email: 'testAddresses@gmail.com',
        name: 'Test One',
        username: 'testAddresses',
        password: '1KDIjdf!asadfD594@@@%'
      };

      await request(server)
        .post('/api/auth/register')
        .send(testUserRegister);

      const testUserLogin1 = {
        username: 'testAddresses',
        password: '1KDIjdf!asadfD594@@@%'
      };

      const res = await request(server)
        .post('/api/auth/login')
        .send(testUserLogin1);

      const addressesRes = await request(server)
        .get('/api/addresses')
        .set({ Authorization: res.body.token });

      expect(res.status).toBe(200);
      expect(addressesRes.body).toEqual({ message: 'success' });
    });
  });

  // describe('GET /api/addresses/:id', () => {
  //   it('should respond with status 200 ', () => {});

  //   it('should respond with the saved address(es) of the user based on id', () => {});
  // });

  // describe('POST /api/addresses/:id', () => {
  //   it('should respond with status 201 created', () => {});
  //   it('should return the new address', () => {});
  //   it('should respond with code 405 Not Allowed if duplicate address', () => {});
  // });
});
