export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
    isEmailVerified: boolean;
    role: string;
}

export enum roles {
    user = "user",
    admin = "admin"
}

