const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationsError', () => {
  it('should create Authentications error correctly', () => {
    const autehnticationError = new AuthenticationError('authentication error!');

    expect(autehnticationError.statusCode).toEqual(401);
    expect(autehnticationError.message).toEqual('authentication error!');
    expect(autehnticationError.name).toEqual('AuthenticationError');
  });
});
