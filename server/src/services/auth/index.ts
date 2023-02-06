import { IUser } from "../../interfaces/user";

export default interface IAuthService {
    login: (email: string, password: string) => Promise<object | undefined>;
    forgot: (email: string) => Promise<string>;
    refreshToken: (password: string, token: string) => Promise<string | object>;
}