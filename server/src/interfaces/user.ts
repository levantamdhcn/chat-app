export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  isEmailVerified: boolean;
  role: string;
  status: string;
  reset_password_token: string;
  confirmationCode: string;
}

export type IUserResponse = Omit<CreatedUser, 'password' | 'reset_password_token' | 'confirmationCode'>;

export enum roles {
  user = "user",
  admin = "admin"
}

export enum status {
  active = "active",
  inactive = "inactive"
}
export interface CreatedUser extends IUser {
  _id: string;
}
