class BaseError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "Error";
    this.statusCode = 400;
  }
}

export class DefaultError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "DefaultError";
  }
}

export class InternalServerError extends BaseError {
  constructor() {
    super("Erro interno de servidor");
    this.name = "InternalServerError";
  }
}

export class NotFoundPage extends BaseError {
  constructor(message) {
    super(message);
    this.name = "NotFoundPage";
  }
}

export class ExpiredUserToken extends BaseError {
  constructor() {
    super("Sessão expirada! Logar novamente!");
    this.name = "ExpiredUserToken";
  }
}


export class LogNotFound extends BaseError {
  constructor(message) {
    super(message);
    this.name = "LogNotFound";
  }
}

export class EmptyField extends BaseError {
  constructor(message) {
    super(`O campo ${message} está vazio!`);
    this.name = "EmptyField";
  }
}

export class EmptyFields extends BaseError {
  constructor(message) {
    super(message);
    this.name = "EmptyField";
  }
}

export class InvalidEmail extends BaseError {
  constructor(message) {
    super(message);
    this.name = "InvalidEmail";
  }
}

export class WrongPassword extends BaseError {
  constructor(message) {
    super(message);
    this.name = "WrongPassword";
  }
}

export class UserNotFound extends BaseError {
  constructor(message) {
    super(message);
    this.name = "UserNotFound";
  }
}

export class UserAlreadyExists extends BaseError {
  constructor(message) {
    super(message);
    this.name = "UserAlreadyExists";
  }
}

export class NoLogSelected extends BaseError {
  constructor() {
    super("Nenhum log foi selecionado!");
    this.name = "NoLogSelected";
  }
}

