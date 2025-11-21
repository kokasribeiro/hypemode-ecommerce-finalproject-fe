export class InvalidCredentialsError extends Error {
  constructor() {
    super('Your username or password are wrong, try again');
    this.name = 'InvalidCredentialsError';
  }
}

