export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  isEmailVerified: boolean;
  role: string;
  status: string;
}