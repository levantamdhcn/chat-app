export default class ErrorHandler extends Error {
  constructor(public statusCode: number, public message: string) {
    super();
  }
}

export enum ErrorEnum {
  authorization = 'Authorization is required!',
  userEmailNotFound = 'Invalid email!',
  invalidPassword = 'Invalid password!',
  invalidData = 'You have send invalid data!',
  unauthorized = 'Unauthorized',
  userAlreadyExists = 'User with this email address already exists!',
  invalidRefreshToken = 'Invalid refreshToken!',
}