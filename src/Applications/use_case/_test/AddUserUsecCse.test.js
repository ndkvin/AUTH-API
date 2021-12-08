const RegisterUser = require('../../../Domains/users/entites/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entites/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const AddUserUseCase = require('../AddUserUseCase');

describe('AddUsercase', () => {
  it('should orchestrating the add user action correctly', async () => {
    const useCasePayload = {
      username: 'dicodinsdag',
      password: 'secret',
      fullname: 'asd asd',
    };

    const expectedRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    });

    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    mockUserRepository.verifyAvailableUsername = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockPasswordHash.hash = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedRegisteredUser));

    const getUserUseCase = new AddUserUseCase({
      userrepository: mockUserRepository,
      PasswordHash: mockPasswordHash,
    });

    const registerUser = await getUserUseCase.execute(useCasePayload);

    expect(registerUser).toStrictEqual(expectedRegisteredUser);
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
      username: useCasePayload.username,
      password: 'encrypted_password',
      fullname: useCasePayload.fullname,
    }));
  });
});
