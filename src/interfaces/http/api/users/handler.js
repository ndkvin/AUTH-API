const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');
const DomainErrorTranslator = require('../../../../Commons/exceptions/DomainErrorTranslator');

class UserHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      const addUserUseCase = await this._container.getInstance(AddUserUseCase.name);
      const addedUser = await addUserUseCase.execute(request.payload);

      const response = h.response({
        status: 'success',
        data: {
          addedUser,
        },
      });
      response.code(201);
      return response;
    } catch (e) {
      const translatedError = DomainErrorTranslator.translate(e);

      const response = h.response({
        status: 'fail',
        message: translatedError.message,
      });
      response.code(translatedError.statusCode);
      return response;
    }
  }
}

module.exports = UserHandler;
