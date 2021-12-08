const RegisteredUser = require('../RegisteredUser');

describe('RegisteredUser entites', () => {
  it('should throw error when payload did contain neded property', () => {
    const payload = {
      username: 'asd',
      fullname: 'aasd',
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'abc',
      username: true,
      fullname: 123,
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registerUser object correctly', () => {
    const payload = {
      id: 'dicoding',
      username: 'Dicoding Indonesia',
      fullname: 'abc',
    };

    const { id, username, fullname } = new RegisteredUser(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
  });
});
