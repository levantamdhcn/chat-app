import { CreatedUser, IUser, IUserResponse } from "../../interfaces/user";

export default interface IUserService {
    get: () => Promise<IUserResponse[] | undefined>;
    getOne: (id: string) => Promise<IUserResponse | undefined>;
    update: (user: IUser, userId: string, localFilePath: string) => Promise<IUserResponse | undefined>;
    delete: (id: string) => Promise<IUserResponse | undefined>;
    search: (searchValue: string) => Promise<CreatedUser[] | undefined>;
}