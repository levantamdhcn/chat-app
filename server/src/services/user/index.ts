import { IUser } from "../../interfaces/user";

export default interface IUserService {
    get: () => Promise<object | undefined>;
    getOne: (id: string) => Promise<object | undefined>;
    update: (user: IUser, userId: string, localFilePath: string) => Promise<object | undefined>;
    delete: (id: string) => Promise<object | undefined>;
}