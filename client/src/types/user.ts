export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  isEmailVerified: boolean;
  role: string;
  status: string;
}