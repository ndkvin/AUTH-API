const RegisterUser = require('../RegisterUser');

describe('a RegisterUser entites', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      username: 'abc',
      password: 'abc',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      username: 'abc',
      password: true,
      fullname: 123,
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username contain more than 50 caracters', () => {
    const payload = {
      username: 'adsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      password: 'abc',
      fullname: 'abc',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contain restricted  caracters', () => {
    const payload = {
      username: 'dico dinasdg',
      fullname: 'dicoding',
      password: 'abc',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should create registerUser object correctly', () => {
    const payload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'abc',
    };

    const { username, fullname, password } = new RegisterUser(payload);

    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
    expect(password).toEqual(payload.password);
  });
});
