const pool = require('../../database/postgres/pool');
const UsersTableTestHelpers = require('../../../../test/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('HTTP server', () => {
  afterAll(async () => {
    await pool.end;
  });

  afterEach(async () => {
    await UsersTableTestHelpers.cleanTable();
  });

  describe('when POST /users', () => {
    it('should response 201 and parsisted user', async () => {
      const requestPayload = {
        username: 'andika',
        password: 'andika',
        fullname: 'andika andika',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedUser).toBeDefined();
    });
  });
});
