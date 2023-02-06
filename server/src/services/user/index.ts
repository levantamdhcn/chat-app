import { CreatedUser, IUser } from "../../interfaces/user";

export default interface IUserService {
    create: (user: IUser) => Promise<object | undefined>;
    get: () => Promise<object | undefined>;
    getOne: (id: string) => Promise<object | undefined>;
    update: (user: IUser, userId: string) => Promise<object | undefined>;
    delete: (id: string) => Promise<object | undefined>;
}