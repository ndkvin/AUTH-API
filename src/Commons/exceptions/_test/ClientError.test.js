const ClientError = require('../ClientError');

describe('ClientError', () => {
  it('Should throw error when direcly use it', () => {
    expect(() => new ClientError('')).toThrowError('cannot instantiate abstract class');
  });
});
